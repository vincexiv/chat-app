import React from "react";
import "../css/now-chatting.css"

function NowChatting({me, they}){
    return (
        <div className="now-chatting container">
            <div className="details">
                <img src={they.profile_picture} alt={they.full_name}/>
                <div className="they-details">
                    <h1>{they.full_name}</h1>
                    <p>{they.bio}</p>
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