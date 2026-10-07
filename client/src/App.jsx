import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LecturePage from './pages/LecturePage.jsx';

function App() {
 

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
     
    </>
  )
}

export default App
