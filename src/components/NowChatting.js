import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/now-chatting.css"

function NowChatting(){
    const {me, they} = useContext(userDetails)

    return (
        <div className="now-chatting container">
            <div className="details">
                <img src={they? they.profile_picture: null} alt={they? they.full_name: null}/>
                <div className="they-details">
                    <h1>{they? they.full_name: null}</h1>
                    <p>{they? they.bio: null}</p>
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