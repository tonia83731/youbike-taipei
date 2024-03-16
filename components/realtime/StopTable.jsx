import { getName } from "@/helpers/handleName";
import Link from "next/link";

export default function StopTable(props) {
  const { screenWidth, theadData, tbodyData, totalPage } = props;

  // console.log(totalPage)

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-lime-100 text-white font-bold">
          {theadData.map((data, index) => {
            return (
              <th
                className={`h-12 ${
                  index === 2 && screenWidth.width < 900 ? "hidden" : ""
                }`}
                key={data}
              >
                {data}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="text-xl">
        {totalPage === 0 ? (
          <tr className="h-16 bg-white">
            <td
              className="px-2 text-center text-olive-100"
              colSpan={screenWidth.width < 900 ? 3 : 4}
            >
              沒有任何資訊
            </td>
          </tr>
        ) : (
          tbodyData.map((data, index) => {
            const name = getName(data.sna);
            return (
              <tr
                className={`h-16 ${
                  index % 2 === 0 ? "bg-white " : "bg-slate-200"
                }`}
                key={data.sno}
              >
                <td className="px-2 text-center text-olive-100">
                  {data.sarea}
                </td>
                <td className="px-2 text-olive-100">
                  <Link href={`/realtime/${data.sno}`}>{name}</Link>
                </td>
                <td className="hidden px-2 text-center text-mustard-100 font-bold 900:h-16 900:flex 900:justify-center 900:items-center">
                  {data.tot}
                </td>
                <td className="px-2 text-center text-mustard-100 font-bold">
                  {data.sbi}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
