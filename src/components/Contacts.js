import React, {useState, useContext, useEffect} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import Contact from "./Contact"
import SearchUser from "./SearchUser";
import "../css/contacts.css"

function Contacts({onChatWith, showContacts, desktopView, toggleItemToShow, clientHeight}){
    const {me} = useContext(userDetails)
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        if (me.messages) {
            setContacts(() => {
                let contactArray = createContacts(me.messages)
                contactArray = filterOut(contactArray, me)
                contactArray = uniqueContacts(contactArray)
                return contactArray
            })
        }
    }, [me])

    function uniqueContacts(contactArray){
        let existingContactIds = []
        return contactArray.filter(contact => {
            if (!existingContactIds.includes(contact.userId) && contact.userId != me.id){
                existingContactIds.push(contact.userId)
                return true
            }else{
                return false
            }
        })
    }

    function filterOut(contacts, me){
        return contacts.filter(message => message.userId != me.id)
    }

    function createContacts(messages){
        const contacts = messages.map(message => {
                if (message.receiver == me.id) {
                    return {
                        fullName: message.sender_full_name,
                        username: message.sender_username,
                        userId: message.sender
                    }
                } else {
                    return {
                        fullName: message.receiver_full_name,
                        username: message.receiver_username,
                        userId: message.receiver
                    }
                }
            })

        return contacts
    }

    const contactComponents = contacts.map(
        contact => <Contact key={contact.userId} contact={contact} toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} />
    )

    return (
        <div className={desktopView ? "contacts" :
            showContacts && !desktopView ?
                "contacts mobile" : "display-none"}>
            {contactComponents.slice(0, parseInt(document.documentElement.clientHeight / 200))}

            <SearchUser toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} clientHeight={clientHeight}/>
        </div>
    )
}

export default Contacts