function RestMapping(arg) {
	if (!arg) {
		console.log("RestMapping's arguments is undefined!");
		return;
	}

	return function(Target, name, descriptor) {
		let key = null;
        let method = 'any';
        // let dataType = 'json'
		let fuc = null;

		switch (typeof arg) {
			case 'string':
				key = arg;
				break;
			case 'object':
				key = arg.value;
                method = arg.method || 'any';
                // dataType = arg.type || 'json';
				break;
			default:
				console.error("expect arguments' type is string | object, unexpect " + `${typeof arg}`);
				break;
		}

		// 被装饰对象为 class
		if (typeof Target === 'function') {
			Target.prototype._$restMapping = {
                ...(Target.prototype._$restMapping || {}),
				root: key,
				rootMethod: method
            };
		}

		// 被装饰对象为 function
		if (typeof Target === 'object') {
            const _Constrc = Target.constructor
			if (!_Constrc.prototype._$restMapping) {
				_Constrc.prototype._$restMapping = {};
			}
			if (!_Constrc.prototype._$restMapping.children) {
				_Constrc.prototype._$restMapping.children = [];
			}

			_Constrc.prototype._$restMapping.children.push({
				value: key,
				methodType: method,
                fuc: name,
				// dataType: dataType,
				// option: arg.option || null
			});
		}
	};
}

module.exports = RestMapping;
