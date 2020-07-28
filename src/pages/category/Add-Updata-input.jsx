import React, { Component } from 'react'
import propTypes from 'prop-types'

import {Form,Input} from 'antd'
import './add.less'



class Addupdata  extends Component {
    componentDidMount(){
        this.props.setForm(this.props.form)   
    }
    render() {
        const { getFieldDecorator } = this.props.form

        return (
        <div>
            <span>分类名称</span>
            <Form>
                <Form.Item>
                    {getFieldDecorator('CategoryName', {
                        initialValue: this.props.CategoryName || '',
                        rules: [
                        { required: true,  whitespace:true, message: 'Please input your username!' }
                        ],
                    })(
                        <Input
                        />
                    )}
                </Form.Item>
            </Form>
        </div>
        )
    }
}
Addupdata.propTypes = {
    setForm:propTypes.func.isRequired,
    CategoryName:propTypes.string
}

export default  Form.create()(Addupdata)
