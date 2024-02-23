import CarouselStepsItem from "./CarouselStepsItem";
import { dummyCarousel } from "./Carousel";

export default function CarouselSteps() {
  return (
    <div className="grid grid-cols-4 gap-2 mt-2 md:hidden">
      {dummyCarousel.map((data) => {
        return (
          <button key={data.id} id={data.id} className="">
            <CarouselStepsItem id={data.id} title={data.title} img={data.img}/>
          </button>
        );
      })}
    </div>
  );
}
