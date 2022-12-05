import React, {useContext, useEffect} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import {useNavigate} from 'react-router-dom'
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import NowChatting from "./NowChatting";

import "../css/main-body.css"

function MainPage(){
    const {me, setMe, they, setThey, setAllUsers, allUsers, setMessages} = useContext(userDetails)
    const navigate = useNavigate()

    useEffect(()=>{
        rememberMe()
    }, [])
    
    function rememberMe() {
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
                        navigate('/login')
                    }
                })
        }, 1000)

        localStorage.setItem("intervalId", intervalId)
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
    
    return (
        <>
            <NowChatting me={me} they={they}/>
            <div className="container main-body">
                <Contacts onChatWith={handleChatWith}/>
                <ChatsContainer />
            </div>
        </>
    )
}

export default MainPage