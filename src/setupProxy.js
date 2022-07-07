const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/photos/random/",{
            target: "https://api.unsplash.com",
            changeOrigin: true
        })
    );
};