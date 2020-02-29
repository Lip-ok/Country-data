import React from "react";
import { Input } from 'antd';
import { Button } from 'antd';
import './../App.css';

const InputFullName =(props)=>{

        return(
            <div className="inputFullName">
                <div className="input">
                    <Input type="text"
                           value={props.countryFullName}
                           onChange={props.fullNameChanged}

                    />
                </div>
                <div className="button">
                    <Button type="primary" shape="circle" icon="search" onClick={props.sendFullName}/>
                </div>
            </div>

        )
    }

export default InputFullName;