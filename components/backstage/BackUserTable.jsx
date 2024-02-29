import dayjs from "dayjs";

export default function BackUserTable(props) {
  const { subscribeList } = props;
  // console.log(commentList)
  const theadData = ["編號", "使用者Email", "訂閱時間"];

  return (
    <table className="w-full mb-6">
      <thead>
        <tr className="bg-lime-100 text-white font-bold">
          {theadData.map((data, index) => {
            // console.log(index)
            return (
              <th className="h-12" key={data}>
                {data}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="text-xl">
        {subscribeList.map((data, index) => {
          // console.log(data)
          const { _id, email, createAt } = data;
          const createAt_date = dayjs(createAt).format("YYYY/MM/DD");
          const createAt_time = dayjs(createAt).format("HH:mm:ss");
          return (
            <tr
              className={`h-16 ${
                index % 2 === 0 ? "bg-white " : "bg-slate-200"
              }`}
              key={_id}
            >
              <td className="px-2 text-center text-olive-100">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </td>
              <td className="text-center px-2 text-olive-100">{email}</td>
              <td className="text-center px-2 text-olive-100">
                {createAt_date}
                <br /> {createAt_time}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
