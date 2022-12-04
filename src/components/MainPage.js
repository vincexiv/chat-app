import React, {useContext, useEffect, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import {useNavigate} from 'react-router-dom'
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import NowChatting from "./NowChatting";
import "../css/main-body.css"

function MainPage(){
    const {me, setMe} = useContext(userDetails)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/me')
        .then(res => {
            if(res.status == 200){
                res.json().then(data => setMe(data))
            }else{
                navigate('/login')
            }
        })
    }, [])
    
    return (
        <>
            <NowChatting me={me} they={me}/>
            <div className="container main-body">
                <Contacts />
                <ChatsContainer />
            </div>
        </>
    )
}

export default MainPage