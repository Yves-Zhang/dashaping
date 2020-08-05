// import createRouters from './fucs/createRouters'

function CombinControllers(controllers = []) {
    return function (Target) {
        Target.prototype.controllers = controllers
        return Target;
    }
}

module.exports = CombinControllers;