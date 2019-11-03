const app = require('./config/server')

const server = app.listen(80, () => {
    console.log('Servidor Online')
})

const io = require('socket.io').listen(server)


io.on('connection', (socket) => {
    console.log('Usuário conectou')

    socket.on('disconnect', () => {
        console.log('Usuário desconectou')
    })
})