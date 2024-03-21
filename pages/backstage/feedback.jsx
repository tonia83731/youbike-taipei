import BackFeedbackTable from "@/components/backstage/BackFeedbackTable";
import BackStageLayout from "@/components/backstage/BackStageLayout";
import { useToastContext } from "@/context/ToasterContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function FeedbackPage() {
  const { showToast } = useToastContext();
  const router = useRouter();
  const { status } = useSession();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        // console.log(data);
        showToast("刪除評論成功!", { type: "success" });
      }
    } catch (error) {
      console.log(error);
      showToast("刪除評論失敗!", { type: "error" });
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (status === "authenticated") {
      return;
    } else {
      router.push("/admin/login");
    }
  }, [status, router]);
  // console.log(comments)

  return (
    <BackStageLayout pageName="反饋列表">
      <BackFeedbackTable
        commentList={comments}
        isLoading={isLoading}
        onFeedbackDelete={handleFeedbackDelete}
      />
    </BackStageLayout>
  );
}
