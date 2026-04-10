import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer";

const defaultServices = [
  {
    title: "Financial Support for Students",
    description: "",
    image: "",
  },
  {
    title: "Life Transformation Training",
    description: "",
    image: "",
  },
  {
    title: "Supporting Innovation",
    description: "",
    image: "",
  },
];

export default function ServiceAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      const docRef = doc(db, "services", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setServices(snap.data().services || defaultServices);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_yeben");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/db6qrybnv/image/upload",
      formData
    );
    return res.data.secure_url;
  };

  const handleImageChange = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    const updated = [...services];
    updated[idx].image = url;
    setServices(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, "services", "main"), { services });
    setSaving(false);
    alert("Services updated!");
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-5" style={{ paddingTop: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">Admin: Edit Services Page</h2>
          <Link to="/admin" className="btn btn-outline-secondary">
            &larr; Back to Admin Dashboard
          </Link>
        </div>
        <form onSubmit={handleSave}>
          <div className="row g-4">
            {services.map((service, idx) => (
              <div className="col-md-12" key={idx}>
                <div className="card shadow-sm mb-3">
                  <div className="card-header bg-primary text-white fw-semibold">
                    Service {idx + 1}
                  </div>
                  <div className="card-body row">
                    <div className="col-md-4 mb-2">
                      <label className="form-label">Title</label>
                      <input
                        className="form-control"
                        value={service.title}
                        onChange={e => {
                          const updated = [...services];
                          updated[idx].title = e.target.value;
                          setServices(updated);
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={service.description}
                        onChange={e => {
                          const updated = [...services];
                          updated[idx].description = e.target.value;
                          setServices(updated);
                        }}
                      />
                    </div>
                    <div className="col-md-2 mb-2">
                      <label className="form-label">Icon/Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={e => handleImageChange(e, idx)}
                      />
                      {service.image && (
                        <img
                          src={service.image}
                          alt="Service"
                          className="mt-2 rounded"
                          style={{ width: 80, height: 80, objectFit: "cover" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-end mt-4">
            <button className="btn btn-primary btn-lg" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}