import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Main } from "./pages/Main";
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Settings } from "./pages/Settings";
import { Remind } from "./pages/Remind";
import { ChangePassword } from "./pages/ChangePassword";
import { AddOffer } from "./pages/AddOffer";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/remind" element={<Remind />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/add_offer" element={<AddOffer />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
