import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link,withRouter} from 'react-router-dom'
import { Menu ,Icon} from 'antd';

import menuList from '../../config/menuConfig.js'
const { SubMenu } = Menu;


export class LeftNav extends Component {
    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}></Icon>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                const cItem = item.children.find(cItem =>cItem.key === path)
                if(cItem){
                    this.openKey = item.key
                }
                pre.push(
                    <SubMenu 
                    key={item.key} 
                    title={<span>
                        <Icon type={item.icon}></Icon> 
                        <span>{item.title}</span>
                        </span>
                    }
                        >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
            return pre;
        },[])
    }
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }
    render() {
        const SeleteKey = this.props.location.pathname;
        return (
            <div className="LeftNav"> 
                <div className="left-nav-top">
                    <img src={logo} alt="logo"/>
                    <h1>非凡后台</h1>
                </div>
                <Menu
                    selectedKeys={SeleteKey}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav);
