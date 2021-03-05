const showBanner = require('node-banner');
const colors = require("colors")
const express = require('express')

const appServer = require('./server')
const config = require('./server/configManage') || {}
const yamlConfig = config.yamlConfig || {}
const createRouters = require('./server/createRouters')
const {hotUpdata} = require('./tools')

// 设置环境变量
const env = yamlConfig.ENV || {}

if(Object.keys(env).length){
    Object.keys(env).map(key =>{
        process.env[key] = env[key]
    })
}

// 启用热加载更新
const hotUpdataStatus = yamlConfig.hotUpdata
const hotFiles = yamlConfig.hotFiles

if(hotUpdataStatus){
    hotFiles.
    map(item => {
        hotUpdata(`${process.cwd()}/${item}`)
    })
}

class Exps {
    constructor() {
			// // 中间件
			// middleWares = [];
	
			// // controllers
			// controllers = [];
	
			// // app
			this.app = appServer;
	
			// // host
			this.host = yamlConfig.host || 'localhost'
	
			// port
			this.port = yamlConfig.port || 3000
			
			// rootPath
			this.rootPath = yamlConfig.rootPath || null
	
			// banner
			this.banner = yamlConfig.banner || 'dashaping'
    }


    // 服务启动前生命 周期 
    beforeMount() {

    }

    // 服务启动后  生命周期 
    mounted() {

    }

    beforeSetMiddleWares() {

    }

    setMiddleWares() {
        if (!this.middleWares || this.middleWares.length === 0) {
            return
        }
        this.middleWares.map(item => {
            this.app.use(item)
        })
    }

    // 启动服务函数
    async server() {
        await this.app.listen(this.port, this.host);
    }

    // 服务启动
    async run() {
				if(this.banner){
					await showBanner(this.banner)
				}
				try{
					this.beforeSetMiddleWares()
					this.setMiddleWares()
					createRouters(this.app, express, this.rootPath)(this.controllers); // 创建路由
					this.beforeMount()
					await this.server()
				}catch(err){
					console.log(err)
					console.log(`Server is run fail`.red)
					return
				}
        console.log(`server is running at`, `http://${this.host}:${this.port}`.underline.red)
        this.mounted()
    }
}

module.exports = Exps
