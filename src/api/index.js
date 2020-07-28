import ajax from  './ajax'
import jsonp from 'jsonp';
import { message } from 'antd';


export const reqLogin = (username,password)=>ajax.post('/login', {username,password});

export const reqWether = (city)=>{
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error && data.error ===0){
                const{dayPictureUrl,weather}=data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('请求地址出错了')
            }
        })
    })
}


//获取商品分类
export const reqCategoryList = ()=>ajax('/manage/category/list')

//添加商品分类
export const reqAddCategory = (categoryName)=>ajax.post('/manage/category/add',{categoryName})

// 修改商品分类
export const reqUpdateCategory = (categoryId,categoryName)=>ajax.post('/manage/category/update',{categoryId,categoryName})


// 获取商品名称的请求
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {
    params: {
      pageNum,
      pageSize
    }
})

// 按照商品的品类名称搜索或者商品描述搜索

export const reqSearchProducts = ({pageNum,pageSize,searchType,searchName})=>ajax('/manage/product/search',{
    params:{
        pageNum,
        pageSize,
        [searchType]:searchName
    }
})

//更新商品的状态
export const reqUpadataProduct = (productId,status)=>ajax('/manage/product/updateStatus',{
    method:'POST',
    data:{
        productId,
        status
    }
})

// 根据商品分类fid去获取商品分类

export const reqCategory = (categoryId)=>ajax('/manage/category/info',{
    params:{
        categoryId
    }
})


// 根据商品的数据id去获取商品的详细信息
export const reqProduct = (productId)=>ajax('/manage/product/info',{
    params:{
        productId
    }
})


// 删除图片
export const deteimage = (name)=>ajax.post('/manage/img/delete',{name})


//添加商品

export const reqAddUpdataProdut = (product)=>ajax.post('/manage/product/' + (product._id ? 'update':'add') , product)


//获取权限列表
export const reqRoles = () => ajax('/manage/role/list')

//添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add', {
    roleName
})

// 更新角色
export const reqUpdateRole = (role) => ajax.post('/manage/role/update', role)




// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')

// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/delete', {
  userId
})

// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post('/manage/user/' + (user._id ? 'update' : 'add'), user)