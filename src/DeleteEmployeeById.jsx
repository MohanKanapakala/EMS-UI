import React, { useState } from "react";
import API from "./api";
import "./DeleteEmployeeById.css";

const DeleteEmployeeById = () => {
  const [empId, setEmpId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!empId.trim()) {
      setMessage("⚠️ Please enter a valid Employee ID");
      return;
    }

    // 🔔 CONFIRMATION ALERT
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete Employee with ID ${empId}?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setMessage("");

      await API.delete(`/${empId}`);

      setMessage(`✅ Employee with ID ${empId} deleted successfully.`);
      setEmpId("");
    } catch (error) {
      console.error("Error deleting employee:", error);
      if (error.response && error.response.status === 404) {
        setMessage("❌ Employee not found.");
      } else {
        setMessage("❌ Failed to delete employee. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-container">
      <h2 className="delete-title">Delete Employee By ID</h2>
      <form onSubmit={handleDelete} className="delete-form">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          className="delete-input"
        />
        <button type="submit" className="delete-btn" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
      </form>
      {message && <p className="delete-message">{message}</p>}
    </div>
  );
};

export default DeleteEmployeeById;
