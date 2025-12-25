// src/components/GetEmployeeByDeptAndGender.jsx
import { useState } from "react";
import API from "./api"; // your base URL axios instance
import "./GetEmployeeByDeptAndGender.css";

function GetEmployeeByDeptAndGender() {
  const [dept, setDept] = useState("");
  const [gender, setGender] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setEmployees([]);

    if (!dept || !gender) {
      setError("Please enter both department and gender");
      return;
    }

    try {
      const response = await API.get(`/findByDeptAndGender`, {
        params: { dept, gender },
      });
      if (response.data.length === 0) {
        setError("No employees found for the given department and gender");
      } else {
        setEmployees(response.data);
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="dept-gender-container">
      <h2>Search Employees by Department and Gender</h2>
      <form onSubmit={handleSearch} className="dept-gender-form">
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            placeholder="Enter department(Allow only Developer/Tester/HR)"
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter gender (Allow only M/F)"
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

export default GetEmployeeByDeptAndGender;
