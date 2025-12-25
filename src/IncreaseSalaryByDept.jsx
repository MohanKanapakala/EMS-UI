import { useState } from "react";
import API from "./api"; // adjust path if needed
import "./IncreaseSalaryByDept.css";

const IncreaseSalaryByDept = () => {
  const [dept, setDept] = useState("");
  const [percent, setPercent] = useState("");

  const handleIncreaseSalary = async (e) => {
    e.preventDefault();

    try {
      const response = await API.patch("/increase-salary", null, {
        params: {
          dept: dept,
          percent: percent,
        },
      });

      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to update salaries");
    }
  };

  return (
    <div className="salary-container">
      <h2>Increase Salary by Department</h2>

      <form onSubmit={handleIncreaseSalary}>
        <input
          type="text"
          placeholder="Department (e.g. IT, HR)"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Increase Percentage"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          required
        />

        <button type="submit">Increase Salary</button>
      </form>
    </div>
  );
};

export default IncreaseSalaryByDept;
