import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function ServicePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const serviceRefs = useRef([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const docRef = doc(db, "services", "main");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (err) {
        console.error("Error loading services:", err);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (id && serviceRefs.current[id]) {
      serviceRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [id, services]);

  if (loading) return <Spinner loading={loading} />;

  return (
    <div>
      <Navbar active="Causes" />
      <Header title="Service Details" />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <h1 className="display-5 fw-bold text-primary mb-3">Our Services</h1>
            <p className="text-muted fs-5">
              Discover how we empower students and drive long-lasting impact.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {services.map((service, idx) => (
              <div
                className="col-lg-10"
                key={idx}
                ref={(el) => (serviceRefs.current[idx] = el)}
                id={`service-${idx}`}
              >
                <div
                  className="bg-white shadow-lg rounded-4 p-4 p-md-5 mb-4 transition hover-shadow"
                  style={{
                    transition: "all 0.3s ease",
                    borderLeft: "6px solid #fd7e14",
                  }}
                >
                  <h3 className="text-primary mb-3">{service.title}</h3>
                  {service.description ? (
                    <div className="text-dark fs-5" style={{ lineHeight: "1.7" }}>
                      {service.description.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No description provided.</p>
                  )}
                  <div className="mt-3">
                  
                  </div>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="text-center text-muted fs-5">
                No services found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServicePage;
