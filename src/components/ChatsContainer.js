import React from "react";
import MessageInputForm from "./MessageInputForm";
import Chats from "./Chats";
import "../css/chats-container.css"

function ChatsContainer({me, they}){
    return (
        <div className="chats-container">
            <Chats />
            <MessageInputForm me={me} they={they}/>
        </div>
    )
}

export default ChatsContainer