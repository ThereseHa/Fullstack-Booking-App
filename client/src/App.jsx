import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layouts
import RootLayout from "./layouts/RootLayout";

//Layout logged out
import RootLayoutOut from "./layouts/LoggedOut/RootLayoutOut";

//Component
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
        <>

            <Route path="/" element={<RootLayout />}>

                <Route exact path='/' element={<ProtectedRoute/>}>
                    {/* Protected routes */}
                    <Route exact path='/' element={<Home/>}/>
                    {/* <Route exact path='/test' element={<Test/>}/> */}
                    {/* Protected ends here */}
                </Route>

            </Route>


            <Route path="/" element={<RootLayoutOut />}>

                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/register' element={<Register />}/>
                <Route path="*" element={<NotFound />} />

            </Route>
        </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
