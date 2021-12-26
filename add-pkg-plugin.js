//import { Compiler } from 'webpack'
const pkg = require('./package.json')

const pluginName = 'AddPkgJSONPlugin'
const outFileName = 'package.json'

class AddPkgPlugin {
  /**
   * @param compiler { Compiler }
   */
  apply(compiler) {
    const { Compilation } = compiler.webpack
    const { RawSource } = compiler.webpack.sources
    const entryName = compiler.options.output.filename

    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      compilation.hooks.processAssets.tap({
        name: pluginName,
        stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
      }, () => {
        const { name, version, license } = pkg
        const outPkg = {
          name,
          version,
          main: entryName,
          license,
          scripts: {
            start: `node ${entryName} | bunyan`
          },
          devDependencies: {
            "bunyan": pkg.devDependencies.bunyan
          }
        }
        compilation.emitAsset(outFileName, new RawSource(JSON.stringify(outPkg, null, 2)))
      })
    })
  }
}

module.exports = { AddPkgPlugin }
