import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
<<<<<<< HEAD
=======
import Products from "./pages/products/Products";
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
<<<<<<< HEAD
=======
          <Route path="/products" element={<Products />} />
          <Route path="/store" element={<Products />} />
          <Route path="/tienda" element={<Products />} />
>>>>>>> 89ccbc492cf207387b3d28dc0a2af52f8e56c5fe
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
