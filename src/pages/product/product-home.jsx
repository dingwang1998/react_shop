import React, { Component } from 'react'
/**
 * 商品管理
 */
import { reqProducts, reqSearchProducts,reqUpadataProduct} from '../../api'

import throttle from 'lodash.throttle'


import memoryUtils from '../../utils/memoryUtils'

import LinkButton from '../../components/link-button'
import {
  Card,
  Select,
  Button,
  Table,
  Input,
  Icon,
  message
} from 'antd'
const {Option} = Select



export default class Product extends Component {
  constructor(props){
    super(props)
    this.state= {
        data:[],
        total:0,
        searchType:'productName', //收集的搜索类型
        searchName:''             //收集的名称收集
    }
  }
  componentWillMount(){
    this.initColums()
  }
  initColums = ()=>{
    this.columns = [
      {
        title:'商品名称',
        rowKey:'_id',
        dataIndex:'name'
      },
      {
        title:'商品描述',
        dataIndex:'desc'
      },
      {
        title:'价格',
        dataIndex:'price',
        render: (price)=><span>￥{price}</span>
      },
      {
        title:'状态',
        width:100,
        render: ({_id, status})=>{
          let btnText = "下架"
          let text = "在售"
          if(status === 2)
          {
            btnText = "上架"
            text= "已下架"
          }
          return (
            <span>
              <button onClick={()=>{this.updataStatus(_id, status)}}>{btnText}</button><br/>
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title:'操作',
        render: (product)=><span>
            <LinkButton onClick={()=>{
               memoryUtils.product = product
               this.props.history.push('/product/detail/'+ product._id)
            }}>
            详情
            </LinkButton>
            <LinkButton onClick={()=>{
                memoryUtils.product = product
                this.props.history.push('/product/addupdata')
            }}>
            修改
            </LinkButton>
        </span>
      },
    ]
  }
  componentDidMount(){
    this.getProducts(1)
  }
  getProducts = async (pageNum)=>{
    this.pageNum = pageNum
    const {searchType, searchName } = this.state
    let reslut
    if(!this.isSearch){
       reslut = await reqProducts(pageNum,2)
    }else{
      reslut = await reqSearchProducts({pageNum, pageSize:2 , searchType, searchName})
      this.isSearch = false
    }
      if(reslut.status === 0)
      {
        const list = reslut.data.list
        const total = reslut.data.total
        this.setState({
          data:list,
          total
        })
      }
  }
  updataStatus = throttle(async (productId,status)=>{
      status = status === 1 ? 2 :1
      const result = await reqUpadataProduct(productId,status)
      if(result.status === 0){
          message.success('更新状态成功')
      }else{
        message.error('更新状态失败')
      }
      this.getProducts(this.pageNum)
  },2000)
  render() {
    const {data, searchType, searchName ,total} = this.state
    console.log(searchType,searchName)
    const title = (
      <div>
        <Select style={{ width: 200 }} value={searchType} onChange={(value)=>{this.setState({ searchType: value})}}>
            <Option value={'productName'}>按名称搜索</Option>
            <Option value={'productDesc'}>按名称描述搜索</Option>
        </Select>
        <Input style={{width:'200px', margin:"0 10px"}} value={searchName} placeholder="关键字" onChange={event => this.setState({searchName: event.target.value})}
        >

        </Input>
        <Button type="primary" onClick = {()=>{
          this.isSearch = true
          this.getProducts(1)
        }}
          >搜索</Button>
      </div>
    )
    const extra = (
        <Button type="primary" onClick={()=>{
          this.props.history.push('/product/addupdata')
        }}>
          <Icon type="plus"></Icon>
          添加
        </Button>
    )
    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table 
          columns={this.columns} 
          dataSource={data}
          bordered
          rowKey="_id"
          pagination={{
            total,
            defaultPageSize:2,
            current: this.pageNum,
            onChange:this.getProducts
          }
          }
        />
      </Card>
    )
  }
}