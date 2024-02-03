import './NothigWasFound.css';
import React from "react";

function NothingWasFound({text}) {
    return(
        <div className="nothig-found">
        <p className="nothig-found__text">{text}</p>
        </div>
    );
}

export default NothingWasFound;