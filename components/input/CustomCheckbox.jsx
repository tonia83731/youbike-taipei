import classes from "./checkbox.module.css";

export default function CustomCheckbox(props) {
  const { id, name, label, isChecked, onCheckboxChange } = props;
  return (
    <div className={classes.wrapper}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="h-full"
        // value={inputValue | ""}
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <label htmlFor={id} className="h-full cursor-pointer font-medium text-lg">
        {label}
      </label>
      
    </div>
  );
}
