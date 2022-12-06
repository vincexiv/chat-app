import React, {useContext} from "react";
import Chat from "./Chat";
import {userDetails} from "./UserDetailsContextProvider"
import "../css/chats.css"

function Chats(){
    const {messages, me, they} = useContext(userDetails)
    let chats = []
    
    if(they){
        chats = messages.filter(message => message.sender == they.id || message.receiver == they.id)
        chats = chats.map(message => <Chat key={message.id} message={message} />)
    }
    
    if (they && me && they.id == me.id) {
        chats = messages.filter(message => message.sender == me.id && message.receiver == me.id)
        chats = chats.map(message => <Chat key={message.id} message={message} />)
    }

    return (
        <div className="chats">
            {
                chats.length > 6 ?
                chats.slice(chats.length - 7, chats.length) : 
                chats
            }
        </div>
    )
}

export default Chats