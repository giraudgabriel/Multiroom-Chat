const app = require("./config/server");

const server = app.listen(80, () => {
  console.log("Servidor Online");
});

const io = require("socket.io").listen(server);

app.set("io", io);

let clients = [];

io.on("connection", (socket) => {
  const { id } = socket.client.conn;

  console.log(`${id} conectou-se ao socket`);

  socket.on("disconnect", () => {
    const client = clients.find((c) => c.id == id);
    console.log(`${client.apelido} desconectou-se`);
    clients = clients.filter((c) => c.id != id);
    socket.broadcast.emit("participantesParaCliente", clients);
  });

  socket.on("msgParaServidor", (data) => {
    const { apelido, mensagem } = data;
    //dialogo
    socket.emit("msgParaCliente", {
      apelido,
      mensagem,
    });

    //send to all
    socket.broadcast.emit("msgParaCliente", {
      apelido,
      mensagem,
    });

    if (data.existeParticipante == 0) {
      clients.push({ id, apelido });
      console.log(`${apelido} conectou-se ao chat`);

      //participantes
      socket.emit("participantesParaCliente", clients);

      socket.broadcast.emit("participantesParaCliente", clients);
    }
  });
});
