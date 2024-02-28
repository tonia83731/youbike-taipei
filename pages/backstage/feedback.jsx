import BackFeedbackTable from "@/components/backstage/BackFeedbackTable";
import BackStageLayout from "@/components/backstage/BackStageLayout";
import { useState, useEffect } from "react";

export default function FeedbackPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { comments } = data;
        // console.log(comments)
        setComments(comments);
      });
  }, []);

  // console.log(comments)

  return (
    <BackStageLayout pageName="反饋列表">
      <BackFeedbackTable commentList={comments} />
    </BackStageLayout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("/api/comments");
//   const data = res.json();
//   const comments = data.comments;
//   console.log(comments);
//   return {
//     props: {
//       comments: comments,
//     },
//   };
// }
