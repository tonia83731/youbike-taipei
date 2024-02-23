import Image from "next/image";
import { Inter } from "next/font/google";
import HeadSettings from "@/components/head/HeadSettings";
import Carousel from "@/components/home/Carousel";
import CarouselSteps from "@/components/home/CarouselSteps";
import Footer from "@/components/navigation/Footer";
import BorrowSteps from "@/components/home/BorrowSteps";


const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <>
      <HeadSettings
        pageName="Home"
        pageDescription="This is YouBike homepage."
      />
      <section className="mt-4 mb-6">
        <Carousel />
        <CarouselSteps />
        <BorrowSteps />
      </section>
      <Footer />
    </>
  );
}
