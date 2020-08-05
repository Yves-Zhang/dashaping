// 本文件是监听 文件变化函数
require('colors')
const fs = require('fs')
const md5 = require('md5');
const path = require('path');

function getFileType(filePath) {
    // 判断是文件夹 还是文件
    return new Promise(function (resolve, reject) {
        fs.stat(filePath, function (err, data) {
            if (err) {
                console.log(err);
                reject()
            }

            if (data.isFile()) {
                resolve('file')
            }

            if (data.isDirectory()) {
                resolve('directory')
            }
        })
    })
}

function watch({
    filePath,
    debounce
}, callback) {
    let preveMd5 = null
    let fsWait = false

    console.log(`正在监听`,`${filePath}`.green);
    fs.watch(filePath, { encoding: 'utf-8' }, async (event, filename) => {
        if (filename) {
            if (fsWait) return;
            // 防抖处理
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 200)

            const ret = await getFileType(filePath)
            let currentMd5
            let fullPath = filePath

            if (ret === 'file') {
                currentMd5 = md5(fs.readFileSync(filePath))
            }

            if (ret === 'directory') {
                fullPath = path.join(filePath, filename)
                currentMd5 = md5(fs.readFileSync(fullPath))
            }

            if (currentMd5 == preveMd5) {
                return
            }
            preveMd5 = currentMd5
            console.log(`${filePath}`.green, `文件发生更新`)
            callback(event, ret, filePath, filename, fullPath)
        }
    })

}

module.exports = watch