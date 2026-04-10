import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Footer from "../footer";

const defaultStats = [
  { icon: "🔧", label: "Trainings conducted", value: 0 },
  { icon: "👩‍🎓", label: "Students enrolled", value: 0 },
  { icon: "🎓", label: "Students supported yearly", value: 0 },
  { icon: "🧡", label: "Sponsored by YeBen yearly", value: 0 },
  { icon: "📆", label: "Years of program activity (1-year COVID break)", value: 0 },
  { icon: "👨‍👩‍👧‍👦", label: "Total YeBen students", value: 0 },
  { icon: "✅", label: "Graduated students", value: 0 },
  { icon: "🏅", label: "Excellence awardees", value: 0 }
];

export default function AdminAboutUs() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    vision: "",
    mission: "",
    aboutText: "",
    objective: "",
    approach: "",
    stats: defaultStats,
    images: {
      visionMission: "",
      aboutus: "",
      about1: "",
      about2: "",
      about3: "",
      missionImage: ""
    },
    team: [
      { name: "", role: "", image: "", social: {}, bio: "" }
    ],
  });

  useEffect(() => {
    const fetchAbout = async () => {
      const docRef = doc(db, "about", "main");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        let stats = defaultStats.map((def, i) =>
          data.stats && data.stats[i]
            ? { ...def, ...data.stats[i] }
            : def
        );
        setForm({
          ...data,
          stats,
        });
      }
      setLoading(false);
    };
    fetchAbout();
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

  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    setForm((prev) => ({
      ...prev,
      images: { ...prev.images, [key]: url },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, "about", "main"), form);
    setSaving(false);
    alert("About Us updated!");
  };

  const handleAddTeamMember = () => {
    setForm((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", role: "", image: "", social: {}, bio: "" }],
    }));
  };

  const handleRemoveTeamMember = (idx) => {
    setForm((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== idx),
    }));
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, "about", "main"), { team: form.team }, { merge: true });
    setSaving(false);
    alert("Team members updated!");
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-5" style={{ paddingTop: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">Admin: Edit About Us Page</h2>
          <Link to="/admin" className="btn btn-outline-secondary">
            &larr; Back to Admin Dashboard
          </Link>
        </div>
        <form onSubmit={handleSave}>
          <div className="row g-4">
            {/* Vision & Mission */}
            <div className="col-md-6">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-primary text-white fw-semibold">Vision</div>
                <div className="card-body">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    value={form.vision}
                    onChange={(e) => setForm({ ...form, vision: e.target.value })}
                  />
                  <label className="form-label mt-2">Vision Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={e => handleImageChange(e, "visionMission")}
                  />
                  {form.images.visionMission && (
                    <img
                      src={form.images.visionMission}
                      alt="Vision"
                      className="mt-2 rounded"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-primary text-white fw-semibold">Mission</div>
                <div className="card-body">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    value={form.mission}
                    onChange={(e) => setForm({ ...form, mission: e.target.value })}
                  />
                  <label className="form-label mt-2">Mission Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={e => handleImageChange(e, "missionImage")}
                  />
                  {form.images.missionImage && (
                    <img
                      src={form.images.missionImage}
                      alt="Mission"
                      className="mt-2 rounded"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* About Us */}
            <div className="col-md-12">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-secondary text-white fw-semibold">About Us</div>
                <div className="card-body">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    value={form.aboutus}
                    onChange={(e) => setForm({ ...form, aboutus: e.target.value })}
                  />
                  <label className="form-label mt-2">About Us Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={e => handleImageChange(e, "aboutus")}
                  />
                  {form.images.aboutus && (
                    <img
                      src={form.images.aboutus}
                      alt="About Us"
                      className="mt-2 rounded"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Objective & Approach */}
            <div className="col-md-6">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white fw-semibold">Objective</div>
                <div className="card-body">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    value={form.objective}
                    onChange={(e) => setForm({ ...form, objective: e.target.value })}
                  />
                  <label className="form-label mt-2">Objective Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={e => handleImageChange(e, "about2")}
                  />
                  {form.images.about2 && (
                    <img
                      src={form.images.about2}
                      alt="Objective"
                      className="mt-2 rounded"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-info text-white fw-semibold">Approach</div>
                <div className="card-body">
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    value={form.approach}
                    onChange={(e) => setForm({ ...form, approach: e.target.value })}
                  />
                  <label className="form-label mt-2">Approach Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={e => handleImageChange(e, "about1")}
                  />
                  {form.images.about1 && (
                    <img
                      src={form.images.about1}
                      alt="Approach"
                      className="mt-2 rounded"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Statistics */}
            <div className="col-md-12">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-success text-white fw-semibold">Statistics</div>
                <div className="card-body">
                  {form.stats.map((stat, idx) => (
                    <div key={idx} className="row align-items-center mb-2">
                      <div className="col-2">
                        <input
                          className="form-control"
                          value={stat.icon}
                          onChange={e => {
                            const stats = [...form.stats];
                            stats[idx].icon = e.target.value;
                            setForm({ ...form, stats });
                          }}
                          placeholder="Icon"
                        />
                      </div>
                      <div className="col-6">
                        <input
                          className="form-control"
                          value={stat.label}
                          onChange={e => {
                            const stats = [...form.stats];
                            stats[idx].label = e.target.value;
                            setForm({ ...form, stats });
                          }}
                          placeholder="Label"
                        />
                      </div>
                      <div className="col-2">
                        <input
                          type="number"
                          className="form-control"
                          value={stat.value}
                          onChange={e => {
                            const stats = [...form.stats];
                            stats[idx].value = Number(e.target.value);
                            setForm({ ...form, stats });
                          }}
                          placeholder="Value"
                        />
                      </div>
                      <div className="col-2">
                        <input
                          className="form-control"
                          value={stat.suffix || ""}
                          onChange={e => {
                            const stats = [...form.stats];
                            stats[idx].suffix = e.target.value;
                            setForm({ ...form, stats });
                          }}
                          placeholder="Suffix"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Team Members */}
            <div className="col-md-12">
              <div className="card shadow-sm mb-3">
                <div className="card-header bg-dark text-white fw-semibold d-flex justify-content-between align-items-center">
                  <span>Team Members</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-light"
                    onClick={handleAddTeamMember}
                  >
                    + Add Member
                  </button>
                </div>
                <div className="card-body">
                  {form.team.map((member, idx) => (
                    <div key={idx} className="row align-items-end border rounded p-3 mb-3 bg-light">
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Name</label>
                        <input
                          className="form-control"
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) => {
                            const team = [...form.team];
                            team[idx].name = e.target.value;
                            setForm({ ...form, team });
                          }}
                        />
                      </div>
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Role</label>
                        <input
                          className="form-control"
                          placeholder="Role"
                          value={member.role}
                          onChange={(e) => {
                            const team = [...form.team];
                            team[idx].role = e.target.value;
                            setForm({ ...form, team });
                          }}
                        />
                      </div>
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const url = await uploadToCloudinary(file);
                            const team = [...form.team];
                            team[idx].image = url;
                            setForm({ ...form, team });
                          }}
                        />
                        {member.image && (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="mt-2 rounded"
                            style={{ width: 60, height: 60, objectFit: "cover" }}
                          />
                        )}
                      </div>
                      <div className="col-md-2 mb-2">
                        <label className="form-label">Social</label>
                        <input
                          className="form-control mb-1"
                          placeholder="Facebook URL"
                          value={member.social?.facebook || ""}
                          onChange={e => {
                            const team = [...form.team];
                            team[idx].social = { ...team[idx].social, facebook: e.target.value };
                            setForm({ ...form, team });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="LinkedIn URL"
                          value={member.social?.linkedin || ""}
                          onChange={e => {
                            const team = [...form.team];
                            team[idx].social = { ...team[idx].social, linkedin: e.target.value };
                            setForm({ ...form, team });
                          }}
                        />
                        <input
                          className="form-control"
                          placeholder="Twitter URL"
                          value={member.social?.twitter || ""}
                          onChange={e => {
                            const team = [...form.team];
                            team[idx].social = { ...team[idx].social, twitter: e.target.value };
                            setForm({ ...form, team });
                          }}
                        />
                      </div>
                      <div className="col-md-12 mb-2">
                        <label className="form-label">Bio</label>
                        <textarea
                          className="form-control"
                          placeholder="Biography / History"
                          rows={3}
                          value={member.bio || ""}
                          onChange={e => {
                            const team = [...form.team];
                            team[idx].bio = e.target.value;
                            setForm({ ...form, team });
                          }}
                        />
                      </div>
                      <div className="col-md-1 mb-2 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm w-100"
                          onClick={() => handleRemoveTeamMember(idx)}
                          disabled={form.team.length === 1}
                          title="Remove"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleSaveTeam}
                    disabled={saving}
                    type="button"
                  >
                    {saving ? "Saving..." : "Save Team Changes"}
                  </button>
                </div>
              </div>
            </div>
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