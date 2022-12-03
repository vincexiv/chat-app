import React from "react";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import MainBody from "./components/MainBody";

function App(){
  return (
    <>
      <Navbar loggedIn={false}/>
      <Background />
      <MainBody />
    </>
  )
}

export default App