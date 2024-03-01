import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackDefaultInput from "../input/BackDefaultInput";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomCheckbox from "../input/CustomCheckbox";

export default function BackNewsForm(props) {
  const { editData } = props;
  // console.log(editData)
  const currentDate = dayjs().format();
  const [newsData, setNewsData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    startDate: currentDate,
    endDate: currentDate,
  });
  const [formStatus, setFormStatus] = useState("add");
  const [noLimit, setNoLimit] = useState(false)

  const handleCancelEdit = () => {
    setFormStatus("add")
    setNewsData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      startDate: currentDate,
      endDate: currentDate,
    });
  }

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if(formStatus === 'add') {
      fetch("/api/news", {
        method: "POST",
        body: JSON.stringify(newsData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    if(formStatus === 'edit') {
      fetch("/api/news", {
        method: "PUT",
        body: JSON.stringify(newsData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  useEffect(() => {
    if (editData.length > 0) {
      setFormStatus("edit");
      setNewsData(editData[0]);
    } else {
      setFormStatus("add");
    }
  }, [editData]);

  useEffect(() => {
    // console.log(noLimit)
    const noLimitDate = dayjs("9999-12-30").format("YYYY/MM/DD");
    if(noLimit) {
      setNewsData({
        ...newsData,
        startDate: currentDate,
        endDate: noLimitDate,
      });
    }
  }, [noLimit])

  // console.log(noLimit)

  return (
    <form className="bg-white shadow-md px-4 py-6" onSubmit={handleNewsSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <BackDefaultInput
          label="活動標題"
          id="news-title"
          name="title"
          // isRequired={true}
          inputValue={newsData.title}
          onInputChange={(e) =>
            setNewsData({ ...newsData, title: e.target.value })
          }
        />
        <BackDefaultInput
          label="活動副標題"
          id="news-subtitle"
          name="subtitle"
          // isRequired={true}
          inputValue={newsData.subtitle}
          onInputChange={(e) =>
            setNewsData({ ...newsData, subtitle: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col mt-2 mb-4">
        <label
          htmlFor="contact-text"
          className="text-olive-100 text-lg font-semibold"
        >
          活動內容
        </label>
        <textarea
          name="description"
          id="news-description"
          cols="30"
          rows="4"
          className="px-4 bg-transparent border-2 border-olive-100 rounded focus:outline-none focus:border-lime-100 resize-none"
          value={newsData.description}
          onChange={(e) =>
            setNewsData({ ...newsData, description: e.target.value })
          }
          // required
        />
      </div>
      <div className="mt-2 mb-4">
        <div className="text-olive-100 text-lg font-semibold">活動日期</div>
        <CustomCheckbox
          id="date-no-limit"
          name="date"
          label="無限期"
          isChecked={noLimit}
          onCheckboxChange={() => {
            setNoLimit(!noLimit)
          }}
        />
        <DatePicker
          showIcon
          dateFormat="yyyy/MM/dd"
          locale="zh-TW"
          // isClearable={true}
          minDate={new Date()}
          // placeholderText="選擇日期"
          selectsRange={true}
          startDate={newsData.startDate}
          endDate={newsData.endDate}
          onChange={(dates) => {
            setNoLimit(false)
            setNewsData({
              ...newsData,
              startDate: dates[0],
              endDate: dates[1],
            });
          }}
          className="w-full h-8 bg-transparent border-2 border-olive-100 rounded px-4 placeholder:text-slate-300 focus:shadow-outline focus:outline-none focus:border-lime-100"
          wrapperClassName="w-full"
        />
      </div>
      <BackDefaultInput
        label="活動圖片"
        id="news-image"
        name="image"
        type="url"
        // isRequired={true}
        inputValue={newsData.image}
        onInputChange={(e) =>
          setNewsData({ ...newsData, image: e.target.value })
        }
      />
      <div className="flex justify-end">
        {formStatus !== "add" ? (
          <button
            type="button"
            className="w-1/4 py-2 mt-4 mr-2 bg-slate-200 text-white rounded-md"
            onClick={handleCancelEdit}
          >
            取消
          </button>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className="w-1/4 py-2 mt-4 bg-lime-100 text-white rounded-md"
        >
          {formStatus === "add" ? "新增" : "修改"}
        </button>
      </div>
    </form>
  );
}
