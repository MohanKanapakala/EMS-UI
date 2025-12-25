import { useState } from "react";
import API from "./api";
import "./UpdateEmployeeName.css";

const UpdateEmployeeName = () => {
  const [id, setId] = useState("");
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

  const handleUpdateName = async (e) => {
    e.preventDefault();

    if (!id.trim() || !oldName.trim() || !newName.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await API.patch(`/${id.trim()}/update-name`, null, {
        params: {
          oldName: oldName.trim(),
          newName: newName.trim(),
        },
      });

      alert(response.data);

      // optional reset
      setOldName("");
      setNewName("");
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      alert(error.response?.data || "Failed to update employee name");
    }
  };

  return (
    <div className="update-name-container">
      <h2>Update Employee Name</h2>

      <form onSubmit={handleUpdateName}>
        <input
          type="text"
          placeholder="Employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Old Name"
          value={oldName}
          onChange={(e) => setOldName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />

        <button type="submit">Update Name</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeName;
