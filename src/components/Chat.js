import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/chat.css"

function Chat({message}){
    const {me} = useContext(userDetails)
    console.log("message and me", message.id, me.id)

    return (
        <div className="message">
            <p className={message.sender == me.id? "sending": "receiving"}>{message.content}</p>
        </div>
    )
}

export default Chat