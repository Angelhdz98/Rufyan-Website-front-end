import SwiperProducts from "../../components/SwiperProducts";



function StorePage(){
    return  <div >
      <div className="flex m-4 gap-8"> 
        <div className="w-1/3 relative flex items-center  rounded-xl overflow-hidden">
        <img className="h-full w-full " src={"/public/assets/Images/galeria/RufyanPainting.jpg"} alt="" />
        
        <div className="text-white text-xl bg-slate-900 opacity-80 absolute bottom-1 bg-">Plasmando mi visión en distintas técnicas y estilos</div>
         
       </div>
       
      
        <div>
        {/*<SwiperProducts> </SwiperProducts>*/}
        </div>

        </div>   
      

    </div>
}

export default StorePage;