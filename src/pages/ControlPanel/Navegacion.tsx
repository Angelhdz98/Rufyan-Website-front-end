import Link from "../../components/Link";



function Navegacion() {
    const links = [{label: "Editar catalogo", path: "/admin/edit"},
                    {label: "Agregar un producto", path: "/admin/addProduct"},
                    {label: "Agregar un evento", path: "/admin/addEvent"},
                    {label: "agregar una obra", path: "/admin"},
                    {label: "Editar banners", path: "/admin/editBanners"},
    ];
    const renderedLinks = links.map((link)=>{

        return <Link activeClassName="font-bold border-l-4 border-blue-500 pl-2" className="mb-3" key={link.label} to={link.path} >{link.label}</Link>
    })
    return <div className="flex flex-col mt-8">

        <div className="flex flex-row w-full justify-between px-32 border-b-2 border-black ">
            {renderedLinks}
            </div>
        {
        /**
         * <div className="hover:text-[#8B351C] cursor-pointer">Editar catalogo</div>
            <div className="hover:text-[#8B351C] cursor-pointer">Agregar un Producto</div>
            <div className="hover:text-[#8B351C] cursor-pointer">Agregar un evento</div>
            <div className="hover:text-[#8B351C] cursor-pointer">Agregar una obra</div>
        */
        }
    </div>

}

export default Navegacion;