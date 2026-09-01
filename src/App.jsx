import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Header from "./components/dfhsj/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/store" element={<Products />} />
          <Route path="/tienda" element={<Products />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
