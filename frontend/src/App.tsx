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
import { AddHelpRequest } from "./pages/AddHelpRequest";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { AllHelps } from "./pages/AllHelpOffers";
import { MyHelpOffers } from "./pages/MyHelpOffers";
import { AcceptedHelpRequests } from "./pages/AcceptedHelpRequests";
import { MyHelpRequests } from "./pages/MyHelpRequests";
import { AcceptedHelpOffers } from "./pages/AcceptedHelpOffers";
import { AdminHelp } from "./pages/AdminHelp";
import  AdminUser  from "./components/AdminUser";

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
        <Route path="/add_help_offer" element={<AddOffer />} />
        <Route path="/add_help_request" element={<AddHelpRequest />} />
        <Route path="/all_help_requests" element={<Main />} />
        <Route path="/all_help_offers" element={<AllHelps />} />
        <Route path="/my_help_offers" element={<MyHelpOffers />} />
        <Route path="/accepted_help_requests" element={<AcceptedHelpRequests />} /> 
        <Route path="/accepted_help_offers" element={<AcceptedHelpOffers />} /> 
        <Route path="/my_help_requests" element={<MyHelpRequests />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin_help" element={<AdminHelp />} />
        <Route path="/admin_user" element={<AdminUser />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
