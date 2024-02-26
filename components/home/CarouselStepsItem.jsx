import Image from "next/image";

export default function CarouselStepsItem(props) {
  const {id, img, directionPage, page} = props
  return (
    <div className="w-full h-full relative">
      <div className="patrick-hand absolute top-2/4 left-3 translate-y-[-50%] z-[50] text-white text-4xl">
        {id}
      </div>
      <div
        className={`bg-lime-100 w-full h-full absolute top-0 left-0 right-0 hover:opacity-50 ${
          directionPage === page ? "opacity-50" : "opacity-80 "
        }`}
      ></div>
      <Image
        src={img}
        alt={`carousel-image${id}`}
        width={180}
        height={115}
        className="w-full h-full"
      />
    </div>
  );
}
