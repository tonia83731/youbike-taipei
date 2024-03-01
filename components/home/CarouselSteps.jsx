import CarouselStepsItem from "./CarouselStepsItem";
import { dummyCarousel } from "./Carousel";
import { useState, useEffect } from "react";

export default function CarouselSteps(props) {
  const { onStepsClick, directionPage } = props;
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const getNewsDataAsync = async () => {
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          const { news } = data;

          const dataLength = news?.length;
          // console.log(news)
          // console.log(dataLength)
          const filterData = news.filter(
            (data, index) => index >= dataLength - 4
          );
          // console.log(filterData)
          filterData.sort((a, b) => {
            return -1;
          });
          // console.log(news)
          // setNewsList(news);
          setCarouselData(filterData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewsDataAsync();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-2 mt-2">
      {carouselData.map((data, index) => {
        return (
          <button
            key={data._id}
            id={data._id}
            className=""
            onClick={() => onStepsClick(index)}
          >
            <CarouselStepsItem
              id={index + 1}
              img={data.img}
              title={data.title}
              page={index}
              directionPage={directionPage}
            />
          </button>
        );
      })}
    </div>
  );
}
