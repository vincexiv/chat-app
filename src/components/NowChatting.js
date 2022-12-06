import React, {useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/now-chatting.css"

function NowChatting(){
    const {me, they} = useContext(userDetails)

    function shortenBio(bio){
        if(!bio){
            return
        }
        
        if(bio.length > 40){
            return bio.split("").slice(0, 40).join("") + "..."
        }else {
            return bio
        }
    }

    return (
        <div className="now-chatting container">
            <div className="details they">
                <img src={they? they.profile_picture: null} alt={they? they.full_name: null}/>
                <div className="they-details">
                    <h1>{they? they.full_name: null}</h1>
                    <p>{they ? shortenBio(they.bio): null}</p>
                </div>
            </div>

            <div className="details me">
                <div className="me-details">
                    <h1>{me.full_name}</h1>
                    <p>{shortenBio(me.bio)}</p>                
                </div>
                <img src={me.profile_picture} alt={me.full_name} />
            </div>
        </div>
    )
}

export default NowChatting