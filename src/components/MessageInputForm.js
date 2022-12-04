import React, {useState, useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/message-input-form.css"

function MessageInputForm({they}){
    const { me, setMe } = useContext(userDetails)
    const defaultState = {
        sender: me ? me.id : "",
        receiver: they? they.id : "",
        content: ""
    }
    const [newMessage, setNewMessage] = useState(defaultState)

    function updateMessages(newMessage){
        fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(newMessage)
        })
            .then(res => {
                if (res.status == 201) {
                    res.json().then(data => {
                        setMe(me => (
                            {...me, messages: [...me.messages, data]}
                        ))
                    })
                }
            })
    }

    function handleSubmit(e){
        e.preventDefault()

        if(me && they){
            updateMessages(newMessage)
            console.log("new message as it appears now: ", newMessage)
            console.log("me and they: ", me, they)

        }

    }

    function handleChange(e){
        console.log("new message: ", newMessage)
        setNewMessage(newMessage => ({...newMessage, [e.target.name]: e.target.value}))
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