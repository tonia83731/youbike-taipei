import HeadSettings from "@/components/head/HeadSettings";
import Carousel from "@/components/home/Carousel";
import CarouselSteps from "@/components/home/CarouselSteps";
import BorrowSteps from "@/components/home/BorrowSteps";
import Loading from "@/components/loading/Loading";
import LoadingImg from "@/public/images/loadingImg.png";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [directionPage, setDirectionPage] = useState(0);
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDirectionClick = (event) => {
    const id = event.target.closest("button").id;
    if (id === "right-btn") {
      if (directionPage < 3) setDirectionPage(directionPage + 1);
      else setDirectionPage(0);
    } else {
      if (directionPage > 0) setDirectionPage(directionPage - 1);
      else setDirectionPage(3);
    }
  };

  const handleStepsClick = (index) => {
    setDirectionPage(index);
  };

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
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewsDataAsync();
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image src={LoadingImg} alt="loading" width={600} height={400} />
        <Loading />
        <p className="text-lg font-bold">Almost Done! Hold on a second.</p>
      </div>
    );

  return (
    <>
      <HeadSettings
        pageName="首頁"
        pageDescription="This is YouBike homepage."
      />
      <section className="mt-4 mb-6">
        <Carousel
          onDirectionClick={handleDirectionClick}
          directionPage={directionPage}
          carouselData={carouselData}
        />
        <CarouselSteps
          onStepsClick={handleStepsClick}
          directionPage={directionPage}
        />
        <BorrowSteps />
      </section>
    </>
  );
}
