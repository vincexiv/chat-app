import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom'
import { userDetails } from './UserDetailsContextProvider'
import "../css/login-form.css"

function Login() {
    const defaultState = {
        username: "",
        password: ""
    }
    const [userInfo, setUserInfo] = useState(defaultState)
    const [submitting, setSubmitting] = useState(false)
    const { setMe, setThey, setAllUsers, setMessages } = useContext(userDetails)
    const navigate = useNavigate()

    function handleInputChange(e) {
        setUserInfo(userInfo => ({ ...userInfo, [e.target.name]: e.target.value }))
    }

    function login(){
        fetch('/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        setMe(data)
                        setMessages(data.messages)

                        setSubmitting(false)
                        setAllUsers(getAllUsers())
                        navigate('/home')
                        setUpPeriodicUpdating()
                    })
                } else if (res.status == 401) {
                    alert("Invalid username or password!")
                } else {
                    alert("An error occurred. Try again later")
                }
                setSubmitting(false)
            })  
    }

    function setUpPeriodicUpdating(){
        const intervalId = setInterval(()=>{
            fetch('/me')
                .then(res => {
                    if (res.status == 200) {
                        res.json().then(data => {
                            setMe(data)
                            getAllUsers()
                            setThey(JSON.parse(localStorage.getItem("they")))
                            setMessages(data.messages)
                        })
                    } else {
                        navigate('/login')
                    }
                })
        }, 1000)

        localStorage.setItem("intervalId", intervalId)
    }

    function getAllUsers(){
        fetch('/users')
        .then(res => {
            if(res.status == 200){
                res.json().then(data => setAllUsers(data))
            }
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
                            placeholder="johndoe"
                            value={userInfo.username}
                            onChange={handleInputChange}
                            required />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleInputChange}
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