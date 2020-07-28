import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { reqCategoryList, reqAddUpdataProdut } from '../../api'
import LinkButton from '../../components/link-button'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

import {
    Card,
    Icon,
    Form,
    Input,
    Select,
    Button,
    message
} from 'antd'
const Item = Form.Item
const Option = Select.Option

class ProducctAddUpdata extends Component {
    state = {
        categorys:[]
    }
    constructor(props) {
        super(props)
        this.PwRef = React.createRef()
        this.editorRef = React.createRef()
    }
    componentWillMount(){
        this.product = memoryUtils.product
        this.isUpdate = !!this.product._id
        console.log(this.product)
    }
    componentDidMount(){
        this.getCategory()
    }
    getCategory = async ()=>{
        const result = await reqCategoryList()
        if(result.status === 0){
            const categorys = result.data
            this.setState({categorys})
        }
    }
    validatePrice = (rule, value, callback)=>{
        if(!value){
            callback()
        }else if(value <= 0){
            callback('价格必须大于等于0')
        }else{
            callback()
        }
    }
    //表单收集
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
			if (!err) {
                const {name,desc,price,categoryId} = values
                const imgs = this.PwRef.current.getImage()
                console.log(imgs)
                const detail = this.editorRef.current.getDetail()
                console.log(detail)
                const product = {
                    name,
                    desc,
                    price,
                    categoryId,
                    imgs,
                    detail
                }
                if(this.isUpdate){
                    product._id = this.product._id
                }
                const result = await reqAddUpdataProdut(product)
                if(result.status === 0){
                    message.success(`${product._id ? '修改':'增加'}商品成功`)
                    this.props.history.replace('/product')
                }
            }
		});
    }
    render() {
        const { categorys } = this.state
        const {isUpdate, product} = this
        const { getFieldDecorator } = this.props.form
        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        const title = (
            <span>
            <LinkButton onClick={()=>{
                this.props.history.goBack()
                memoryUtils.product = {}
            }}>
              <Icon type="arrow-left" />
            </LinkButton>
            <span >{isUpdate ? '修改商品' : '添加商品'}</span>
          </span>
        )
        return (
            <Card title={title}>
                <Form {...formLayout} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                            {getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [
                                { required: true, message: '必须输入商品名称!' }
                            ],
                            })(<Input placeholder="商品名称"/>)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [
                                { required: true, message: '必须输入商品描述!' }
                            ],
                        })(<Input placeholder="商品描述"/>)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                            { required: true, message: '必须输入价格!' },
                            { validator: this.validatePrice }
                            ],
                        })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                        initialValue: product.categoryId || '',
                        rules: [
                            { required: true, message: '必须输入商品分类!' }
                        ],
                        })(
                        <Select>
                            <Option value=''>未选择</Option>
                            {
                            categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                            }
                        </Select>
                        )}
                    </Item>

                    <Item label="商品图片">
                        <PicturesWall  imgs={product.imgs} ref={this.PwRef}/>
                    </Item>
                    <Item label="商品详情" wrapperCol={{ span: 20 }}>
                        <RichTextEditor  detail={product.detail}  ref={this.editorRef}/>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProducctAddUpdata)
