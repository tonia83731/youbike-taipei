import classes from "./checkbox.module.css";

export default function CustomCheckbox(props) {
  const { id, name, label, inputValue, handleCheckboxChange } = props;
  return (
    <div className={classes.wrapper}>
      <input type="checkbox" id={id} name={name} className="h-full" />
      <label
        htmlFor={id}
        className="h-full cursor-pointer font-medium text-lg"
      >
        {label}
      </label>
    </div>
  );
}
