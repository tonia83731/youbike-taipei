import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthLayout(props) {
  const router = useRouter();
  const { route } = router;
  const { children } = props;
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading</div>;
  if (status === "unauthenticated" && !route.includes("login")) {
    window.location.href = "/admin/login";
    return;
  }

  return <div>{children}</div>;
}
