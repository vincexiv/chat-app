import React from "react";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import MainPage from "./components/MainPage";

function App(){
  return (
    <>
      <Navbar loggedIn={false}/>
      <Background />
      <MainPage />
    </>
  )
}

export default App