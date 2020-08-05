function RestController(Target, name, descriptor) {
    // 被装饰对象为 function 
	if (typeof Target === 'object') {
		return
	}

	// 被装饰对象为 class
	if (typeof Target === 'function') {
		if (!Target.prototype.ControllerBeforeMapping) {
			Target.prototype.ControllerBeforeMapping = (req, res, next) => {
				console.info('\n' + Target.name + ': ControllerBeforeMapping!!! \n')
				next()
			}
        }
        
		return {
			name: Target.name,
			clazz: Target
		}
	}
}

module.exports = RestController;