import React from "react";
import "../css/login-form.css"

function Login() {
    return (
        <div className="login">
            <div className="container">
                <form>
                    <div className="input">
                        <label for="username">Username</label>
                        <input type="text" name="username" placeholder="johndoe" required />
                    </div>

                    <div className="input">
                        <label for="profile_picture">Password</label>
                        <input type="password" />
                    </div>

                    <div className="buttons">
                        <button className="btn">Signup</button>
                        <button className="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login