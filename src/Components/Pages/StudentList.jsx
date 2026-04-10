import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";

// Example data structure with images
const studentsByYear = {
  2023: [
    { name: "Abebe Kebede", department: "Computer Science" },
    { name: "Sara Tesfaye", department: "Business Administration" },
    { name: "Musa Ahmed", department: "Civil Engineering" },
  ],
  2024: [
    { name: "Lily Solomon", department: "Accounting" },
    { name: "Yonas Mekonnen", department: "Mechanical Engineering" },
    { name: "Hanna Gebre", department: "Law" },
  ],
  2025: [
    { name: "Ben Yonas", department: "Software Engineering" },
    { name: "Mimi Alemu", department: "Nursing" },
    { name: "Kebede Fikru", department: "Economics" },
  ],
  // Add more years and students as needed
};

function StudentList() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const allYears = Object.keys(studentsByYear).sort((a, b) => b - a);
    setYears(allYears);

    // Collect all departments
    const deptSet = new Set();
    allYears.forEach((year) => {
      studentsByYear[year].forEach((student) => deptSet.add(student.department));
    });
    setDepartments(Array.from(deptSet).sort());
  }, []);

  // Filter students
  const filteredYears = selectedYear ? [selectedYear] : years;
  const filterStudents = (students) =>
    students.filter(
      (student) =>
        !selectedDept || student.department === selectedDept
    );

  return (
    <div>
      <Navbar active="Students" />
      <Header title="Yeben Students List" />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">
              Students & Graduates
            </div>
            <h2 className="mb-4 text-primary">Yeben Yearbook</h2>
            <p className="text-muted">
              Browse our students by graduation year and department. Filter to find your classmates!
            </p>
          </div>
          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <select
                className="form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-2">
              <select
                className="form-select"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Yearbook Cards */}
          {filteredYears.map((year) => {
            const students = filterStudents(studentsByYear[year]);
            if (students.length === 0) return null;
            return (
              <div key={year} className="mb-5">
                <h4 className="text-secondary mb-3">{year}</h4>
                <div className="row g-4">
                  {students.map((student, idx) => (
                    <div className="col-md-4 col-sm-6" key={idx}>
                      <div className="card shadow-sm border-0 h-100 yearbook-card">
                        <div
                          className="card-img-top d-flex justify-content-center align-items-center"
                          style={{
                            background: "#fff",
                            borderRadius: "16px",
                            overflow: "hidden",
                            height: "220px",
                            position: "relative",
                          }}
                        >
                          {/* Placeholder image with initials and yearbook theme */}
                          <div
                            style={{
                              width: "120px",
                              height: "120px",
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #ff9800 60%, #ffe0b2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "2.2rem",
                              fontWeight: "bold",
                              color: "#fff",
                              boxShadow: "0 4px 16px rgba(255,152,0,0.12)",
                              border: "4px solid #fff3e0",
                            }}
                          >
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="card-title mb-1">{student.name}</h5>
                          <p className="card-text text-muted mb-2">{student.department}</p>
                          <span className="badge bg-primary rounded-pill">{year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      {/* Yearbook theme styles */}
      <style>{`
        .yearbook-card {
          background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
          border-radius: 18px;
          transition: box-shadow 0.2s;
        }
        .yearbook-card:hover {
          box-shadow: 0 8px 32px rgba(255,152,0,0.18);
        }
      `}</style>
    </div>
  );
}

export default StudentList;
