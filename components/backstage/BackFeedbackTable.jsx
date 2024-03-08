import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function BackFeedbackTable(props) {
  const { commentList, isLoading, onFeedbackDelete } = props;
  const [smallScreen, setSmallScreen] = useState(false);
  // console.log(commentList)
  const theadData = [
    "使用者",
    "使用者電話",
    "使用者Email",
    "使用者反饋",
    "刪除",
  ];

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        {isLoading ? (
          <tr>
            <td colSpan={smallScreen ? "3" : "5"}>
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
            </td>
          </tr>
        ) : (
          commentList.map((data, index) => {
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
                <td className="px-2 text-center">
                  <button
                    onClick={() => onFeedbackDelete(_id)}
                    className="py-1 px-2 bg-mustard-100 text-white rounded-md"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
