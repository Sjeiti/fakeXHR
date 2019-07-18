/**
 * node task/serve dist 8383
 */

const express    = require('express')
const serveStatic = require('serve-static')
const openBrowser = require('open')
const root = process.argv[2]||'doc'
const port = process.argv[3]||8183

express()
  .use(serveStatic(`./${root}/`))
  .get('*',(request,response) => {
    response.sendfile(`./${root}/index.html`)
    // response.sendFile(`${__dirname}/../${root}/index.html`)
  })
  .listen(port)

openBrowser('http://localhost:'+port)