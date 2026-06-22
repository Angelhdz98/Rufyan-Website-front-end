import { FormInputProps } from "./RegisterForm";
import classNames from "classnames";
function FormInput(props: FormInputProps) {
  return <div className={classNames(" flex flex-col", props.className)}>
    <label className={classNames("block text-sm font-medium text-gray-700 mb-2", props.labelClassname)}>
      {props.children}
    </label>
    <input
      min={0}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className={classNames(" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm")}
    />
  </div>
}


export default FormInput;