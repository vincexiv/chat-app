import React from "react";
import "../css/navbar.css"

function Navbar({loggedIn}){
    return (
        <div className="navbar">
            <div className="container">
                <div className="app-name">Chattier</div>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">{loggedIn ? "Logout" : "Login"}</a></li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar