import axios from "axios";
import { OptionSelect } from "../../types/typesIndex";



const fetchEndpoint = async (endpoint: string) =>{
    const options = await axios.get(endpoint);
    const data = options.data;
    const response = data.data.map((option, index:number)=>{
        return {id: index, name:option.fact, label: option.fact } as OptionSelect //especial para el FactCats
    });


    return response;
};

export {fetchEndpoint};