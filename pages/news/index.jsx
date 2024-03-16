import HeadSettings from "@/components/head/HeadSettings";
import NewsCard from "@/components/news/NewsCard";
import NewsTable from "@/components/news/NewsTable";
import Pagination from "@/components/realtime/Pagination";
import { ThreeDots } from "react-loader-spinner";
import { getNewsData } from "@/helpers/new-util";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNewsDataAsync = async () => {
      const news = await getNewsData();
      setNewsData(news);
      setIsLoading(false);
    };
    getNewsDataAsync();
  }, []);

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
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ color: "#B5C267" }}
              wrapperClass=""
            />
          </div>
        ) : (
          <NewsCard newsDatas={newsData} />
        )}
        {/* <NewsTable tbodyData={newsData} isLoading={isLoading} /> */}
        {/* <NewsCard newsDatas={newsData} /> */}
        {/* <Pagination /> */}
      </section>
    </>
  );
}
