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
  const currentUser_role = localStorage.getItem('user-role')
  return (
    <>
      <Navbar />
      <Routes>
      {currentUser_role === 'ROLE_VOLUNTEER' ? <Route path="/" element={<Main />} /> : currentUser_role === 'ROLE_REFUGEE' ? <Route path="/" element={<AllHelps />} /> : currentUser_role === 'ROLE_ADMIN' ? <Route path="/" element={<AdminHelp />} /> : <Route path="/" element={<Login />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/remind" element={<Remind />} />
        <Route path="/change_password" element={<ChangePassword />} />
        {currentUser_role === 'ROLE_VOLUNTEER' && (
          <>
            <Route path="/add_help_offer" element={<AddOffer />} />
            <Route path="/all_help_requests" element={<Main />} />
            <Route path="/my_help_offers" element={<MyHelpOffers />} />
            <Route path="/accepted_help_requests" element={<AcceptedHelpRequests />} />
          </>
      )}
      {currentUser_role === 'ROLE_REFUGEE' && (
          <>
            <Route path="/add_help_request" element={<AddHelpRequest />} />
            <Route path="/all_help_offers" element={<AllHelps />} /> 
            <Route path="/accepted_help_offers" element={<AcceptedHelpOffers />} /> 
            <Route path="/my_help_requests" element={<MyHelpRequests />} />
          </>
      )}
      {currentUser_role === 'ROLE_ADMIN' && (
        <>
          <Route path="/admin_help" element={<AdminHelp />} />
          <Route path="/admin_user" element={<AdminUser />} />
        </>
      )}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
