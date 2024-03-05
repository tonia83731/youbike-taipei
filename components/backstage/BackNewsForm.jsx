import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackDefaultInput from "../input/BackDefaultInput";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomCheckbox from "../input/CustomCheckbox";

export default function BackNewsForm(props) {
  const { newsData, formStatus, noLimit, onNoLimitCheckboxChange, onDateChange, onFormInputChange, onCancelEdit, onNewsSubmit } = props;
  // console.log(editData)
  // const currentDate = dayjs().format();
  // const [newsData, setNewsData] = useState({
  //   title: "",
  //   subtitle: "",
  //   description: "",
  //   image: "",
  //   startDate: currentDate,
  //   endDate: currentDate,
  // });
  // const [formStatus, setFormStatus] = useState("add");
  // const [noLimit, setNoLimit] = useState(false);

  // const handleCancelEdit = () => {
  //   setFormStatus("add");
  //   setNewsData({
  //     title: "",
  //     subtitle: "",
  //     description: "",
  //     image: "",
  //     startDate: currentDate,
  //     endDate: currentDate,
  //   });
  // };

  // const handleNewsSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formStatus === "add") {
  //     try {
  //       const response = await fetch("/api/news", {
  //         method: "POST",
  //         body: JSON.stringify(newsData),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setNewsData({
  //           title: "",
  //           subtitle: "",
  //           description: "",
  //           image: "",
  //           startDate: currentDate,
  //           endDate: currentDate,
  //         });
  //         // add flash here
  //         const { message } = data;
  //         console.log(message)
  //         await fetch("/api/news")
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   if (formStatus === "edit") {
  //     const response = await fetch("/api/news", {
  //       method: "PUT",
  //       body: JSON.stringify(newsData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       try {
  //         const data = await response.json();
  //         setNewsData({
  //           title: "",
  //           subtitle: "",
  //           description: "",
  //           image: "",
  //           startDate: currentDate,
  //           endDate: currentDate,
  //         });
  //         // add flash here
  //         const { message } = data;
  //         console.log(message)
  //         await fetch("/api/news")
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (editData.length > 0) {
  //     setFormStatus("edit");
  //     setNewsData(editData[0]);
  //   } else {
  //     setFormStatus("add");
  //   }
  // }, [editData]);

  // useEffect(() => {
  //   // console.log(noLimit)
  //   const noLimitDate = dayjs("9999-12-30").format("YYYY/MM/DD");
  //   if (noLimit) {
  //     setNewsData({
  //       ...newsData,
  //       startDate: currentDate,
  //       endDate: noLimitDate,
  //     });
  //   }
  // }, [noLimit, currentDate, newsData]);

  return (
    <form className="bg-white shadow-md px-4 py-6 mb-6" onSubmit={(e) => onNewsSubmit(e)}>
      <div className="grid grid-cols-2 gap-4">
        <BackDefaultInput
          label="活動標題"
          id="news-title"
          name="title"
          // isRequired={true}
          inputValue={newsData.title}
          onInputChange={(e) => onFormInputChange(e)}
        />
        <BackDefaultInput
          label="活動副標題"
          id="news-subtitle"
          name="subtitle"
          // isRequired={true}
          inputValue={newsData.subtitle}
          onInputChange={(e) => onFormInputChange(e)}
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
          onChange={(e) => onFormInputChange(e)}
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
          onCheckboxChange={onNoLimitCheckboxChange}
        />
        <DatePicker
          showIcon
          showMonthDropdown
          showYearDropdown
          dateFormat="yyyy/MM/dd"
          locale="zh-TW"
          minDate={new Date()}
          selectsRange={true}
          startDate={newsData.startDate}
          endDate={newsData.endDate}
          onChange={(dates) => onDateChange(dates)}
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
        // onInputChange={(e) =>
        //   setNewsData({ ...newsData, image: e.target.value })
        // }
      />
      <div className="flex justify-end">
        {formStatus !== "add" ? (
          <button
            type="button"
            className="w-1/4 py-2 mt-4 mr-2 bg-slate-200 text-white rounded-md"
            onClick={onCancelEdit}
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
