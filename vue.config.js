module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        },
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true
    }
}
