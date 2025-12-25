// src/components/AddEmployee.jsx
import { useState } from "react";
import API from "./api";
import "./AddEmployee.css"; // Use the same styling file below

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    dept: "",
    gender: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...employee, salary: parseFloat(employee.salary) };
      await API.post("/save", payload);
      alert("Employee added successfully!");
      setEmployee({ name: "", email: "", dept: "", gender: "", salary: "" });
    } catch (err) {
      console.error(err.response || err);
      alert("Error: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="edit-card">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="dept"
            value={employee.dept}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter department"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            value={employee.gender}
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
        <div className="mb-4">
          <label className="form-label">Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter salary"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success btn-custom">
            Add Employee
          </button>
          <button
            type="reset"
            className="btn btn-secondary btn-custom"
            onClick={() =>
              setEmployee({
                name: "",
                email: "",
                dept: "",
                gender: "",
                salary: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
