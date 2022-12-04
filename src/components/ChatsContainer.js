import React from "react";
import MessageInputForm from "./MessageInputForm";
import Chats from "./Chats";
import "../css/chats-container.css"

function ChatsContainer(){
    return (
        <div className="chats-container">
            <Chats />
            <MessageInputForm />
        </div>
    )
}

export default ChatsContainer