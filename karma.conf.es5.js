let customize = require('@author.io/karma-customelements')('test/es5', './dist/author-menu.es5.js', 'BrowserStack')

module.exports = config => {
  config.set(Object.assign(customize(config), {
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000,
    concurrency: 3,
    logLevel: config.LOG_INFO
  }))
}
