import React from "react";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import MainPage from "./components/MainPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {Routes, Route} from 'react-router-dom'

function App(){
  return (
    <>
      <Navbar />
      <Background />

      <Routes>
        <Route path="/home" element={<MainPage />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exat path="/logout" element={<Login />}/>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App