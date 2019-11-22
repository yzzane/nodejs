const querystring = require('querystring')
const fs = require('fs')
const formidable = require('formidable')

function start(response) {
    console.log("Request handler 'start' was called.")
    let body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" '+
                'content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" enctype="multipart/form-data" method="post">'+
                '<input type="file" name="upload">'+
                '<input type="submit" value="Upload file" />'+
                '</form>'+
                '</body>'+
                '</html>'
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write(body)
    response.end()
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.")
    const form = new formidable.IncomingForm()
    form.parse(request, function(err, fields, files) {
        fs.renameSync(files.upload.path, '/temp/test.png')
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("received image:<br/>")
        response.write("<img src='/show' />")
        response.end()
    })
    
}

function show(response) {
    fs.readFile("/temp/test.png", "binary", function(err, file) {
        if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" })
            response.write(err + "\n")
            response.end()
        } else {
            response.writeHead(200, { "Content-Type": "image/png" })
            response.write(file, "binary")
            response.end()
        }
    })
}

module.exports = {
    start: start,
    upload: upload,
    show: show
}