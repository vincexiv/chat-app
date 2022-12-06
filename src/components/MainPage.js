import React, {useContext, useEffect, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import {useNavigate} from 'react-router-dom'
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import NowChatting from "./NowChatting";

import "../css/main-body.css"

function MainPage(){
    const {me, setMe, they, setThey, setAllUsers, allUsers, setMessages} = useContext(userDetails)
    const [desktopView, setDesktopView] = useState(true)
    const [showItem, setShowItem] = useState({contacts: false, chats: true})
    const navigate = useNavigate()

    function handleResize(){
        const clientWidth = document.documentElement.clientWidth

        if( clientWidth < 750){
            setDesktopView(false)
        }else {
            setDesktopView(true)
        }
    }

    window.addEventListener('resize', handleResize)
    

    useEffect(()=>{
        clearInterval(JSON.parse(localStorage.getItem("intervalId")))
        rememberMe()
    }, [])
    
    function rememberMe() {
        let loggedOut = false
        clearInterval(JSON.parse(localStorage.getItem("intervalId")))

        const intervalId = setInterval(() => {
            fetch('/me')
                .then(res => {
                    if (res.status == 200) {
                        res.json().then(data => {
                            setMe(data)
                            getAllUsers()
                            setThey(JSON.parse(localStorage.getItem("they")))
                            setMessages(data.messages)
                        })
                    } else {
                        loggedOut = true
                        navigate('/login')
                    }
                })
        }, 1000)

        loggedOut ? clearInterval(intervalId) :  localStorage.setItem("intervalId", JSON.stringify(intervalId))
    }

    function getAllUsers() {
        fetch('/users')
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => setAllUsers(data))
                }
            })
    }

    function handleChatWith(newChatMateId){

        setThey(they => {
            const newThey = allUsers.find(user => user.id == newChatMateId)
            localStorage.setItem("they", JSON.stringify(newThey))
            return newThey
        })
    }

    function toggleItemToShow(){
        setShowItem(showItem => {
            return {
                contacts: !showItem.contacts,
                chats: !showItem.chats
            }
        })
    }
    
    return (
        <>
            <NowChatting me={me} they={they} desktopView={desktopView}/>

            <div className={desktopView? "container main-body": "vertical-container main-body"}>
                <div className={desktopView ? "display-none" : ""}>
                    <button className="users btn" onClick={toggleItemToShow}>{showItem.chats? "Go to Users": "Go to Chats"}</button>
                </div>

                <Contacts onChatWith={handleChatWith} showContacts={showItem.contacts} desktopView={desktopView} />

                <ChatsContainer showChat={showItem.chats} desktopView={desktopView} />
            </div>
        </>
    )
}

export default MainPage