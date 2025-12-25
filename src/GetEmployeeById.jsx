// src/components/GetEmployeeById.jsx
import { useState } from "react";
import API from "./api";
import "./GetEmployeeById.css";

function GetEmployeeById() {
  const [id, setId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setEmployee(null);

    try {
      const res = await API.get(`/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.error(err.response || err);
      setError(
        err.response?.data?.message || "Employee not found or server error"
      );
    }
  };

  return (
    <div className="edit-card">
      <h2>Search Employee by ID</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter employee ID"
            required
          />
        </div>
        <button type="submit" className="btn btn-success btn-custom">
          Search
        </button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

      {employee && (
        <div className="employee-details mt-4">
          <h4>Employee Details:</h4>
          <p>
            <strong>ID:</strong> {employee.id}
          </p>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Department:</strong> {employee.dept}
          </p>
          <p>
            <strong>Salary:</strong> {employee.salary}
          </p>
          {employee.gender && (
            <p>
              <strong>Gender:</strong> {employee.gender}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default GetEmployeeById;
