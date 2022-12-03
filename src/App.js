import React from "react";
import Navbar from "./components/Navbar";
import Background from "./components/Background";

function App(){
  return (
    <>
      <Navbar loggedIn={false}/>
      <Background />
    </>
  )
}

export default App