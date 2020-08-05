require('colors')
const fs = require("fs");      //文件系统模块
const watch = require('../watch');

function cleanCache(modulePath) {
    const module = require.cache[require.resolve(modulePath)];
    if (!module) {
        return;
    }

    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    // delete require.cache[require.resolve(modulePath)];
    delete module
}

function hotUpdata(_filePath){
    watch({filePath: _filePath, debounce: 300}, function(event, type, filePath, filename, fullPath){
        if (event === "change") {
            cleanCache(fullPath);
            try {
                // const routes = require(fullPath);
                // console.log(routes, 1)
                console.log("reload module", `${fullPath}`.green);
            } catch (ex) {
                console.error(ex)
                console.error('module update failed');
            }
        }
    })    
}

module.exports = hotUpdata