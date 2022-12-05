import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/chat.css"

function Chat({message}){
    const {me} = useContext(userDetails)
    console.log("message and me", message.id, me.id)

    return (
        <div className="message-container">
            <div className="message">
                <div className={message.sender == me.id? "sending": "receiving"}>
                    <div className="dummy-before"></div>
                    <div className="content">{message.content}</div>
                    <div className="dummy-after"></div>
                </div>
            </div>
        </div>
    )
}

export default Chat