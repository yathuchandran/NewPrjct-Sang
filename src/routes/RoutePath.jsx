import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login/LoginPage";
import Home from "../components/Home/Home";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
// import SummaryPage from "../components/SummaryPage/SummaryPage";


export default function RoutesPath() {
    console.log("Route");
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
      {/* <Route path="/summary" element={<SummaryPage />} /> */}

     
    </Routes>
  );
}
