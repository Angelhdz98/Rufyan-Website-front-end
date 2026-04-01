import { BodyClothingSizeEnum, ClothingStock, PaintingStock, ProductStock, SingleStock} from "../types/typesIndex";

interface StockTagProps{
    productStock:ProductStock
};

function StockTag({productStock}:StockTagProps){
    let stock:ProductStock; 
    let stockTags; 

    switch (productStock.stockType){
        case "ORIGINAL_STOCK":
            stock = productStock as PaintingStock; 
            stockTags = <div className="flex flex-auto flex-row ">
            <span>
            {stock.isOriginalAvailable?"Obra original disponible":"Obra original no disponible"}
            </span>
                <span>
                Copias disponibles {stock.stockCopies} / {stock.copiesMade}
            </span>
                         
            </div>
        break;
        case "SINGLE_STOCK": 
        stock = productStock as SingleStock; 
        stockTags = <div>
            <span className=" text-orange-600">
                {stock.stock>0? "Disponible":"No disponible"}
            </span>
        </div>
        break; 
        case "CLOTHING_STOCK": 
        stock = productStock as ClothingStock; 
      const stockDisponible:Map<BodyClothingSizeEnum, number> =  stock.stock;
     stockTags = <>{Array.from(stockDisponible.entries()).map(([nombre, cantidad]) =>{
        <span key={ nombre}>
            {nombre} : {cantidad>0?"Disponible":"No disponible"}
            </span>
     } )}</> 
        break; 
    }

    return <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 left-4 px-1 flex-1 flex-row">{stockTags}</div>


}

export default StockTag; 