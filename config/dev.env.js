'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PDT_API:'"http://47.244.21.189:8083"',   //ERP api
})
