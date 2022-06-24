// 取本机IP地址
const getIPAdress = () => {
	var interfaces = require('os').networkInterfaces()
	for (var devName in interfaces) {
		var iface = interfaces[devName]
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i]
			if (
				alias.family === 'IPv4' &&
				alias.address !== '127.0.0.1' &&
				!alias.internal
			) {
				return alias.address
			}
		}
	}
}

module.exports = {
  title: 'vue3-webpack-ts',
  isPord: process.env.npm_lifecycle_evetn === 'build',
	devServer: getIPAdress() || 'localhost',
	port: '6666',
	publicPath: '/'
}