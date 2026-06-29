import { useContext } from "react";
import FormInput from "./FormInput";
import { ProductsEditingContext } from "../pages/ControlPanel/useEditProductsContext";


function PageSelector() {

    const productContext = useContext(ProductsEditingContext);

    const onChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value, type } = e.target;
        if (type === "number") {
            const parsedNumber = parseInt(value);
            console.log("Es number");
            productContext?.setPageNumber(parsedNumber);
        } else {
            console.log("no es number")
        }

    };

    return <div className=" flex flex-row items-center " >
        <span>Page</span>
        <FormInput type="number" className=" w-[65px]  " value={productContext?.pageNumber ? productContext.pageNumber.toString() : "1"} name="pageNumber" onChange={onChangePage}>

        </FormInput>
        / {productContext?.totalPages ? productContext.totalPages : 10}
    </div>
}


export default PageSelector;