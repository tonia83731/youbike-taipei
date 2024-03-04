import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { useState, useEffect } from "react";
import CustomCheckbox from "@/components/input/CustomCheckbox";
import Frame from "@/public/images/Frame.svg";
import StopTable from "@/components/realtime/stopTable";
import { getYouBikeRealtimeData, getYouBikeRealtimeDataBySlice } from "@/library/realtime_data";
import Pagination from "@/components/realtime/Pagination";
import HeadSettings from "@/components/head/HeadSettings";

const theadData = ["區域", "站點名稱", "可借車輛", "可選空位"];

export default function RealTimePage(props) {
  const { districts, youbike, length } = props;
  const [screenWidth, setScreenWidth] = useState({
    width: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [realtimeData, setRealtimeData] = useState(youbike)
  const [checkedAll, setCheckedAll] = useState(true)
  const districtsLength = districts?.length
  // console.log(districtsLength)
  const [checkedState, setCheckedState] = useState(
    new Array(districtsLength).fill(true)
  )
  // console.log(checkedState)
  const perPage = 10;
  const show_page = 5;
  const numPage = Math.ceil(length / perPage);
  const numArray = Array.from({ length: numPage }, (_, index) => index + 1);
  const showNumArray =
    currentPage < 3
      ? numArray.slice(0, 5)
      : currentPage > numPage-2
      ? numArray.slice(numPage - show_page, numPage)
      : numArray.slice(currentPage - 3, currentPage + 2);

  const firstIndex = (currentPage - 1) * perPage;
  const lastIndex = currentPage * perPage;

  const handlePageClick = (event) => {
    const id = event.target.closest("button").id;
    if (currentPage > 1 && id === "first-btn") setCurrentPage(1);
    else if (currentPage > 1 && id === "prev-btn")
      setCurrentPage(currentPage - 1);
    else if (currentPage < numPage && id === "last-btn")
      setCurrentPage(numPage);
    else if (currentPage < numPage && id === "next-btn")
      setCurrentPage(currentPage + 1);
    else setCurrentPage(+id);
  };

  const handleCheckedAllChange = () => {
    setCheckedAll(!checkedAll)
    // console.log(!checkedAll)
    setRealtimeData(youbike)
  }
  const handleCheckedGroupChange = (event) => {
    const id = event.target.id
    const name = event.target.name
    const updateCheckState = checkedState.map((item, index) => {
      return index === +id ? !item : item
    })
    // console.log(updateRealtimeData)
    const filterFalseCheck = updateCheckState.filter((item) => item === false)
    setCheckedAll(filterFalseCheck.length > 0 ? false : true)
    setCheckedState(updateCheckState)
  }
  console.log(checkedState)

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
    const getYouBikeRealtimeDataBySliceAsync = async() => {
      const data = await getYouBikeRealtimeDataBySlice(firstIndex, lastIndex)
      setRealtimeData(data)
    }
    getYouBikeRealtimeDataBySliceAsync()
  }, [currentPage, firstIndex, lastIndex])

  return (
    <>
      <HeadSettings
        pageName="路線資訊"
        pageDescription="This is YouBike realtime page."
      />
      <section className="">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center">
          <div className="grid grid-cols-3 items-center gap-2 lg:grid-cols-4">
            <div className="justify-self-start">
              <CustomCheckbox id="all" name="全部" label="全部勾選" isChecked={checkedAll} onCheckboxChange={handleCheckedAllChange}/>
            </div>
            <span className="col-span-3"></span>
            {districts.map((district, index) => {
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
          <StopTable
            screenWidth={screenWidth}
            theadData={theadData}
            tbodyData={realtimeData}
          />
        </div>
        <div className="flex justify-center mb-6 lg:justify-end">
          <Pagination
            pages={showNumArray}
            currentPage={currentPage}
            onPageClick={handlePageClick}
            totalPage={numPage}
          />
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
  return {
    props: {
      districts: districts,
      youbike: prefetchData,
      length: youBikeDataLength,
    },
    revalidate: 60,
  };
}


