// src/components/GetEmployeeBySalaryRange.jsx
import { useState } from "react";
import API from "./api";
import "./GetEmployeeBySalaryRange.css";

function GetEmployeeBySalaryRange() {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (minSalary === "" || maxSalary === "") {
      setError("Please enter both minimum and maximum salary.");
      return;
    }

    try {
      const response = await API.get(`/search2`, {
        params: { minSalary, maxSalary },
      });
      setEmployees(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No employees found in this salary range or server error.");
      setEmployees([]);
    }
  };

  return (
    <div className="salary-container">
      <h2>Search Employees by Salary Range</h2>

      <div className="salary-inputs">
        <input
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Salary"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="employee-results">
        {employees.length > 0 ? (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.dept}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <p>No employees to display.</p>
        )}
      </div>
    </div>
  );
}

export default GetEmployeeBySalaryRange;
