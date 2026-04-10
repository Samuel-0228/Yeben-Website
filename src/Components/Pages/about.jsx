import { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Header from "../Header";
import Footer from "../footer";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import React from "react";

import Drbebyam from "../../assets/img/DR_benyam.jpg"; // Ensure this path is correct

function Aboutpage() {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(null);
  const [statValues, setStatValues] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const statsRef = useRef(null);

  // Fetch About Us content from Firestore
  useEffect(() => {
    const fetchAbout = async () => {
      const docRef = doc(db, "about", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setAbout(snap.data());
        setStatValues(snap.data().stats ? snap.data().stats.map(() => 0) : []);
      }
      setLoading(false);
    };
    fetchAbout();
  }, []);

  // Animate stats when in view
  useEffect(() => {
    if (!about || !about.stats) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateStats();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [about, hasAnimated]);

  const animateStats = () => {
    about.stats.forEach((stat, idx) => {
      let start = 0;
      const end = Number(stat.value);
      const duration = 1200;
      const stepTime = Math.max(Math.floor(duration / end), 20);
      const increment = Math.ceil(end / (duration / stepTime));
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setStatValues((prev) => {
          const updated = [...prev];
          updated[idx] = start;
          return updated;
        });
      }, stepTime);
    });
  };

  if (loading || !about) return <Spinner loading={true} />;

  // Modal component
  const MemberModal = ({ member, onClose }) => {
    if (!member) return null;
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            maxWidth: "500px",
            width: "90%",
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={member.image}
            alt={member.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "16px",
              border: "3px solid #dee2e6",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <h3 className="text-primary text-center">{member.name}</h3>
          <p className="text-center">{member.role}</p>
          <div style={{ textAlign: "justify" }}>
            {member.bio || "No biography available."}
          </div>
        </div>
      </div>
    );
  };

  // Tooltip style
  const tooltipStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -120%)",
    background: "linear-gradient(90deg, #ff9800 60%, #ffb74d 100%)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    boxShadow: "0 4px 16px rgba(255,152,0,0.18)",
    zIndex: 10,
    pointerEvents: "none",
    whiteSpace: "nowrap",
    border: "2px solid #ffa726",
  };

  return (
    <div>
      <Spinner loading={loading} />
      <Navbar active="about" />
      <Header title="About Us" />

      {/* Vision, Mission, Goals */}
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
                  src={about.images?.visionMission || ""}
                  alt="Vision Mission"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="h-100">
                <h1 className="display-6 mb-5">Our Vision and Goals</h1>
                <div className="bg-light border-bottom border-5 border-primary rounded p-4 mb-4">
                  <h3 className="text-primary mb-2">Vision</h3>
                  <p
                    className="text-dark mb-3"
                    style={{ textAlign: "justify" }}
                  >
                    {about.vision}
                  </p>
                  <h3 className="text-primary mb-2">Mission</h3>
                  <p
                    className="text-dark mb-3"
                    style={{ textAlign: "justify" }}
                  >
                    {about.mission}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us - Main Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mt-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us - Mission Section with Patterned Images */}
      <div className="container-xxl py-5">
        <div className="container">
          {/* /* About Intro - Image Left, Content Right */}
          <div className="row g-5 align-items-center mb-4">
            {/* Image: hidden on small screens */}
            <div className="col-md-4 text-center d-none d-md-block">
              <img
                src={about.images?.aboutus || ""}
                alt="About YeBen"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "unset",
                  background: "none",
                  boxShadow: "none",
                  border: "none",
                  borderRadius: 0,
                }}
              />
            </div>
            {/* Text: full width on small screens */}
            <div className="col-md-8">
              <div className="bg-white rounded shadow p-4 h-100">
                <h3
                  className="text-center mb-3 d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3"
                  style={{ paddingTop: "10px" }}
                >
                  About Us
                </h3>
                <p className="mb-3" style={{ textAlign: "justify" }}>
                  <strong>{about.aboutStrong}</strong>
                </p>
                <p className="mb-3" style={{ textAlign: "justify" }}>
                  {about.aboutParagraph1}
                </p>
                <p className="mb-3" style={{ textAlign: "justify" }}>
                  {about.aboutParagraph2}
                </p>
                <p className="mb-3" style={{ textAlign: "justify" }}>
                  <em>{about.aboutus}</em>
                </p>
              </div>
            </div>
          </div>
          {/* Purpose - Content Left, Image Right */}
          <div className="row g-5 align-items-center mb-4 flex-md-row-reverse">
            <div className="col-md-8">
              <div className="bg-white rounded shadow p-4 h-100">
                <h3
                  className="text-center d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3"
                  style={{ paddingTop: "10px" }}
                >
                  Our Objective
                </h3>
                <ul className="mb-0" style={{ textAlign: "justify" }}>
                  {about.objective?.split("\n").map((line, idx) => (
                    <li className="mb-2" key={idx}>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-4 text-center d-none d-md-block">
              <img
                src={about.images?.about2 || ""}
                alt="Purpose"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "unset",
                  background: "none",
                  boxShadow: "none",
                  border: "none",
                  borderRadius: 0,
                }}
              />
            </div>
          </div>

          {/* Approach - Image Left, Content Right */}
          <div className="row g-5 align-items-center mb-4">
            <div className="col-md-4 text-center d-none d-md-block">
              <img
                src={about.images?.about1 || ""}
                alt="Approach"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "unset",
                  background: "none",
                  boxShadow: "none",
                  border: "none",
                  borderRadius: 0,
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="bg-white rounded shadow p-4 h-100">
                <h3
                  className="text-center mb-3 d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3"
                  style={{ paddingTop: "10px" }}
                >
                  Our Approach
                </h3>
                <p className="mb-0" style={{ textAlign: "justify" }}>
                  {about.approach}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-4 justify-content-center" ref={statsRef}>
        {about.stats?.map((stat, idx) => (
          <div className="col-6 col-md-3" key={stat.label}>
            <div className="bg-light rounded text-center p-4 h-100 shadow-sm">
              <div style={{ fontSize: "2.2rem" }}>{stat.icon}</div>
              <h2 className="text-primary mb-1" style={{ fontWeight: 700 }}>
                {statValues[idx]}
                {stat.suffix ? stat.suffix : ""}
              </h2>
              <div style={{ fontSize: "1rem", minHeight: "48px" }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <!-- Team Start --> */}
      {/* Team Members Section */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <div className="container-xxl py-5">
          <div className="container">
            {/* Dr. Benyam Asefa Tribute Section */}
            <div className="row align-items-center mb-5">
              <div className="col-md-4 text-center">
                <img
                  src={Drbebyam} // Update the path if needed
                  alt="Dr. Benyam Asefa"
                  className="img-thumbnail rounded-4 mb-3 shadow"
                  style={{
                    width: "320px",
                    height: "260px",
                    objectFit: "cover",
                    background: "#fff",
                    border: "4px solid #dee2e6",
                  }}
                />
              </div>
              <div className="col-md-8">
                <h2 className="text-primary mb-3">Dr. Benyam Asefa</h2>
                <p style={{ textAlign: "justify" }}>
                  Dr. Benyam Asefa was a dedicated Clinical Immunologist and
                  researcher, known for his pioneering work in HIV vaccine
                  research and cancer studies. He earned his PhD from McGill
                  University and contributed to science as a group leader,
                  professor, and mentor in the US. Born in Ethiopia and educated
                  in Africa and North America, Dr. Benyam is remembered for his
                  kindness, passion for learning, and commitment to helping
                  others. His impactful career was cut short in 2013, but his
                  legacy continues to inspire.
                </p>
              </div>
            </div>

            {/* Team Members Section */}
            <div
              className="text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: "500px" }}
            >
              <h1 className="display-5 fw-bold rounded-pill bg-secondary text-primary py-2 px-4 mb-3 text-center">
                Team Members
              </h1>
              <h4 className="fw-normal mb-5 text-center">
                Let's Meet Our Team
              </h4>
            </div>

            {/* Founder */}
            {about.team
              ?.filter((member) => member.role === "Founder")
              .map((member, idx) => (
                <div
                  key={idx}
                  className="row align-items-center mb-5 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="col-md-4 text-center">
                    <div
                      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedMember(member);
                        setModalOpen(true);
                      }}
                      onMouseEnter={() => setHoveredIdx(`founder-${idx}`)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      title="Click for more info"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="img-thumbnail rounded-4 mb-3 shadow"
                        style={{
                          width: "320px",
                          height: "260px",
                          objectFit: "cover",
                          background: "#fff",
                          border: "4px solid #dee2e6",
                        }}
                      />
                      {hoveredIdx === `founder-${idx}` && (
                        <div style={tooltipStyle}>
                          Click to view bio data
                        </div>
                      )}
                    </div>
                    <h4>{member.name}</h4>
                    <p className="text-primary">{member.role}</p>
                    <div className="mt-2 team-social-icons">
                      {member.social?.facebook &&
                        member.social.facebook.trim() && (
                          <a
                            href={member.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-2"
                          >
                            <i className="bi bi-facebook"></i>
                          </a>
                        )}
                      {member.social?.linkedin &&
                        member.social.linkedin.trim() && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-2"
                          >
                            <i className="bi bi-linkedin"></i>
                          </a>
                        )}
                      {member.social?.twitter &&
                        member.social.twitter.trim() && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="bi bi-twitter"></i>
                          </a>
                        )}
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h5>Biography</h5>
                    <p style={{ textAlign: "justify" }}>
                      {member.bio ||
                        `Meet Ms. Misrak Elias, the inspiring founder of the YeBen Endowment Fund. With over 30 years of experience advocating for gender equality and empowering youth, she's dedicated her life to creating opportunities for the next generation. She taught for over 15 years at AAU and the Southern African Management Institute, and she created Africa's first training program on integrating gender issues in development.

                          Nine years ago, Ms. Elias founded the YeBen Endowment Fund in memory of her son, Dr. Benyam Assefa. Since then, she has been tirelessly volunteering with YeBen Endowment Fund and other organizations across Ethiopia. Ms. Elias is the founder of MESA Development Solution and actively volunteers with NGOs in Ethiopia. She's also an active member of the Rotary Club of Addis Ababa West. She has served as a Global Advisor and UNICEF Representative to Jordan and South Africa.
`}
                    </p>
                  </div>
                </div>
              ))}

            {/* Board of Directors */}
            <h3 className="mb-4">Board of Directors</h3>
            <div className="row g-4 mb-5">
              {about.team
                ?.filter(
                  (member) =>
                    (member.role &&
                      member.role.toLowerCase().includes("director")) ||
                    member.role.toLowerCase().includes("board")
                )
                .map((member, idx) => (
                  <div
                    className="col-lg-3 col-md-6 wow fadeInUp"
                    data-wow-delay={`${0.1 + idx * 0.2}s`}
                    key={idx}
                  >
                    <div
                      className="team-item position-relative rounded overflow-hidden text-center"
                      style={{ cursor: "pointer", position: "relative" }}
                      onClick={() => {
                        setSelectedMember(member);
                        setModalOpen(true);
                      }}
                      onMouseEnter={() => setHoveredIdx(`bod-${idx}`)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      title="Click for more info"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="img-thumbnail rounded-circle mb-3 shadow"
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          background: "#fff",
                          objectPosition: "top",
                          border: "4px solid #dee2e6",
                        }}
                      />
                      {hoveredIdx === `bod-${idx}` && (
                        <div style={tooltipStyle}>
                          Click to view bio data
                        </div>
                      )}
                      <div className="team-text bg-light text-center p-4">
                        <h5>{member.name}</h5>
                        <p className="text-primary">{member.role}</p>
                        <div className="mt-2">
                          {member.social?.facebook && (
                            <a
                              href={member.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="me-2"
                            >
                              <i className="bi bi-facebook"></i>
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="me-2"
                            >
                              <i className="bi bi-linkedin"></i>
                            </a>
                          )}
                          {member.social?.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="bi bi-twitter"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* Modal for Board Member */}
            {modalOpen && (
              <MemberModal
                member={selectedMember}
                onClose={() => setModalOpen(false)}
              />
            )}

            {/* PR / Admins
            <h3 className="mb-4">PR / Admins</h3>
            <div className="row g-4">
              {about.team
                ?.filter(
                  member =>
                    !member.role?.toLowerCase().includes('director') &&
                   !member.role?.toLowerCase().includes('board member') &&
                    (member.role === 'PR' || member.role === 'Admin')
                )
                .map((member, idx) => (
                  <div
                    className="col-lg-3 col-md-6 wow fadeInUp"
                    data-wow-delay={`${0.1 + idx * 0.2}s`}
                    key={idx}
                  >
                    <div className="team-item position-relative rounded overflow-hidden">
                      <div className="overflow-hidden">
                        <img className="img-fluid" src={member.image} alt={member.name} />
                      </div>
                      <div className="team-text bg-light text-center p-4">
                        <h5>{member.name}</h5>
                        <p className="text-primary">{member.role}</p>
                        <div className="mt-2">
                          {member.social?.facebook && (
                            <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="me-2">
                              <i className="bi bi-facebook"></i>
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="me-2">
                              <i className="bi bi-linkedin"></i>
                            </a>
                          )}
                          {member.social?.twitter && (
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                              <i className="bi bi-twitter"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div> */}

            {/* Other Team Members */}
            {about.team?.filter(
              (member) =>
                member.role !== "Founder" &&
                !member.role?.toLowerCase().includes("director") &&
                !member.role?.toLowerCase().includes("board") &&
                member.role !== "PR" &&
                member.role !== "Admin"
            ).length > 0 && (
              <>
                <h3 className="mb-4">Other Team Members</h3>
                <div className="row g-4">
                  {about.team
                    .filter(
                      (member) =>
                        member.role !== "Founder" &&
                        !member.role?.toLowerCase().includes("director") &&
                        !member.role?.toLowerCase().includes("board") &&
                        member.role !== "PR" &&
                        member.role !== "Admin"
                    )
                    .map((member, idx) => (
                      <div
                        className="col-lg-3 col-md-6 wow fadeInUp"
                        data-wow-delay={`${0.1 + idx * 0.2}s`}
                        key={idx}
                      >
                        <div
                          className="team-item position-relative rounded overflow-hidden text-center"
                          style={{ cursor: "pointer", position: "relative" }}
                          onClick={() => {
                            setSelectedMember(member);
                            setModalOpen(true);
                          }}
                          onMouseEnter={() => setHoveredIdx(`other-${idx}`)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          title="Click for more info"
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="img-thumbnail rounded-circle mb-3 shadow"
                            style={{
                              width: "180px",
                              height: "180px",
                              objectFit: "cover",
                              objectPosition: "top",
                              background: "#fff",
                              border: "4px solid #dee2e6",
                            }}
                          />
                          {hoveredIdx === `other-${idx}` && (
                            <div style={tooltipStyle}>
                              Click to view bio data
                            </div>
                          )}
                          <div className="team-text bg-light text-center p-4">
                            <h5>{member.name}</h5>
                            <p className="text-primary">{member.role}</p>
                            <div className="mt-2 team-social-icons">
                              {member.social?.facebook && (
                                <a
                                  href={member.social.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="me-2"
                                >
                                  <i className="bi bi-facebook"></i>
                                </a>
                              )}
                              {member.social?.linkedin && (
                                <a
                                  href={member.social.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="me-2"
                                >
                                  <i className="bi bi-linkedin"></i>
                                </a>
                              )}
                              {member.social?.twitter && (
                                <a
                                  href={member.social.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="bi bi-twitter"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Aboutpage;
