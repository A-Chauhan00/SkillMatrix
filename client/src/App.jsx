import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';

function App() {
 

  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/course/:id" element={<CourseDetails/>}/>
      </Route>
    </Routes>
     
    </>
  )
}

export default App
