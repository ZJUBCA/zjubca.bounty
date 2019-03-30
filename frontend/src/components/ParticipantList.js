import React from "react";
import "./css/ParticipantList.css";


function ParticipantList (props) {
    
    const {participant} = props;
    return (
        <div className="ParticipantView">
            {participant.username}
        </div>
    );
    
}

export default ParticipantList;