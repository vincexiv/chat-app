import React, {useEffect, useState, useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import NowChatting from "./NowChatting";
import "../css/main-body.css"

function MainPage(){
    const {me, setMe} = useContext(userDetails)
    
    return (
        <div className="container main-body">
            <NowChatting />
            <Contacts />
            <ChatsContainer />
        </div>
    )
}

export default MainPage