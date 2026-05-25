'use strict'

const enhance = (type, name, fn) => {
  if (!type.prototype[name]) {
    type.prototype[name] = function (...params) {
      return fn.call(null, this.valueOf(), ...params)
    }
  }
}

module.exports = enhance
