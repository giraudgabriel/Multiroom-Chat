const app = require("./config/server");

const server = app.listen(80, () => {
  console.log("Servidor Online");
});

const io = require("socket.io").listen(server);

app.set("io", io);

let clients = [];

io.on("connection", (socket) => {
  console.log("Usuário conectou");

  console.log(clients);
  socket.on("disconnect", () => {
    console.log("Usuário desconectou");
    clients = clients.filter((c) => c.id != socket.client.conn.id);
    socket.broadcast.emit("participantesParaCliente", clients);
  });

  socket.on("msgParaServidor", (data) => {
    const { apelido, mensagem } = data;
    //dialogo
    socket.emit("msgParaCliente", {
      apelido,
      mensagem,
    });
    socket.broadcast.emit("msgParaCliente", {
      apelido,
      mensagem,
    });

    if (data.existeParticipante == 0) {
      clients.push({ id: socket.client.conn.id, apelido });

      //participantes
      socket.emit("participantesParaCliente", clients);

      socket.broadcast.emit("participantesParaCliente", clients);
    }
  });
});
