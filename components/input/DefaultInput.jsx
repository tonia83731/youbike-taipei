export default function DefaultInput(props) {
  const { label, id, name, type, pattern, isRequired, inputValue, onInputChange } = props;
  return (
    <div className="flex flex-col mt-2 mb-4">
      <label htmlFor={id} className="text-olive-100 text-xl font-semibold">
        {label}
      </label>
      <input
        type={type | "text"}
        className="h-8 px-4 bg-transparent border-b-[3px] border-olive-100 focus:outline-none focus:border-lime-100"
        name={name}
        id={id}
        // pattern={pattern | ""}
        required={isRequired | false}
        value={inputValue}
        onChange={(e) => onInputChange(e)}
      />
    </div>
  );
}
