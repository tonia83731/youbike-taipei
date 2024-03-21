import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "@/components/loading/Loading";

export default function BackstageHome() {
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/backstage/news-list";
    } else {
      window.location.href = "/admin/login";
    }
  }, [status]);
  return (
    <div>
      <Loading />
    </div>
  );
}
