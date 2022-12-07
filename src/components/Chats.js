import React, {useContext} from "react";
import Chat from "./Chat";
import {userDetails} from "./UserDetailsContextProvider"
import "../css/chats.css"

function Chats(){
    const {messages, me, they} = useContext(userDetails)
    let chats = []

    function compareTime(a, b){
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)

        return date1.getTime() - date2.getTime()
    }
    
    if(messages && they){
        chats = messages.filter(message => message.sender == they.id || message.receiver == they.id)
        chats = chats.sort(compareTime)

        chats = chats.map(message => <Chat key={message.id} message={message} />)
    }
    
    if (messages && they && me && they.id == me.id) {
        chats = messages.filter(message => message.sender == me.id && message.receiver == me.id)
        chats = chats.sort(compareTime)
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