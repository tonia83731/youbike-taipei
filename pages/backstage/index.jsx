import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function BackstageHome() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") router.replace("/backstage/news-list");
  else router.replace("/admin/login");
}
