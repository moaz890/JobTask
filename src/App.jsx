import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ClientLayout from "./components/client/ClientLayout";
import Home from "./pages/client/Home";
import Items from "./pages/client/Items";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname == "/") {
    navigate("/categories");
  }
  
  return (
    <div className="w-full min-h-screen flex justify-center overflow-y-auto">
      <Routes>
        
        <Route
          path="/categories"
          element={
            <ClientLayout />
          }
        >
          <Route index element={<Home />} />
          <Route path=":categoryId/items" element={<Items />} />
        </Route>
      </Routes> 
    </div>
  )
}

export default App