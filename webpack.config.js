const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  const distServer = path.resolve(process.cwd(), "dist");

  return {
    entry: {
      main: {
        import: path.resolve(__dirname, './src/index.ts'),
        filename: 'bundle.js',
      }
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        filename: `${distServer}/index.html`,
        template: './public/index.html',
      }),
    ],
  }
};
