import HeadSettings from "@/components/head/HeadSettings";
// import { dummyEvents } from "@/data/dummyEvents";
import DefaultNewsImg from "@/public/images/events/default-bike.jpg";
import { getNewsDataById } from "@/helpers/new-util";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function NewsItemPage() {
  const router = useRouter()
  const newsId = router.query.newsId
  console.log(newsId)
  const [newsItem, setNewsItem] = useState([])

  useEffect(() => {
    const getNewsDataByIdAsync = async () => {
      const news = await getNewsDataById(newsId);
      setNewsItem(news);
    };
    getNewsDataByIdAsync();
  }, []);

  if(!newsItem) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HeadSettings
        pageName="最新消息"
        pageDescription="This is YouBike news page."
      />
      <section className="mb-6">
        <div className="text-center mb-6">
          <h3 className="font-bold text-2xl mb-2 text-olive-100">
            {newsItem.title}
          </h3>
          <h5 className="font-semibold text-xl text-lime-100">
            {newsItem.subtitle}
          </h5>
        </div>
        <div className="grid grid-rows-2 gap-4 lg:grid-rows-1 lg:grid-cols-2">
          {newsItem.image === "" ? (
            <Image
              src={DefaultNewsImg}
              alt="default-img"
              width={600}
              height={400}
              className="w-full h-72 object-cover object-bottom opacity-50"
            />
          ) : (
            <Image
              src={newsItem.image}
              alt="default-img"
              width={600}
              height={400}
              className="w-full h-72 object-cover object-bottom opacity-50"
            />
          )}
          <div className="h-full flex flex-col">
            <div className="mb-2">
              <h5 className="text-mustard-100 font-semibold text-lg">
                活動說明:
              </h5>
              <p className="">{newsItem.description}</p>
            </div>
            <div className="mb-2">
              <h5 className="text-mustard-100 font-semibold text-lg">
                活動時間:
              </h5>
              <p className="">
                {dayjs(newsItem.startDate).format("YYYY/MM/DD")}~
                {dayjs(newsItem.startDate).format("YYYY/MM/DD")}
              </p>
            </div>
            <div className="flex-grow" />
            <div className="flex justify-end items-center">
              <Link
                href="/news"
                className="text-slate-400 hover:text-slate-600 hover:underline hover:font-bold"
              >
                回到最新消息
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
