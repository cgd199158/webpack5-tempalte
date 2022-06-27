// 取本机IP地址
const getIPAdress = () => {
  let interfaces = require('os').networkInterfaces();
  // eslint-disable-next-line guard-for-in
  for (let devName in interfaces) {
    let iface = interfaces[devName];
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
  isPord: process.env.npm_lifecycle_evetn === 'build',
  devServer: getIPAdress() || 'localhost',
  port: 9003,
  publicPath: '/',
};
