import BorrowStepsItem from "./BorrowStepsItem";
import BorrowStep1 from "@/public/steps/step1.svg";
import BorrowStep2 from "@/public/steps/step2.svg";
import BorrowStep3 from "@/public/steps/step3.svg";
import BorrowStep4 from "@/public/steps/step4.svg";

const stepDatas = [
  {
    id: "step1",
    title: "註冊/登入",
    src: BorrowStep1,
    description: "使用官方APP、網站註冊加入會員",
  },
  {
    id: "step2",
    title: "租借",
    src: BorrowStep2,
    description: "到YouBike站點使用APP租借單車",
  },
  {
    id: "step3",
    title: "騎乘",
    src: BorrowStep3,
    description: "微笑騎乘，快樂騎車",
  },
  {
    id: "step4",
    title: "還車",
    src: BorrowStep4,
    description: "到YouBike站點歸還單車",
  },
];

export default function BorrowSteps() {
  return (
    <div className="bg-white shadow-md mt-4 px-2 py-6">
      <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">YouBike2.0使用方法</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stepDatas.map((data) => {
          return (
            <BorrowStepsItem
              id={data.id}
              key={data.id}
              src={data.src}
              title={data.title}
              description={data.description}
            />
          );
        })}
      </div>
    </div>
  );
}
