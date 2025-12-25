// src/components/GetAllEmployees.jsx
import { useEffect, useState } from "react";
import API from "./api";
import "./GetAllEmployees.css";
import UpdateEmployee from "./UpdateEmployee"; // Reuse your UpdateEmployee form

function GetAllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null); // employee to edit
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const fetchEmployees = () => {
    API.get("/getall")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditClick = (emp) => {
    setEditingEmployee(emp);
    setShowUpdateForm(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setEditingEmployee(null);
    fetchEmployees(); // refresh the list
  };

  return (
    <div className="employees-container">
      <h3 className="employees-title">All Employees</h3>

      {employees.length === 0 ? (
        <p className="no-data">No employees found.</p>
      ) : (
        <table className="employees-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Actions</th>
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
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(emp)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showUpdateForm && editingEmployee && (
        <div className="update-modal">
          <div className="update-modal-content">
            <h2>Edit Employee</h2>
            <UpdateEmployee
              employeeData={editingEmployee}
              onUpdateSuccess={handleUpdateSuccess}
            />
            <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllEmployees;
