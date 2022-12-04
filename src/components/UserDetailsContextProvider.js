import React, {createContext, useState} from "react";

const userDetails = createContext()

function UserDetailsContextProvider({children}){
    const [me, setMe] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [they, setThey] = useState([])

    return (
        <userDetails.Provider value={{ me, setMe, they, setThey, allUsers, setAllUsers }}>
            {children}
        </userDetails.Provider>        
    )
}

export {userDetails, UserDetailsContextProvider}

