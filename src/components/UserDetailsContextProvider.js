import React, {createContext, useState} from "react";

const userDetails = createContext()

function UserDetailsContextProvider({children}){
    const [me, setMe] = useState({})
    const [allUsers, setAllUsers] = useState([])

    return (
        <userDetails.Provider value={{ me, setMe, allUsers, setAllUsers }}>
            {children}
        </userDetails.Provider>        
    )
}

export {userDetails, UserDetailsContextProvider}

