// 取本机IP地址
const getIPAdress = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let interfaces = require('os').networkInterfaces();
  // eslint-disable-next-line guard-for-in
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

module.exports = {
  title: 'vue3-webpack-ts',
  isProd: process.env.npm_lifecycle_evetn === 'build',
  devServer: getIPAdress() || 'localhost',
  port: 9003,
  publicPath: '/',
};
