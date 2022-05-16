import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import EthnicitySelect from "./pages/EthnicitySelect";
import { MapPage } from "./pages/MapPage/MapPage";
import Price from "./pages/price";
import { HomePage } from "./pages/HomePage/Home";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="home" element={<Home/>}/>
                <Route path="" element={<Home/>}/> */}
        <Route
          exact
          path="/"
          element={
            <ChakraProvider>
              <HomePage />
            </ChakraProvider>
          }
        />
        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />
        <Route path="ethnicitySelect" element={<EthnicitySelect />} />
        <Route path="MapPage" element={<MapPage />} />
        <Route path="price" element={<Price />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
