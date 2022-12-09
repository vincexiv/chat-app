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
    const [clientHeight, setClientHeight] = useState(document.documentElement.clientHeight)
    const [showItem, setShowItem] = useState({contacts: false, chats: true})
    const navigate = useNavigate()

    useEffect(() => {
        const localStorageMe = JSON.parse(localStorage.getItem("me"))

        if (localStorage.getItem("loggedIn")) {
            fetch(`https://chat-app-back-end-production.up.railway.app/users/${localStorageMe.id}`, { mode: 'cors' })
                .then(res => {
                    if (res.status == 200) {
                        res.json().then(data => {
                            localStorage.setItem("me", JSON.stringify(data))
                            navigate('/home')
                        })
                    }else {
                        navigate('/login')
                        setMe({})
                    }
                })
        }else {
            navigate('/login')
            setMe({})
        }

    }, [])

    useEffect(() => {
        const localStorageMe = JSON.parse(localStorage.getItem("me"))
        const localStorageAllUsers = JSON.parse(localStorage.getItem("allUsers"))

        const intervalId = setInterval(() => {
            if (localStorage.getItem("loggedIn")){
                fetch(`https://chat-app-back-end-production.up.railway.app/users/${localStorageMe.id}`)
                    .then(res => {
                        if (res.status == 200) {
                            res.json().then(data => {
                                setMe(data)

                                const users = getAllUsers()
                                users.then(data => {
                                    if(localStorage.getItem("loggedIn")){
                                        setAllUsers(data)
                                        localStorage.setItem("allUsers", JSON.stringify(data))
                                    }
                                })

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
                            setMe({})
                        }
                    })
            }
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
    
    async function getAllUsers() {
        const res = await fetch('https://chat-app-back-end-production.up.railway.app/users', {mode: "cors"})
            .then(res => res.json())

        return res
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

                <Contacts
                    onChatWith={handleChatWith}
                    toggleItemToShow={toggleItemToShow}
                    showContacts={showItem.contacts}
                    desktopView={desktopView}
                    clientHeight={clientHeight}/>

                <ChatsContainer showChat={showItem.chats} desktopView={desktopView} />
            </div>
        </>
    )
}

export default MainPage