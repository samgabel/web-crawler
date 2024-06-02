import { test, expect } from '@jest/globals'

import { quickSortObject } from './utils.js'



// quickSortObject()

test('quickSortObject', () => {
  const testObj = { 'a': 5, 'b': 99, 'c': 63, 'd': 7, 'e': 88, 'f': 22 }
  const actual = quickSortObject(testObj)
  const expected = ['a', 'd', 'f', 'c', 'e', 'b']
  expect(actual).toEqual(expected)
})

test('quickSortObject reverse=true', () => {
  const testObj = { 'a': 5, 'b': 99, 'c': 63, 'd': 7, 'e': 88, 'f': 22 }
  const actual = quickSortObject(testObj, true)
  const expected = ['b', 'e', 'c', 'f', 'd', 'a']
  expect(actual).toEqual(expected)
})

test('quickSortObject nearly-sorted', () => {
  const testObj = { 'a': 1, 'b': 3, 'c': 2, 'd': 7, 'e': 9, 'f': 22 }
  const actual = quickSortObject(testObj)
  const expected = ['a', 'c', 'b', 'd', 'e', 'f']
  expect(actual).toEqual(expected)
})

test('quickSortObject nearly-sorted reverse=true', () => {
  const testObj = { 'a': 1, 'b': 3, 'c': 2, 'd': 7, 'e': 9, 'f': 22 }
  const actual = quickSortObject(testObj, true)
  const expected = ['f', 'e', 'd', 'b', 'c', 'a']
  expect(actual).toEqual(expected)
})

