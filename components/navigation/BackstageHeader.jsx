import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import YoubikeIcon from "@/public/assets/YouBike.png";

export default function BackStageHeader() {
  const router = useRouter();
  const { route } = router;
  const pathArr = route.split("/");
  const path = pathArr[1];

  const showCondition = route.includes("/login");

  return (
    <header className="text-olive-100 mb-2 mt-8 w-[90%] max-w-[1280px] absolute top-0 left-1/2 translate-x-[-50%] right-0 z-[999] text-lg bg-beige-100 md:text-xl xl:text-2xl">
      <div className="lg:grid lg:grid-cols-6 lg:gap-4 lg:items-center">
        <div className="w-full flex justify-center items-center">
          <div className="w-32 md:w-36 lg:w-42">
            <Image
              src={YoubikeIcon}
              alt="YouBike Icon"
              width={200}
              height={80}
            />
          </div>
        </div>
        {!showCondition && (
          <nav className="mt-3 items-center font-semibold lg:mt-0 lg:col-start-4 lg:col-span-3">
            <div className="grid grid-cols-5 gap-4 justify-items-center items-center lg:gap-2">
              <Link
                href="/backstage/news-list"
                className={`col-start-2 lg:col-start-3 ${
                  path === "realtime" ? "text-lime-100" : ""
                }`}
              >
                消息列表
              </Link>
              <Link
                href="/backstage/feedback"
                className={path === "statistics" ? "text-lime-100" : ""}
              >
                反饋列表
              </Link>
              <Link
                href="/backstage/member-list"
                className={path === "news" ? "text-lime-100" : ""}
              >
                訂閱名單
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
