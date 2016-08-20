var socketPouchServer = require('socket-pouch/server');

socketPouchServer.listen(8080, {
  remoteUrl: 'http://localhost:5984'
})
