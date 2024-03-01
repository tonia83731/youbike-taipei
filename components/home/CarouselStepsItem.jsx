import Image from "next/image";
import cImg1 from "@/public/images/cImg-01.png";
import cImg2 from "@/public/images/cImg-02.png";
import cImg3 from "@/public/images/cImg-03.png";
import cImg4 from "@/public/images/cImg-04.png";

export default function CarouselStepsItem(props) {
  const {id, directionPage, page, title} = props
  const showImage = (page, title) => {
    const image =
      page === 0 ? (
        <Image
          src={cImg1}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-full shadow-md md:h-4/5 md:object-cover md:object-center"
        />
      ) : page === 1 ? (
        <Image
          src={cImg2}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-full shadow-md md:h-4/5 md:object-cover md:object-center"
        />
      ) : page === 2 ? (
        <Image
          src={cImg3}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-full shadow-md md:h-4/5 md:object-cover md:object-center"
        />
      ) : (
        <Image
          src={cImg4}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-full shadow-md md:h-4/5 md:object-cover md:object-center"
        />
      );
    return image;
  };
  
  return (
    <div className="w-full h-full relative">
      <div className="patrick-hand absolute top-2/4 left-3 translate-y-[-50%] z-[50] text-white text-4xl">
        0{id}
      </div>
      <div
        className={`bg-lime-100 w-full h-full absolute top-0 left-0 right-0 hover:opacity-50  md:h-4/5 ${
          directionPage === page ? "opacity-50" : "opacity-80 "
        }`}
      ></div>
      {showImage(page, title)}
    </div>
  );
}
