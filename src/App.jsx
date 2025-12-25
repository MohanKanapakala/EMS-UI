import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Home from "./Home";
import GetAllEmployees from "./GetAllEmployees";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import GetEmployeeById from "./GetEmployeeById";
import BulkAddEmployees from "./BulkAddEmployees";
import GetEmployeeByEmail from "./GetEmployeeByEmail";
import GetEmployeeByGender from "./GetEmployeeByGender";
import GetEmployeeBySalaryRange from "./GetEmployeeBySalaryRange";
import GetEmployeeByDeptAndGender from "./GetEmployeeByDeptAndGender";
import GetEmployeeByDeptOrGender from "./GetEmployeeByDeptOrGender";
import GetEmployeeBySalaryGreaterThan from "./GetEmployeeBySalaryGreaterThan";
import GetEmployeeBySalaryLessThan from "./GetEmployeeBySalaryLessThan";
import GetEmployeeNameAndSalary from "./GetEmployeeNameAndSalary";
import GetEmployeeNameAndSalaryByDept from "./GetEmployeeNameAndSalaryByDept";
import GetEmployeeCount from "./GetEmployeeCount";
import DeleteEmployeeById from "./DeleteEmployeeById";
import DeleteAllEmployees from "./DeleteAllEmployees";
import DeleteByDeptGender from "./DeleteByDeptGender";
import PatchEmployee from "./PatchEmployee";
import UpdateEmployeeName from "./UpdateEmployeeName";
import IncreaseSalaryByDept from "./IncreaseSalaryByDept";

function App() {
  return (
    <BrowserRouter>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            EmployeeManagementSystem
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {[
                [
                  "GET Employees",
                  [
                    ["/employees/getall", "Get All"],
                    ["/search", "Get by ID"],
                    ["/employees/getbyemail", "Get by Email"],
                    ["/employees/getbysalaryrange", "Salary Range"],
                    ["/employees/getbydeptgender", "Dept & Gender"],
                    ["/employees/getbydeptorgender", "Dept or Gender"],
                    ["/employees/getbygender", "By Gender"],
                    ["/employees/getbysalarygreater", "Salary >"],
                    ["/employees/getbysalaryless", "Salary <"],
                    ["/employees/nameandsalary", "Name & Salary"],
                    ["/employees/nameandsalarybydept", "Name & Salary (Dept)"],
                    ["/employees/count", "Employee Count"],
                  ],
                ],
                [
                  "POST Employees",
                  [
                    ["/employees/add", "Add Employee"],
                    ["/employees/bulk", "Bulk Add"],
                  ],
                ],
                
                [
                  "UPDATE Employees",
                  [
                    ["/employees/patch", "Partial Update"],
                    ["/employees/updatename", "Update Name"],
                    ["/employees/increasesalary", "Increase Salary"],
                  ],
                ],
                [
                  "DELETE Employees",
                  [
                    ["/employees/deletebyid", "Delete by ID"],
                    [
                      "/employees/deletebydeptgender",
                      "Delete by Dept & Gender",
                    ],
                    ["/employees/deleteall", "Delete All"],
                  ],
                ],
              ].map(([title, items]) => (
                <li className="nav-item dropdown" key={title}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    {title}
                  </a>
                  <ul className="dropdown-menu">
                    {items.map(([path, label]) => (
                      <li key={path}>
                        <Link to={path} className="dropdown-item">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== ROUTES ===== */}
      <Routes>
        {/* Full width home */}
        <Route path="/" element={<Home />} />

        {/* Centered pages */}
        <Route
          path="/employees/getall"
          element={
            <div className="container page-container">
              <GetAllEmployees />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="container page-container">
              <GetEmployeeById />
            </div>
          }
        />
        <Route
          path="/employees/getbyemail"
          element={
            <div className="container page-container">
              <GetEmployeeByEmail />
            </div>
          }
        />
        <Route
          path="/employees/getbygender"
          element={
            <div className="container page-container">
              <GetEmployeeByGender />
            </div>
          }
        />
        <Route
          path="/employees/getbysalaryrange"
          element={
            <div className="container page-container">
              <GetEmployeeBySalaryRange />
            </div>
          }
        />
        <Route
          path="/employees/getbydeptgender"
          element={
            <div className="container page-container">
              <GetEmployeeByDeptAndGender />
            </div>
          }
        />
        <Route
          path="/employees/getbydeptorgender"
          element={
            <div className="container page-container">
              <GetEmployeeByDeptOrGender />
            </div>
          }
        />
        <Route
          path="/employees/getbysalarygreater"
          element={
            <div className="container page-container">
              <GetEmployeeBySalaryGreaterThan />
            </div>
          }
        />
        <Route
          path="/employees/getbysalaryless"
          element={
            <div className="container page-container">
              <GetEmployeeBySalaryLessThan />
            </div>
          }
        />
        <Route
          path="/employees/nameandsalary"
          element={
            <div className="container page-container">
              <GetEmployeeNameAndSalary />
            </div>
          }
        />
        <Route
          path="/employees/nameandsalarybydept"
          element={
            <div className="container page-container">
              <GetEmployeeNameAndSalaryByDept />
            </div>
          }
        />
        <Route
          path="/employees/count"
          element={
            <div className="container page-container">
              <GetEmployeeCount />
            </div>
          }
        />
        <Route
          path="/employees/add"
          element={
            <div className="container page-container">
              <AddEmployee />
            </div>
          }
        />
        <Route
          path="/employees/bulk"
          element={
            <div className="container page-container">
              <BulkAddEmployees />
            </div>
          }
        />
        <Route
          path="/employees/update"
          element={
            <div className="container page-container">
              <UpdateEmployee />
            </div>
          }
        />
        <Route
          path="/employees/patch"
          element={
            <div className="container page-container">
              <PatchEmployee />
            </div>
          }
        />
        <Route
          path="/employees/updatename"
          element={
            <div className="container page-container">
              <UpdateEmployeeName />
            </div>
          }
        />
        <Route
          path="/employees/increasesalary"
          element={
            <div className="container page-container">
              <IncreaseSalaryByDept />
            </div>
          }
        />
        <Route
          path="/employees/deletebyid"
          element={
            <div className="container page-container">
              <DeleteEmployeeById />
            </div>
          }
        />
        <Route
          path="/employees/deletebydeptgender"
          element={
            <div className="container page-container">
              <DeleteByDeptGender />
            </div>
          }
        />
        <Route
          path="/employees/deleteall"
          element={
            <div className="container page-container">
              <DeleteAllEmployees />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
