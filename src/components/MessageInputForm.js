import React, {useState, useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/message-input-form.css"

function MessageInputForm(){
    const { me, they, setMessages} = useContext(userDetails)
    const senderAndReceiver = {sender: me ? me.id : "", receiver: they? they.id : ""}
    const [sending, setSending] = useState(false)
    const [messageContent, setMessageContent] = useState("")

    function updateMessages(newMessage){
        fetch('https://chat-app-back-end-production.up.railway.app/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(newMessage)
        })
            .then(res => {
                if (res.status == 201) {
                    res.json().then(data => {
                        setSending(false)
                        setMessageContent("")
                    })
                }
            })
    }

    function handleSubmit(e){
        e.preventDefault()
        setSending(true)
        if(me && they){
            updateMessages({...senderAndReceiver, content: messageContent})
        }
    }

    function handleChange(e){
        setMessageContent(e.target.value)
    }


    return (
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name="content" value={messageContent} placeholder="type your message here"/>
                <button className="btn">{sending? "Sending..." : "Send"}</button>
            </form>
        </div>
    )
}

export default MessageInputForm