import HeadSettings from "@/components/head/HeadSettings";
import NewsTable from "@/components/news/NewsTable";
import { getNewsData } from "@/helpers/new-util";
// import NewsCard from "@/components/news/newsCard";
// import { dummyEvents } from "@/data/dummyEvents";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    const getNewsDataAsync = async () => {
      const news = await getNewsData();
      setNewsData(news);
    }
    getNewsDataAsync()
  }, [])
  return (
    <>
      <HeadSettings
        pageName="最新消息"
        pageDescription="This is YouBike news page."
      />
      <section className="mb-6">
        <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
          最新消息
        </h3>
        <NewsTable tbodyData={newsData}/>
      </section>
    </>
  );
}
