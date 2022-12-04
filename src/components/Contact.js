import React from "react";
import "../css/contact.css"

function Contact({ contact, onChatWith }){
    return (
        <div className="contact" onClick={(e)=> onChatWith(contact.userId) }>
            <div className="status"></div>
            <div className="full-name">
                <h1>{contact.fullName}</h1>
            </div>
            <div className="views">
                <div className="view-count">
                    <p>20</p>
                </div>
            </div>         
        </div>
    )
}

export default Contact