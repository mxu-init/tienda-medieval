import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/footerx/Footer";

function App() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
