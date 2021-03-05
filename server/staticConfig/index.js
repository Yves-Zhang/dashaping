const options = require('./defaultConfig');
const { yamlConfig } = require('../configManage');
const { prasePath } = require('../../tools') 

const staticResource = yamlConfig ? yamlConfig.staticResource : {}
const staticFiles = staticResource && staticResource.fileName ? staticResource.fileName : ["www"]
const publicPath = staticResource ? staticResource.publicPath: null
const rootPath = yamlConfig ? yamlConfig.rootPath : null

let staticRootPath = null

// 自适应为 与根路径保持一致
if(publicPath === 'auto'){
	staticRootPath = rootPath || '/'
}

// 不存在设置 则 为'/'
if(!publicPath){
	staticRootPath = '/'
}

// 存在配置 且 不为'auto' 则为配置
if(publicPath && publicPath !== 'auto'){
	staticRootPath = publicPath
}

const setStaticConfig = (app, express) => {
	staticFiles.map(item => {
		switch (typeof item){
			case 'string':
				const filePath = prasePath.cwdPath + `/${item}`
				// 增加外层根路径
				app.use(`${staticRootPath}`, express.static(filePath, options));
				break;
			case 'object':
				const filePaths = item.filePath || null
				if(!filePaths || !Array.isArray(filePaths) || !filePaths.length){
					return
				}
				filePaths.forEach(o => {
					let filePath = prasePath.cwdPath + `/${o}`
					let newOptions = {...item.options}
					if(item.options){
						Object.keys(item.options).forEach(key =>{
							const strArr = key.split('_')
							let jsFuc
							try{
								if(strArr[1] && strArr[1] === 'js'){
									jsFuc = require(prasePath.cwdPath + `/${item.options[key]}`)
									newOptions[key] = jsFuc
								}
							}catch(err){
								console.log(err)
								console.log(`static option err`.red)
							}
						})
					}
					app.use(`${staticRootPath === '/' ? '' : staticRootPath}${item.path || ''}`, express.static(filePath, {...options, ...newOptions}));
				});
			default:
				break
		}
	})
};

module.exports = setStaticConfig;
