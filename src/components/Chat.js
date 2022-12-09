import React, {useContext, useRef, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/chat.css"

function Chat({message}){
    const [currentState, setCurrentState] = useState({messageContent: message.content, editing: false})
    const messageContainerRef = useRef(null)
    const {me} = useContext(userDetails)

    function handleOnClick(e){
        const optionsDiv = e.target.parentElement.querySelector('.options')
        optionsDiv.classList.toggle("display-none")
    }

    function handleMessageChange(e){
        setCurrentState(currentState => ({...currentState, messageContent: e.target.value}))
    }

    function handleEdit(){
        const messageEditForm = messageContainerRef.current.querySelector('form')

        const messageBeingEdited = messageContainerRef.current.querySelector('.content.sent')
        messageBeingEdited.classList.add("display-none")

        messageEditForm.classList.remove('display-none')
        
        setCurrentState(currentState => ({ ...currentState, editing: !currentState.editing }))
    }

    function goBack(e){
        setCurrentState(currentState => ({ ...currentState, editing: !currentState.editing }))

        resetDisplayedItems()
        setCurrentState(currentState => ({ ...currentState, messageContent: message.content }))

    }

    function resetDisplayedItems(){
        messageContainerRef.current.querySelector('form').classList.add('display-none')
        messageContainerRef.current.querySelector('.message .options').classList.add('display-none')
        messageContainerRef.current.querySelector('.content.sent').classList.remove('display-none')
    }

    function handleDelete(){
        fetch(`https://chat-app-back-end-production.up.railway.app/messages/${message.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
        })
    }

    function updateMessage(){

        fetch(`https://chat-app-back-end-production.up.railway.app/messages/${message.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({content: currentState.messageContent})
        })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        console.log({ content: currentState.messageContent })
                        setCurrentState(currentState => ({ ...currentState, editing: !currentState.editing }))
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
                        <div className="content sent" onClick={handleOnClick}>{currentState.messageContent}</div>

                        <form className="display-none" onSubmit={submitEdit}>
                            <input
                                type="text"
                                className="content"
                                onChange={handleMessageChange}
                                value={currentState.messageContent}></input>
                        </form>

                        <div className="options display-none">
                            <button
                                className="back-delete"
                                onClick={currentState.editing? ()=>goBack(): ()=>handleDelete()}>
                                    {currentState.editing? "Back": "Delete"}
                            </button>

                            <button
                                className="edit"
                                onClick={currentState.editing ? () => submitFromSendButton() : () => handleEdit()}>
                                    {currentState.editing? "Send": "Edit"}
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