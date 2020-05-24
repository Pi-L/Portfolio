module.exports = {
  entry: {
    vendor: './src/vendors/vendor.js',
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'link:href'],
            interpolate: true
          }
        }]

      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|woff(2)?|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/images/],
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[hash].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        exclude: [/fonts/],
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[hash].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.php$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[ext]',
            outputPath: 'forms/'
          }
        }
      },
      {
        test: /\.htaccess$/,
        exclude: [/contact/],
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name]',
            outputPath: '/'
          }
        }
      },
      {
        test: /\.htaccess$/,
        include: [/contact/],
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name]',
            outputPath: 'forms/'
          }
        }
      }
    ]
  }
};
