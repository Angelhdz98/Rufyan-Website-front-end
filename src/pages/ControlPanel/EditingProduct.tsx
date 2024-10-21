import { HTMLAttributes, useEffect } from "react";
import { isPainting } from "../../hooks/isPainting";
import { Product } from "../../types/typesIndex";
import FormInput from "../../components/FormInput";
import CheckFormInput from "../../components/CheckFormInput";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, updateForm } from "../../store";
import { useDispatch } from "react-redux";
import { PaintingFormProps } from "./AddPaintingForm";
import Button from "../../components/Button";


export interface EditingProductProps extends HTMLAttributes<HTMLDivElement> {
product: Product;
}
// Cambiar los datos para que cumpla con un producto normal.
function EditingProduct({product, ...rest}:EditingProductProps){

    useEffect(()=>{
        updateForm(product);
    },[]);

    const formData= useSelector((state: RootState)=>{
        return state.formPainting.data 
      } );

      const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    dispatch(updateForm({...formData, [name]:value}));
  };
  const toggleValueHandler = (field: keyof PaintingFormProps) => {
    dispatch(updateForm({ ...formData, [field]: !formData[field] }));
  };
    
  const stringOriginalAvailable = formData.original_available ? "true" : "false";
  const stringFavorite = formData.favorite ? "true" : "false";
  return <form onSubmit={addProductHandler} className="flex flex-col m-6 " encType="multipart/form-data">
    <div className="flex flex-row flex-gow  gap-6">
    <div className="leftColumn flex flex-col w-1/2 ">
      <FormInput type={"text"} name={"name"}
        value={formData.name}
        onChange={handleChange}>
        Titulo
      </FormInput>

      <FormInput type={"number"} name={"price"}
        value={formData.price.toString()}
        onChange={handleChange}>
        Precio original
      </FormInput>

      <FormInput type={"text"} name={"description"}
        value={formData.description}
        onChange={handleChange}>
        Descripción
      </FormInput>

      <FormInput type={"text"} name={"category"}
        value={formData.category.category}
        onChange={handleChange}>
        Estilo
      </FormInput>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"altura_cm"}
            value={formData.altura_cm.toString()}
            onChange={handleChange}>
            Alto
          </FormInput>
        </div>


        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"largo_cm"}
            value={formData.largo_cm.toString()}
            onChange={handleChange}>
            Ancho
          </FormInput>
        </div>

      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <FormInput type={"number"} name={"available_copies"}
            value={formData.available_copies.toString()}
            onChange={handleChange}>
            Copias disponibles
          </FormInput></div>

        <div className="flex flex-col w-1/2"><FormInput type={"number"} 
          name={"copies_made"}
          value={formData.copies_made.toString()}
          onChange={handleChange}>
          Copias realizadas
        </FormInput>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-4/5">
          <FormInput type={"number"} name={"price_copy"}
            value={formData.price_copy.toString()}
            onChange={handleChange}>
            Precio por copia
          </FormInput>
        </div>

        <div className="flex flex-col items-center w-full ">

          <div className="flex flex-row w-4/5 items-center">

            <CheckFormInput type={"checkbox"} name={"original_available"}
              checked={formData.original_available}
              value={stringOriginalAvailable}
              onChange={() => toggleValueHandler("original_available")}
              labelClassname="w-full"
            >
              Original disponible
            </CheckFormInput>

          </div>
          <div className="flex flex-row w-4/5 items-center">
            <CheckFormInput type={"checkbox"} name={"favorite"}
              checked={formData.favorite}
              value={stringFavorite}

              onChange={() => toggleValueHandler("favorite")}
              labelClassname="w-full"
            >
              Favorita(o)
            </CheckFormInput>
          </div>

        </div>
      </div>






    </div>

    <div className="rightColumn flex flex-col w-1/2">
      <FormInput type={"text"} name={"support_material"}
        value={formData.support_material}
        onChange={handleChange}>
        Material de soporte
      </FormInput>

      <FormInput type={"text"} name={"medium"}
        value={formData.medium}
        onChange={handleChange}>
        Medio
      </FormInput>
      {/**
             * Faltan las imagenes
             */}
       <div className="h-[500px]">
            <div className="flex flex-row items-center justify-between ">
                <label className="block my-2">
                Imágenes
                </label>
                <div className="flex justify-center">
            <label className="cursor-pointer flex items-center justify-center px-4  border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold rounded-lg hover:bg-gray-300">
              + Imagen
              <input
                type="file"
                name="image"
                multiple
                //onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
                 {/*<Button primary rounded onClick={handleImageUpload}>+Imagen</Button>
            
          */}
                
            </div>
            

            <div className="p-4 border border-gray-300 rounded-md h-5/6 ">
          
          <div className="grid grid-cols-3 gap-2 mb-4 h-full overflow-scroll">
           {/*renderedImages*/}  
             
          </div>
          
        </div>
        
        </div> 
       
      
        
       <Button rounded primary className="w-fit  place-self-end  " >Add painting</Button>
    </div>

  </div>
       
  </form>


}

export default EditingProduct;