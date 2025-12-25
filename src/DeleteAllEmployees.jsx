// src/components/DeleteAllEmployees.jsx
import React, { useState } from "react";
import API from "./api";
import "./DeleteEmployeeById.css"; // can reuse same styles

const DeleteAllEmployees = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete ALL employees?"))
      return;

    try {
      setLoading(true);
      setMessage("");

      await API.delete("/deleteAll");
      setMessage("✅ All employees have been deleted successfully.");
    } catch (error) {
      console.error("Error deleting all employees:", error);
      setMessage("❌ Failed to delete all employees. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-container">
      <h2 className="delete-title">Delete All Employees</h2>
      <button
        className="delete-btn"
        onClick={handleDeleteAll}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete All"}
      </button>
      {message && <p className="delete-message">{message}</p>}
    </div>
  );
};

export default DeleteAllEmployees;
