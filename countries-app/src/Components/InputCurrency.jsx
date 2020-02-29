import React from "react";
import { Input } from 'antd';
import { Button } from 'antd';
import './../App.css';

const InputCurrency =(props)=>{
    return(

        <div className="currencyCode">
            <div className="input">
                <Input type="text"
                       onChange={props.currencyChanged}
                       value={props.currencyCode}/>
            </div>
            <div>
                <Button type="primary" shape="circle" icon="search" onClick={props.sendCurrencyCode}/>
            </div>
        </div>

    )
}

export default InputCurrency;
