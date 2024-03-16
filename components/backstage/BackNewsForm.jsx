import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackDefaultInput from "../input/BackDefaultInput";
import BackImgInput from "../input/BackImgInput";
import CustomCheckbox from "../input/CustomCheckbox";

export default function BackNewsForm(props) {
  const {
    newsData,
    formStatus,
    fileName,
    noLimit,
    onNoLimitCheckboxChange,
    onDateChange,
    onFormInputChange,
    onFileUpload,
    onCancelEdit,
    onNewsSubmit,
  } = props;

  return (
    <form
      className="bg-white shadow-md px-4 py-6 mb-6"
      onSubmit={(e) => onNewsSubmit(e)}
    >
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
      <BackImgInput
        label="活動圖片"
        id="news-image"
        name="image"
        fileName={newsData.imageName}
        onInputChange={(e) => onFileUpload(e)}
      />
      {/* <BackDefaultInput
        label="活動圖片"
        id="news-image"
        name="image"
        type="url"
        // isRequired={true}
        inputValue={newsData.image}
        // onInputChange={(e) =>
        //   setNewsData({ ...newsData, image: e.target.value })
        // }
      /> */}
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
