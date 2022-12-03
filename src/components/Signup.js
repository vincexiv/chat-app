import React from "react";
import "../css/login-form.css"

function Signup(){
    return (
        <div className="signup">
            <div className="container">
                <form>
                    <div className="input">
                        <label for="full_name">Full Name</label>
                        <input type="text" name="full_name" placeholder="John Doe" required />
                    </div>

                    <div className="input">
                        <label for="email">Email</label>
                        <input type="email" name="email" placeholder="johndoe@example.com" required />
                    </div>

                    <div className="input">
                        <label for="username">Username</label>
                        <input type="text" name="username" placeholder="johndoe" required />
                    </div>

                    <div className="input">
                        <label for="username">Password</label>
                        <input type="password" name="username" required />
                    </div>

                    <div className="input">
                        <label for="bio">Bio</label>
                        <textarea name="bio" placeholder="Here for a good time" />
                    </div>

                    <div className="input">
                        <label for="profile_picture">Profile Picture</label>
                        <input type="text" name="profile_picture" />
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

export default Signup