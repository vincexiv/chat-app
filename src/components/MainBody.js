import React from "react";
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import "../css/main-body.css"

function MainBody(){
    return (
        <div className="container main-body">
            <Contacts />
            <ChatsContainer />
        </div>
    )
}

export default MainBody