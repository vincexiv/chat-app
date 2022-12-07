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
        <Route exact path="/home" element={<MainPage />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signin" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  )
}

export default App