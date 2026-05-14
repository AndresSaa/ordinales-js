var assert = require('assert');
var ordinales = require('./src/ordinales');

console.log("Iniciando tests...");

// 1. COMPROBACIONES BÁSICAS (Lo que ya hacía la librería)
// Verificamos que no hemos roto la funcionalidad original
assert.strictEqual(ordinales.toOrdinal(1), 'primero', 'Fallo en 1 básico');
assert.strictEqual(ordinales.toOrdinal(3), 'tercero', 'Fallo en 3 básico');
assert.strictEqual(ordinales.toOrdinal(1, 'f'), 'primera', 'Fallo en 1 femenino');
assert.strictEqual(ordinales.toOrdinal(21), 'vigésimo primero', 'Fallo en 21 básico');

// 2. NUEVA FUNCIONALIDAD: APÓCOPE (primer / tercer)
// Casos donde SÍ debe cortar la palabra
assert.strictEqual(ordinales.toOrdinal(1, 'm', true), 'primer', 'Fallo: 1 debería ser primer');
assert.strictEqual(ordinales.toOrdinal(3, 'm', true), 'tercer', 'Fallo: 3 debería ser tercer');
assert.strictEqual(ordinales.toOrdinal(21, 'm', true), 'vigésimo primer', 'Fallo: 21 debería ser vigésimo primer');
assert.strictEqual(ordinales.toOrdinal(23, 'm', true), 'vigésimo tercer', 'Fallo: 23 debería ser vigésimo tercer');
assert.strictEqual(ordinales.toOrdinal(101, 'm', true), 'centésimo primer', 'Fallo: 101 debería ser centésimo primer');

// 3. CASOS DONDE NO DEBE APLICAR APÓCOPE
// Aunque activemos 'true', si es femenino o no termina en o/a compatible, no se toca.
assert.strictEqual(ordinales.toOrdinal(1, 'f', true), 'primera', 'Fallo: Femenino no debe apocoparse');
assert.strictEqual(ordinales.toOrdinal(10, 'm', true), 'décimo', 'Fallo: 10 no debe apocoparse');
assert.strictEqual(ordinales.toOrdinal(8, 'm', true), 'octavo', 'Fallo: 8 no debe apocoparse');

console.log("¡Todos los tests pasaron correctamente!");
