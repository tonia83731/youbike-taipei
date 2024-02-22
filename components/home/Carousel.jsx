import Image from "next/image"
import Youbike from "@/public/images/Youbike2.0.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const dummyCarousel = []

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