import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageSwiper from "../../components/ImageSwiper";
import { isPainting } from "../../hooks/isPainting";
import { AppDispatch, RootState } from "../../store";
import { fetchProductById, RequestParams } from "../../store/thunks/fetchProductById";
import { Painting } from "../../types/typesIndex";
import OriginalSelector from "./OriginalSelector";




function ProductPage() {
    const { category, id } = useParams<{ category?: string, id?: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading, error } = useSelector((state: RootState) => state.singleProduct);


    const painting = data[0] as Painting;

    const renderedProperties = () => {

        if (isPainting(data[0])) {
            return <div className=" flex flex-col w-full px-4">
                <div className="flex flex-row">
                    <span className="font-semibold">Medium</span>
                    <span>{": " + painting.productDomainDetails.medium}</span>
                </div>
                <div className="flex flex-row">
                    <span className="font-semibold">Support material </span>
                    <span>{": " + painting.productDomainDetails.supportMaterial}</span>
                </div>
                <div className="flex flex-row">
                    <span className="font-semibold">Available copies </span>
                    <span>{": " + painting.productStock.availableCopies}/{painting.productStock.copiesMade}</span>
                </div>
                <div className="flex flex-row">
                    <span className="font-semibold">Measures </span>
                    <span>{": Height: " + painting.productDomainDetails.alturaCm + "cm Length: " + painting.productDomainDetails.largoCm + "cm"}</span>
                </div>
            </div>
        }
        return <div> Is other thing</div>
    }



    useEffect(() => {


        const request: RequestParams = { category: category as string, id: Number(id) };
        dispatch(fetchProductById(request));
        console.log("se hace el fetch category: ", category, " id: ", id);

    }, [dispatch]);

    if (isLoading) {
        return <div>Is loading. . . </div>
    }

    else if (error) {
        return <div> {error.toString()}</div>

    }
    console.log("data ", data[0])
    if (!isLoading && error == null && data[0]) {
        return <div className="main-body w-full flex flex-col md:flex-row  md_gap-4 p-4 py-4 h-fit">
            <div className="first-column md:w-4/12 h-fit">


                <ImageSwiper product={data[0]} title={data[0].name} />
                <div className="p-2">
                    <div>
                        <span className="font-semibold">
                            Description:
                        </span>
                        {" " + data[0].description}
                    </div>
                    <div>
                        <span className="font-semibold">
                            Category:
                        </span>
                        {" " + data[0].productTypeEnum.toString()}
                    </div>
                </div>


            </div>
            <div className="second-column   md:w-8/12 ">
                <div>
                    <OriginalSelector />


                </div>

                {renderedProperties()}


            </div>
        </div>

    }








}

export default ProductPage;