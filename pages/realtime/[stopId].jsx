import {
  getYouBikeRealtimeData,
  getYouBikeRealtimeDataById,
  getYouBikeRealtimeDataBySlice,
} from "@/library/realtime_data";
import { getName } from "@/library/handleName";
import HeadSettings from "@/components/head/HeadSettings";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";

export default function RealTimeStopPage(props) {
  // console.log(process.env.GOOGLE_MAP_KEY)
  const { youbike, googleKey } = props;
  const {isLoaded} = useLoadScript({
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


  const name = getName(youbike.sna)
  const en_name = getName(youbike.snaen)
  if(!isLoaded) return <div>Loading...</div>;
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
            </GoogleMap>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.stopId;
  const data = await getYouBikeRealtimeDataById(id);
  const googleKey = process.env.GOOGLE_MAP_KEY
  return {
    props: {
      youbike: data,
      googleKey: googleKey
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // console.log(youBikeDataSlice);
  const allData = await getYouBikeRealtimeData()
  const youBikeDataSlice = allData.filter((data, index) => index < 11)
  
  const paths = youBikeDataSlice.map((data) => ({
    params: { stopId: data.sno },
  }));
  // console.log(paths)
  return {
    paths: paths,
    fallback: "blocking",
  };
}

