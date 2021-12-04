# 介绍

[ts-react-template](https://github.com/esboot/ts-react-template)是一个React项目生成模板。用于生成一个`React + Typescript + React Router(可选) + Redux(可选)`的项目。

# 快速开始

```sh
yarn create esboot ts-react my-app
cd my-app
yarn start
```

# 创建项目

```sh
# 推荐使用yarn
yarn create esboot ts-react

# npm >= 6
npm init esboot ts-react

# npm < 6
npx create-esboot ts-react
```

如果没有指定目录，会询问是否在当前目录创建项目。

- `Create project under current directory?`

根据提示选择，如果选择 否 则会中止创建。

- `Use react router?` 是否需要`React Router`
- `Use redux?` 是否需要`Redux`

如果没有错误，则会提示模板已经创建完毕(`Success! All files created!`)。

- `Install all dependence right now?` 是否需要立即安装依赖

# 目录结构

```yml
my-app
  |-- .babelrc.js
  |-- .browserslistrc # 浏览器兼容列表
  |-- .editorconfig # 编辑器配置
  |-- .eslintignore
  |-- .eslintrc.js
  |-- .gitignore
  |-- .prettierrc
  |-- .stylelintrc
  |-- CHANGELOG.md
  |-- README.md
  |-- config.js # 项目配置文件
  |-- esboot.config.js # esboot配置文件
  |-- globals.d.ts
  |-- package.json
  |-- tsconfig.json
  |-- webpack.config.js
  |-- dev # 开发环境脚本相关
  |   |-- upgrade-version.js
  |   |-- zip.js
  |-- src
  |   |-- app.tsx
  |   |-- index.tsx
  |   |-- components
  |   |   |-- demo.scss
  |   |   |-- demo.tsx
  |   |-- global-css
  |   |   |-- main.scss
  |   |-- images
  |   |   |-- checked@2x.png
  |   |   |-- en.png
  |   |-- model # Redux相关
  |       |-- action.ts
  |       |-- reducer.ts
  |       |-- store.ts
  |-- template
  |   |-- index.html
```

# esboot.config.js说明

```js
module.exports = {
  serverPort: 23564, // 开发服务器端口
  copyFile: [ // 打包时需要copy的文件
    './config.js',
  ],
  html: [ // 打包入门
    {
      name: 'Page1',
      title: 'Page1',
      entry: './src/Page1',
    },
     {
      name: 'Page2',
      title: 'Page2',
      entry: './src/Page2',
    },
    // ...
  ],
};
```

# Scripts

- `start / dev`

启动开发服务器

- `eslint`

开始eslint检测

- `build:clear`

打生产包

- `build`

1. 打生产包
2. 自动更新测试版本号
3. 压缩文件 到 `release/vx.x.x.x.zip`
4. 为输出目录打开一个静态服务器

- `preview`

为生产输出目录打开一个静态服务器

- `analyzer`

分析生产输出目录文件大小

- `zip`

压缩生产输出目录
