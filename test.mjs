import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toOrdinal } from './src/ordinales.js'

test('ordinales básicos', () => {
  assert.strictEqual(toOrdinal(1),      'primero')
  assert.strictEqual(toOrdinal(3),      'tercero')
  assert.strictEqual(toOrdinal(1, 'f'), 'primera')
  assert.strictEqual(toOrdinal(21),     'vigésimo primero')
})

test('apócope masculino', () => {
  assert.strictEqual(toOrdinal(1,   'm', true), 'primer')
  assert.strictEqual(toOrdinal(3,   'm', true), 'tercer')
  assert.strictEqual(toOrdinal(21,  'm', true), 'vigésimo primer')
  assert.strictEqual(toOrdinal(23,  'm', true), 'vigésimo tercer')
  assert.strictEqual(toOrdinal(101, 'm', true), 'centésimo primer')
})

test('apócope no aplica en femenino ni sin terminación especial', () => {
  assert.strictEqual(toOrdinal(1,  'f', true), 'primera')
  assert.strictEqual(toOrdinal(10, 'm', true), 'décimo')
  assert.strictEqual(toOrdinal(8,  'm', true), 'octavo')
})

test('números grandes — miles', () => {
  assert.strictEqual(toOrdinal(9999),          'nuevemilésimo noningentésimo nonagésimo noveno')
  assert.strictEqual(toOrdinal(10000),         'décimo milésimo')
  assert.strictEqual(toOrdinal(21000),         'vigésimo primer milésimo')
  assert.strictEqual(toOrdinal(21000, 'f'),    'vigésima primera milésima')
  assert.strictEqual(toOrdinal(21000, 'm', true), 'vigésimo primer milésimo')
  assert.strictEqual(toOrdinal(100000),        'centésimo milésimo')
  assert.strictEqual(toOrdinal(123456),        'centésimo vigésimo tercer milésimo cuadrigentésimo quincuagésimo sexto')
})

test('números grandes — millones', () => {
  assert.strictEqual(toOrdinal(1000000),          'millonésimo')
  assert.strictEqual(toOrdinal(2000000),          'dosmillonésimo')
  assert.strictEqual(toOrdinal(21000000, 'm', true), 'vigésimo primer millonésimo')
  assert.strictEqual(toOrdinal(21000000, 'f'),    'vigésima primera millonésima')
})
