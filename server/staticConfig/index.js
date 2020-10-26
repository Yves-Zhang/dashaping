const options = require('./defaultConfig');
const { yamlConfig } = require('../configManage');
const { prasePath } = require('../../tools') 

const staticResource = yamlConfig ? yamlConfig.staticResource : {}
const staticFiles = staticResource ? staticResource.fileName : ["www"]
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
		const filePath = prasePath.cwdPath + `/${item}`
		// 增加外层根路径
		app.use(`${staticRootPath}`, express.static(filePath, options));
	})
};

module.exports = setStaticConfig;
