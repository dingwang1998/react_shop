/* 
封装的能发ajax请求的函数, 向外暴露的本质是axios
1. 解决post请求携带参数的问题: 默认是json, 需要转换成urlencode格式
2. 让请求成功的结果不再是response, 而是response.data的值
3. 统一处理所有请求的异常错误
*/
import axios from 'axios'

import  qs from 'qs'

  //请求拦截器
  axios.interceptors.request.use(function (config) {
    const {method,data} = config;

    if(method.toLowerCase()=== 'post' && typeof data === 'object')
    {
        config.data = qs.stringify(data)
    }

    return config;
  });
  // 返回拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    // return Promise.reject(error);
    alert('请求失败')
    // 终止promise链式操作，返回一个pending状态的promise
    return new Promise(()=>{})
  });


export default axios