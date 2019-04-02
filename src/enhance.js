/**
 * Enhances a certain type prototype
 */
const enhance = (type, name, fn) => {
	if (!type.prototype[name]) {
		type.prototype[name] = function(...params) {
			return fn.call(null, this, ...params);
		}
	}
}

module.exports = enhance