import React from "react";
import "../css/contact.css"

function Contact({ contact, onChatWith, toggleItemToShow }){

    function handleClick(){
        toggleItemToShow()
        onChatWith(contact.userId)
    }
    return (
        <div className="contact" onClick={(e)=> handleClick() }>
            <div className="status"></div>
            <div className="full-name">
                <h1>{contact.fullName}</h1>
            </div>
            <div className="views">
                <div className="view-count">
                    <p>3</p>
                </div>
            </div>         
        </div>
    )
}

export default Contact