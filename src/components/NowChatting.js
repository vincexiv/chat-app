import React from "react";
import "../css/now-chatting.css"

function NowChatting({me, they}){
    const chatmate = they? they : me

    console.log("me and they", me, they)

    return (
        <div className="now-chatting container">
            <div className="details">
                <img src={chatmate.profile_picture} alt={chatmate.full_name}/>
                <div className="they-details">
                    <h1>{chatmate.full_name}</h1>
                    <p>{chatmate.bio}</p>
                </div>
            </div>

            <div className="details">
                <div className="me-details">
                    <h1>{me.full_name}</h1>
                    <p>{me.bio}</p>                
                </div>
                <img src={me.profile_picture} alt={me.full_name} />
            </div>
        </div>
    )
}

export default NowChatting