var http = require('http'),
    httpProxy = require('http-proxy');

const endpoint = 3000;

const prefixSettings = [{
    matchRegex: /\/api.vc\//,
    replace: {
        searchValue: /\/api.vc/,
        replaceValue: "",
    },
    host: "http://api.vc.bilibili.com/"
},
{
    matchRegex: /\/api\//,
    replace: {
        searchValue: /\/api/,
        replaceValue: "",
    },
    host: "http://api.bilibili.com/"
},
{
    matchRegex: /\/passport.api\//,
    replace: {
        searchValue: /\/passport.api/,
        replaceValue: "",
    },
    host: "http://passport.bilibili.com/"
}];

var proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
    //proxyReq.removeHeader("host");
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    proxyRes.headers["access-control-allow-origin"] = "*";
});

var server = http.createServer(function (req, res) {
    delete req.headers.host;
    prefixSettings.forEach((setting, index) => {

        let isMatch = setting.matchRegex.test(req.url);
        if (isMatch) {
            req.url = req.url.replace(setting.replace.searchValue, setting.replace.replaceValue);

            proxy.web(req, res, {
                target: setting.host
            });
        }
    })
});

console.log("listening on port " + endpoint)
server.listen(endpoint);