const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //для минимизации файла css
const TerserPlugin = require('terser-webpack-plugin'); // Подключаем TerserPlugin для минимизации js
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');  //минимизация html

module.exports = {
  mode: "development",
  entry: {                     //откуда собираем
    filename: path.resolve(__dirname, 'src/js/index.js')
  },
  // devtool: "eval-sourse-map",   //для отладки но не работает
  output: {                    //куда собираем
    path: path.resolve(__dirname, 'dist'),  //в какую папку собираем
    filename: 'js/main.js', //какое имя файла будет
    // filename: 'js/[name][contenthash].js', //какое имя файла будет но вместо main.js будет хешированное
    assetModuleFilename: 'image/[name][ext]',       //имя файла картинки
    clean: true,                     //удалять предыдущие файлы сборки

  },
  performance: {
    hints: false,             //убираем подсказки
    maxAssetSize: 512000,     //максимальный размер картинки
    maxEntrypointSize: 512000 //ленивая загрузка после размера
  },
  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist')
    }
  },
  module: {
    rules: [
      {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif)$/i,
        type: 'asset/resource'     //тип ресурс
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'My web page',
      filename: 'index.html',      //результирующее имя файла сборки
      template: 'src/index.html',  //шаблон брать из
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",   //результирующее имя файла сборки
      // filename: "css/[name].css",

    }),
  ],
  optimization: {
    // minimize: true,    //минимизирует все и в дев и прод версиях
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.(css|sass|scss)$/,
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Удалить console.log
          },
          output: {
            comments: false, // Удалить комментарии
          },
        },
      }),
      new HtmlMinimizerPlugin(),
    ],

},
}
