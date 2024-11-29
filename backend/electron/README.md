# Electron 与 Node.js 兼容性问题

Electron 与 Node.js 版本必须一致，否则会报以下错误：

```sh
Error: The module '\\?\D:\Projects\dev\canos-web\backend\dist-windows\node_modules\better-sqlite3\build\Release\better_sqlite3.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 115. This version of Node.js requires
NODE_MODULE_VERSION 130. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

在 node 和 electron 环境中执行下面代码，检查 `process.versions.modules` 版本号是否一致

```js
// version-check.js
console.log('Node.js version:', process.version)
console.log('Node module version:', process.versions.modules)
console.log('Electron version:', process.versions.electron)
```

## 解决方案：重新编译 better-sqlite3

```bash
# 全局安装 electron-rebuild
npm install -g electron-rebuild

# 在项目根目录运行
electron-rebuild
```
但会报错，所以不推荐此方案

## 最终方案（推荐）

由于上述方案报错，所以最终解决方案是切换回 `sqlite3`

放弃版本：`"better-sqlite3": "^11.1.2",`，使用 `"sqlite3": "5.1.6",`，参考 [如何使用 yarn 或 pnpm 安装 sqlite3 - 虹墨空间站](https://www.imaegoo.com/2024/yarn-add-sqlite3/)

并修改 `app.module.ts`

```js
TypeOrmModule.forRoot({
  type: 'sqlite', // 原本为 better-sqlite3
})
```

## 废弃的方案

如果版本号不一致，请更新 node 或 electron 中的任意一个，保证 `process.versions.modules` 版本号一致，如果你更新的是 node 版本，需要重新安装依赖。

- Electron 历史版本：https://releases.electronjs.org/history
- Node.js 历史版本：https://nodejs.org/en/download/prebuilt-installer

附注当前版本：

node

```sh
Node.js version: v20.18.1
Node module version: 115
Electron version: undefined
```

electron

```sh
Node.js version: v20.18.1
Node module version: 128
Electron version: 32.2.6
```

因为 electron 的 `process.versions.modules` 版本并不跟 node 版本一致，所以即使更换版本也没有作用，此方法仅供参考。


