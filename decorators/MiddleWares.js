function MiddleWares([...arg]) {
    return function (Target) {
        Target.prototype.middleWares = []
        arg.map((item)=>{
            if(typeof item === 'function'){
                Target.prototype.middleWares.push(item)
            }
        })

        return Target
    }
}

module.exports = MiddleWares;