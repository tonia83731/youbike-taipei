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
  const route = router.query
  const {newsId} = route
  // console.log(newsId)
  // const newsId = router.query.newsId
  // console.log(newsId)
  const [newsItem, setNewsItem] = useState(null)

  useEffect(() => {
    const getNewsDataByIdAsync = async () => {
      try {
        if (!newsId) return; // Check if newsId exists
        const response = await fetch(`/api/news/${newsId}`);
        // console.log(response)
        if (response.ok) {
          const data = await response.json();
          // console.log(data)
          const { news } = data;
          console.log("Fetched news:", news);
          setNewsItem(news); // Update newsItem state with fetched data
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNewsDataByIdAsync();
  }, [newsId]);

  if(!newsItem) {
    return (
      <>
        <HeadSettings
          pageName="最新消息"
          pageDescription="This is YouBike news page."
        />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <HeadSettings
        pageName="最新消息"
        pageDescription="This is YouBike news page."
      />
      {newsItem.map((data) => {
        const { _id, title, subtitle, image, description, startDate, endDate } =
          data;
        return (
          <section key={_id} className="mb-6">
            <div className="text-center mb-6">
              <h3 className="font-bold text-2xl mb-2 text-olive-100">
                {title}
              </h3>
              <h5 className="font-semibold text-xl text-lime-100">
                {subtitle}
              </h5>
            </div>
            <div className="grid grid-rows-2 gap-4 lg:grid-rows-1 lg:grid-cols-2">
              {image === "" ? (
                <Image
                  src={DefaultNewsImg}
                  alt="default-img"
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover object-bottom opacity-50"
                />
              ) : (
                <Image
                  src={image}
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
                  <p className="">{description}</p>
                </div>
                <div className="mb-2">
                  <h5 className="text-mustard-100 font-semibold text-lg">
                    活動時間:
                  </h5>
                  <p className="">
                    {dayjs(startDate).format("YYYY/MM/DD")}~
                    {dayjs(endDate).format("YYYY/MM/DD")}
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
        );
      })}
    </>
  );
}
