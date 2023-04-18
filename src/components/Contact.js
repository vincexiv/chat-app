import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/contact.css"

function Contact({ contact, onChatWith, toggleItemToShow }){
    const {messages, me, they} = useContext(userDetails)

    function handleClick(){
        toggleItemToShow()
        onChatWith(contact.userId)
    }

    function compareTime(a, b){
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)

        return date1.getTime() - date2.getTime()
    }

    function getMyMessages(){
        return messages.filter(message => {
            return (message.sender === me.id) && (message.receiver === contact.userId)
        })
    }

    function unrepliedMessages(){
        const myMessages = getMyMessages()

        const myMostRecentMessage = myMessages.sort(compareTime)[myMessages.length - 1]  
              
        const theirUnrepliedMessages = messages.filter(message => {
            if(myMessages.length){
                return message.sender === contact.userId && message.created_at > myMostRecentMessage?.created_at
            }else{
                return message.sender === contact.userId
            }            
        })

        return theirUnrepliedMessages.length
    }

    return (
        <div className="contact" onClick={(e)=> handleClick() }>
            <div className="status"></div>
            <div className="full-name">
                <h1>{contact.fullName}</h1>
            </div>
            <div className="views">
                <div className="view-count">
                    <p> {unrepliedMessages()}</p>
                </div>
            </div>         
        </div>
    )
}

export default Contact