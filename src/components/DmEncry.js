import React, { Component } from 'react'

import { Form, Input, Button } from 'antd';
import httpAxios from '../request/httpAxios';
import api from '../request/api'
import TextArea from 'antd/lib/input/TextArea';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
class DmEncry extends Component {
    constructor(props){
        super(props);
        this.state={
            resultString:''
        }
    }

    handleEncry=()=>{
        let beforString = document.getElementById("beforeEncry").value;
        httpAxios(api.encry,{password:beforString}).then(res =>{
            this.setState({resultString:res})
            document.getElementById("resultEncry").value=res;
        })
    }

    handleDecrypt=()=>{
        let beforString = document.getElementById("beforeEncry").value;
        httpAxios(api.decrypt,{password:beforString}).then(res =>{
            document.getElementById("resultEncry").value=res;
        })
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                <Form {...layout} name='basic'>
                    <Form.Item label='请输入待处理字段：'
                        name='beforevalue'
                        rules={[{ required: true, message: '请输入待处理字符串！' }]} >
                        <Input id='beforeEncry' onChange={this.changeBefore}></Input>
                    </Form.Item>
                    <Form.Item label='字段处理之后结果：'
                        name='aftervalue'>
                        <TextArea id='resultEncry' value={this.state.resultString} readOnly='true'></TextArea>
                    </Form.Item>
                    <Form.Item 
                    label='操作'>
                        <Button type="primary" onClick={this.handleEncry} style={{right:'20%', width:'30%'}}>
                            加密
                        </Button>
                        <Button type="primary" onClick={this.handleDecrypt}style={{width:'30%'}}>
                            解密
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}
export default DmEncry;