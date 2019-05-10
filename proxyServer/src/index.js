var http = require('http'),
    httpProxy = require('http-proxy');

const endpoint = 3000;

const rules = [{
    matchRegex: /\/api.vc\//,
    replaceRegex: /\/api.vc/,
    targetUrl: "http://api.vc.bilibili.com/"
},
{
    matchRegex: /\/api\//,
    replaceRegex: /\/api/,
    targetUrl: "http://api.bilibili.com/"
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
    rules.forEach((rule, index) => {
        if (rule.matchRegex.test(req.url)) {
            req.url = req.url.replace(rule.replaceRegex, "");
            proxy.web(req, res, {
                target: rule.targetUrl
            });
        }
    })
});

console.log("listening on port " + endpoint)
server.listen(endpoint);