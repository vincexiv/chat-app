import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import "../css/login-form.css"

function Login() {
    const defaultState = {
        username: "",
        password: ""
    }
    const [userInfo, setUserInfo] = useState(defaultState)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    // Go to home if in session even when one pastes the path GET /login
    useEffect(()=>{
        const localStorageMe = JSON.parse(localStorage.getItem("me"))

        if(localStorageMe){
            fetch(`https://chat-app-back-end-production.up.railway.app/users/${localStorageMe.id}`, {mode: 'cors'})
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        localStorage.setItem("me", JSON.stringify(data))
                        navigate('/home')
                    })
                }
            })
        }

    }, [])

    function handleInputChange(e) {
        setUserInfo(userInfo => ({ ...userInfo, [e.target.name]: e.target.value }))
    }

    function login(){
        fetch('https://chat-app-back-end-production.up.railway.app/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        setSubmitting(false)
                        localStorage.setItem("me", JSON.stringify(data))
                        localStorage.setItem("allUsers", JSON.stringify([]))
                        localStorage.setItem("loggedIn", true)
                        navigate('/home')
                    })
                } else if (res.status === 401) {
                    alert("Invalid username or password!")
                } else {
                    alert("An error occurred. Try again later")
                }
                setSubmitting(false)
            })  
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        login()
    }

    function goToSignupPage(){
        navigate('/signup')
    }

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userInfo.username}
                            onChange={handleInputChange}
                            placeholder="enter username"
                            required />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleInputChange}
                            placeholder="enter password"
                            required />
                    </div>

                    <div className="buttons">
                        <button className="btn">{submitting? "Logging You In..." : "Login"}</button>
                        <button className="btn" onClick={goToSignupPage}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login