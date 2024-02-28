import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackDefaultInput from "../input/BackDefaultInput";
import { useState } from "react";

export default function BackNewsForm() {
  const [newsData, setNewsData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  return (
    <form className="bg-white shadow-md px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        <BackDefaultInput
          label="活動標題"
          id="news-title"
          name="title"
          isRequired={true}
          inputValue={newsData.title}
          onInputChange={() =>
            setNewsData({ ...newDate, title: e.target.value })
          }
        />
        <BackDefaultInput
          label="活動副標題"
          id="news-subtitle"
          name="subtitle"
          isRequired={true}
          inputValue={newsData.subtitle}
          onInputChange={() =>
            setNewsData({ ...newDate, subtitle: e.target.value })
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
          rows="10"
          className="px-4 bg-transparent border-2 border-olive-100 rounded focus:outline-none focus:border-lime-100 resize-none"
          onInputChange={(e) =>
            setNewsData({ ...newsData, description: e.target.value })
          }
          required
        >
          {newsData.description}
        </textarea>
      </div>
      <div className="mt-2 mb-4">
        <div className="text-olive-100 text-lg font-semibold">活動日期</div>
        <DatePicker
          showIcon
          dateFormat="yyyy/MM/dd"
          locale="zh-TW"
          // isClearable={true}
          maxDate={new Date()}
          // placeholderText="選擇日期"
          selectsRange={true}
          startDate={newsData.startDate}
          endDate={newsData.endDate}
          onChange={(dates) => {
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
        isRequired={true}
        inputValue={newsData.image}
        onInputChange={() => setNewsData({ ...newDate, image: e.target.value })}
      />
    </form>
  );
}
