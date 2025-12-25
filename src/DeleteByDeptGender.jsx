// src/components/DeleteByDeptGender.jsx
import React, { useState } from "react";
import API from "./api";
import "./DeleteEmployeeById.css"; // Reuse existing CSS

const DeleteByDeptGender = () => {
  const [dept, setDept] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!dept || !gender) {
            setMessage("⚠️ Please select both department and gender.");
            return;
        }

        if (
            !window.confirm(
                `⚠️ Are you sure you want to delete all ${gender} employees in ${dept} department?`
            )
        ) {
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const response = await API.delete("/delbydeptgender", { params: { dept, gender } });
            setMessage(`✅ ${response.data}`);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                setMessage("❌ No employees found to delete.");
            } else {
                setMessage("❌ Failed to delete employees. Try again later.");
            }
        }
    }

  return (
    <div className="delete-container">
      <h2 className="delete-title">Delete Employees By Department & Gender</h2>
      <form onSubmit={handleDelete} className="delete-form">
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="delete-input"
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="delete-input"
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
        <button type="submit" className="delete-btn" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
      </form>
      {message && <p className="delete-message">{message}</p>}
    </div>
  );
};

export default DeleteByDeptGender;
