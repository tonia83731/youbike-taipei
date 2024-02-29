import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function BackFeedbackTable(props) {
  const { commentList } = props;
  // console.log(commentList)
  const theadData = [
    "使用者",
    "使用者電話",
    "使用者Email",
    "使用者反饋",
    "刪除",
  ];

  const handleFeedbackDelete = (_id) => {
    console.log(_id)
    fetch("/api/comments", {
      method: "DELETE",
      body: JSON.stringify({ id: _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <table className="w-full mb-6">
      <thead>
        <tr className="bg-lime-100 text-white font-bold">
          {theadData.map((data, index) => {
            // console.log(index)
            return (
              <th
                className={`h-12 ${
                  index === 1 || index === 2 ? "hidden md:table-cell" : ""
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
        {commentList.map((data, index) => {
          // console.log(data)
          const { _id, name, email, phone, text } = data;
          return (
            <tr
              className={`h-16 ${
                index % 2 === 0 ? "bg-white " : "bg-slate-200"
              }`}
              key={_id}
            >
              <td className="px-2 text-center text-olive-100">{name}</td>
              <td className="hidden px-2 text-olive-100 md:table-cell">
                {phone}
              </td>
              <td className="hidden px-2 text-olive-100 md:table-cell">
                {email}
              </td>
              <td className="px-2 text-olive-100">{text}</td>
              <td className="px-2">
                <button
                  onClick={() => handleFeedbackDelete(_id)}
                  className="py-1 px-2 bg-mustard-100 text-white rounded-md"
                >
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
