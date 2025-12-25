// src/components/GetEmployeeNameAndSalary.jsx
import { useState } from "react";
import API from "./api"; // axios instance with base URL
import "./GetEmployeeNameAndSalary.css";

function GetEmployeeNameAndSalary() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setError("");
    setEmployees([]);

    try {
      const response = await API.get("/nameandsalary");
      if (response.data.length === 0) {
        setError("No employees found.");
      } else {
        setEmployees(response.data);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="name-salary-container">
      <h2>Employee Name & Salary List</h2>
      <button className="fetch-btn" onClick={handleFetch}>
        Get Employee Details
      </button>

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

export default GetEmployeeNameAndSalary;
