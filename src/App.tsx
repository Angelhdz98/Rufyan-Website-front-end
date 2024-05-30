import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import AboutRufyanPage from "./pages/aboutRufyan/AboutRufyanPage";
import CommitmentPage from "./pages/Commitment/CommitmentPage";
import ProfessionalDevPage from "./pages/ProfessionalDev/ProfessionalDev";
import Root from "./pages/Root";



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
  ]
}
])

function App() {
return <RouterProvider router={router}/>
}

export default App
