# v2.0.2

`2021/12/04`

- 添加README
- 移除Redux-devtools生产输出
- 完善TypeScript类型

- 添加React单元测试
- 添加husky

# v2.0.1

`2021/12/01`

- 添加`postcss`配置

# v2.0.0

`2021/10/27`

## React相关

- [x] 升级所有React相关库版本
- [x] 添加`redux-go`，优化redux操作
- [x] 热更新：`react-hot-loader` => `react-refresh`

## webpack相关

- [x] `webpack4` => `webpack5`
- [x] 添加`BundleAnalyzerPlugin`，用于打包时分析包体积
- [x] 添加`FriendlyErrorsWebpackPlugin`，用于更友好的错误提示
- [x] 添加`SpeedMeasurePlugin`，用于监听各模块打包速度
- [x] `css-minimizer-webpack-plugin` => `optimize-css-assets-webpack-plugin`
- [x] `uglifyjs-webpack-plugin` => `terser-webpack-plugin`
- [x] loaders、plugins更至最新

## 打包优化

- [x] 自动压缩流程
- [x] 自动更新版本号
- [x] 打完包preview

## 其他

- [x] 添加`config.js`以及版本控制
- [x] 添加`stylelint`校验规则
- [x] 添加`.editorconfig`，统一编辑器配置
- [x] 添加`prettier.js`
- [x] 添加Path alias

# Roadmap

- [ ] 添加husky钩子
