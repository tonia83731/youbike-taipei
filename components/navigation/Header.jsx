import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome//free-solid-svg-icons";

import YoubikeIcon from "@/public/assets/YouBike.png";
import DefaultInput from "../input/DefaultInput";
import SubscribeForm from "./SubscribeForm";

export default function Header() {
  const router = useRouter();
  const { route } = router;
  const pathArr = route.split("/");
  const path = pathArr[1];

  return (
    <>
      <header className="text-olive-100 mb-2 mt-8 w-[90%] max-w-[1280px] absolute top-0 left-1/2 translate-x-[-50%] right-0 z-[999] text-lg bg-beige-100 md:text-xl xl:text-2xl">
        <div className="lg:grid lg:grid-cols-6 lg:gap-4 lg:items-center">
          <div className="w-full flex justify-center items-center">
            <Link href="/" className="w-32 md:w-36 lg:w-42">
              <Image
                src={YoubikeIcon}
                alt="YouBike Icon"
                width={200}
                height={80}
              />
            </Link>
          </div>
          <nav className="mt-3 items-center font-semibold lg:mt-0 lg:col-start-4 lg:col-span-3">
            <div className="grid grid-cols-5 gap-4 justify-items-center items-center lg:gap-2">
              <Link
                href="/realtime"
                className={`col-start-2 lg:col-start-3 ${
                  path === "realtime" ? "text-lime-100" : ""
                }`}
              >
                路線資訊
              </Link>
              <Link
                href="/statistics"
                className={path === "statistics" ? "text-lime-100" : ""}
              >
                數據統計
              </Link>
              <Link
                href="/news"
                className={path === "news" ? "text-lime-100" : ""}
              >
                最新消息
              </Link>
            </div>
          </nav>
        </div>
        <SubscribeForm />
      </header>
    </>
  );
}
