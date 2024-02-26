import CarouselStepsItem from "./CarouselStepsItem";
import { dummyCarousel } from "./Carousel";

export default function CarouselSteps(props) {
  const { onStepsClick, directionPage } = props;
  return (
    <div className="grid grid-cols-4 gap-2 mt-2 md:hidden">
      {dummyCarousel.map((data) => {
        return (
          <button
            key={data.id}
            id={data.id}
            className=""
            onClick={() => onStepsClick(data.page)}
          >
            <CarouselStepsItem id={data.id} title={data.title} img={data.img} page={data.page} directionPage={directionPage}/>
          </button>
        );
      })}
    </div>
  );
}
