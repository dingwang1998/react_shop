import React, { Component } from 'react'
import {Card,Button,Table,Icon, message,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import Addupdata from './Add-Updata-input.jsx'

import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../api'
/**
 * 分类管理
 */
export default class Category extends Component {
  constructor(props){
    super(props)
    this.state={
      data:[],
      loading:false,
      ISshowModal: 0 //模态框等于0不弹出 等于1为添加模态框 等于2为修改模态框
    }
  }
  componentDidMount(){
    this.getCategory()
  }
  getCategory = async ()=>{
    this.setState({
      loading:true
    })
    const result = await reqCategoryList()
    if(result.status === 0)
    {
      const data = result.data
      this.setState({
        data,
        loading:false
      })
    }
    else{
      message.error('请求数据失败了')
    }
  }
  showModal = () => {
    this.setState({
      ISshowModal:1
    });
  };
  handleOk = e => {
      this.form.validateFields( async (err,values)=>{
      if(!err){
        this.form.resetFields(); //重置表单,每点击一次给表单的默认传值
        const {CategoryName} = values
        let result
        const active = this.state.ISshowModal === 1? '添加' : '修改'
        if(this.state.ISshowModal === 1){
            result = await reqAddCategory(CategoryName)
        }
        else{
          const categoryId = this.Category._id
          result = await reqUpdateCategory(categoryId,CategoryName)
        }
        if(result.status === 0){
          this.getCategory()
        }
        else{
          message.error( active + '分类失败了')
        }
      }
    })
    this.setState({
      ISshowModal: 0,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      ISshowModal: 0,
    });
  };
  render() {
    const Category = this.Category || {}
    const extra = <Button type="primary" onClick={this.showModal}>
        <Icon type="plus"></Icon>
        添加
    </Button>
    const columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: '操作',
        width: 150,
        render: (record)=><LinkButton onClick={()=>{
          this.Category = record
          this.setState({
            ISshowModal: 2
          })
        }}>修改类容</LinkButton>
      }
    ]
    return (
    <Card extra={extra}>
          <Table 
          columns={columns} 
          dataSource={this.state.data}
          bordered 
          loading={this.state.loading}
          pagination={{ pageSize: 2 }} 
          scroll={{ y: 240 }} />
        <Modal
          title={this.state.ISshowModal === 1 ? '添加分类':'修改分类'}
          visible={this.state.ISshowModal !==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Addupdata setForm={form => this.form = form} CategoryName={Category.name}/>
        </Modal>
    </Card>
    )
  }
}
