const { prasePath, praseYaml } = require('../../tools');

const yamlPath = prasePath.cwdPath + '/applicationConfig.yaml'
const yamlConfig = praseYaml(yamlPath) || {}

module.exports = {
	yamlConfig
}