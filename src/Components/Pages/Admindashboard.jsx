import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Spinner from "../Spinner"; 

export default function AdminDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    const q = query(collection(db, "news"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNewsList(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  const sections = [
    { title: "News", route: "/admin/news", icon: "bi-newspaper" },
    { title: "Services", route: "/admin/service", icon: "bi-gear-fill" }, // <-- updated route
    { title: "About Us", route: "/admin/about", icon: "bi-info-circle-fill" },
    { title: "Contact Us", route: "/admin/contact", icon: "bi-envelope-fill" },
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-primary">
          <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
        </h1>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row g-4">
          {sections.map((section, index) => (
            <div className="col-md-6 col-xl-3" key={index}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <div>
                    <i className={`bi ${section.icon} display-4 text-primary mb-3`}></i>
                    <h5 className="card-title">{section.title}</h5>
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate(section.route)}
                  >
                    Manage {section.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
