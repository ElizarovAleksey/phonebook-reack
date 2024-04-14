const path = require('path');
// Импортируем nodeExternals для исключения node_modules из бандла
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.js',
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Используйте функцию nodeExternals для автоматического исключения всех модулей в node_modules
  // Мы добавили allowlist, чтобы убедиться, что специфичные модули не исключаются
  externals: [nodeExternals({
    allowlist: [/^@mapbox\/node-pre-gyp/]
  })],
  resolve: {
    // Fallbacks используются для имитации некоторых node модулей в браузере
    // Это полезно, если вы используете библиотеки, которые могут быть запущены и в браузере, и на сервере
    // В вашем случае (с target: 'node') это может быть не нужно, если вы не планируете использовать бандл в браузере
    fallback: {
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "events": require.resolve("events/"),
      "fs": false, // false означает игнорирование модуля
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "http": require.resolve("stream-http"),
      "net": false, // Игнорируем net, поскольку он не используется в браузере
      "zlib": require.resolve("browserify-zlib"),
      "vm": require.resolve("vm-browserify")
    }
  },
};