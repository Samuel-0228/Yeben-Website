import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";

function Contact() {
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
        "rYsqZ0-T0chZC6ijm"      // <-- replace with your actual EmailJS public key
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
  console.error("EmailJS Error:", error);
  setStatus("Failed to send message. Please try again.");
}
      );
  };

  return (
    <div>
      <Spinner loading={loading} />
      <Navbar />
      <Header title="Contact Us" />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
                Contact Us
              </div>
              <h1 className="display-6 mb-3">
                Get in Touch with YeBen Endowment Fund
              </h1>
              <p className="mb-4">
                If you want to meet us or learn more about YeBen, you can
                contact us using the form below, by email, or visit our office.
                We are happy to answer your questions, discuss partnership
                opportunities, or support your journey. We look forward to
                hearing from you!
              </p>
              <form ref={formRef} onSubmit={sendEmail}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="user_name"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
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
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        name="message"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                        required
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12 d-flex align-items-center">
                    <button
                      type="submit"
                      className="btn btn-primary py-2 px-3 me-3"
                    >
                      Send Message
                      <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                        <i className="fa fa-arrow-right"></i>
                      </div>
                    </button>
                    <p className="m-0">{status}</p>
                  </div>
                </div>
              </form>
            </div>

            {/* YeBen Building Image */}
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: "520px", display: "flex", alignItems: "stretch" }}>
              <div className="row g-3 flex-grow-1 h-100" style={{ height: "100%" }}>
                {/* Building Image */}
                <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center h-100" style={{ height: "100%" }}>
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <img
                      src={require("../../assets/img/Yeben_building.jpg")}
                      alt="YeBen Building"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                        boxShadow: "0 4px 24px rgba(255,152,0,0.12)",
                      }}
                    />
                    <div className="mt-2 fw-semibold text-orange" style={{ color: "#ff9800" }}>
                      YeBen Endowment Fund Office Building
                    </div>
                  </div>
                </div>
                {/* Map */}
                <div className="col-12 col-md-6 h-100" style={{ height: "100%" }}>
                  <div className="position-relative rounded overflow-hidden h-100" style={{ height: "100%" }}>
                    <iframe
                      className="w-100 h-100"
                      src="https://www.google.com/maps?q=9.030634397923647,38.76048422208971&hl=en&z=16&output=embed"
                      style={{ border: 0, borderRadius: "16px", height: "100%" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="YeBen Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
