//axios的配置文件
import axios from 'axios'

let baseURL = '/api'
if(process.env.NODE_ENV == 'production'){
    //生产环境
    baseURL = ''
}else if(process.env.NODE_ENV == 'development'){
    //开发环境
    baseURL = '/api'
}

const http = axios.create({
    baseURL:baseURL,
    timeout:1000
})

http.interceptors.request.use(config =>{
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    if(config.url != '/userlogin'){
        //config.url是地址接口
        //登录的接口不需要token
        config.headers.authorization = userInfo.token;
    }
    
    return config
})
http.interceptors.response.use(data =>{
    return data.data
})

export default http