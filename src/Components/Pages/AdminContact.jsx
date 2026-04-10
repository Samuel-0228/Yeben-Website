import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer";

const defaultContact = {
  address: "",
  phone: "",
  email: "",
  map: "",
  description: "",
};

export default function AdminContact() {
  const [form, setForm] = useState(defaultContact);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contact", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) setForm({ ...defaultContact, ...snap.data() });
      setLoading(false);
    };
    fetchContact();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, "contact", "main"), form);
    setSaving(false);
    alert("Contact info updated!");
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-5" style={{ paddingTop: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">Admin: Edit Contact Page</h2>
          <Link to="/admin" className="btn btn-outline-secondary">
            &larr; Back to Admin Dashboard
          </Link>
        </div>
        <form onSubmit={handleSave}>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-secondary text-white fw-semibold">Contact Info</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Google Map Embed Link</label>
                <input
                  className="form-control"
                  value={form.map}
                  onChange={e => setForm({ ...form, map: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="text-end">
            <button className="btn btn-primary btn-lg" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}