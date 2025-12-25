import { useState } from "react";
import API from "./api"; // adjust path if needed
import "./PatchEmployee.css";

const PatchEmployee = () => {
  const [id, setId] = useState("");
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handlePatch = async (e) => {
    e.preventDefault();

    const patchData = {};

    if (employee.name) patchData.name = employee.name;
    if (employee.salary) patchData.salary = employee.salary;
    if (employee.department) patchData.dept = employee.department; // ✅ FIX
    if (employee.email) patchData.email = employee.email;

    try {
      const response = await API.patch(`/${id}`, patchData);
      alert("Employee updated partially");
      console.log(response.data);
    } catch (error) {
      console.error("Patch error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update employee");
    }
  };


  return (
    <div className="patch-container">
      <h2>Patch Employee</h2>

      <form onSubmit={handlePatch}>
        <input
          type="text"
          placeholder="Employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Name (optional)"
          value={employee.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={employee.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department (optional)"
          value={employee.department}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary (optional)"
          value={employee.salary}
          onChange={handleChange}
        />

        <button type="submit">Patch Employee</button>
      </form>
    </div>
  );
};

export default PatchEmployee;
