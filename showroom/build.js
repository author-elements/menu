const fs = require('fs-extra')
const path = require('path')

const ProductionLine = require('productionline-web')
const TaskRunner = require('shortbus')
const Chassis = require('@chassis/core')

class Builder extends ProductionLine {
  constructor (cfg) {
    super(cfg)

    this.devMode = false
  }

  copyComponent (cb) {
    fs.copySync(this.paths.component, this.outputDirectory('webcomponents'))

    cb()
  }

  copyCustomElements (cb) {
    this.walk(this.paths.authorElements).forEach(dir => {
      let filepath = path.join(dir, 'dist')
      this.walk(filepath).forEach(file => fs.copySync(filepath, this.outputDirectory('webcomponents')))
    })

    cb()
  }

  copyLibs (cb) {
    fs.copySync(this.paths.lib, this.outputDirectory('lib'))
    cb()
  }

  processCss (minify = true, cb) {
    let chassis = new Chassis({
      minify,
      sourceMap: true,
      theme: path.join(this.SOURCE, 'css', 'main.theme'),
      layout: {
        minWidth: 320,
        maxWidth: 960
      }
    })

    let tasks = new TaskRunner()

    this.walk(this.paths.css).forEach(filepath => {
      tasks.add(`Process ${this.localDirectory(filepath)}`, cont => {
        chassis.process(filepath, (err, processed) => {
          if (err) {
            throw err
          }

          if (processed.sourceMap) {
            this.writeFileSync(`${this.outputDirectory(filepath)}.map`, processed.sourceMap)
          }

          this.writeFile(this.outputDirectory(filepath), this.applyHeader(processed.css, 'css'), cont)
        })
      })
    })

    tasks.on('complete', cb)
    tasks.run()
  }

  processJavascript (minify = true, cb) {
    let tasks = new TaskRunner()

    this.walk(this.paths.javascript).forEach(filepath => {
      tasks.add(`Process ${this.localDirectory(filepath)}`, cont => {
        let dir = path.dirname(filepath)
        let output = this.transpile(filepath)

        if (minify) {
          output = this.minify(output.code)
        }

        this.writeFile(this.outputDirectory(filepath), this.applyHeader(output.code, 'js'), cont)
      })
    })

    tasks.on('complete', cb)
    tasks.run()
  }

  make (devMode = false) {
    this.clean()
    // this.copyAssets(true)
    this.addTask('Copy Libraries', next => this.copyLibs(next))
    this.addTask('Copy Component', next => this.copyComponent(next))
    this.addTask('Copy Custom Elements', next => this.copyCustomElements(next))
    this.buildHTML()
    this.addTask('Build JavaScript', next => this.processJavascript(!devMode, next))
    this.addTask('Build CSS', next => this.processCss(!devMode, next))
  }
}

const builder = new Builder({
  header: `Built at ${new Date().toTimeString()}\nCopyright (c) ${new Date().getFullYear()} Author.io`,

  commands: {
    '--prod' (cmd) {
      builder.make()
    },

    '--dev' (cmd) {
      builder.make(true)

      builder.watch((action, filepath) => {
        if (action === 'create' || action === 'update') {
          builder.make(true)
          builder.run()
        }
      })
    },

    '--js-only' (cmd) {
      this.addTask('Build JavaScript', next => this.processJavascript(false, next))
    }
  }
})

builder.paths = {
  apps: path.join(builder.SOURCE, '/apps'),
  javascript: path.join(builder.SOURCE, 'js', '/**/*.js'),
  css: path.join(builder.SOURCE, 'css', '/**/*.css'),
  lib: path.join(builder.SOURCE, 'lib'),
  component: path.resolve('..', 'dist'),
  authorElements: './node_modules/@author.io/element-*'
}

builder.run()
