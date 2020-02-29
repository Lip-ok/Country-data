import React from "react";

const RenderCountryCode = (props) => {
    return (

            <span>{props.name}: {props.alpha3Code}</span>

    )
}

export default RenderCountryCode;