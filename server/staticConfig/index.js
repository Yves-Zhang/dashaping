const options = require('./defaultConfig');
const { yamlConfig } = require('../configManage');
const { prasePath } = require('../../tools') 

const staticResource = yamlConfig ? yamlConfig.staticResource : {}
const staticFiles = staticResource ? staticResource.fileName : ["www"]

const setStaticConfig = (app, express) => {
	staticFiles.map(item => {
		const filePath = prasePath.cwdPath + `/${item}`
		app.use(express.static(filePath, options));
	})
};

module.exports = setStaticConfig;
