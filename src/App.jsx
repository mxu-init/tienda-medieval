import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import History from "./pages/history/History";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;