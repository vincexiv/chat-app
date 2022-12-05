import React, {useContext, useRef, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/chat.css"

function Chat({message}){
    const [messageContent, setMessageContent] = useState(message.content)
    const [editing, setEditing] = useState(false)
    const messageContainerRef = useRef(null)
    const {me, messages, setMessages} = useContext(userDetails)

    function handleOnClick(e){
        const optionsDiv = e.target.parentElement.querySelector('.options')
        optionsDiv.classList.toggle("display-none")
    }

    function handleMessageChange(e){
        setMessageContent(e.target.value)
    }

    function handleEdit(){
        const messageEditForm = messageContainerRef.current.querySelector('form')

        const messageBeingEdited = messageContainerRef.current.querySelector('.content.sent')
        messageBeingEdited.classList.add("display-none")

        messageEditForm.classList.remove('display-none')
        setEditing(editing => !editing)
    }

    function goBack(e){
        setEditing(editing => !editing)
        resetDisplayedItems()
        setMessageContent(message.content)
    }

    function resetDisplayedItems(){
        messageContainerRef.current.querySelector('form').classList.add('display-none')
        messageContainerRef.current.querySelector('.message .options').classList.add('display-none')
        messageContainerRef.current.querySelector('.content.sent').classList.remove('display-none')
    }

    function handleDelete(){
        fetch(`/messages/${message.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
        })
        .then(res => {
            if(res.status == 204){
                setMessages(messages.filter(showingMessage => message.id != showingMessage.id))
            }
        })
    }

    function updateMessage(){
        fetch(`/messages/${message.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        setMessages(messages => messages.map(message => {
                            if(data.id != message.id){
                                return message
                            }else{
                                return data
                            }
                        }))
                        setEditing(editing => !editing)
                        resetDisplayedItems()
                    })
                }
            })
    }

    function submitEdit(e){
        e.preventDefault()
        updateMessage()
    }

    function submitFromSendButton(){
        updateMessage()
    }

    return (
        <div ref={messageContainerRef} className="message-container">
            <div className="message">
                <div className={message.sender == me.id? "sending": "receiving"}>
                    <div className="dummy-before"></div>
                    <div>
                        <div className="content sent" onClick={handleOnClick}>{messageContent}</div>

                        <form className="display-none" onSubmit={submitEdit}>
                            <input
                                type="text"
                                className="content"
                                onChange={handleMessageChange}
                                value={messageContent}></input>
                        </form>

                        <div className="options display-none">
                            <button
                                className="back-delete"
                                onClick={editing? ()=>goBack(): ()=>handleDelete()}>
                                    {editing? "Back": "Delete"}
                            </button>

                            <button
                                className="edit"
                                onClick={editing ? () => submitFromSendButton() : () => handleEdit()}>
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