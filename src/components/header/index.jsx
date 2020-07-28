import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import {reqWether} from '../../api/index'

import LinkButton from '../../components/link-button'

import './index.less'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class Header extends Component {
    state = {
        currentMoment:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    logout = ()=>{
        var that = this
        confirm({
            title: '确定要退出吗？',
            icon: <ExclamationCircleOutlined />,
            content: '退出下次需要重新登录',
            okText:'确认',
            cancelText:"取消",
            onOk(){
              storageUtils.removeUser();
              memoryUtils.user = {};
              that.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    getTitle = ()=>{
        let title = '' 
        const path = this.props.location.pathname;
        menuList.forEach(item=>{
            if(item.key === path){
                title = item.title
            }
            else if(item.children)
            {
                const cItem = item.children.find( cItem=> path.indexOf(cItem.key) === 0)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    getWether = async ()=>{
        const {dayPictureUrl,weather} = await reqWether('杭州')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    componentDidMount(){
        this.time = setInterval(() => {
            this.setState({
                currentMoment:formateDate(Date.now())
            })
        }, 1000);
        this.getWether();
    }
    componentWillMount(){
        clearTimeout(this.time)
    }
    render() {
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className="Header">
                <div className="header-top">
                    欢迎 &nbsp;{user.username} &nbsp;
                    <LinkButton href="javacsript:;" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentMoment}</span>
                        <img src={this.state.dayPictureUrl} alt=""/>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
