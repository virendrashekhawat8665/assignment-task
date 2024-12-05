import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/productDetails";
const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
