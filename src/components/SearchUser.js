import React, {useState, useContext, useEffect} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/search-user.css"

function SearchUser({ onChatWith, toggleItemToShow }){
    const {allUsers} = useContext(userDetails)
    const [user, setUser] = useState("")
    const [showUsers, setShowUsers] = useState(6)
    const [matchedUsers, setMatchedUsers] = useState(
        allUsers? allUsers.slice(0, 6): [])

    useEffect(()=>{
        fetch('https://chat-app-back-end-production.up.railway.app/users')
        .then(res => {
            if(res.status == 200){
                res.json().then(data => {
                    setMatchedUsers(data.slice(0, 6))
                })
            }
        })
    }, [])

    function handleChange(e){
        setUser(e.target.value)
        setMatchedUsers(allUsers.filter(user => user.username.includes(e.target.value)))
    }

    function handleSubmit(e){
        e.preventDefault()
        setUser("")
    }

    return (
        <div className="search-user">
            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Search User</label>
                <input onChange={handleChange} name="content" value={user} placeholder="search by username"/>
            </form>
            <div className="matched-users">
                {
                    matchedUsers.map(user => (
                        <div key={user.id} className="full-name" onClick={()=>onChatWith(user.id)}>
                            <div onClick={toggleItemToShow}>
                                <p>{user.full_name}</p><p>@{user.username}</p>
                            </div>
                        </div>
                    )).slice(0, parseInt(document.documentElement.clientHeight / 100))
                }
            </div>
        </div>
    )
}

export default SearchUser
