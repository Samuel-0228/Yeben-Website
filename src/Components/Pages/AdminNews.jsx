// src/pages/AdminDashboard.js
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  documentId,
} from "firebase/firestore";

import axios from "axios";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";

export default function AdminNews() {
  const [newsList, setNewsList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    year: "",
    summary: "",
    details: "",
    section: "Graduation",
    image: "",
    anchor: "",
  });
  const [imageFiles, setImageFiles] = useState([]); // <-- for multiple images
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const cardRefs = useRef({});

  const fetchNews = async () => {
    setLoading(true);
    const newsRef = collection(db, "news");
    const q = query(newsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      documentId: doc.id, // Use documentId instead of id
      ...doc.data(),
    }));
    setNewsList(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Cloudinary upload helper
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_yeben"); // your unsigned preset
    // No need for API key/secret or cloud_name in formData

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/db6qrybnv/image/upload", // replace 'yeben' with your Cloudinary cloud name if different
      formData
    );
    return res.data.secure_url;
  };

  // Cloudinary upload helper for multiple files
  const uploadMultipleToCloudinary = async (files) => {
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_yeben");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/db6qrybnv/image/upload",
        formData
      );
      urls.push(res.data.secure_url);
    }
    return urls;
  };

  const addNews = async () => {
    const { title, year, summary, details, section, anchor } = form;
    if (!title || !year || !summary || !details || !section) return;
    let imageArr = [];
    if (imageFiles.length > 0) {
      imageArr = await uploadMultipleToCloudinary(imageFiles);
    } else if (form.image) {
      imageArr = Array.isArray(form.image) ? form.image : [form.image];
    }
    await addDoc(collection(db, "news"), {
      title,
      year,
      summary,
      details,
      section,
      image: imageArr,
      anchor,
      timestamp: serverTimestamp(),
    });
    resetForm();
    setTimeout(fetchNews, 700);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    const { title, year, summary, details, section, anchor } = form;
    if (!title || !year || !summary || !details || !section) return;
    let imageArr = [];
    if (imageFiles.length > 0) {
      imageArr = await uploadMultipleToCloudinary(imageFiles);
    } else if (form.image) {
      imageArr = Array.isArray(form.image) ? form.image : [form.image];
    }
    await addDoc(collection(db, "news"), {
      title,
      year,
      summary,
      details,
      section,
      image: imageArr,
      anchor,
      timestamp: serverTimestamp(),
    });
    resetForm();
    setShowAddModal(false);
    setImageFiles([]);
    setTimeout(fetchNews, 700);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    const { title, year, summary, details, section, anchor, image } = form;
    let imageArr = Array.isArray(image) ? image : image ? [image] : [];
    if (imageFiles.length > 0) {
      imageArr = await uploadMultipleToCloudinary(imageFiles);
    }
    await updateDoc(doc(db, "news", editingId), {
      title: title ?? "",
      year: year ?? "",
      summary: summary ?? "",
      details: details ?? "",
      section: section ?? "Graduation",
      image: imageArr,
      anchor: anchor ?? "",
    });
    resetForm();
    setShowEditModal(false);
    setImageFiles([]);
    fetchNews();
  };

  const startEdit = (news) => {
    setEditingId(news.documentId);
    setForm({
      title: news.title || "",
      year: news.year || "",
      summary: news.summary || "",
      details: news.details || "",
      section: news.section || "Graduation",
      image: news.image || [],
      anchor: news.anchor || "",
    });
    setImageFiles([]);
    setShowEditModal(true);
  };

  const cancelEdit = () => {
    resetForm();
    setShowEditModal(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      year: "",
      summary: "",
      details: "",
      section: "Graduation",
      image: [],
      anchor: "",
    });
    setImageFiles([]);
  };

  const deleteNews = async (documentId) => {
    await deleteDoc(doc(db, "news", documentId));
    fetchNews();
  };

  return (
    <div>
      <Spinner loading={loading} />
      <Navbar />
      {/* <Header title="Admin News Page" /> */}

      <div className="container my-4 mt-5" style={{ marginTop: "110px" }}>
        <h2 className="mb-4 text-center">Manage News Articles</h2>

        <div className="mb-3 text-end">
          <button
            className="btn btn-success"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
          >
            + Add News
          </button>
        </div>

        <h3 className="text-center mb-3">All News</h3>
        <div className="card shadow-sm">
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0">News List</h5>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status" />
              </div>
            ) : newsList.length === 0 ? (
              <div className="text-center py-4 text-muted">No news found.</div>
            ) : (
              <table className="table mb-0 table-hover align-middle">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Section</th>
                    <th style={{ width: 160 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((news) => (
                    <tr key={news.documentId}>
                      <td>{news.title}</td>
                      <td>{news.year}</td>
                      <td>{news.section}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => startEdit(news)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteNews(news.documentId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add News Modal */}
      {showAddModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <form className="modal-content" onSubmit={handleAddNews}>
              <div className="modal-header">
                <h5 className="modal-title">Add News</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input
                    className="form-control"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Section</label>
                  <select
                    className="form-select"
                    value={form.section}
                    onChange={(e) =>
                      setForm({ ...form, section: e.target.value })
                    }
                  >
                    <option value="Graduation">Graduation</option>
                    <option value="Awards">Awards</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <input
                    className="form-control"
                    value={form.summary}
                    onChange={(e) =>
                      setForm({ ...form, summary: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Anchor</label>
                  <input
                    className="form-control"
                    value={form.anchor}
                    onChange={(e) =>
                      setForm({ ...form, anchor: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Images</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(Array.from(e.target.files))}
                  />
                  {imageFiles.length > 0 && (
                    <div className="mt-2">
                      {imageFiles.map((file, idx) => (
                        <span key={idx} className="badge bg-info text-dark me-1">
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Details</label>
                  <textarea
                    className="form-control"
                    value={form.details}
                    onChange={(e) =>
                      setForm({ ...form, details: e.target.value })
                    }
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" type="submit">
                  Add News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <form
              className="modal-content"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
              onSubmit={saveEdit}
            >
              <div className="modal-header">
                <h5 className="modal-title">Edit News</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelEdit}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input
                    className="form-control"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Section</label>
                  <select
                    className="form-select"
                    value={form.section}
                    onChange={(e) =>
                      setForm({ ...form, section: e.target.value })
                    }
                  >
                    <option value="Graduation">Graduation</option>
                    <option value="Awards">Awards</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <input
                    className="form-control"
                    value={form.summary}
                    onChange={(e) =>
                      setForm({ ...form, summary: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Anchor</label>
                  <input
                    className="form-control"
                    value={form.anchor}
                    onChange={(e) =>
                      setForm({ ...form, anchor: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Images</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(Array.from(e.target.files))}
                  />
                  {Array.isArray(form.image) && form.image.length > 0 && !imageFiles.length && (
                    <div className="mt-2">
                      {form.image.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt=""
                          className="img-fluid rounded me-2 mb-1"
                          style={{ maxHeight: 80 }}
                        />
                      ))}
                    </div>
                  )}
                  {imageFiles.length > 0 && (
                    <div className="mt-2">
                      {imageFiles.map((file, idx) => (
                        <span key={idx} className="badge bg-info text-dark me-1">
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Details</label>
                  <textarea
                    className="form-control"
                    value={form.details}
                    onChange={(e) =>
                      setForm({ ...form, details: e.target.value })
                    }
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button className="btn btn-success" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
