import BackStageLayout from "@/components/backstage/BackStageLayout";
import BackNewsForm from "@/components/backstage/BackNewsForm";
import BackNewsTable from "@/components/backstage/BackNewsTable";
// import dayjs from "dayjs";
import { useState, useEffect } from "react";

export default function NewsListPage() {
  const [newsList, setNewsList] = useState([]);
  // const currentDate = dayjs().format();
  const [editData, setEditData] = useState([])

  const handleNewsEdit = (id) => {
    // console.log(id)
    const newsData = newsList.find((data) => data._id === id)
    // console.log(newsData);
    setEditData([newsData]);
    // updateNewsData(newsData);
  }
  // const updateNewsData = (data) => {
  //   setNewsData(data);
  // };
  

  //  const handleNewsSubmit = (e) => {
  //    e.preventDefault();
  //    fetch("/api/news", {
  //      method: "POST",
  //      body: JSON.stringify(newsData),
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //    })
  //      .then((response) => response.json())
  //      .then((data) => console.log(data));
  //  };

  useEffect(() => {
    fetch("/api/news")
      .then((response) => response.json())
      .then((data) => {
        const { news } = data;
        // console.log(news)
        setNewsList(news);
      });
  }, []);

  return (
    <BackStageLayout pageName="消息列表">
      <div className="lg:grid lg:grid-cols-3 lg:gap-2 lg:mb-6">
        <div className="">
          <BackNewsForm editData={editData} />
        </div>
        <div className="mt-4 lg:mt-0 lg:col-span-2">
          <BackNewsTable newsList={newsList} onNewsEdit={handleNewsEdit} />
        </div>
      </div>
    </BackStageLayout>
  );
}
