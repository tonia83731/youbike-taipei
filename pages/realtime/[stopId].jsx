import {
  getYouBikeRealtimeData,
  getYouBikeRealtimeDataById,
} from "@/library/realtime_data";
import { getName } from "@/library/handleName";
import HeadSettings from "@/components/head/HeadSettings";

import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function RealTimeStopPage(props) {
  // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY);
  const { youbike, googleKey } = props;
  const [userPosition, setUserPosition] = useState(null);
  const [directionRes, setDirectionRes] = useState(null);
  const [routeGuide, setRouteGuide] = useState({
    destination: "",
    duration: "",
  });
  const [isToggle, setIsToggle] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey,
  });
  const center = useMemo(
    () => ({
      lat: youbike.lat,
      lng: youbike.lng,
    }),
    []
  );
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      zoomControl: true,
      mapTypeControl: false,
    }),
    []
  );

  const handleRouteClick = async () => {
    const youbikeLatLng = {
      lat: youbike.lat,
      lng: youbike.lng,
    };
    const service = new google.maps.DirectionsService();
    // console.log(service);
    const results = await service.route({
      origin: userPosition,
      destination: youbikeLatLng,
      travelMode: window.google.maps.TravelMode.WALKING,
    });
    const { routes } = results;
    setDirectionRes(results);
    setRouteGuide({
      destination: routes[0].legs[0].distance.text,
      duration: routes[0].legs[0].duration.text,
    });
    setIsToggle(true);
  };

  // console.log(userPosition);

  const name = getName(youbike.sna);
  const en_name = getName(youbike.snaen);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
      const { coords } = position;
      const initialUserCenter = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setUserPosition(initialUserCenter);
    });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <HeadSettings
        pageName={name}
        pageDescription={`This is ${name} information`}
      />
      <section>
        <div className="flex flex-col justify-center items-center mb-6 text-olive-100 font-bold ">
          <h3 className="text-2xl text-center mb-2">{name}</h3>
          <h5>({en_name})</h5>
        </div>
        <div className="mb-6 grid grid-rows-2 gap-2 lg:grid-rows-1 lg:grid-cols-2 lg:items-start">
          <div className="">
            <ul className="list-inside list-disc text-xl">
              <h5 className="font-bold mb-4">{name}</h5>
              <li className="">
                站點位置:{" "}
                <span>
                  台北市{youbike.sarea}
                  {youbike.ar}
                </span>
              </li>
              <li className="my-2">
                站點資訊:
                <ul className="ml-8 list-inside list-[circle]">
                  <li>
                    場站總停車格: <span>{youbike.tot}</span>
                  </li>
                  <li>
                    場站目前車輛數量: <span>{youbike.tot}</span>
                  </li>
                  <li>
                    場站目前空位數量: <span>{youbike.bemp}</span>
                  </li>
                </ul>
              </li>
              <li>
                最後更新時間:{" "}
                <span>{new Date(youbike.updateTime).toLocaleString()}</span>
              </li>
            </ul>
            <button
              className="bg-mustard-100 text-white text-lg rounded px-4 py-2 mt-6"
              onClick={handleRouteClick}
            >
              路線導覽
            </button>
          </div>
          <div id="map" className="w-full h-full">
            <GoogleMap
              zoom={15}
              center={center}
              options={options}
              mapContainerStyle={{
                width: "100%",
                height: "300px",
                margin: "auto",
              }}
            >
              <MarkerF
                position={{
                  lat: youbike.lat,
                  lng: youbike.lng,
                }}
              />
              {directionRes && <DirectionsRenderer directions={directionRes} />}
            </GoogleMap>
          </div>
        </div>
        {isToggle && (
          <div className="bg-lemon-50 text-olive-100 text-lg p-4 rounded">
            <button
              className="w-full flex justify-end items-center text-slate-300 hover:text-slate-500 text-xl cursor-pointer"
              onClick={() => setIsToggle(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="">
              <div className="">預估距離: {routeGuide.destination}</div>
              <div className="">預估時間: {routeGuide.duration}</div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.stopId;
  const data = await getYouBikeRealtimeDataById(id);
  const googleKey = process.env.GOOGLE_MAP_KEY;
  return {
    props: {
      youbike: data,
      googleKey: googleKey,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // console.log(youBikeDataSlice);
  const allData = await getYouBikeRealtimeData();
  const youBikeDataSlice = allData.filter((data, index) => index < 11);

  const paths = youBikeDataSlice.map((data) => ({
    params: { stopId: data.sno },
  }));
  // console.log(paths)
  return {
    paths: paths,
    fallback: "blocking",
  };
}
