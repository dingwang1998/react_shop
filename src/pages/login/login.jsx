import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import {Redirect} from 'react-router-dom'
import logo from './images/logo.png';
import './login.less';

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

import {reqLogin} from '../../api'

class Login extends React.Component{
	handleSubmit = e=>{
		e.preventDefault();
		this.props.form.validateFields( async (err, {username,password}) => {
			if (!err) {
				const result = await reqLogin(username,password);
				if(result.status === 0){
					//将data里面的值全部存储起来用作token
					const user = result.data;
					// localStorage.setItem('user_key',JSON.stringify(user)); 上面为原生方法
					// 下面为调用了storageUtils为本地存储第一次数据到文件
					storageUtils.saveUser(user)
					//在调用memoryUtils存储第二次到本地
					memoryUtils.user = user
					//提示登录成功
					message.success('登录成功')
					this.props.history.push('/')
				}else{
					message.error('输入的账号密码有误')
				}
			}else{
				message.error('请填写用户名和密码')
			}
		});
	}
	validatorPwd = (rule, value, callback)=>{
		value = value.trim();
		if(!value){
			callback("密码必须输入")
		}
		else if(value.length < 4){
			callback('密码不能小于4位')
		}
		else if(value.length > 12){
			callback('密码必须于12位')
		}
		else{
			callback()
		}
	}
	render(){
		const { getFieldDecorator } = this.props.form;

		const user = storageUtils.getUser();
        //判断传过来的toke，如果有_id 重定向到'/'管理页面admin，不让有key的页面再次跳转到login
        if(user._id){
            return <Redirect to="/"/>
        }
		return(
			<div className = "login">
				<div className="login-header">
					<img src={logo} alt=""/>
					<h1>react造就不凡</h1>
				</div>
				<div className="login-content">
					<h1>用户登陆</h1>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Form.Item>
						{getFieldDecorator('username', {
							initialValue:'',
							rules: [
								{ required: true,  whitespace:true, message: 'Please input your username!' },
								{ min: 4, message: '用户名不能小于4位' },
								{ max: 6, message: '用户名不能大于6位' }
							],
						})(
							<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Username"
							/>
						)}
						</Form.Item>
						<Form.Item>
						{getFieldDecorator('password', {
							initialValue:'',
							rules: [
								{ required: true, message: 'Please input your Password!' },
								{ validator:this.validatorPwd}
							],
						})(
							<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="Password"
							/>,
						)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Log in
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm