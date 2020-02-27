import React from "react";
import { Input } from 'antd';
import { Button } from 'antd';
import './../App.css';

const InputShortName =(props)=> {

        return (
            <div className="countryShortName">
                <div className="input">
                    <Input type="text"
                           value={props.countryShortName}
                           onChange={props.shortNameChanged}

                    />
                </div>
                <div>
                    <Button type="primary" shape="circle" icon="search" onClick={props.sendShortName}/>
                </div>
            </div>
        )
    }



export default InputShortName;