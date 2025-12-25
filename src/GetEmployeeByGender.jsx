// src/components/GetEmployeeByGender.jsx
import { useState } from "react";
import API from "./api";
import "./GetEmployeeById.css";

function GetEmployeeByGender() {
  const [gender, setGender] = useState("");
  const [employees, setEmployees] = useState([]); // array for multiple results
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setEmployees([]);

    // 🔹 Normalize frontend value to match backend storage
    let normalizedGender = "";
    if (gender === "Male") normalizedGender = "M";
    else if (gender === "Female") normalizedGender = "F";
    else if (gender === "Other") normalizedGender = "Other";

    try {
      // Use params object for Axios GET
      const res = await API.get("/findByGender", {
        params: { gender: normalizedGender },
      });
      if (res.data.length === 0) {
        setError("No employees found for this gender.");
      } else {
        setEmployees(res.data);
      }
    } catch (err) {
      console.error(err.response || err);
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div className="edit-card">
      <h2>Search Employees by Gender</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label className="form-label">Employee Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success btn-custom">
          Search
        </button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

      {employees.length > 0 && (
        <div className="employee-details mt-4">
          <h4>Employee Details:</h4>
          {employees.map((emp) => (
            <div key={emp.id} className="employee-card">
              <p>
                <strong>ID:</strong> {emp.id}
              </p>
              <p>
                <strong>Name:</strong> {emp.name}
              </p>
              <p>
                <strong>Email:</strong> {emp.email}
              </p>
              <p>
                <strong>Department:</strong> {emp.dept}
              </p>
              <p>
                <strong>Salary:</strong> {emp.salary}
              </p>
              <p>
                <strong>Gender:</strong> {emp.gender}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetEmployeeByGender;
