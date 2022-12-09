import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import {useNavigate } from "react-router-dom"
import "../css/navbar.css"

function Navbar(){
    const {me, setMe} = useContext(userDetails)
    const navigate = useNavigate()

    function goHome(e){
        navigate('/home')
    }

    function logOut(){
        if (JSON.parse(localStorage.getItem("loggedIn"))){
            fetch('https://chat-app-back-end-production.up.railway.app/logout', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            })
            .then(res => {
                if(res.status == 204){
                    clearInterval(JSON.parse(localStorage.getItem("intervalId")))
                    localStorage.removeItem("intervalId")
                    localStorage.removeItem("they")
                    localStorage.removeItem("me")
                    localStorage.removeItem("allUsers")
                    localStorage.removeItem("loggedIn")
                    navigate('/login')
                    setMe({})
                }
            })
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <div className="app-name" onClick={goHome}>
                    <span className="first-part">
                        Cha
                    <span className="first-t">t</span>
                    </span>

                    <span className="second-part">
                        <span className="second-t">t</span>
                        ier
                    </span>
                    </div>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>

                    <li>
                        <a href="#" onClick={logOut}>{localStorage.getItem("loggedIn") ? "Logout" : "Login"}</a>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar