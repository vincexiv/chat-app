import React, {useContext, useEffect, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import {json, useNavigate} from 'react-router-dom'
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import NowChatting from "./NowChatting";

import "../css/main-body.css"

function MainPage(){
    const {me, setMe, they, setThey, setAllUsers, allUsers, setMessages} = useContext(userDetails)
    const [desktopView, setDesktopView] = useState(document.documentElement.clientWidth > 750)
    const [showItem, setShowItem] = useState({contacts: false, chats: true})
    const navigate = useNavigate()

    useEffect(() => {
        const localStorageMe = JSON.parse(localStorage.getItem("me"))
        const localStorageAllUsers = JSON.parse(localStorage.getItem("allUsers"))

        const intervalId = setInterval(() => {
            fetch('https://chat-app-back-end-production.up.railway.app/me')
                .then(res => {
                    if (res.status == 200) {
                        res.json().then(data => {
                            setMe(data)
                            getAllUsers()
                            setThey(JSON.parse(localStorage.getItem("they")))
                            setMessages(data.messages)
                        })
                    } else if(localStorageMe && localStorageAllUsers){
                        setMe(localStorageMe)
                        setMessages(localStorageMe.messages)
                        setThey(localStorageMe)
                        setAllUsers(localStorageAllUsers)
                    }else {
                        navigate('/login')
                    }
                })
        }, 1000)

        localStorage.setItem("intervalId", JSON.stringify(intervalId))
        return function(){
            return clearInterval(intervalId)
        }
    }, [])

    function handleResize(){
        const clientWidth = document.documentElement.clientWidth

        if( clientWidth < 750){
            setDesktopView(false)
        }else {
            setDesktopView(true)
        }
    }

    window.addEventListener('resize', handleResize)
    
    function getAllUsers() {
        fetch('https://chat-app-back-end-production.up.railway.app/users')
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        setAllUsers(data)
                        localStorage.setItem("allUsers", JSON.stringify(data))
                    })
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

                <Contacts onChatWith={handleChatWith} toggleItemToShow={toggleItemToShow} showContacts={showItem.contacts} desktopView={desktopView} />

                <ChatsContainer showChat={showItem.chats} desktopView={desktopView} />
            </div>
        </>
    )
}

export default MainPage