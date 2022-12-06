import React, {useState, useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/search-user.css"

function SearchUser({onChatWith}){
    const {allUsers} = useContext(userDetails)
    const [user, setUser] = useState("")
    const [matchedUsers, setMatchedUsers] = useState(
        allUsers? allUsers.slice(0, 6): [])


    function handleChange(e){
        setUser(e.target.value)
        setMatchedUsers(allUsers.filter(user => user.username.includes(e.target.value)))
    }

    function handleSubmit(){

    }

    return (
        <div className="search-user">
            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Search User</label>
                <input onChange={handleChange} name="content" value={user} />
            </form>
            <div className="matched-users">
                {
                    matchedUsers.map(user => (
                        <div key={user.id} className="full-name" onClick={()=>onChatWith(user.id)}>
                            <p>{user.full_name}</p>
                        </div>
                    )).slice(0, 6)
                }
            </div>
        </div>
    )
}

export default SearchUser