/**
 * @file 把需要用到的 configuration 都引进来，根据命令行的传参数去区分启动的服务是为某个项目服务
 * @author jamesjianpeng
 */
const merge = require('webpack-merge');
let devConf = require('../webpack/webpack.dev.js');
const baseConf = require('../webpack/webpack.config.js');
// const tsDevConf = require('../webpack/webpack.dev.ts.multiple.conf');
const { devScript } = require('./base-dev.js');


/**  #region only compiler TypeScript 多页面 */
devConf.devServer.historyApiFallback = {
    rewrites: [
        { from: /^\//, to: '/wave.html' }
    ]
};
devConf = merge(baseConf, devConf);
/**  #endregion */

devScript(devConf)
