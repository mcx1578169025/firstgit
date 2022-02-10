module.exports = {
    //项目配置，管理的是vue项目对应的node服务器
    devServer:{
        //dev环境下的配置,proxy代理
        proxy:{
            '/api':{//接口前缀
                target:"http://localhost:3000/",//代理的目标地址，就是服务器地址
                changeOrigin:true //是否跨域
            }
        }
    }
    }