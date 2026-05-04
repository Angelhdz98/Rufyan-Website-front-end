//import { Fragment } from "react/jsx-runtime";
import classNames from "classnames";

export interface CheckFormInputProps {
  type: string;
  name: string;
  checked: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassname?: string;
  children: string;
  value: string;


}
function CheckFormInput(props: CheckFormInputProps) {
  return <div className={classNames("flex flex-col w-full h-fit", props.className)}>
    <label className={classNames("block text-gray-700 text-sm font-medium mb-2", props.labelClassname)}>
      {props.children}
    </label>
    <input
      type={props.type}
      name={props.name}
      checked={props.checked}
      onChange={props.onChange}
      className={classNames("w-6 h-6 border border-gray-300 rounded cursor-pointer")}
    />
  </div>
}


export default CheckFormInput;