import React from "react";
import { Input } from 'antd';
import { Button } from 'antd';
import './../App.css';

const InputAlpha3CodeCountry = (props) => {

    return (
        <div className="alpha3CodeCountry">
            <div className="input">

                <Input type="text"
                       value={props.countryCode}
                       onChange={props.countryCodeChange}
                />
            </div>
            <div>
                <Button type="primary" shape="circle" icon="search" onClick={props.sendCountryCode}/>

            </div>
        </div>
    )
}


export default InputAlpha3CodeCountry;