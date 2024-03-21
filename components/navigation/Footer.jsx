import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLine,
  faSquareInstagram,
  faSquareFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full grid grid-cols-4 gap-2 text-center items-center text-lg md:text-xl xl:text-2xl">
      <div className="h-16 py-2 px-1 col-span-2 bg-olive-100 text-white flex justify-center items-center">
        <Link href="/contact">聯絡我們</Link>
        <div className="hidden mx-2 md:block md:mx-4"> | </div>
        <div className="hidden text-2xl md:grid md:grid-cols-4 md:gap-2">
          <Link href="https://www.instagram.com/youbike_tw/">
            <div className="bg-lime-100 w-10 h-10 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faSquareInstagram} />
            </div>
          </Link>
          <Link href="https://www.facebook.com/YouBike.Taipei.tw/">
            <div className="bg-lime-100 w-10 h-10 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faSquareFacebook} />
            </div>
          </Link>
          <Link href="https://page.line.me/122jqmcv?openQrModal=true">
            <div className="bg-lime-100 w-10 h-10 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faLine} />
            </div>
          </Link>
          <Link href="https://www.youtube.com/channel/UCXRTadM5Rgs_EXtdNREj9KQ?view_as=subscriber">
            <div className="bg-lime-100 w-10 h-10 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          </Link>
        </div>
      </div>
      <div className="h-16 py-2 px-1 bg-olive-100 text-white flex justify-center items-center">
        騎乘次數 | 294,218,624
      </div>
      <Link
        href="/admin/login"
        className="h-16 py-2 px-1 bg-lime-100 text-white flex justify-center items-center"
      >
        後台
      </Link>
    </footer>
  );
}
