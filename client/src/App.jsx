import { useState,useEffect } from 'react'
import './App.css'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LecturePage from './pages/LecturePage.jsx';
import { useAuthStore } from "./store/useAuthStore";

function App() {
 const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
    {/* Routes with common navbar */}
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/course/:courseId" element={<CourseDetails/>}/>
      </Route>
    </Routes>

  {/* Routes without common navbar */}
    <Routes>
        <Route path="/course/:id/lecture/:id" element={<LecturePage/>}/>
    </Routes>

    {/* auth routes */}
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
     
    </>
  )
}

export default App
