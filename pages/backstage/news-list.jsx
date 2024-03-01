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

  const handleNewsDelete = async (_id) => {
    try {
      const response = await fetch("/api/news", {
        method: "DELETE",
        body: JSON.stringify({ id: _id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response)
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        const filterNewsList = newsList.filter((data) => data._id 
        !== _id)
        setNewsList(filterNewsList)

        const { message } = data;
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
    const getNewsDataAsync = async () => {
      try {
        const response = await fetch("/api/news");
        if(response.ok) {
          const data = await response.json()
          const {news} = data
          // console.log(news)
          setNewsList(news);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getNewsDataAsync()
  }, []);

  return (
    <BackStageLayout pageName="消息列表">
      <div className="xl:grid xl:grid-cols-3 xl:gap-2 xl:mb-6">
        <div className="relative h-full w-full">
          <div className="xl:fixed xl:w-[29%] xl:max-w-[420px]">
            <BackNewsForm editData={editData} />
          </div>
        </div>
        <div className="mt-4 xl:mt-0 xl:col-span-2">
          <BackNewsTable
            newsList={newsList}
            onNewsEdit={handleNewsEdit}
            onNewsDelete={handleNewsDelete}
          />
        </div>
      </div>
    </BackStageLayout>
  );
}
