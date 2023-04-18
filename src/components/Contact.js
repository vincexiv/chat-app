import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/contact.css"

function Contact({ contact, onChatWith, toggleItemToShow }){
    const {messages, they} = useContext(userDetails)

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
                    <p>
                        
                        {
                            
                            messages && they ? 
                            messages.filter(message => message.sender === contact.userId).length :
                            ""
                        }
                    </p>
                
                </div>
            </div>         
        </div>
    )
}

export default Contact