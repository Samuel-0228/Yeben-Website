import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";
import { useNewsList } from "./newsData";

function NewsSection({ section, expandedId }) {
  const { newsList } = useNewsList();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (images, idx) => {
    setModalImages(images);
    setModalIndex(idx);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const prevImage = () =>
    setModalIndex((i) => (i === 0 ? modalImages.length - 1 : i - 1));
  const nextImage = () =>
    setModalIndex((i) => (i === modalImages.length - 1 ? 0 : i + 1));

  const filtered = newsList.filter((item) => item.section === section);
  return (
    <div className="mb-5">
      <h2 className="mb-4 text-primary" style={{ fontSize: "1.5rem" }}>
        {section === "Graduation" ? "🎓 Graduation" : "🏆 Award of Excellence"}
      </h2>
      <div className="accordion" id={`${section.toLowerCase()}Accordion`}>
        {filtered.map((item, idx) => {
          const isExpanded = expandedId === String(item.id);
          return (
            <div className="accordion-item" key={item.id} id={item.id}>
              <h2
                className="accordion-header"
                id={`heading-${section}-${idx}`}
                style={{ fontSize: "1.1rem" }} // Less than header
              >
                <button
                  className={`accordion-button${isExpanded ? "" : " collapsed"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${section}-${idx}`}
                  aria-expanded={isExpanded ? "true" : "false"}
                  aria-controls={`collapse-${section}-${idx}`}
                  style={{ fontSize: "1.1rem" }} // Less than header
                >
                  {item.year} - {item.title}
                </button>
              </h2>
              <div
                id={`collapse-${section}-${idx}`}
                className={`accordion-collapse collapse${
                  isExpanded ? " show" : ""
                }`}
                aria-labelledby={`heading-${section}-${idx}`}
                data-bs-parent={`#${section.toLowerCase()}Accordion`}
              >
                <div className="accordion-body d-flex flex-column">
                  <div>
                    <h5 style={{ fontSize: "1.05rem" }}>{item.title}</h5>
                    <p className="mb-2">
                      <strong>Summary:</strong> {item.summary}
                    </p>
                    <div style={{ whiteSpace: "pre-line" }}>{item.details}</div>
                  </div>
                  {/* Gallery Section */}
                  {item.image && Array.isArray(item.image) && item.image.length > 0 && (
                    <div className="mt-3">
                      <h6 className="mb-2">Gallery</h6>
                      <div className="row g-2">
                        {item.image.map((photoUrl, gIdx) => (
                          <div className="col-4 col-md-3 col-lg-2" key={gIdx}>
                            <img
                              src={photoUrl}
                              alt={`Gallery ${gIdx + 1}`}
                              className="img-fluid rounded border"
                              style={{
                                maxHeight: "80px",
                                objectFit: "cover",
                                cursor: "pointer",
                                width: "100%",
                              }}
                              onClick={() => openModal(item.image, gIdx)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* If image is a single string, show as main image */}
                  {item.image && typeof item.image === "string" && (
                    <div className="mt-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded border"
                        style={{
                          maxHeight: "150px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Bootstrap Modal for Gallery */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.85)",
            zIndex: 1050,
          }}
          tabIndex="-1"
          role="dialog"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "900px", width: "95%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center position-relative p-0">
                <button
                  type="button"
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
                  style={{ zIndex: 2, fontSize: "2rem", opacity: 0.85 }}
                  onClick={() => {
                    prevImage();
                  }}
                >
                  &#8592;
                </button>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    minHeight: "65vh",
                    transition: "background 0.3s",
                  }}
                >
                  <img
                    key={modalImages[modalIndex]} // triggers animation on change
                    src={modalImages[modalIndex]}
                    alt={`Gallery ${modalIndex + 1}`}
                    className="img-fluid rounded shadow-lg animate__animated animate__fadeIn"
                    style={{
                      maxHeight: "65vh",
                      maxWidth: "98vw",
                      width: "auto",
                      objectFit: "contain",
                      background: "#fff",
                      transition: "box-shadow 0.3s",
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
                  style={{ zIndex: 2, fontSize: "2rem", opacity: 0.85 }}
                  onClick={() => {
                    nextImage();
                  }}
                >
                  &#8594;
                </button>
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-3"
                  aria-label="Close"
                  onClick={closeModal}
                  style={{ filter: "invert(1)", background: "#fff" }}
                ></button>
                {/* Image counter */}
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x mb-3 px-3 py-1 rounded-pill bg-dark text-white"
                  style={{ opacity: 0.85, fontSize: "1rem" }}
                >
                  {modalIndex + 1} / {modalImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NewsPage() {
  const { newsList, loading } = useNewsList();
  const location = useLocation();

  // Get the hash from the URL (e.g., "#5" => "5")
  const expandedId = location.hash ? location.hash.replace("#", "") : null;

  // Scroll to the expanded item with offset for header
  useEffect(() => {
    if (expandedId) {
      setTimeout(() => {
        const el = document.getElementById(expandedId);
        if (el) {
          const yOffset = -300; // Match your header height
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 350); // Wait for accordion to expand
    }
  }, [expandedId]);

  // Get all "Upcoming" section items from newsList
  const upcomingList = newsList.filter((item) => item.section === "Upcoming");

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <Spinner loading={loading} />
      <Navbar active="News" />
      <Header title="Latest News" />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
              News & Updates
            </div>
          </div>

          {/* Graduation Section */}
          <NewsSection section="Graduation" expandedId={expandedId} />

          {/* Award of Excellence Section */}
          <NewsSection section="Awards" expandedId={expandedId} />

          {/* Upcoming Projects Section */}
          {upcomingList.length > 0 &&
            upcomingList.map((upcoming) => (
              <div className="mb-5" key={upcoming.id}>
                <h2 className="mb-4 text-primary">
                  {upcoming.title || "🚀 What’s Next: Bold Ideas for Bigger Impact"}
                </h2>
                <div style={{ whiteSpace: "pre-line" }}>{upcoming.details}</div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NewsPage;
