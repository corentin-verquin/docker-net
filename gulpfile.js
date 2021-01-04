const { src, dest, watch, series } = require('gulp')

const vinylName = require('vinyl-named')
const webpack = require('webpack-stream')
const webpackConf = require('./webpack.config')
const server = require('browser-sync').create()
const del = require('del')

const config = {
    in: { js: 'javascript/app.js' },
    watch: { js: 'javascript/**/*.js' },
    out: './public',
}

/** BROWSER SYNC */
const serve = (done) => {
    server.init({ proxy: 'localhost:5678' })
    done()
}
const reload = (done) => {
    server.reload()
    done()
}

/** JS */
const build_js = (_) => {
    return src(config.in.js)
        .pipe(vinylName())
        .pipe(webpack(webpackConf))
        .pipe(dest(config.out + '/js'))
}
const watch_js = (_) => watch([config.watch.js], series(build_js, reload))

const build = series([build_js])

const develop = series([build, serve, watch_js])

module.exports = { build, develop }
