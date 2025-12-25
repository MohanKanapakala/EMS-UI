import { useState } from "react";
import API from "./api"; // Adjust path as needed
import "./UpdateEmployee.css";

const UpdateEmployee = ({ employeeData, onUpdateSuccess }) => {
  const [id, setId] = useState(employeeData.id);
  const [employee, setEmployee] = useState({
    name: employeeData.name || "",
    email: employeeData.email || "",
    department: employeeData.dept || "",
    gender:employeeData.gender || "",
    salary: employeeData.salary || "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      name: employee.name || "",
      email: employee.email || "",
      dept: employee.department || "",
      salary: employee.salary || "",
      gender: employee.gender || "",
    };

    try {
      const response = await API.put(`/${id}`, payload);
      alert("Employee updated successfully");
      console.log(response.data);

      if (onUpdateSuccess) {
        onUpdateSuccess(); // 🔥 refresh + close modal
      }
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update employee");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Employee</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          disabled
        />

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={employee.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={employee.gender}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
        />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
