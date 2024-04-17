import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Aos from "aos";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import HomePage from "../links/HomePage";
import AboutPage from "../links/AboutPage";
import HowPage from "../links/FaqPage";
import TeamPage from "../links/TeamPage.js";
import ItemsDonatedPage from "../links/ItemsDonatedPage";
import SuccessAdoptedPage from "../links/SuccessAdoptedPage";
import AvailablePage from "../links/AvailablePage.js";
import AdoptionPage from "../adminpanel/adminpages/adminpagescss/Links/AdoptionPage.js";
import UserPage from "../adminpanel/adminpages/adminpagescss/Links/UserPage.js";
// import PendingPage from "../adminpanel/adminpages/adminpagescss/Links/PendingPage.js";
import GalleryPage from "../adminpanel/adminpages/adminpagescss/Links/GalleryPage.js";
import SignupPage from "../links/SignupPage.js";
import LoginPage from "../links/LoginPage.js";
import ValidityPage from "../links/ValidityPage.js";
import AdoptionStatusPage from "../links/AdoptionStatusPage.js";
import SendOtpPage from "../links/SendOtpPage";
import SubmitOtpPage from "../links/SubmitOtpPage";
import UserProfileEditPage from "../links/UserProfileEditPage.js";


function Router() {

  const login = window.localStorage.getItem("isLoggedin");

  useEffect(() => {
    Aos.init();
  }, []);


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="staff" element={<TeamPage />} />
        <Route path="items-donated" element={<ItemsDonatedPage />} />
        <Route path="successful-adopted" element={<SuccessAdoptedPage />} />
        <Route path="available-to-adopt" element={<AvailablePage />} />
        <Route path="how-to" element={<HowPage />} />
        <Route path="signup" element={login ? <HomePage/> :<SignupPage/>} />
        <Route path="login" element={login ? <HomePage/> :<LoginPage />} />
        <Route path="valid" element={<ValidityPage/>} />
        <Route path="adoption-status" element={<AdoptionStatusPage />} />
        <Route path="send-otp" element={<SendOtpPage/>} />
        <Route path="submit-otp" element={<SubmitOtpPage/>} />
        <Route path="adoption-request" element={<AdoptionPage />} />
        <Route path="upload" element={<GalleryPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="edit-profile" element={<UserProfileEditPage />} />
        {/* <Route path="approval" element={<PendingPage />} /> */}
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Router;
