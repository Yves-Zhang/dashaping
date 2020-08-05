const YAML = require('yamljs');

const fs = require('fs');
// file为文件所在路径
module.exports = (filtPath) => {
	return YAML.parse(fs.readFileSync(filtPath).toString())
};