import React, {createContext, useState} from "react";

const userDetails = createContext()

function UserDetailsContextProvider({children}){
    const [me, setMe] = useState({})

    return (
        <userDetails.Provider value={{ me, setMe }}>
            {children}
        </userDetails.Provider>        
    )
}

export {userDetails, UserDetailsContextProvider}

