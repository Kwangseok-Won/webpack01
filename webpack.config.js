const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const nodeSassMagicImporter = require('node-sass-magic-importer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 폴더를 초기화할 때 사용하는 패키지 // CleanWebpackPlugin은 빌드 이전 결과물을 제거하는 플러그인이다. 빌드 결과물은 아웃풋 경로에 모이는데 과거 파일이 남아 있을수 있다. 이전 빌드내용이 덮여 씌여지면 상관없지만 그렇지 않으면 아웃풋 폴더에 여전히 남아 있을 수 있다.
var HtmlWebpackPlugin = require('html-webpack-plugin') // HtmlWebpackPlugin은 HTML 파일을 후처리하는데 사용한다. 빌드 타임의 값을 넣거나 코드를 압축할수 있다.

const MODE_DEV_SERVER = (process.argv[1].indexOf('webpack-dev-server') > -1)
const APPCACHE = process.env.APPCACHE ? JSON.parse(process.env.APPCACHE) : (!MODE_DEV_SERVER)// if false, nothing will be cached by AppCache

const today = (() => {
  const dtToday = new Date()
  const dtLocal = new Date(dtToday.getTime() - (dtToday.getTimezoneOffset() * 60000))
  const strISO = dtLocal.toISOString()
  return `${strISO.slice(0, 10)} ${strISO.slice(11, 19)}`
})()

const configPath = {
  dest: 'dist',
  dlls: 'dlls'
}

const configDevServer = {
  // contentBase: path.join(__dirname, './'),
  hot: true,
  stats: {
    colors: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
  host: '0.0.0.0',
  port: 9638,
  open: true,
  https: false,
  disableHostCheck: true,
}

const configEntries = [
  `webpack-dev-server/client?http://0.0.0.0:9638/`,
  // 'webpack-dev-server/client?http://' + require("os").hostname() + ':8080/',
  // 'webpack-dev-server/client?http://' + require("ip").address() + ':8080/',
  // `webpack-dev-server/client?http://localhost:8080/`,
  'webpack/hot/dev-server',
  './index.js',
]

const configPlugins = [
  new webpack.DefinePlugin({ // 어플리케이션은 개발환경과 운영환경으로 나눠서 운영한다. 가령 환경에 따라 API 서버 주소가 다를 수 있다. 같은 소스 코드를 두 환경에 배포하기 위해서는 이러한 환경 의존적인 정보를 소스가 아닌 곳에서 관리하는 것이 좋다.
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    'DEVSERVER': JSON.stringify(MODE_DEV_SERVER),
    'DEBUG': JSON.stringify(process.env.NODE_ENV === 'development'),
    'STAGE': JSON.stringify(process.env.NODE_ENV === 'stage'),
    'RELEASE': JSON.stringify(process.env.NODE_ENV === 'production'),
    'BUILD': JSON.stringify(today),//(new Date()).toISOString().replace(/([0-9-]{10})T([0-9:]{8}).*$/, '$1 $2')),
  }),

  /**
   * All files inside webpack's output.path directory will be removed once, but the
   * directory itself will not be. If using webpack 4+'s default configuration,
   * everything under <PROJECT_DIR>/dist/ will be removed.
   * Use cleanOnceBeforeBuildPatterns to override this behavior.
   *
   * During rebuilds, all webpack assets that are not used anymore
   * will be removed automatically.
   *
   * See `Options and Defaults` for information
   */
  new CleanWebpackPlugin({
    // Removes files once prior to Webpack compilation
    //   Not included in rebuilds (watch mode)
    //
    // Use !negative patterns to exclude files
    //
    // default: ['**/*']
    cleanOnceBeforeBuildPatterns: [
      `${configPath.dest}/**/*.*`,
      `${configPath.dest}/css/**/*.*`,
      `${configPath.dest}/js/**/*.*`,
      `${configPath.dest}/fonts/**/*.*`,
      `${configPath.dest}/images/**/*.*`,
      `${configPath.dest}/audiorecorder/**/*.*`,
      `${configPath.dest}/smarteditor/**/*.*`
    ],
    root: path.resolve(__dirname),
    verbose: true,
    exclude: [
      `./${configPath.dlls}/**/*.*`
    ]
  }),
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'windows.jQuery': 'jquery',
    'windows.$': 'jquery',
    '_': 'lodash',
  }),
  new HtmlWebpackPlugin({
    title: 'lc01',
    description: 'lc01',
    username: 'lc01',
    template: 'index.ejs',
    filename: 'index.html',
    inject: 'body',
  }),
  require('precss'),
  require('autoprefixer'),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss() {
        return [
          postcssImport({
            addDependencyTo: webpack,
          }),
          autoprefixer({
            //remove: true,
            browsers: [
              'chrome 61'
            ]
          })
        ]
      },
      sassLoader: {
        importer: nodeSassMagicImporter({
          disableImportOnce: true,
        })
      }
    }
  })
]

const configs = {
  stats: {
    reasons: true
  },
  devtool: 'inline-source-map',
  mode: 'development', // 빈 객체를 전달해도 기본적으로 넣어주는 값이 있다. 노드 환경정보인 process.env.NODEENV 인데 웹팩 설정의 mode에 설정한 값이 여기에 들어간다.
  entry: configEntries, // Entry 속성은 웹팩을 실행할 대상 파일. 진입점
  output: { // Output 속성은 웹팩의 결과물에 대한 정보를 입력하는 속성. 일반적으로 filename과 path를 정의
    path: path.resolve(__dirname, './'),
    filename: '[name].js', // [name]은 위에 entry에서 설정한 파일의 이름
    // chunkFilename: '[id].js',
  },
  module: {
    rules: [
      { test: /\.css$/, 
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader', 
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader', 
          }
        ] 
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.md$/, loader: 'null-loader' },
      { test: /\.txt$/, loader: 'null-loader' },
      { test: /\.ejs$/, exclude: [/node_modules/], 
        // query: { id: 'ejs' } 
      },
      { test: /\.scss$/, 
        // query: { id: 'scss' } 
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader', // 만약 한 페이지에서 작은 이미지를 여러 개 사용한다면 Data URI Scheme을 이용하는 방법이 더 나은 경우도 있다. 이미지를 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 형식이다.
        options: {
          limit: 10000, // 10kb 미만 파일만 data url로 처리
          mimetype: 'image/[ext]',
          name: 'images/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    // root: [
    //   path.resolve(__dirname),
    //   path.resolve(__dirname, 'node_modules'),

    // ],
    alias: {
      'underscore': 'lodash', // for Backbone using lodash instead of underscore
    }
  },
  plugins: configPlugins,
}

if (MODE_DEV_SERVER) {
  configs.devServer = configDevServer
}

module.exports = configs
