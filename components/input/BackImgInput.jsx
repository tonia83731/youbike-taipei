import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function BackImgInput(props) {
  const { label, id, name, fileName, isRequired, onInputChange } = props;
  return (
    <div className="flex flex-col mt-2 mb-4">
      <label className="text-olive-100 text-xl font-semibold">{label}</label>
      <label
        htmlFor={id}
        className="h-20 bg-transparent border-2 border-olive-100 rounded focus:outline-none focus:border-lime-100 cursor-pointer"
      >
        <input
          type="file"
          className="hidden"
          name={name}
          id={id}
          required={isRequired | false}
          accept=".jpg, .jpeg, .png"
          onChange={(e) => onInputChange(e)}
        />
        <span className="w-full h-full text-4xl text-lime-100 opacity-75 flex flex-col justify-center items-center">
          <FontAwesomeIcon icon={faImage} />
          <p className="text-sm">({fileName || "尚未選擇圖片"})</p>
        </span>
      </label>
    </div>
  );
}
