var ordinales = require('../dist/ordinales.js');

var numeros_ejemplo = [389, 6170, 82];

numeros_ejemplo.forEach(numero => {
  console.log(numero, ordinales.toOrdinal(numero));
})
