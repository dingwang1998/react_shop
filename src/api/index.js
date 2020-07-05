import ajax from  './ajax'


export const reqLogin = (username,password)=>ajax.post('/login', {username,password});


// export function reqLogin(username,password){
//   return ajax({
//     method:'post',
//     url:'/login',
//     data:{
//       //默认使用json格式
//       username,
//       password
//     }
//   })
// }


// const user = 'admin';
// const pwd  = 'admin';
// reqLogin(user,pwd).then((res)=>{
//   console.log(res);
// })