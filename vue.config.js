const autoprefixer = require('autoprefixer')
const filterRules = require('postcss-filter-rules')

module.exports = {
  lintOnSave: true,
  filenameHashing: false,
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          filterRules({
            filter: (selector) => {
              const re = new RegExp(/^(html|body|\*|ul|ol|select|small|button|main|pre|samp|code|a|b|strong|sub|sup|input|textarea|legend|img)(\W|$)/, 'i')
              const exception  = '.vue-global'
              return !re.test(selector) || selector.includes(exception)
            },
            keepAtRules: true
          }),
          autoprefixer
        ]
      }
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/'
}
