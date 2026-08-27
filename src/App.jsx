import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/Headerx/Header";

function App() {
  return (
    <div className="">
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
