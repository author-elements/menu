const fs = require('fs-extra')
const dist = require('path').join('./dist')

// if (process.argv.indexOf('--karma') >= 0) {
//   fs.readdirSync(process.cwd()).forEach(asset => {
//     if (asset.indexOf('sc-karma') === 0 && asset.indexOf('.log') > 0) {
//       fs.removeSync(require('path').join(process.cwd(), asset))
//     }
//   })
// }

if (fs.existsSync(dist)) {
  fs.removeSync(dist)
}
