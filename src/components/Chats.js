import React, {useContext, useEffect, useRef} from "react";
import Chat from "./Chat";
import {userDetails} from "./UserDetailsContextProvider"
import "../css/chats.css"

function Chats(){
    const chatsRef = useRef()
    const {messages, me, they} = useContext(userDetails)
    let chats = []

    useEffect(()=>{
        // chatsRef.current.scrollTop = chatsRef.current.scrollHeight
    }, [])

    function compareTime(a, b){
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)

        return date1.getTime() - date2.getTime()
    }
    
    if(messages && they){
        chats = messages.filter(message => message.sender === they.id || message.receiver === they.id)
        chats = chats.sort(compareTime)

        chats = chats.map(message => <Chat key={message.id} message={message} />)
    }
    
    if (messages && they && me && they.id === me.id) {
        chats = messages.filter(message => message.sender === me.id && message.receiver === me.id)
        chats = chats.sort(compareTime)
        chats = chats.map(message => <Chat key={message.id} message={message} />)
    }

    return (
        <div className="chats outer">
            <div className="inner" ref={chatsRef}>
                {
                    chats
                }
            </div>
        </div>
    )
}

export default Chats