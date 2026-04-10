import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from "../assets/img/Logo.png"; // Adjust the path to your logo image

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`container-fluid fixed-top px-0 wow fadeIn${scrolled ? " navbar-scrolled" : ""}`} data-wow-delay="0.1s">
      {/* <div className="top-bar text-white-50 row gx-0 align-items-center d-none d-lg-flex">
        <div className="col-lg-6 px-5 text-start">
          <small>
            <i className="fa fa-map-marker-alt me-2"></i>4 killo, Addis Ababa, Ethiopia          </small>
          <small className="ms-4">
            <i className="fa fa-envelope me-2"></i>info@yebenfund.org
          </small>
        </div>
        <div className="col-lg-6 px-5 text-end">
          <small>Follow us:</small>
          <a className="text-white-50 ms-3" href="#"><i className="fab fa-facebook-f"></i></a>
          <a className="text-white-50 ms-3" href="#"><i className="fab fa-twitter"></i></a>
          <a className="text-white-50 ms-3" href="#"><i className="fab fa-linkedin-in"></i></a>
          <a className="text-white-50 ms-3" href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div> */}

      <nav className="navbar navbar-expand-lg navbar-dark py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
        <NavLink to="/" className="navbar-brand ms-4 ms-lg-0">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ width: '281px', height: '80px', objectFit: 'contain', maxWidth: '100%' }}
          />
        </NavLink>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About Us
            </NavLink>
            <NavLink to="/service" className="nav-item nav-link">
              Service
            </NavLink>
             <NavLink to="/news" className="nav-item nav-link">
              News
            </NavLink>
            <li className="nav-item">
              <Link className="nav-link" to="/students">
                Students
              </Link>
            </li>
            {/* <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                News
              </a>
              <div className="dropdown-menu m-0">
                <NavLink to="/service" className="dropdown-item">
                  Service
                </NavLink>
                <NavLink to="/donate" className="dropdown-item">
                  Donate
                </NavLink>
                <NavLink to="/team" className="dropdown-item">
                  Our Team
                </NavLink>
                <NavLink to="/testimonial" className="dropdown-item">
                  Testimonial
                </NavLink>
                <NavLink to="/404" className="dropdown-item">
                  404 Page
                </NavLink>
              </div>
            </div> */}
            <NavLink to="/contact" className="nav-item nav-link">
              Contact
            </NavLink>
          </div>
          <div className="d-none d-lg-flex ms-2">
            <a className="btn btn-outline-primary py-2 px-3" href="/donate">
              Donate Now
              <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                <i className="fa fa-arrow-right"></i>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;