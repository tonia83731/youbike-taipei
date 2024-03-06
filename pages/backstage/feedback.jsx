import BackFeedbackTable from "@/components/backstage/BackFeedbackTable";
import BackStageLayout from "@/components/backstage/BackStageLayout";
import { useState, useEffect } from "react";
import AuthLayout from "@/components/backstage/AuthLayout";

export default function FeedbackPage() {
  const [comments, setComments] = useState([]);

  const handleFeedbackDelete = async (_id) => {
    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ id: _id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const filterComments = comments.filter((data) => data._id !== _id);
        setComments(filterComments);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <AuthLayout>
      <BackStageLayout pageName="反饋列表">
        <BackFeedbackTable
          commentList={comments}
          onFeedbackDelete={handleFeedbackDelete}
        />
      </BackStageLayout>
    </AuthLayout>
  );
}
