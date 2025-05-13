/**
 * Webpack 5 plugin to remove "use strict" from the generated code
 * 专为 Webpack 5 设计的移除 "use strict" 插件
 */

// 导入webpack类型
import type {
  Compilation,
  Compiler,
  sources,
  WebpackPluginInstance,
} from 'webpack'

// 匹配所有 "use strict" 和 'use strict' 声明（带或不带分号）
const USE_STRICT_REGEX = /('|")use\s+strict('|");?/g

class Webpack5RemoveUseStrictPlugin implements WebpackPluginInstance {
  private readonly pluginName: string

  constructor() {
    this.pluginName = 'Webpack5RemoveUseStrictPlugin'
  }

  apply(compiler: Compiler): void {
    // 只使用 webpack 5 标准的 processAssets 钩子
    compiler.hooks.compilation.tap(
      this.pluginName,
      (compilation: Compilation) => {
        // 注册资源处理钩子 - 使用 PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE 阶段
        // 这个阶段在资源生成后，但在最终输出前执行
        compilation.hooks.processAssets.tap(
          {
            name: this.pluginName,
            // 确保在资源优化阶段执行，以便处理所有经过其他插件处理的资源
            stage:
              compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
          },
          (assets: Record<string, sources.Source>) => {
            // 遍历所有资源
            Object.keys(assets).forEach((filename) => {
              // 只处理 JavaScript 文件
              if (filename.endsWith('.js')) {
                const asset = assets[filename]

                // 获取资源内容 - 使用标准的 source() 方法获取字符串
                let sourceCode: string
                try {
                  // 确保将 source() 返回值转为字符串
                  const source = asset.source()
                  sourceCode =
                    typeof source === 'string' ? source : source.toString()
                } catch (error) {
                  console.error(`获取 ${filename} 源码时出错:`, error)
                  return
                }

                if (sourceCode) {
                  // 移除所有 "use strict" 声明
                  const newSource = sourceCode.replaceAll(USE_STRICT_REGEX, '')

                  // 使用 webpack-sources 的 RawSource 替换内容
                  const { RawSource } = compiler.webpack.sources
                  compilation.updateAsset(filename, new RawSource(newSource))
                }
              }
            })
          },
        )
      },
    )
  }
}

export default Webpack5RemoveUseStrictPlugin
