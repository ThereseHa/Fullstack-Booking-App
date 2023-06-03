import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InformationPage from "./pages/InformationPage";

// Layouts
import RootLayout from "./layouts/RootLayout";

//Component
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route exact path="/" element={<ProtectedRoute />}>
          {/* Protected routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/information" element={<InformationPage />} />

          {/* Protected ends here */}
        </Route>
      </Route>

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
