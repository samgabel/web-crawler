import { normalizeURL, getURLsFromHTML } from './crawl.js'

import { test, expect } from '@jest/globals'



// normalizeURL()

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})


// getURLsFromHTML()

test('getURLsFromHTML absolute', () => {
  const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const htmlBody = '<html><body><a href="/path/one"><span>Boot.dev</span></a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path/one']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const htmlBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://blog.boot.dev/path/one', 'https://other.com/path/one']
  expect(actual).toEqual(expected)
})

