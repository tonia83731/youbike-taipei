import Image from "next/image"
import Youbike from "@/public/images/Youbike2.0.png";
import YoubikeStudent from "@/public/images/Youbike2.0-student.png"
import YoubikeGreen from "@/public/images/Youbike2.0-green.png";
import YoubikeShow from "@/public/images/Youbike2.0-show.png";
import cImg1 from '@/public/images/cImg-01.png'
import cImg2 from "@/public/images/cImg-02.png";
import cImg3 from "@/public/images/cImg-03.png";
import cImg4 from "@/public/images/cImg-04.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export const dummyCarousel = [
  {
    id: "01",
    title: "YouBike微笑單車2.0",
    src: Youbike,
    img: cImg1,
    phrase: "",
  },
  {
    id: "02",
    title: "YouBike2.0學生專案",
    src: YoubikeStudent,
    img: cImg2,
    phrase: "YouBike 2.0學生省不完",
  },
  {
    id: "03",
    title: "YouBike2.0一騎做環保",
    src: YoubikeGreen,
    img: cImg3,
    phrase: "騎上微笑單車，還給地球乾淨的生活環境",
  },
  {
    id: "04",
    title: "YouBike2.0限時展覽",
    src: YoubikeShow,
    img: cImg4,
    phrase: "全球自行車愛好者與YoubBike共襄盛舉",
  },
];

export default function Carousel () {
  return (
    <div className="w-full h-auto relative lg:h-3/5">
      <div className="absolute bottom-2 right-2 z-[100]">
        <button
          type="button"
          className="bg-beige-100 w-8 h-8 rounded-full shadow-lg text-lg mr-1 text-olive-100 hover:text-dark-100"
          id="left-btn"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          type="button"
          className="bg-beige-100 w-8 h-8 rounded-full shadow-lg text-lg ml-1 text-olive-100 hover:text-dark-100"
          id="right-btn"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div>
        <div className="absolute top-0 left-0 right-0 w-full h-full bg-white opacity-20 hover:opacity-0"></div>
        <Image
          src={Youbike}
          alt="Youbike2.0"
          width={1200}
          height={600}
          className="w-full h-full shadow-md"
        />
      </div>
    </div>
  );
}