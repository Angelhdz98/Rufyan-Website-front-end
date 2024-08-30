import { Fragment } from "react/jsx-runtime";
import classNames from "classnames";

export interface CheckFormInputProps  {
    type: string;
    name: string;
    checked: boolean;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    className?: string;
    labelClassname?:string;
    children:string;
    value:string;


}
function CheckFormInput({type, name, checked, className, children, labelClassname, onChange}:CheckFormInputProps){
    return <Fragment >
    <label className={classNames("block text-gray-700", labelClassname,{})}>{children}</label>
    <input
      type={type}
      name={name} 
      checked={checked}
      onChange={onChange}
    
      //onChange={onChange}
      className={classNames("w-full max p-2 border  border-gray-300 rounded mt-1 h-8", className,{})}
    />
  </Fragment> 
}


export default CheckFormInput;