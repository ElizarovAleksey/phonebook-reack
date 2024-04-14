const webpack = require('webpack'); // Добавьте этот импорт

module.exports = () => {
  const result = dotenv.config();

  if (result.error) {
    console.error('Ошибка при загрузке файла .env:', result.error);
  }

  const env = result.parsed || {};

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    // Остальная конфигурация webpack...
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        crypto: require.resolve("crypto-browserify")
      }
    },
    plugins: [
      new webpack.DefinePlugin(envKeys), // Добавьте этот плагин
    ],
  };
};