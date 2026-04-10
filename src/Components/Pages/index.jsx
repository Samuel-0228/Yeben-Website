import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";

// Import images
import carousel1 from "../../assets/img/carousel-1.png";
import carousel2 from "../../assets/img/carousel-2.png";
import carousel3 from "../../assets/img/meeting.png";
import about1 from "../../assets/img/Aboutus.png";
import icon1 from "../../assets/img/icon-1.png";
import icon2 from "../../assets/img/icon-2.png";
import icon3 from "../../assets/img/icon-3.png";
import testimonial1 from "../../assets/img/testimonial-1.jpg";
import testimonial2 from "../../assets/img/testimonial-2.jpg";
import testimonial3 from "../../assets/img/testimonial-3.jpg";
import p_aau from "../../assets/img/p_AAU.png";
import p_rotaract from "../../assets/img/P_rotaract.png";
import p_rotary from "../../assets/img/P_rotary.png";
import { useNewsList } from "./newsData";

const COUNTER_LABELS = [
  "Total YeBen students",
  "Graduated students",
  "Current Beneficiaries",
];

function HomePage() {
  const { newsList, loading } = useNewsList();
  const [newsCarouselIndex, setNewsCarouselIndex] = useState(0);
  const [newsPage, setNewsPage] = useState(0);
  const [services, setServices] = useState([]);
  const [counters, setCounters] = useState([]);
  const [countValues, setCountValues] = useState([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  const newsPerPage = 3;
  const totalNewsPages = Math.ceil(newsList.length / newsPerPage);

  // Fetch services from Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const docRef = doc(db, "services", "main");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchServices();
  }, []);

  // Fetch counters from Firestore
  useEffect(() => {
    const fetchCounters = async () => {
      const docRef = doc(db, "about", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        let stats = snap.data().stats || [];
        // Only keep the counters you want, in the right order
        stats = COUNTER_LABELS.map(
          (label) =>
            stats.find((stat) => stat.label === label) || { label, value: 0 }
        );
        // Add the "Years Since" counter
        const yearsSince = new Date().getFullYear() - 2016 + 1;
        stats.push({ label: "Years Since", value: yearsSince });
        setCounters(stats);
        setCountValues(stats.map(() => 0));
      }
    };
    fetchCounters();
  }, []);

  // Keep only the Bootstrap event sync effect:
  useEffect(() => {
    const carouselElement = document.getElementById("newsCarousel");
    if (carouselElement && window.bootstrap) {
      // Force interval to false in case Bootstrap JS is used elsewhere
      const carousel = window.bootstrap.Carousel.getOrCreateInstance(
        carouselElement,
        { interval: false }
      );
      carousel.pause();
    }
    const handleSlide = (e) => {
      if (newsCarouselIndex !== e.to) {
        // Prevent updating the state if the index is the same
        setNewsCarouselIndex(e.to);
      }
    };

    if (carouselElement) {
      carouselElement.addEventListener("slid.bs.carousel", handleSlide);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("slid.bs.carousel", handleSlide);
      }
    };
  }, []);

  // Animate counters when in view
  useEffect(() => {
    if (!counters.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [counters, hasAnimated]);

  // Animate counters smoothly in 3 seconds
  const animateCounters = () => {
    const duration = 3000;
    counters.forEach((counter, idx) => {
      const startTimestamp = performance.now();
      const end = Number(counter.value ?? counter.target ?? 0);

      const animate = (now) => {
        const elapsed = now - startTimestamp;
        let progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * end);

        setCountValues((prev) => {
          const updated = [...prev];
          updated[idx] = value;
          return updated;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCountValues((prev) => {
            const updated = [...prev];
            updated[idx] = end;
            return updated;
          });
        }
      };

      requestAnimationFrame(animate);
    });
  };

  const navigate = useNavigate();
  const handleNewsClick = (id) => {
    navigate(`/news#${id}`);
  };

  const handlePrevNews = () => {
    setNewsPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextNews = () => {
    setNewsPage((prev) => (prev < totalNewsPages - 1 ? prev + 1 : prev));
  };

  return (
    <div>
      <Spinner loading={loading} />
      <Navbar />
      {/* Carousel */}
      <div className="container-fluid p-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="w-100"
                src={carousel1}
                alt="Image"
                style={{
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 pt-5">
                      <h1 className="display-4 text-white mb-3 animated slideInDown">
                        Don’t be afraid to start and take action. 
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* New carousel item with same image and text as the first */}
            <div className="carousel-item">
              <img
                className="w-100"
                src={carousel3}
                alt="Image"
                style={{
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 pt-5">
                      <h1 className="display-4 text-white mb-3 animated slideInDown">
                        Always finish what you started. 

                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="w-100"
                src={carousel2}
                alt="Image"
                style={{
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 pt-5">
                      <h1 className="display-4 text-white mb-3 animated slideInDown">
                        You can go far - the sky is the limit.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Latest News Section - Simple Pagination */}
      <div className="container-xxl py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Latest News</h2>
          <div className="position-relative">
            {/* Prev Button - left */}
            <button
              className="btn position-absolute top-50 start-0 translate-middle-y"
              onClick={handlePrevNews}
              disabled={newsPage === 0}
              style={{
                fontSize: "1.5rem",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                zIndex: 2,
                background: "rgba(0,0,0,0.4)",
                color: "#fff",
                border: "none",
                opacity: newsPage === 0 ? 0.5 : 1,
                pointerEvents: newsPage === 0 ? "none" : "auto",
              }}
              aria-label="Previous"
            >
              &lt;
            </button>
            {/* News Cards */}
            <div className="row g-4 justify-content-center align-items-stretch">
              {newsList
                .slice(
                  newsPage * newsPerPage,
                  newsPage * newsPerPage + newsPerPage
                )
                .map((news) => {
                  // Choose the first usable image whether image is a string, array, or dictionary
                  const getFirstImage = (img) => {
                    if (!img) return "";
                    if (typeof img === "string") return img;
                    if (Array.isArray(img)) return img.length ? img[0] : "";
                    if (typeof img === "object") {
                      const vals = Object.values(img);
                      if (!vals || !vals.length) return "";
                      const first = vals[0];
                      if (typeof first === "string") return first;
                      if (Array.isArray(first)) return first.length ? first[0] : "";
                      return "";
                    }
                    return "";
                  };

                  const imageSrc = getFirstImage(news.image);

                  return (
                  <div className="col-12 col-md-4" key={news.id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={imageSrc}
                        className="card-img-top"
                        alt={news.title}
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="text-primary mb-2">{news.year}</h6>
                        <h5 className="card-title">{news.title}</h5>
                        <p className="card-text" style={{ flexGrow: 1 }}>
                          {news.summary}
                        </p>
                        <button
                          className="btn btn-outline-primary mt-auto"
                          style={{
                            width: "100%",
                          }}
                          onClick={() => {
                            handleNewsClick(news.id);
                          }}
                        >
                          Learn More
                          <span className="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                            <i className="fa fa-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>)
                })}
            </div>
            {/* Next Button - right */}
            <button
              className="btn position-absolute top-50 end-0 translate-middle-y"
              onClick={handleNextNews}
              disabled={newsPage === totalNewsPages - 1}
              style={{
                fontSize: "1.5rem",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                zIndex: 2,
                background: "rgba(0,0,0,0.4)",
                color: "#fff",
                border: "none",
                opacity: newsPage === totalNewsPages - 1 ? 0.5 : 1,
                pointerEvents:
                  newsPage === totalNewsPages - 1 ? "none" : "auto",
              }}
              aria-label="Next"
            >
              &gt;
            </button>
            {/* Page Indicator */}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <span className="mx-2" style={{ fontWeight: "bold" }}>
                {newsPage + 1} / {totalNewsPages}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div
                className="position-relative overflow-hidden h-100"
                style={{ minHeight: "400px" }}
              >
                <img
                  className="position-absolute w-100 h-100 pt-5 pe-5"
                  src={about1}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="h-100">
                <h1 className="display-5 fw-bold rounded-pill bg-secondary text-primary py-2 px-4 mb-3 text-center">
                  About Us
                </h1>
                <h4 className="fw-normal mb-5 text-center">WHO WE ARE</h4>
                <div className="bg-light border-bottom border-5 border-primary rounded p-4 mb-4 ">
                  <p className="text-dark mb-2 text-justify" style={{ fontSize: "1.05rem" }}>
                    
                    YeBen Endowment Fund is a dedicated nonprofit organization
                    based in Addis Ababa, Ethiopia, committed to transforming
                    the lives of university students by removing financial
                    barriers and nurturing their academic and professional
                    growth. We support talented students from underprivileged
                    backgrounds through financial aid, personal development
                    trainings, and innovation grants. Our holistic approach
                    empowers students to not only succeed in their studies but
                    also to become confident, capable leaders and changemakers
                    in their communities.
                  </p>
                  <span className="text-primary">
                    In memory of Dr. Benyam Asefa
                  </span>
                </div>
                <p className="mb-5">
                  YeBen Endowment Fund is an Ethiopian charity established in
                  memory of Dr. Benyam Asefa.
                </p>
                <Link className="btn btn-primary py-2 px-3 me-3" to="/about">
                  Learn More
                  <div className="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                    <i className="fa fa-arrow-right"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Counter Section */}
      <div className="container-xxl py-5" ref={counterRef}>
        <div className="container">
          <div className="row g-4 text-center">
            {counters.map((counter, idx) => (
              <div className="col-6 col-md-3" key={counter.label}>
                <div className="bg-light rounded p-4">
                  <h1 className="mb-2 text-primary">{countValues[idx]}</h1>
                  <p className="mb-0">{counter.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Service Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <h1 className="display-5 fw-bold rounded-pill bg-secondary text-primary py-2 px-4 mb-3 text-center">
              Our Services
            </h1>
            <h4 className="fw-normal mb-5 text-center">
              What We Do And Get Involved
            </h4>
          </div>
          <div className="row g-4 justify-content-center">
            {services.map((service, idx) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`0.${idx + 1}s`}
                key={idx}
              >
                <div className="service-item bg-white text-center h-100 p-4 p-xl-5">
                  {service.image && (
                    <img
                      className="img-fluid mb-4"
                      src={service.image}
                      alt={service.title}
                    />
                  )}
                  <h4 className="mb-3">{service.title}</h4>
                  <p className="mb-4">
                    {service.description.length > 120
                      ? service.description.slice(0, 120) + "..."
                      : service.description}
                  </p>
                  <Link
                    className="btn btn-outline-primary px-3"
                    to={`/service/${idx}`}
                  >
                    Learn More
                    <div className="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                      <i className="fa fa-arrow-right"></i>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="text-center text-muted">No services found.</div>
            )}
          </div>
        </div>
      </div>
      {/* partner Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3"></div>
            <h1 className="display-6 mb-5"></h1>
            <h1 className="display-5 fw-bold rounded-pill bg-secondary text-primary py-2 px-4 mb-3 text-center">
              Our Partners
            </h1>
            <h4 className="fw-normal mb-5 text-center">
              We are proud to work with these organizations
            </h4>
          </div>
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-6 col-md-4 text-center">
              <img
                src={p_aau}
                alt="AAU Logo"
                style={{
                  maxWidth: "180px",
                  maxHeight: "120px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-6 col-md-4 text-center">
              <img
                src={p_rotaract}
                alt="Rotaract Logo"
                style={{
                  maxWidth: "180px",
                  maxHeight: "120px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="col-6 col-md-4 text-center">
              <img
                src={p_rotary}
                alt="Rotary Logo"
                style={{
                  maxWidth: "180px",
                  maxHeight: "120px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
