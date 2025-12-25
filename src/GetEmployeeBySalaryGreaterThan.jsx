// src/components/GetEmployeeBySalaryGreaterThan.jsx
import { useState } from "react";
import API from "./api"; // axios instance with base URL
import "./GetEmployeeBySalaryGreaterThan.css";

function GetEmployeeBySalaryGreaterThan() {
  const [salary, setSalary] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setEmployees([]);

    if (!salary) {
      setError("Please enter a salary amount.");
      return;
    }

    try {
      const response = await API.get("/findBySalaryGreaterThan", {
        params: { salary },
      });
      if (response.data.length === 0) {
        setError("No employees found with salary greater than " + salary);
      } else {
        setEmployees(response.data);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="salary-container">
      <h2>Search Employees by Salary Greater Than</h2>

      <form onSubmit={handleSearch} className="salary-form">
        <div className="form-group">
          <label>Enter Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter minimum salary"
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

export default GetEmployeeBySalaryGreaterThan;
