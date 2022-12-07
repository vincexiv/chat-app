import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import {userDetails} from './UserDetailsContextProvider'
import "../css/login-form.css"


function Signup(){
    const defaultState = {
        full_name: "",
        email: "",
        username: "",
        password: "",
        bio: "",
        profile_picture: ""
    }
    const [userInfo, setUserInfo] = useState(defaultState)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    // Go to home if in session even when one pastes the path GET /signup
    useEffect(() => {
        fetch('/me')
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        navigate('/home')
                    })
                }
            })
    }, [])

    function handleInputChange(e){
        setUserInfo(userInfo => ({...userInfo, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        setSubmitting(true)
        
        fetch('/signup', {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(userInfo)
        })
        .then(res => {
            if(res.status == 201){
                res.json().then(data => {                   
                    setSubmitting(false)
                    navigate('/home')
                })
            }else if (res.status == 422){
                res.json().then(data => alert("Unable to sign in\n" + data.errors.join('\n')))
            }else {
                alert("An error occurred. Try again later")
            }
            setSubmitting(false)
        })
    }

    function goToLoginPage(){
        navigate('/login')
    }

    return (
        <div className="signup">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            placeholder="John Doe"
                            value={userInfo.full_name}
                            onChange={handleInputChange}
                            required/>
                    </div>

                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="johndoe@example.com"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            required />
                    </div>

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

                    <div className="input">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            name="bio"
                            placeholder="Here for a good time"
                            onChange={handleInputChange}
                            value={userInfo.bio} />
                    </div>

                    <div className="input">
                        <label htmlFor="profile_picture">Profile Picture</label>
                        <input
                            type="text"
                            name="profile_picture"
                            onChange={handleInputChange}
                            value={userInfo.profile_picture} />
                    </div>

                    <div className="buttons">
                        <button className="btn">{submitting? "Signing You Up..." : "Signup"}</button>
                        <button className="btn" onClick={goToLoginPage}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup