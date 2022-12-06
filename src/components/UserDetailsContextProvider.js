import React, {createContext, useState} from "react";

const userDetails = createContext()

function UserDetailsContextProvider({children}){
    const [me, setMe] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [they, setThey] = useState([])
    const [messages, setMessages] = useState([])

    return (
        <userDetails.Provider value={{ me, setMe, they, setThey, allUsers, setAllUsers, messages, setMessages}}>
            {children}
        </userDetails.Provider>        
    )
}

export {userDetails, UserDetailsContextProvider}

