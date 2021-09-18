import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
import {
  DesktopOutlined,
} from '@ant-design/icons';
import DmEncry from './components/DmEncry'
import Navigation from './components/Navigation'
import './App.css';

const { Sider } = Layout;
class App extends Component {
  state = {
    collapsed: false,
    key: "1"
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handClick = (obj) => {
    const {key} = obj;
    console.log(key,'---key---')
    this.setState({ key })
    console.log(this.state.key,'--this.key--')
  };

  handPages = () => {
    switch(this.state.key){
      case "1" : return ( <DmEncry/>);
      case "2" : return ( <Navigation/>);
    }
  }

  render() {
    const { collapsed } = this.state;
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['2']} mode='inline' onClick={this.handClick}>
            <Menu.Item key='2'>路由
              </Menu.Item>
              <Menu.Item key='1'>DM数据库加密
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ background: '#fff' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <div style={{ width: '40%', display: 'flex', margin: 'auto', position: 'relative', top: '40%' }}>
                {
                  this.handPages()
                }
              </div>
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
