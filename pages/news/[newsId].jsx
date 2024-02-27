import HeadSettings from "@/components/head/HeadSettings";
import { dummyEvents } from "@/data/dummyEvents";

export default function NewsPage() {

  return (
    <>
      <HeadSettings
        pageName="最新消息"
        pageDescription="This is YouBike news page."
      />
      <section className="">
        <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
          詳細資訊
        </h3>
        
      </section>
    </>
  );
}
