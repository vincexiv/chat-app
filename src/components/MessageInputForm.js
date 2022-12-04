import React, {useState, useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/message-input-form.css"

function MessageInputForm(){
    const { me, they, messages, setMessages} = useContext(userDetails)
    const [newMessage, setNewMessage] = useState({})
    const defaultState = {
        sender: me ? me.id : "",
        receiver: they? they.id : "",
        content: ""
    }

    function updateMessages(newMessage){
        fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(newMessage)
        })
            .then(res => {
                if (res.status == 201) {
                    res.json().then(data => {
                        setMessages(messages => ([...messages, data]))
                        console.log("posted message: ", data)
                        console.log("current", messages)
                    })
                }
            })
    }

    function handleSubmit(e){
        e.preventDefault()

        if(me && they){
            updateMessages(newMessage)

        }

    }

    function handleChange(e){
        setNewMessage(() => ({...defaultState, [e.target.name]: e.target.value}))
    }


    return (
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} name="content" value={newMessage.content}/>
                <button className="btn">Send</button>
            </form>
        </div>
    )
}

export default MessageInputForm