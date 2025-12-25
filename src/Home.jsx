import "./Home.css";
import {
  FaUsers,
  FaUserPlus,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1>Employee Management System</h1>
        <p>Manage employees efficiently with a modern dashboard</p>
      </header>

      {/* Cards Section */}
      <div className="card-container">
          <div className="home-card">
            <FaUsers className="card-icon" />
            <h3>Total Employees</h3>
            <p>View and manage all employees</p>
          </div>

        
          <div className="home-card">
            <FaUserPlus className="card-icon" />
            <h3>Add Employee</h3>
            <p>Register new employees easily</p>
          </div>
       

        
          <div className="home-card">
            <FaClipboardList className="card-icon" />
            <h3>Departments</h3>
            <p>Organize teams and departments</p>
          </div>
        

        <div className="home-card">
          <FaChartLine className="card-icon" />
          <h3>Reports</h3>
          <p>Analyze employee performance</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
