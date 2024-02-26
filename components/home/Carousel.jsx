import Image from "next/image";
import Youbike from "@/public/images/Youbike2.0.png";
import YoubikeStudent from "@/public/images/Youbike2.0-student.png";
import YoubikeGreen from "@/public/images/Youbike2.0-green.png";
import YoubikeShow from "@/public/images/Youbike2.0-show.png";
import cImg1 from "@/public/images/cImg-01.png";
import cImg2 from "@/public/images/cImg-02.png";
import cImg3 from "@/public/images/cImg-03.png";
import cImg4 from "@/public/images/cImg-04.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import CarouselNumber from "./CarouselNumber";

export const dummyCarousel = [
  {
    id: "01",
    page: 1,
    title: "YouBike微笑單車2.0",
    src: Youbike,
    img: cImg1,
    phrase: "",
  },
  {
    id: "02",
    page: 2,
    title: "YouBike2.0學生專案",
    src: YoubikeStudent,
    img: cImg2,
    phrase: "YouBike 2.0學生省不完",
  },
  {
    id: "03",
    page: 3,
    title: "YouBike2.0一騎做環保",
    src: YoubikeGreen,
    img: cImg3,
    phrase: "騎上微笑單車，還給地球乾淨的生活環境",
  },
  {
    id: "04",
    page: 4,
    title: "YouBike2.0限時展覽",
    src: YoubikeShow,
    img: cImg4,
    phrase: "全球自行車愛好者與YoubBike共襄盛舉",
  },
];

export default function Carousel(props) {
  const { onDirectionClick, onStepsClick, directionPage } = props;
  const showData = dummyCarousel.find((data) => data.page === directionPage)

  return (
    <div className="w-full h-auto overflow-hidden relative lg:h-3/5">
      <div className="absolute bottom-2 right-2 z-[100]">
        <button
          type="button"
          className="bg-beige-100 w-8 h-8 rounded-full shadow-lg text-lg mr-1 text-olive-100 hover:text-dark-100"
          id="left-btn"
          onClick={(event) => onDirectionClick(event)}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          type="button"
          className="bg-beige-100 w-8 h-8 rounded-full shadow-lg text-lg ml-1 text-olive-100 hover:text-dark-100"
          id="right-btn"
          onClick={(event) => onDirectionClick(event)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="w-[400%] flex transition-transform ease-out duration-500 relative" style={{transform: `translateX(-${directionPage * 25}%)`}}>
        {/* <div className="absolute left-2 top-1/2 translate-y-[-50%] z-50 hidden md:block">
          <CarouselNumber
          // onStepsClick={onStepsClick} directionPage={directionPage}
          />
        </div> */}
        {
          dummyCarousel.map((data, index) => {
            return (
              <div key={data.id} className="relative w-full">
                <div
                  className={
                    index === 0
                      ? "hidden"
                      : "absolute w-2/5 h-full bg-white-75 px-3 flex flex-col justify-center md:px-4"
                  }
                >
                  <h3 className="font-bold text-xl text-olive-100 md:text-2xl lg:text-4xl">
                    {data.title}
                  </h3>
                  <h5 className="text-olive-100 font-semibold md:text-lg lg:text-2xl">
                    {data.phrase}
                  </h5>
                </div>
                <Image
                  src={data.src}
                  alt={data.title}
                  width={1200}
                  height={600}
                  className="w-full h-full shadow-md"
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
