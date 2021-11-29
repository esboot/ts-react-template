const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {
  getLocalIdent,
  // eslint-disable-next-line import/no-unresolved
} = require('@dr.pogodin/babel-plugin-react-css-modules/utils');

const pkg = require('./package.json');
const userConfig = require('./esboot.config');

const smp = new SpeedMeasurePlugin();
const isDevMode = process.env.NODE_ENV === 'development';

const parseScssModule = (options = {}) => {
  const { modules } = options;

  const cssLoaderOptions = {
    sourceMap: isDevMode,
  };

  if (modules) {
    Object.assign(cssLoaderOptions, {
      importLoaders: 1,
      modules: {
        namedExport: true,
        localIdentContext: path.resolve(__dirname, 'src'),
        getLocalIdent,
        localIdentName: '[name]__[local]__[contenthash:base64:5]',
      },
    });
  }

  return [
    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: cssLoaderOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDevMode,
        postcssOptions: {
          plugins: [
            require('autoprefixer')({}),
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: isDevMode },
    },
  ];
};

const getEntry = () => userConfig.html.reduce((prev, curr) => {
  prev[curr.name] = curr.entry;
  return prev;
}, {});

const getPlugins = () => [
  // !isDevMode && new BundleAnalyzerPlugin(),
  ...userConfig.html.map(
    (i) => new HtmlWebpackPlugin({
      inject: true,
      chunks: [i.name],
      filename: `${i.name}.html`,
      title: i.title || 'ESboot App',
      template: i.template || 'template/index.html',
      templateParameters: {
        version: pkg.version,
      },
    }),
  ),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(pkg.version),
    ENV: JSON.stringify(process.env.NODE_ENV),
  }),
  new FriendlyErrorsWebpackPlugin(),
  new CopyPlugin({
    patterns: userConfig.copyFile,
  }),
  isDevMode && new ReactRefreshPlugin(),
  !isDevMode
    && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
      chunkFilename: 'css/[id].[contenthash:5].css',
    }),
];

const getModulesRules = () => [
  {
    test: /\.(jpg|gif|png|svg|ico)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024,
      },
    },
    generator: {
      filename: 'images/[name].[hash:8][ext]',
    },
  },
  {
    test: /\.(t|j)sx?$/,
    include: path.resolve(__dirname, 'src'),
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: 4,
          workerParallelJobs: 50,
          workerNodeArgs: ['--max-old-space-size=1024'],
          poolTimeout: 2000,
          poolParallelJobs: 50,
          name: 'my-pool',
        },
      },
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: !isDevMode,
          plugins: [isDevMode && require.resolve('react-refresh/babel')].filter(
            Boolean,
          ),
        },
      },
      {
        loader: 'ts-loader',
        options: {
          happyPackMode: true,
        },
      },
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.scss$/,
    exclude: path.resolve(__dirname, 'src/global-css/'),
    use: parseScssModule({ modules: true }),
  },
  {
    test: /\.scss$/,
    include: path.resolve(__dirname, 'src/global-css/'),
    use: parseScssModule(),
  },
];

const getDevServer = () => ({
  compress: true,
  hot: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  port: userConfig.serverPort,
  host: '0.0.0.0',
});

const baseCfg = {
  mode: isDevMode ? 'development' : 'production',
  performance: {
    hints: false,
  },
  entry: getEntry(),
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  output: {
    clean: !isDevMode,
    filename: isDevMode ? 'js/[name].js' : 'js/[name].[chunkhash:5].js',
  },
  plugins: getPlugins().filter(Boolean),
  module: {
    rules: getModulesRules(),
  },
};

const devCfg = {
  devServer: getDevServer(),
  devtool: 'cheap-source-map',
};

const prodCfg = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    emitOnErrors: true,
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
};

const cfg = Object.assign(baseCfg, isDevMode && devCfg, !isDevMode && prodCfg);
// console.log(JSON.stringify(cfg, null, 2), '<-- cfg');
// module.exports = isDevMode ? cfg : smp.wrap(cfg);
module.exports = cfg;
