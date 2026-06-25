import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import toast from "react-hot-toast";
import RegistrationPage from "./pages/RegistrationPage";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className=" h-full w-full">
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
