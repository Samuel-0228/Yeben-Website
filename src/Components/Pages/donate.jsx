import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";

function Donate() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const formRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_bsml5co",     // <-- replace with your actual EmailJS service ID
        "template_hqtdjlv",    // <-- replace with your actual EmailJS template ID
        formRef.current,
        "rYsqZ0-T0chZC6ijm"    // <-- replace with your actual EmailJS public key
      )
      .then(
        (result) => {
          setStatus("Donation sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("Failed to send donation. Please try again.");
        }
      );
  };

  return (
    <div>
      <Spinner loading={loading} />
      <Navbar />
      <Header title="Donate" />

      {/* Donate */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
                Donate Now
              </div>
              <h1 className="display-6 mb-5">
                Thanks for your support!
              </h1>
              <p className="mb-0">
                Your support means a lot to us and helps us continue our mission. <br />
                Thank you for making a difference!
              </p>
              <p className="mb-0">
                CBE:10000****<br />
                AWASH: 0012***<br />
              </p>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="h-100 bg-secondary p-5">
                <form ref={formRef} onSubmit={sendEmail}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          name="user_name"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-light border-0"
                          name="user_email"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control bg-light border-0"
                          name="donation_amount"
                          id="donation_amount"
                          placeholder="Donation Amount"
                          required
                        />
                        <label htmlFor="donation_amount">Donation Amount</label>
                      </div>
                    </div>
                    <div className="col-12 d-flex align-items-center">
                      <button
                        type="submit"
                        className="btn btn-primary px-5"
                        style={{ height: "60px" }}
                      >
                        Donate Now
                        <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                          <i className="fa fa-arrow-right"></i>
                        </div>
                      </button>
                      <p className="m-0 ms-3">{status}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Donate;

// <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>

// <!-- JavaScript Libraries -->
// <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
// <script src="lib/wow/wow.min.js"></script>
// <script src="lib/easing/easing.min.js"></script>
// <script src="lib/waypoints/waypoints.min.js"></script>
// <script src="lib/owlcarousel/owl.carousel.min.js"></script>
// <script src="lib/parallax/parallax.min.js"></script>

// <!-- Template Javascript -->
// <script src="js/main.js"></script>
