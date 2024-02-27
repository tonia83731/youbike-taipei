import HeadSettings from "@/components/head/HeadSettings";
import NewsCard from "@/components/news/newsCard";
import { dummyEvents } from "@/data/dummyEvents";

export default function NewsPage() {
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dummyEvents.map((data) => {
            return (
              <NewsCard
                key={data.updateDate}
                title={data.title}
                subtitle={data.subtitle}
                updateDate={data.updateDate}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
