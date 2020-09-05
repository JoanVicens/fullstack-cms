const path = require('path');


module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/auth/*': {
        target: 'http://localhost:5000'
      },
      '/cursos/*': {
        target: 'http://localhost:5000'
      },
      '/docs/*': {
        target: 'http://localhost:5000'
      },
      '/info/*': {
        target: 'http://localhost:5000'
      }
    }
  }
}
