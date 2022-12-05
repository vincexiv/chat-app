import React, {useContext, useRef, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/chat.css"

function Chat({message}){
    const [messageContent, setMessageContent] = useState(message.content)
    const [editing, setEditing] = useState(false)
    const messageContainerRef = useRef(null)
    const {me} = useContext(userDetails)

    function handleOnClick(e){
        const optionsDiv = e.target.parentElement.querySelector('.options')
        optionsDiv.classList.toggle("display-none")
    }

    function handleMessageChange(e){
        setMessageContent(e.target.value)
    }

    function handleEdit(e){
        const messageEditForm = e.target.parentElement.parentElement.querySelector('form')
        console.log(messageEditForm)

        const messageBeingEdited = e.target.parentElement.parentElement.querySelector('.content.sent')
        messageBeingEdited.classList.add("display-none")

        messageEditForm.classList.remove('display-none')
        setEditing(editing => !editing)
    }

    function goBack(e){
        setEditing(editing => !editing)
        messageContainerRef.current.querySelector('form').classList.add('display-none')
        messageContainerRef.current.querySelector('.message .options').classList.add('display-none')
        messageContainerRef.current.querySelector('.content.sent').classList.remove('display-none')
        setMessageContent(message.content)
    }

    function handleDelete(){

    }

    return (
        <div ref={messageContainerRef} className="message-container">
            <div className="message">
                <div className={message.sender == me.id? "sending": "receiving"}>
                    <div className="dummy-before"></div>
                    <div>
                        <div className="content sent" onClick={handleOnClick}>{messageContent}</div>

                        <div>
                            <form className="display-none" >
                                <input
                                    type="text"
                                    className="content"
                                    onChange={handleMessageChange}
                                    value={messageContent}></input>
                            </form>
                        </div>

                        <div className="options display-none">
                            <button
                                className="back-delete"
                                onClick={editing? ()=>goBack(): ()=>handleDelete()}>
                                    {editing? "Back": "Delete"}
                            </button>

                            <button
                                className="edit"
                                onClick={handleEdit}>
                                    {editing? "Send": "Edit"}
                            </button>
                        </div>
                    </div>
                    <div className="dummy-after"></div>
                </div>
            </div>
        </div>
    )
}

export default Chat