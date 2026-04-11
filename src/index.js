import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/style.css";
import "./assets/lib/animate/animate.min.css";
import "./assets/lib/owlcarousel/assets/owl.carousel.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import HomePage from "./Components/Pages/index.jsx";
import AboutPage from "./Components/Pages/about.jsx";
import CausesPage from "./Components/Pages/news.jsx";
import ServicePage from "./Components/Pages/service.jsx";
import DonatePage from "./Components/Pages/donate.jsx";
import TeamPage from "./Components/Pages/team.jsx";
import TestimonialPage from "./Components/Pages/testmonial.jsx";
import ContactPage from "./Components/Pages/contact.jsx";
import NotFoundPage from "./Components/Pages/404.jsx";
import reportWebVitals from "./reportWebVitals";
import { loadScript } from "./utils/loadScript";
import AdminNews from "./Components/Pages/AdminNews.jsx";
import AdminDashboard from "./Components/Pages/Admindashboard.jsx";
import AdminLogin from "./Components/Pages/adminlogin.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminAboutUs from "./Components/Pages/AdminAboutUs.jsx";
import AdminService from "./Components/Pages/Adminservice.jsx"; // <-- Add this import
import ServiceDetail from "./Components/Pages/service.jsx"; // <-- Import ServiceDetail
import AdminContact from "./Components/Pages/AdminContact.jsx"; // <-- Import AdminContact
import StudentList from "./Components/Pages/StudentList";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

// Ben website/ben_website/public/assets/lib/easing/easing.js
// Dynamically load vendor JS after React mounts
(async () => {
  await loadScript("/assets/lib/easing/easing.min.js");
  await loadScript("/assets/lib/owlcarousel/owl.carousel.min.js");
  await loadScript("/assets/lib/waypoints/waypoints.min.js");
  await loadScript("/assets/lib/parallax/parallax.min.js");
  await loadScript("/assets/lib/wow/wow.min.js");
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<CausesPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news"
          element={
            <PrivateRoute>
              <AdminNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <PrivateRoute>
              <AdminAboutUs />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/service"
          element={
            <PrivateRoute>
              <AdminService />
            </PrivateRoute>
          }
        />
        <Route path="/service/:id" element={<ServiceDetail />} /> {/* <-- Add this line */}
        <Route path="/admin/contact" element={<PrivateRoute><AdminContact /></PrivateRoute>} /> {/* <-- Add this line */}
        <Route path="/students" element={<StudentList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
