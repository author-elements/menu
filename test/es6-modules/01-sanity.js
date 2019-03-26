import AuthorElement from '../../author-element.js'

const test = require('tape')

test('Sanity', t => {
  t.ok(typeof AuthorElement === 'function', 'Base class detected.')
  t.end()
})

// test('Extend Base Class', function (t) {
//   class
// })
