import BackStageLayout from "@/components/backstage/BackStageLayout";
import BackUserTable from "@/components/backstage/BackUserTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function MemberListPage() {
  const [subscribeList, setSubscribeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    fetch("/api/subscribe")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { subscribe } = data;
        // console.log(subscribe)
        setSubscribeList(subscribe);
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

  return (
    <BackStageLayout pageName="會員列表">
      <BackUserTable subscribeList={subscribeList} isLoading={isLoading} />
    </BackStageLayout>
  );
}
