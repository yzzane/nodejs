
const http = require('http')
const url = require('url')
const querystring = require('querystring')

function start(route, handle) {
    
    function onRequest(request, response) {
        let postData = ''        
        let pathname = url.parse(request.url).pathname

        route(handle, pathname, response, request)

        //request.setEncoding("utf8")
        //监听数据传送事件
        // request.addListener("data", function(postDataChunk) {
        //     postData += postDataChunk
        //     console.log("Received POST data chunk '" + postDataChunk + "'.")
        // })
        // request.addListener("end", function() {
        //     route(handle, pathname, response, postData)
        // })        
    }

    http.createServer(onRequest).listen(8000)
    console.log("The server has started")
}

exports.start = start