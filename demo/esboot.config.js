module.exports = {
  serverPort: 23564,
  browsers: ['last 2 versions', 'iOS >= 8', 'Android >= 4.4'],
  copyFile: [
    './config.js',
  ],
  html: [
    {
      name: 'index',
      title: 'React App',
      entry: './src/index',
    },
  ],
};
