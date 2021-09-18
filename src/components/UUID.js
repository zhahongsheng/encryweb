import React, { Component } from 'react'
import { Button } from 'antd'
import httpAxios from '../request/httpAxios';
import api from '../request/api'

export class UUID extends Component {
    constructor(props){
        super(props);
        this.state={
            resultString:''
        }
    }

    getUUID = () => {
        httpAxios(api.getUUID,{}).then(res =>{
            document.getElementById("result").value=res;
        })
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                <Button type="primary" style={{marginRight:'20px'}} onClick={this.getUUID}>获取UUID</Button> 
                <textarea style={{width:'350px', verticalAlign:'middle', paddingTop:'5px'}} id='result' value={this.state.resultString} readOnly='true'></textarea>       
            </div>
        )
    }
}

export default UUID

