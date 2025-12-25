// src/components/GetEmployeeBySalaryLessThan.jsx
import { useState } from "react";
import API from "./api"; // your axios instance with base URL
import "./GetEmployeeBySalaryLessThan.css";

function GetEmployeeBySalaryLessThan() {
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
      const response = await API.get("/findBySalaryLessThan", {
        params: { salary },
      });

      if (response.data.length === 0) {
        setError(`No employees found with salary less than ${salary}`);
      } else {
        setEmployees(response.data);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="salaryless-container">
      <h2>Search Employees by Salary Less Than</h2>

      <form onSubmit={handleSearch} className="salaryless-form">
        <div className="form-group">
          <label>Enter Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter maximum salary"
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

export default GetEmployeeBySalaryLessThan;
