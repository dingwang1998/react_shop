// product的主界面在里面配置多页的页面
import React, { Component } from 'react'

import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './product-home.jsx'
import ProductDetail from './detail.jsx'
import ProductAddUpdata from './add-updata'


export default class Product extends Component {
  render() {
    return (
      <Switch>
          <Route path="/product" exact component={ ProductHome } />
          <Route path="/product/detail/:id" component={ ProductDetail }/>
          <Route path="/product/addupdata"  component={ ProductAddUpdata }/>
          <Redirect to="/product" />
      </Switch>
    )
  }
}

