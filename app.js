const app = require('./config/server')

const server = app.listen(80, () => {
    console.log('Servidor Online')
})

const io = require('socket.io').listen(server)

app.set('io', io)

io.on('connection', (socket) => {
    console.log('Usuário conectou')

    socket.on('disconnect', () => {
        console.log('Usuário desconectou')
    })

    socket.on('msgParaServidor', (data) => {

        //dialogo
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        })
        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        })

        if (data.existeParticipante == 0) {
            //participantes
            socket.emit('participantesParaCliente', {
                apelido: data.apelido
            })

            socket.broadcast.emit('participantesParaCliente', {
                apelido: data.apelido
            })
        }

    })
})