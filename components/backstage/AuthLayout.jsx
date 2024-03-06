import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function AuthLayout(props) {
  const router = useRouter();
  const { route } = router;
  const { children } = props;
  const { data: session, status } = useSession();
  //   console.log(session);
  //   console.log(route);

  if (status === "loading") return <div>Loading</div>;
  if (status === "unauthenticated" && !route.includes("login")) {
    window.location.href = "/admin/login";
    // redirect("/admin/login");
    return;
  }

  return <div>{children}</div>;
}
