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
  // const [isLoading, setIsLoading] = useState(true);

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
