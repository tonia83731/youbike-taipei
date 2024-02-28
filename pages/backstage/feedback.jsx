import BackStageLayout from "@/components/backstage/BackStageLayout";
import { useState, useEffect } from "react";

export default function FeedbackPage() {
  // const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([]);
  const theadData = ["使用者", "使用者電話", "使用者Email", "使用者反饋"];

  useEffect(() => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, []);

  return (
    <BackStageLayout pageName="反饋列表">
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
          {comments.map((data, index) => {
            const { name, email, phone, comment } = data;
            return (
              <tr
                className={`h-16 bg-white`}
                key={index}
                // ${index % 2 === 0 ? "bg-white " : "bg-slate-200"}
                // key={data.sno}
              >
                <td className="px-2 text-center text-olive-100">{name}</td>
                <td className="hidden px-2 text-olive-100 md:table-cell">
                  {phone}
                </td>
                <td className="hidden px-2 text-olive-100 md:table-cell">
                  {email}
                </td>
                <td className="px-2 text-olive-100">{comment}</td>
              </tr>
            );
          })}
          {/* {tbodyData.map((data, index) => {
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
          })} */}
        </tbody>
      </table>
    </BackStageLayout>
  );
}

// export async function getStaticProps () {
//   // const res = fetch('/api/comments')
//   // const data = res.json()
//   // console.log(data)

//   // return {
//   //   props: {
//   //     comments: data
//   //   }
//   // }
// }
