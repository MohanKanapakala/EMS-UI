// src/components/GetEmployeeNameAndSalaryByDept.jsx
import { useState } from "react";
import API from "./api"; // axios instance with base URL
import "./GetEmployeeNameAndSalaryByDept.css";

function GetEmployeeNameAndSalaryByDept() {
  const [dept, setDept] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setEmployees([]);

    if (!dept) {
      setError("Please enter a department name.");
      return;
    }

    try {
      const response = await API.get("/nameandsalarybydept", {
        params: { dept },
      });

      if (response.data.length === 0) {
        setError(`No employees found in department: ${dept}`);
      } else {
        setEmployees(response.data);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="dept-name-salary-container">
      <h2>Search Employee Name & Salary by Department</h2>

      <form onSubmit={handleSearch} className="dept-form">
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            placeholder="Enter department"
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
              <th>Name</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetEmployeeNameAndSalaryByDept;
