const createRouters = (app, express) => (controllers) => {

	controllers.map((contro, index) => {
		let item = contro.clazz.prototype._$restMapping
		let indexRouter = express.Router();
		const Clazz = contro.clazz
		const Fuc = new Clazz();

		if (item.children && item.children.length) {
			item.children.map((router, current) => {
				let method;
				if (router.methodType === 'any' && item.rootMethod !== 'any') {
					method = item.rootMethod;
				}

				if (router.methodType !== 'any') {
					method = router.rootMethod;
				}

				if (method) {
					beRouter(indexRouter, method, Fuc, router)
				} else {
					beRouter(indexRouter, 'get', Fuc, router)
					beRouter(indexRouter, 'post', Fuc, router)
				}
			});
		}

		app.use(item.root || '/', indexRouter);
	});
};

function beRouter(indexRouter, httpType, Fuc, router) {
	let beforMapp = Array.isArray(Fuc.ControllerBeforeMapping) ? Fuc.ControllerBeforeMapping : [Fuc.ControllerBeforeMapping]

	indexRouter[httpType](router.value, [...beforMapp], (req, res, next) => {
		const data = httpType === 'get' ? req.query : req.body;
		Fuc[router.fuc](data, res, {
			req,
			res,
			next
		});
	});
}

module.exports = createRouters;