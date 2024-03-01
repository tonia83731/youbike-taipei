import Image from "next/image";
// import { Inter } from "next/font/google";
import HeadSettings from "@/components/head/HeadSettings";
import Carousel from "@/components/home/Carousel";
import CarouselSteps from "@/components/home/CarouselSteps";
import BorrowSteps from "@/components/home/BorrowSteps";
import { useEffect, useState } from "react";


// const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const [directionPage, setDirectionPage] = useState(0)
  const handleDirectionClick = (event) => {
    const id = event.target.closest("button").id;
    if(id === 'right-btn') {
      if(directionPage < 3) setDirectionPage(directionPage + 1)
      else setDirectionPage(0)
    } else {
      if(directionPage > 0) setDirectionPage(directionPage - 1)
      else setDirectionPage(3)
    }
  }

  
  const handleStepsClick = (index) => {
    setDirectionPage(index)
  }

  // const changeDirection = () => {
  //   if(directionPage < 4) setDirectionPage(directionPage + 1)
  //   else setDirectionPage(1)
  // }

  // useEffect(() => {
  //   const interval = setInterval(changeDirection, 5000)
  //   return () => clearInterval(interval);
  // }, [directionPage])
  return (
    <>
      <HeadSettings
        pageName="首頁"
        pageDescription="This is YouBike homepage."
      />
      <section className="mt-4 mb-6">
        <Carousel
        onDirectionClick={handleDirectionClick}
        // onStepsClick={handleStepsClick}
        directionPage={directionPage}
        />
        <CarouselSteps onStepsClick={handleStepsClick} directionPage={directionPage}/>
        <BorrowSteps />
      </section>
    </>
  );
}
