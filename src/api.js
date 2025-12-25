// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/employees", // Your Spring Boot base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
