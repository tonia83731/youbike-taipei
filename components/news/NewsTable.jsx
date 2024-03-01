import Link from "next/link";
import dayjs from "dayjs";

export default function NewsTable(props) {
  // const { title, subtitle, updateDate, startDate, endDate } = props;
  const { tbodyData } = props;
  const theadData = ["活動時間", "活動標題"];
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-lime-100 text-white font-bold">
          {theadData.map((data) => {
            return (
              <th className="h-12" key={data}>
                {data}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="text-xl">
        {tbodyData.map((data, index) => {
          const { _id, title, subtitle, updateAt, startDate, endDate } = data;
          const startAt = dayjs(startDate).format("YYYY/MM/DD");
          const endAt = dayjs(endDate).format("YYYY/MM/DD");
          const updateAt_date = dayjs(updateAt).format("YYYY/MM/DD");
          return (
            <tr
              className={`h-16 ${
                index % 2 === 0 ? "bg-white " : "bg-slate-200"
              }`}
              key={_id}
            >
              <td className="px-2 text-center text-olive-100 text-xl">
                <div className="">{startAt}</div>
                <div className="">~ {endAt}</div>
              </td>
              <td className="px-2 text-olive-100">
                <Link href={`/news/${_id}`}>
                  <div className="font-bold text-xl">{title}</div>
                  <div className="text-lime-xl text-base">{subtitle}</div>
                </Link>
                <div className="text-slate-400 text-base">
                  最後更新時間:{updateAt_date}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
