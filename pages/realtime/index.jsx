import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { twCity } from "@/data/twCity";
import { twCityDistricts } from "@/data/twCityDistricts";
import { getDistrictsFromCity } from "@/helpers/handleCityandDistricts";
import {
  getYoubikeRealtimeDataByCity,
  getYoubikeStationData,
} from "@/helpers/realtime_data";

import HeadSettings from "@/components/head/HeadSettings";
import Frame from "@/public/images/Frame.svg";

import { promises as fs } from "fs";
import path from "path";

import CustomCheckbox from "@/components/input/CustomCheckbox";

import StopTable from "@/components/realtime/StopTable";
import Pagination from "@/components/realtime/Pagination";

export default function RealTimePage(props) {
  // const cityRef = useRef();
  // console.log(cityRef);
  const { districts, districtsName, youbike, length } = props;
  const [citySelect, setCitySelect] = useState({
    label: "臺北市",
    value: "Taipei",
  });
  const [districtList, setDistrictList] = useState(
    getDistrictsFromCity(citySelect.label)
  );
  const [checkedAll, setCheckedAll] = useState(true);
  const districtsLength = districtList?.length;
  const [checkedState, setCheckedState] = useState(
    new Array(districtsLength.Length).fill(true)
  );
  const [screenWidth, setScreenWidth] = useState({
    width: undefined,
  });
  const [realtimeData, setRealtimeData] = useState(youbike);
  const [realtimeDataLength, setRealtimeDataLength] = useState(length);

  const handleCheckedAllChange = () => {
    setCheckedAll(!checkedAll);
    if (!checkedAll === true) {
      setCheckedState(new Array(districtsLength).fill(true));
      setRealtimeData(youbike);
    } else {
      setCheckedState(new Array(districtsLength).fill(false));
    }
  };
  const handleCheckedGroupChange = (event) => {
    const id = event.target.id;
    // const name = event.target.name
    const updateCheckState = checkedState.map((item, index) => {
      return index === +id ? !item : item;
    });
    // console.log(updateRealtimeData)
    const filterFalseCheck = updateCheckState.filter((item) => item === false);
    setCheckedAll(filterFalseCheck.length > 0 ? false : true);
    setCheckedState(updateCheckState);
  };
  const handleOptionSelect = async (inputValue) => {
    const districtData = getDistrictsFromCity(inputValue.label);
    const object = await getYoubikeRealtimeDataByCity(inputValue.value);
    const length = object.length;
    setRealtimeData(object);
    setRealtimeDataLength(length);
    setDistrictList(districtData);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth({ width: window.innerWidth });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getYoubikeRealtimeDataByCityAsync = async () => {
      const object = await getYoubikeRealtimeDataByCity(citySelect.value);
      const length = object.length;
      setRealtimeData(object);
      setRealtimeDataLength(length);
    };
    getYoubikeRealtimeDataByCityAsync();
  }, []);

  return (
    <>
      <HeadSettings
        pageName="路線資訊"
        pageDescription="This is YouBike realtime page."
      />
      <section className="">
        <Select
          options={twCity}
          // ref={cityRef}
          // id={`tag${step}`}
          // name={`tag${step}`}
          defaultValue={citySelect}
          closeMenuOnSelect={true}
          className="grow w-full"
          classNamePrefix="react-select"
          onChange={handleOptionSelect}
        />
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center">
          <div className="grid grid-cols-3 items-center gap-2 lg:grid-cols-4">
            <div className="justify-self-start">
              <CustomCheckbox
                id="all"
                name="全部"
                label="全部勾選"
                isChecked={checkedAll}
                onCheckboxChange={handleCheckedAllChange}
              />
            </div>
            <span className="col-span-3"></span>
            {districtList.map((district, index) => {
              const alignPositionSmall =
                index % 3 === 0
                  ? "justify-self-start"
                  : index % 3 === 2
                  ? "justify-self-end"
                  : "justify-self-center";
              const alignPositionLarge =
                index % 4 === 0
                  ? "justify-self-start"
                  : index % 4 === 3
                  ? "justify-self-end"
                  : "justify-self-center";
              const alignPosition =
                screenWidth.width > 1024
                  ? alignPositionLarge
                  : alignPositionSmall;
              return (
                <div className={alignPosition} key={district.zip}>
                  <CustomCheckbox
                    id={index}
                    name={district.name}
                    label={district.name}
                    isChecked={checkedState[index]}
                    onCheckboxChange={handleCheckedGroupChange}
                  />
                </div>
              );
            })}
          </div>
          <Image
            src={Frame}
            alt="realtime image"
            width={500}
            height={200}
            className="hidden lg:block lg:w-full lg:h-[180px] lg:object-cover object-top"
          />
        </div>
        <div className="mt-6 mb-4">
          <StopTable tableData={realtimeData} />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const youBikeData = await getYouBikeRealtimeData();
  const youBikeDataLength = youBikeData.length;
  const prefetchData = youBikeData.filter((data, index) => index < 10);
  const filePath = path.join(process.cwd(), "data", "tpeCityDistricts.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const districts = data[0].districts;
  const onlyDistrictsName = districts.map((item) => item.name);
  return {
    props: {
      districts: districts,
      districtsName: onlyDistrictsName,
      youbike: prefetchData,
      length: youBikeDataLength,
    },
    revalidate: 60,
  };
}
