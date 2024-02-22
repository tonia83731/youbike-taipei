import Image from "next/image";
import { Inter } from "next/font/google";
import HeadSettings from "@/components/head/HeadSettings";
import Carousel from "@/components/home/Carousel";
import CarouselItem from "@/components/home/CarouselItem";
import Footer from "@/components/navigation/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <HeadSettings pageName="Home" pageDescription="This is YouBike homepage." />
      <section>
        <Carousel />
        {/* <div className="">
          <CarouselItem />
        </div> */}
        <Footer />
      </section>
    </>
  );
}
