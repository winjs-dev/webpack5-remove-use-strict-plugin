# webpack5-remove-use-strict-plugin

[![npm](https://img.shields.io/npm/v/@winner-fed/webpack5-remove-use-strict-plugin.svg)](https://npmjs.com/package/@winner-fed/webpack5-remove-use-strict-plugin)

专为 Webpack 5 设计的移除 "use strict" 声明的插件。此插件可以从生成的 JavaScript 代码中删除所有 'use strict' 和 "use strict" 声明。

## 背景

在某些特定场景下，你可能需要移除 Webpack 生成代码中的 "use strict" 声明：

- 当你需要在不支持严格模式的环境中运行代码
- 当你的代码依赖于非严格模式的行为
- 当你需要与特定的、不兼容严格模式的旧代码或库集成

## 安装

```bash
# 使用 npm
npm install --save-dev @winner-fed/webpack5-remove-use-strict-plugin

# 使用 yarn
yarn add --dev @winner-fed/webpack5-remove-use-strict-plugin

# 使用 pnpm
pnpm add --save-dev @winner-fed/webpack5-remove-use-strict-plugin
```

## 使用方法

在你的 Webpack 配置文件中引入并使用此插件：

### CommonJS 方式

```js
const Webpack5RemoveUseStrictPlugin = require('@winner-fed/webpack5-remove-use-strict-plugin');

module.exports = {
  // ... 其他 webpack 配置
  plugins: [
    // ... 其他插件
    new Webpack5RemoveUseStrictPlugin()
  ]
};
```

### ES Module 方式

```js
import Webpack5RemoveUseStrictPlugin from '@winner-fed/webpack5-remove-use-strict-plugin';

export default {
  // ... 其他 webpack 配置
  plugins: [
    // ... 其他插件
    new Webpack5RemoveUseStrictPlugin()
  ]
};
```

## 工作原理

该插件通过 Webpack 5 的 `processAssets` 钩子在优化资源阶段工作，可以移除所有生成的 JavaScript 文件中的 'use strict' 和 "use strict" 声明（不管有没有分号）。

插件会：

1. 监听 Webpack 的 `compilation` 钩子
2. 在 `PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE` 阶段处理所有 JavaScript 资源
3. 使用正则表达式查找并移除所有 "use strict" 声明
4. 使用 Webpack 的 `RawSource` 更新资源内容

## 兼容性

本插件仅兼容 Webpack 5+，不支持 Webpack 4 或更早版本。

## 许可证

[MIT](./LICENSE) 许可证
