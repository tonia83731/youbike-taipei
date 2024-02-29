import BackStageLayout from "@/components/backstage/BackStageLayout";
import BackUserTable from "@/components/backstage/BackUserTable";
import { useEffect, useState } from "react";

export default function MemberListPage() {
  const [subscribeList, setSubscribeList] = useState([]);

  useEffect(() => {
    fetch("/api/subscribe")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const { subscribe } = data;
        // console.log(subscribe)
        setSubscribeList(subscribe);
      });
  },[]);
  return (
    <BackStageLayout pageName="會員列表">
      <BackUserTable subscribeList={subscribeList} />
    </BackStageLayout>
  );
}
