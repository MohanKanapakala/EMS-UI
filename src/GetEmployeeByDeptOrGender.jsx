// src/components/GetEmployeeByDeptOrGender.jsx
import { useState } from "react";
import API from "./api"; // your axios instance with base URL
import "./GetEmployeeByDeptOrGender.css";

function GetEmployeeByDeptOrGender() {
  const [dept, setDept] = useState("");
  const [gender, setGender] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setEmployees([]);

    if (!dept && !gender) {
      setError("Please enter at least one value (department or gender)");
      return;
    }

    try {
      const response = await API.get(`/findByDeptOrGender`, {
        params: { dept, gender },
      });
      if (response.data.length === 0) {
        setError("No employees found for the given department or gender");
      } else {
        setEmployees(response.data);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="dept-or-gender-container">
      <h2>Search Employees by Department or Gender</h2>

      <form onSubmit={handleSearch} className="dept-or-gender-form">
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            placeholder="Enter department (optional)"
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter gender (optional)"
          />
        </div>

        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {employees.length > 0 && (
        <table className="result-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Salary</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.dept}</td>
                <td>{emp.gender}</td>
                <td>{emp.salary}</td>
                <td>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetEmployeeByDeptOrGender;
