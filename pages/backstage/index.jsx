import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "@/components/loading/Loading";

export default function BackstageHome() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") router.replace("/backstage/news-list");
    else router.replace("/admin/login");
  }, [status, router]);
  return (
    <div>
      <Loading />
    </div>
  );
}
