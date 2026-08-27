import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header.jsx";
// import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="">
      {/* <Header /> */}
      <main className="">
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/pisos" element={<Apartments />} />
          <Route path="/historia" element={<History />} />
          <Route path="/agentes" element={<Agents />} />
          <Route path="/contacto" element={<ContactSection />} />
          <Route path="/menu" element={<Menu />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
