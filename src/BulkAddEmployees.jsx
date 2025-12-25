import React, { useState } from "react";
import API from "./api"; // using your api.js
import "./BulkAddEmployees.css";

const BulkAddEmployees = () => {
  const [employees, setEmployees] = useState([
    { name: "", department: "", salary: "", email: "" },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Add new empty row
  const addEmployeeRow = () => {
    setEmployees([
      ...employees,
        { name: "", department: "", salary: "", gender:"", email: "" },
    ]);
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...employees];
    updated[index][field] = value;
    setEmployees(updated);
  };

  // Remove a row
  const removeEmployeeRow = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  // Upload JSON file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (Array.isArray(data)) setEmployees(data);
          else setError("Invalid JSON format. Must be an array of employees.");
        } catch {
          setError("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    } else {
      setError("Please upload a valid JSON file.");
    }
  };

  // Submit bulk data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await API.post("/bulk", employees);
      setMessage(`✅ ${res.data.length} employees saved successfully!`);
      setEmployees([{ name: "", dept: "", salary: "", gender: "", email: "" }]);
    } catch (err) {
      console.error("Bulk upload failed:", err);
      setError("❌ Failed to save employees. Check console for details.");
    }
  };

  return (
    <div className="bulk-container">
      <h2 className="page-title">Bulk Add Employees</h2>

      {message && <div className="success-msg">{message}</div>}
      {error && <div className="error-msg">{error}</div>}

      <form className="bulk-form" onSubmit={handleSubmit}>
        <div className="file-upload">
          <label className="upload-label">
            📂 Upload JSON File:
            <input type="file" accept=".json" onChange={handleFileUpload} />
          </label>
        </div>

        <div className="employees-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={emp.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      placeholder="Employee Name"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={emp.dept}
                      onChange={(e) =>
                        handleChange(index, "dept", e.target.value)
                      }
                      placeholder="Department"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={emp.salary}
                      onChange={(e) =>
                        handleChange(index, "salary", e.target.value)
                      }
                      placeholder="Salary"
                      required
                    />
                  </td>
                  <td>
                    <select
                      name="gender"
                      value={emp.gender}
                      onChange={(e) =>
                        handleChange(index, "gender", e.target.value)
                      }
                      placeholder="Gender"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="email"
                      value={emp.email}
                      onChange={(e) =>
                        handleChange(index, "email", e.target.value)
                      }
                      placeholder="Email"
                      required
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeEmployeeRow(index)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="actions">
          <button type="button" className="add-btn" onClick={addEmployeeRow}>
            ➕ Add Row
          </button>
          <button type="submit" className="submit-btn">
            🚀 Submit All
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkAddEmployees;
