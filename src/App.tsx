import { createBrowserRouter,  RouterProvider } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import AboutRufyanPage from "./pages/aboutRufyan/AboutRufyanPage";
import CommitmentPage from "./pages/Commitment/CommitmentPage";
import ProfessionalDevPage from "./pages/ProfessionalDev/ProfessionalDev";
import Root from "./pages/Root";
import StorePage from "./pages/galleryStore/StorePage";
import ProjectsPage from "./pages/artProjects/ProjectsPage";
import ShipmentPage from "./pages/shipment/ShipmentPage";

import ControlPanel from "./pages/ControlPanel/ControlPanel";
//import { homeLoader } from "./pages/home/homeLoader";
//import store from "./store";

/*
const homeLoader:LoaderFunction = async () =>{
  await store.dispatch(fetchFavPaintings());
  return null;
}
*/
const router= createBrowserRouter([
{
  path: '/',
  element: <Root/>,
  children:[
    {
      index: true,
      element:<HomePage/>
      
    },
    {path:'/aboutRufyan',
    element: <AboutRufyanPage/>
    },
    {path:'/aboutRufyan/commitment',
    element: <CommitmentPage/>
    },
    {path:'/aboutRufyan/profesionalDevelopment',
    element: <ProfessionalDevPage/>
    },
    {path:'/store',
    element: <StorePage/>
    },
    {path:'/projects',
    element: <ProjectsPage/>
    },
    {path:'/shipment',
    element: <ShipmentPage/>
    },
    {path:'/admin',
      element:<ControlPanel/>
    }
  ]
}
])



const path = router.routes[0]?.children;
const paths=[];
for(let i=1; i<path?.length;i++){
  paths.push(path?.[i].path)
}

paths.unshift("/")


function App() {
  
return <RouterProvider router={router}/>
}

export default App

export {paths};




