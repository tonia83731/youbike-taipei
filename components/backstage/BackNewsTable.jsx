import dayjs from "dayjs";
import Pagination from "../realtime/Pagination";
import { useState } from "react";

export default function BackNewsTable(props) {
  const { newsList, onNewsEdit, onNewsDelete } = props;
  const [currentPage, setCurrentPage] = useState(1)
  // console.log(newsList)
  const theadData = ["活動時間", "活動標題", "活動內文", "更新時間", "其他"];

  const perPage = 10
  const length = newsList?.length
  const show_page = 5;
  const numPage = Math.ceil(length / perPage);
  const numArray = Array.from({ length: numPage }, (_, index) => index + 1);
  const showNumArray =
    currentPage < 3
      ? numArray.slice(0, 5)
      : currentPage > numPage - 2
      ? numArray.slice(numPage - show_page, numPage)
      : numArray.slice(currentPage - 3, currentPage + 2);
  
  const firstIndex = (currentPage - 1) * perPage;
  const lastIndex = currentPage * perPage;
  const showList = newsList.slice(firstIndex, lastIndex)
  const handlePageClick = (event) => {
    const id = event.target.closest("button").id;
    if (currentPage > 1 && id === "first-btn") setCurrentPage(1);
    else if (currentPage > 1 && id === "prev-btn")
      setCurrentPage(currentPage - 1);
    else if (currentPage < numPage && id === "last-btn")
      setCurrentPage(numPage);
    else if (currentPage < numPage && id === "next-btn")
      setCurrentPage(currentPage + 1);
    else setCurrentPage(+id);
  };

  return (
    <>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-lime-100 text-white font-bold">
            {theadData.map((data, index) => {
              // console.log(index)
              return (
                <th
                  className={`h-12 ${
                    index === 2 || index === 3 ? "hidden md:table-cell" : ""
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
          {showList.map((data, index) => {
            // console.log(data);
            const {
              _id,
              title,
              subtitle,
              description,
              startDate,
              endDate,
              updateAt,
            } = data;

            const startAt = dayjs(startDate).format("YYYY/MM/DD");
            const endAt = dayjs(endDate).format("YYYY/MM/DD");
            const updateAt_date = dayjs(updateAt).format("YYYY/MM/DD");
            const updateAt_time = dayjs(updateAt).format("HH:mm:ss");
            return (
              <tr
                className={`h-16 ${
                  index % 2 === 0 ? "bg-white " : "bg-slate-200"
                }`}
                key={_id}
              >
                <td className="px-2 text-center text-olive-100">
                  {startAt}
                  <br />~{endAt}
                </td>
                <td className="px-2 text-olive-100">
                  <div className="font-bold text-xl">{title}</div>
                  <div className="text-lg">{subtitle}</div>
                </td>
                <td className="w-60 hidden px-2 text-olive-100 md:table-cell">
                  {description}
                </td>
                <td className="hidden px-2 text-center text-olive-100 md:table-cell">
                  {updateAt_date} <br />
                  {updateAt_time}
                </td>
                <td className="px-2 text-center text-olive-100">
                  <div className="grid grid-rows-2 gap-2 lg:grid-rows-1 lg:grid-cols-2">
                    <button
                    className="py-2 px-6 bg-lemon-100 text-white rounded-md"
                    onClick={() => onNewsEdit(_id)}
                  >
                    修改
                  </button>
                  <button
                    className="py-2 px-6 bg-mustard-100 text-white rounded-md"
                    onClick={() => onNewsDelete(_id)}
                  >
                    刪除
                  </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mb-6">
        <Pagination
        pages={showNumArray}
        currentPage={currentPage}
        totalPage={numPage}
        onPageClick={handlePageClick}
      />
      </div>
    </>
  );
}
