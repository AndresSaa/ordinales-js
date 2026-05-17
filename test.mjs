import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toOrdinal } from './src/index.js'

test('ordinales básicos', () => {
  assert.strictEqual(toOrdinal(1),      'primero')
  assert.strictEqual(toOrdinal(3),      'tercero')
  assert.strictEqual(toOrdinal(1, 'f'), 'primera')
  assert.strictEqual(toOrdinal(21),     'vigésimo primero')
})

test('género mediante objeto de opciones', () => {
  assert.strictEqual(toOrdinal(1,  { gender: 'f' }), 'primera')
  assert.strictEqual(toOrdinal(3,  { gender: 'f' }), 'tercera')
  assert.strictEqual(toOrdinal(21, { gender: 'f' }), 'vigésima primera')
  assert.strictEqual(toOrdinal(63, { gender: 'f' }), 'sexagésima tercera')
  assert.strictEqual(toOrdinal(1,  { gender: 'm' }), 'primero')
})

test('apócope masculino', () => {
  assert.strictEqual(toOrdinal(1,   { apocope: true }), 'primer')
  assert.strictEqual(toOrdinal(3,   { apocope: true }), 'tercer')
  assert.strictEqual(toOrdinal(21,  { apocope: true }), 'vigésimo primer')
  assert.strictEqual(toOrdinal(23,  { apocope: true }), 'vigésimo tercer')
  assert.strictEqual(toOrdinal(101, { apocope: true }), 'centésimo primer')
})

test('apócope no aplica en femenino ni sin terminación especial', () => {
  assert.strictEqual(toOrdinal(1,  { gender: 'f', apocope: true }), 'primera')
  assert.strictEqual(toOrdinal(10, { apocope: true }),               'décimo')
  assert.strictEqual(toOrdinal(8,  { apocope: true }),               'octavo')
})

test('números grandes — miles', () => {
  assert.strictEqual(toOrdinal(9999),                     'nuevemilésimo noningentésimo nonagésimo noveno')
  assert.strictEqual(toOrdinal(10000),                    'décimo milésimo')
  assert.strictEqual(toOrdinal(21000),                    'vigésimo primer milésimo')
  assert.strictEqual(toOrdinal(21000, 'f'),               'vigésima primera milésima')
  assert.strictEqual(toOrdinal(21000, { apocope: true }), 'vigésimo primer milésimo')
  assert.strictEqual(toOrdinal(100000),                   'centésimo milésimo')
  assert.strictEqual(toOrdinal(123456),                   'centésimo vigésimo tercer milésimo cuadrigentésimo quincuagésimo sexto')
})

test('números grandes — millones', () => {
  assert.strictEqual(toOrdinal(1000000),                     'millonésimo')
  assert.strictEqual(toOrdinal(2000000),                     'dosmillonésimo')
  assert.strictEqual(toOrdinal(21000000, { apocope: true }), 'vigésimo primer millonésimo')
  assert.strictEqual(toOrdinal(21000000, 'f'),               'vigésima primera millonésima')
})

test('casos de borde — valores sin ordinal', () => {
  assert.strictEqual(toOrdinal(0),  '')
  assert.strictEqual(toOrdinal(-1), '')
  assert.strictEqual(toOrdinal(-999), '')
})

test('casos de borde — floats se truncan', () => {
  assert.strictEqual(toOrdinal(1.9),  'primero')
  assert.strictEqual(toOrdinal(3.1),  'tercero')
  assert.strictEqual(toOrdinal(21.7), 'vigésimo primero')
})

test('format abbr — masculino por defecto', () => {
  assert.strictEqual(toOrdinal(1,  { format: 'abbr' }), '1.ᵒ')
  assert.strictEqual(toOrdinal(2,  { format: 'abbr' }), '2.ᵒ')
  assert.strictEqual(toOrdinal(21, { format: 'abbr' }), '21.ᵒ')
})

test('format abbr — femenino', () => {
  assert.strictEqual(toOrdinal(1,  { gender: 'f', format: 'abbr' }), '1.ᵃ')
  assert.strictEqual(toOrdinal(3,  { gender: 'f', format: 'abbr' }), '3.ᵃ')
  assert.strictEqual(toOrdinal(21, { gender: 'f', format: 'abbr' }), '21.ᵃ')
})

test('format abbr — apócope solo en 1 y 3 masculino', () => {
  assert.strictEqual(toOrdinal(1,  { apocope: true, format: 'abbr' }), '1.ᵉʳ')
  assert.strictEqual(toOrdinal(3,  { apocope: true, format: 'abbr' }), '3.ᵉʳ')
  assert.strictEqual(toOrdinal(21, { apocope: true, format: 'abbr' }), '21.ᵒ')
  assert.strictEqual(toOrdinal(1,  { gender: 'f', apocope: true, format: 'abbr' }), '1.ᵃ')
})

test('format abbr — abbrDot: false omite el punto', () => {
  assert.strictEqual(toOrdinal(1,  { format: 'abbr', abbrDot: false }), '1ᵒ')
  assert.strictEqual(toOrdinal(1,  { gender: 'f', format: 'abbr', abbrDot: false }), '1ᵃ')
  assert.strictEqual(toOrdinal(3,  { apocope: true, format: 'abbr', abbrDot: false }), '3ᵉʳ')
  assert.strictEqual(toOrdinal(21, { format: 'abbr', abbrDot: false }), '21ᵒ')
})

test('format abbr — casos de borde', () => {
  assert.strictEqual(toOrdinal(0,   { format: 'abbr' }), '')
  assert.strictEqual(toOrdinal(-1,  { format: 'abbr' }), '')
  assert.strictEqual(toOrdinal(1.9, { format: 'abbr' }), '1.ᵒ')
})

test('format abbr — abbrStyle: plain', () => {
  assert.strictEqual(toOrdinal(1,  { format: 'abbr', abbrStyle: 'plain' }), '1o')
  assert.strictEqual(toOrdinal(2,  { format: 'abbr', abbrStyle: 'plain' }), '2o')
  assert.strictEqual(toOrdinal(21, { format: 'abbr', abbrStyle: 'plain' }), '21o')
  assert.strictEqual(toOrdinal(1,  { gender: 'f', format: 'abbr', abbrStyle: 'plain' }), '1a')
  assert.strictEqual(toOrdinal(21, { gender: 'f', format: 'abbr', abbrStyle: 'plain' }), '21a')
  assert.strictEqual(toOrdinal(1,  { apocope: true, format: 'abbr', abbrStyle: 'plain' }), '1er')
  assert.strictEqual(toOrdinal(3,  { apocope: true, format: 'abbr', abbrStyle: 'plain' }), '3er')
  assert.strictEqual(toOrdinal(21, { apocope: true, format: 'abbr', abbrStyle: 'plain' }), '21o')
  assert.strictEqual(toOrdinal(1,  { gender: 'f', apocope: true, format: 'abbr', abbrStyle: 'plain' }), '1a')
})

test('casos de borde — tipos inválidos lanzan TypeError', () => {
  assert.throws(() => toOrdinal(NaN),             TypeError)
  assert.throws(() => toOrdinal('foo'),           TypeError)
  assert.throws(() => toOrdinal(null),            TypeError)
  assert.throws(() => toOrdinal(undefined),       TypeError)
  assert.throws(() => toOrdinal({ gender: 'f' }), TypeError)
  assert.throws(() => toOrdinal([1, 2, 3]),       TypeError)
})
