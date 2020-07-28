import React, { Component } from 'react'

import {
    Card,
    Icon,
    List
} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { reqCategory , reqProduct} from '../../api'
import { BASE_IMG } from '../../utils/Constants'

const Item = List.Item

export default class Detail extends Component {
        state = {
            categoryName: '',
            product:memoryUtils.product
        }
    
        getCategory = async (categoryId) => {
            const result = await reqCategory(categoryId)
            if (result.status===0) {
              const categoryName = result.data.name
              this.setState({ categoryName })
            }
        }
        
        async componentDidMount () {
            let product = this.state.product
            if (product._id) { // 如果商品有数据, 获取对应的分类
                this.getCategory(product.categoryId)
            }
            else{
                const productId = this.props.match.params.id
                const result = await reqProduct(productId)
                console.log(result)
                if(result.status === 0){
                    const product = result.data
                    this.setState({
                        product
                    })
                    this.getCategory(product.categoryId)
                }
            }
        }
    render() {
        const {product,categoryName} = this.state
        const  title = (
            <span>
                <LinkButton onClick= {()=>{
                    this.props.history.goBack()
                }}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card
                title ={title}
            >
                <List>
                    <Item>
                        <span className="detail-left">商品名称:</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品描述:</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品价格:</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="detail-left">所属分类:</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品图片:</span>
                        <span>
                        {
                            product.imgs && product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
                        }
                        </span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail}}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}
