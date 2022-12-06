import React from "react";
import MessageInputForm from "./MessageInputForm";
import Chats from "./Chats";
import "../css/chats-container.css"

function ChatsContainer({showChat, desktopView}){
    return (
        <div
            className={desktopView? "chats-container desktop":
                !desktopView && showChat?
                "chats-container mobile": "display-none"}>
            <Chats />
            <MessageInputForm />
        </div>
    )
}

export default ChatsContainer