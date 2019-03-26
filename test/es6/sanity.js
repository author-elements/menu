const test = require('tape')

test('Sanity', t => {
  t.ok(typeof AuthorElement === 'function', 'Base class detected.')
  t.end()
})
