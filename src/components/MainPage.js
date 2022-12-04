import React, {useContext, useEffect, useState} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import {useNavigate} from 'react-router-dom'
import Contacts from "./Contacts";
import ChatsContainer from "./ChatsContainer";
import NowChatting from "./NowChatting";

import "../css/main-body.css"

function MainPage(){
    const {me, setMe, allUsers} = useContext(userDetails)
    const [they, setThey] = useState(me)
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

    function handleChatWith(newChatMateId){
        setThey(allUsers.find(user => user.id == newChatMateId))
    }
    
    return (
        <>
            <NowChatting me={me} they={they}/>
            <div className="container main-body">
                <Contacts onChatWith={handleChatWith}/>
                <ChatsContainer me={me} they={they} />
            </div>
        </>
    )
}

export default MainPage