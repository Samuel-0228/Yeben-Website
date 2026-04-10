import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/Logo.png"; // Adjust the path to your logo image

function Footer() {
  return (
    <div
      className="container-fluid bg-dark text-white-50 footer mt-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{ paddingTop: 0 }} // Remove top padding
    >
      <div className="container py-4">
        {" "}
        {/* Reduced vertical padding */}
        <div className="row g-5 align-items-center">
          {/* Logo & Description - Wider on desktop, full width on mobile */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div className="d-flex flex-column align-items-lg-start align-items-center text-lg-start text-center">
              <img
                src={Logo}
                alt="Logo"
                className="img-fluid mb-3"
                style={{
                  width: "281px",
                  height: "80px",
                  objectFit: "contain",
                  maxWidth: "100%",
                }}
              />
              <p style={{ maxWidth: 500 }}>
                YeBen Endowment Fund is dedicated to empowering students in
                Ethiopia through financial support, training, and innovation
                opportunities. Join us in making a difference!
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-square me-1"
                  href="https://t.me/+GQyOG5yrA001YjNk"
                >
                  <i className="fab fa-telegram"></i>
                </a>
                <a
                  className="btn btn-square me-1"
                  href="https://web.facebook.com/YeBenFund/?_rdc=1&_rdr#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-square me-1"
                  href="https://www.instagram.com/yeben_endowment_fund/"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="btn btn-square me-0"
                  href="https://www.linkedin.com/company/yeben-endowment-fund/posts/?feedView=all"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Address - Left aligned on all screens */}
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-start justify-content-center mb-4 mb-lg-0">
            <div className="text-start">
              <h5 className="text-light mb-4">Address</h5>
              <p>
                <i className="fa fa-map-marker-alt me-3"></i>4 Killo, Addis
                Ababa, Ethiopia
              </p>
              <p>
                <i className="fa fa-phone-alt me-3"></i>+251911160622 <br/> or
                +251930363956
              </p>
              <p>
                <i className="fa fa-envelope me-3"></i>info@yebenfund.org
              </p>
            </div>
          </div>

          {/* Quick Links - Right on desktop, hidden on xs mobile */}
          <div className="col-lg-3 col-md-6 d-none d-md-block">
            <h5 className="text-light mb-4">Quick Links</h5>
            <NavLink className="btn btn-link" to="/about">
              About Us
            </NavLink>
            <NavLink className="btn btn-link" to="/contact">
              Contact Us
            </NavLink>
            <NavLink className="btn btn-link" to="/service">
              Our Services
            </NavLink>
            <NavLink className="btn btn-link" to="/news">
              News
            </NavLink>
            {/* <NavLink className="btn btn-link" to="/admin/login">Admin Login</NavLink> Added Admin Login */}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-fluid copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <span style={{ color: "#fff" }}>YeBen Endowment Fund</span>
              , All Rights Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              {/* You can add extra links or credits here */}
            </div>
          </div>
        </div>
      </div>
      {/* Responsive style for mobile */}
      <style>
        {`
          @media (max-width: 767.98px) {
            .footer .col-lg-6, .footer .col-lg-3 {
              margin-bottom: 2rem;
            }
            .footer .col-lg-3.d-none.d-md-block {
              display: none !important;
            }
            .footer .col-lg-3, .footer .col-lg-6 {
              text-align: center !important;
            }
            .footer {
              padding-top: 0 !important;
            }
            .footer .container {
              padding-top: 1rem !important;
              padding-bottom: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Footer;
