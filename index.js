const server = require('./server')
const router = require('./routes')
const requestHandlers = require('./requestHandlers')

let handle = {}
handle["/"]  = requestHandlers.start
handle["/start"]  = requestHandlers.start
handle["/upload"] = requestHandlers.upload
handle["/show"] = requestHandlers.show

server.start(router.routes, handle)