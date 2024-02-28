import dayjs from "dayjs";

export default function BackNewsTable(props) {
  const { newsList, onNewsEdit } = props;
  // console.log(newsList)
  const theadData = ["活動時間", "活動標題", "活動內文", "更新時間", "其他"];
  return (
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
        {newsList.map((data, index) => {
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
              <td className="hidden px-2 text-olive-100 md:table-cell">
                {description}
              </td>
              <td className="hidden px-2 text-center text-olive-100 md:table-cell">
                {updateAt_date} <br/>{updateAt_time}
              </td>
              <td className="px-2 text-center text-olive-100 flex flex-col justify-center my-2">
                <button className="py-2 bg-lemon-100 text-white rounded-md" onClick={() => onNewsEdit(_id)}>
                  修改
                </button>
                <button className="py-2 bg-mustard-100 text-white rounded-md mt-1">
                  刪除
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
