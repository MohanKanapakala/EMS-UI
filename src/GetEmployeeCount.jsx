// src/components/GetEmployeeCount.jsx
import { useState } from "react";
import API from "./api"; // your axios base instance
import "./GetEmployeeCount.css";

function GetEmployeeCount() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    setError("");
    setCount(null);

    try {
      const response = await API.get("/count");
      setCount(response.data);
    } catch (err) {
      setError("Error fetching employee count. Please try again.");
    }
  };

  return (
    <div className="count-container">
      <h2>Total Employee Count</h2>
      <button className="fetch-btn" onClick={handleFetch}>
        Get Count
      </button>

      {error && <p className="error">{error}</p>}

      {count !== null && (
        <div className="count-display">
          <h3>
            Total Employees: <span>{count}</span>
          </h3>
        </div>
      )}
    </div>
  );
}

export default GetEmployeeCount;
