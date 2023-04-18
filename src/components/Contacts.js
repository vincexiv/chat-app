import React, {useState, useContext, useEffect} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import Contact from "./Contact"
import SearchUser from "./SearchUser";
import "../css/contacts.css"

function Contacts({onChatWith, showContacts, desktopView, toggleItemToShow, clientHeight}){
    const {messages, me, they} = useContext(userDetails)
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
            if (!existingContactIds.includes(contact.userId) && contact.userId !== me.id){
                existingContactIds.push(contact.userId)
                return true
            }else{
                return false
            }
        })
    }

    function filterOut(contacts, me){
        return contacts.filter(message => message.userId !== me.id)
    }

    function createContacts(messages){
        const contacts = messages.map(message => {
                if (message.receiver === me.id) {
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


    function compareTime(a, b){
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)

        return date1.getTime() - date2.getTime()
    }

    function getMyMessages(contact){
        return messages.filter(message => {
            return (message.sender === me.id) && (message.receiver === contact.userId)
        })
    }

    function unrepliedMessages(contact){
        const myMessages = getMyMessages(contact)

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

    const contactsSorted = contacts.sort((a, b)=> unrepliedMessages(a) < unrepliedMessages(b))

    return (
        <div className={desktopView ? "contacts" :
            showContacts && !desktopView ?
                "contacts mobile" : "display-none"}>
            {
                contactsSorted.slice(0, 3).map(contact => {
                    return <Contact key={contact.userId}
                        unrepliedMessages={unrepliedMessages(contact)}
                        contact={contact}
                        toggleItemToShow={toggleItemToShow}
                        onChatWith={onChatWith} />
                })
            }

            <SearchUser toggleItemToShow={toggleItemToShow} onChatWith={onChatWith} clientHeight={clientHeight}/>
        </div>
    )
}

export default Contacts