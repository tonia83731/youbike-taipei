import { useSession } from "next-auth/react";

export default function AuthLayout(props) {
  const { children } = props;
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") return <div>Loading</div>;
  if (status === "unauthenticated") window.location.href = "/admin/login";

  return <div>{children}</div>;
}
