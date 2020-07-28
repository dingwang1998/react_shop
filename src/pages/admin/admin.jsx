import React, { Component } from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
// import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';

import Home from '../home/home.jsx'
import Category from  '../category/category.jsx'
import Bar from  '../charts/bar.jsx'
import Line from  '../charts/line.jsx'
import Pie from  '../charts/pie.jsx'
import Product from  '../product/product.jsx'
import Role from '../role/role.jsx'
import User from '../user/user.jsx'

const {Footer, Sider, Content } = Layout;



export class admin extends Component {
    render() {
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}');
        const user = memoryUtils.user;
        //判断传过来的token，如果没有_id 重定向到'/'管理页面admin
        if(!user._id){
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{height:"100%",background:"#ccc!improtant"}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{background:"#fff",margin:'20px'}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/user" component={User}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:"rgba(0,0,0,0.5)" }}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default admin
