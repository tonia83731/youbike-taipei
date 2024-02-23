import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome//free-solid-svg-icons";

import YoubikeIcon from "@/public/assets/YouBike.png";

export default function Header() {
  const router = useRouter();
  const { route } = router;
  const pathArr = route.split("/")
  const path = pathArr[1]

  return (
    <header className="text-olive-100 mb-2 w-full absolute top-0 left-0 right-0 z-[999] text-lg bg-beige-100 md:text-xl xl:text-2xl">
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
              className={`col-start-2 ${path === 'realtime' ? "text-lime-100" : ""}`}
            >
              路線資訊
            </Link>
            <Link href="/statistics" className={path === 'statistics' ? "text-lime-100" : ""}>
              數據統計
            </Link>
            <Link href="/news" className={path === 'news' ? "text-lime-100" : ""}>
              最新消息
            </Link>
            <div className="col-start-5 flex justify-end">
              <Link href="/login">
                <div className="w-7 h-7 rounded-full border-2 border-olive-100 flex justify-center items-center md:w-8 md:h-8 lg:w-9 lg:h-9">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
