import BackStageLayout from "@/components/backstage/BackStageLayout";
import BackNewsForm from "@/components/backstage/BackNewsForm";
import BackNewsTable from "@/components/backstage/BackNewsTable";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useToastContext } from "@/context/ToasterContext";
import { convertToBase64 } from "@/helpers/convertToBase64";

export default function NewsListPage() {
  const { showToast } = useToastContext();
  const [newsList, setNewsList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [newsFormToggle, setNewsFormToggle] = useState(false);

  const currentDate = dayjs().format();
  const [newsData, setNewsData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    startDate: currentDate,
    endDate: currentDate,
  });

  const [fileName, setFileName] = useState("");
  const [formStatus, setFormStatus] = useState("add");
  const [noLimit, setNoLimit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCancelEdit = () => {
    setFormStatus("add");
    setNewsData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      startDate: currentDate,
      endDate: currentDate,
    });
    setFileName("");
    setNewsFormToggle(false);
  };

  const handleFormInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewsData({ ...newsData, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setFileName(file.name);
    setNewsData({ ...newsData, image: base64 });
  };

  const updateNewsList = async () => {
    try {
      const updatedListResponse = await fetch("/api/news");
      if (updatedListResponse.ok) {
        const updatedData = await updatedListResponse.json();
        const { news } = updatedData;
        setNewsList(news);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === "add") {
      try {
        const response = await fetch("/api/news", {
          method: "POST",
          body: JSON.stringify(newsData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNewsData({
            title: "",
            subtitle: "",
            description: "",
            image: "",
            startDate: currentDate,
            endDate: currentDate,
          });
          setFileName("");
          await updateNewsList();
          setNewsFormToggle(false);
          setFormStatus("add");
          // add flash here
          showToast("新增最新消息項目成功!", { type: "success" });
          const { message } = data;
          console.log(message);
        }
      } catch (error) {
        console.log(error);
        showToast("新增最新消息項目失敗!", { type: "error" });
      }
    }
    if (formStatus === "edit") {
      const response = await fetch("/api/news", {
        method: "PUT",
        body: JSON.stringify(newsData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        try {
          const data = await response.json();
          setNewsData({
            title: "",
            subtitle: "",
            description: "",
            image: "",
            startDate: currentDate,
            endDate: currentDate,
          });
          setFileName("");
          await updateNewsList();
          setNewsFormToggle(false);
          setFormStatus("add");
          // add flash here
          const { message } = data;
          console.log(message);
          showToast("最新消息項目已成功更新!", { type: "success" });
          await fetch("/api/news");
        } catch (error) {
          console.log(error);
          showToast("最新消息項目更新失敗!", { type: "error" });
        }
      }
    }
  };

  const handleNewsEdit = (id) => {
    // console.log(id)
    if (id) {
      setFormStatus("edit");
      setNewsFormToggle(true);
      const newsObj = newsList.find((data) => data._id === id);
      setNewsData(newsObj);
      if (newsObj.image !== "") {
        setFileName(newsObj.title + ".jpg/.png");
      } else {
        setFileName("");
      }
    }
  };

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
        const filterNewsList = newsList.filter((data) => data._id !== _id);
        setNewsList(filterNewsList);

        const { message } = data;
        console.log(message);
        showToast("成功刪除最新消息項目!", { type: "success" });
      }
    } catch (error) {
      console.log(error);
      showToast("刪除最新消息項目失敗!", { type: "error" });
    }
  };
  const handleSearchClick = () => {
    const filterList = newsList.filter(
      (data) =>
        data.title.includes(inputValue) |
        data.subtitle.includes(inputValue) |
        data.description.includes(inputValue)
    );
    setNewsList(filterList);
  };

  useEffect(() => {
    const getNewsDataAsync = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          const { news } = data;
          setNewsList(news);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewsDataAsync();
  }, []);
  useEffect(() => {
    // console.log(noLimit)
    const noLimitDate = dayjs("9999-12-30").format("YYYY/MM/DD");
    if (noLimit) {
      setNewsData({
        ...newsData,
        startDate: currentDate,
        endDate: noLimitDate,
      });
    }
  }, []);

  return (
    <BackStageLayout pageName="消息列表">
      <div className="">
        <div className="h-full w-full">
          <div className="">
            {/* search box */}
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-4 grid grid-cols-5 mb-2">
                <input
                  type="email"
                  className="w-full h-8 px-4 col-span-4 bg-white border border-olive-100 border-r-0 rounded-l-md focus:outline-none focus:border-lime-100 placeholder:text-base"
                  name="email"
                  id="subscribe-email"
                  required={true}
                  placeholder="請輸入關鍵字搜尋"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  className="h-8 px-2 bg-olive-100 text-white rounded-r-md lg:text-lg"
                  onClick={handleSearchClick}
                >
                  搜尋
                </button>
              </div>
              <button
                className="h-8 px-2 bg-lime-100 text-white rounded-md lg:text-lg"
                onClick={() => setNewsFormToggle(!newsFormToggle)}
              >
                {newsFormToggle ? "隱藏表單" : "顯示表單"}
              </button>
            </div>
            {newsFormToggle && (
              <BackNewsForm
                // editData={editData}
                fileName={fileName}
                newsData={newsData}
                formStatus={formStatus}
                noLimit={noLimit}
                onNoLimitCheckboxChange={() => {
                  setNoLimit(!noLimit);
                  const noLimitDate = dayjs("9999-12-30").format("YYYY/MM/DD");
                  if (!noLimit === true) {
                    setNewsData({
                      ...newsData,
                      startDate: currentDate,
                      endDate: noLimitDate,
                    });
                  }
                }}
                onDateChange={(dates) => {
                  console.log(dates);
                  setNoLimit(false);
                  setNewsData({
                    ...newsData,
                    startDate: dates[0],
                    endDate: dates[1],
                  });
                }}
                onFormInputChange={handleFormInputChange}
                onFileUpload={handleFileUpload}
                onCancelEdit={handleCancelEdit}
                onNewsSubmit={handleNewsSubmit}
              />
            )}
          </div>
        </div>
        <div className="mt-4 xl:mt-0 xl:col-span-2">
          <BackNewsTable
            newsList={newsList}
            onNewsEdit={handleNewsEdit}
            onNewsDelete={handleNewsDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
    </BackStageLayout>
  );
}
