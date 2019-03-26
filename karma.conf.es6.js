const customize = require('@author.io/karma-customelements')('test/es6', './dist/author-menu.js', 'BrowserStack')

module.exports = config => {
  config.set(Object.assign(customize(config, true, false), {
    browserify: {
      transform: [ 'rollupify' ]
    },
    concurrency: 1,
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000
  }))
}
