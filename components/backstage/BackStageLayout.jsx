import BackHeadSettings from "../head/BackHeadSettings";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "../loading/Loading";

export default function BackStageLayout(props) {
  const { pageName, children } = props;
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (status === "unauthenticated") router.replace("/admin/login");

  return (
    <>
      <BackHeadSettings pageName={pageName} />
      <section className="">
        <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
          {pageName}
        </h3>
        <div className="">{children}</div>
      </section>
    </>
  );
}
