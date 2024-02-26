import { dummyCarousel } from "./Carousel";
import CarouselNumbersItem from "./CarouselNumberItem";


export default function CarouselNumber (props) {
  const { onStepsClick, directionPage } = props;
  return (
    <div className="flex flex-col gap-2">
      {
        dummyCarousel.map((data) => {
          return (
            <button
              key={data.id}
              id={data.id}
              className=""
              onClick={() => onStepsClick(data.page)}
            >
              <CarouselNumbersItem
                id={data.id}
                page={data.page}
                directionPage={directionPage}
              />
            </button>
          );
        })
      }
    </div>
  );
}