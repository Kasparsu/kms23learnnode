import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let i = 1;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    let msg = JSON.parse(data.toString());
    if(msg.type == 'joined'){
      ws.name = msg.value
      msg.value = {name: msg.value, id: ws.id};
      data = JSON.stringify(msg);
    } else {
      data = data.toString();
    }
        
    wss.clients.forEach(client => {
      if(client.readyState === client.OPEN && client != ws){
        client.send(data);
      }
    });
  });
  ws.on('close', function() {
    wss.clients.forEach(client => {
      if(client.readyState === client.OPEN && client != ws){
        client.send(JSON.stringify({type: 'leaved', value: {name: ws.name, id: ws.id}}));
      }
    });
  });
  ws.id = i++;
  let clients = Array.from(wss.clients).filter(client => client.OPEN && client != ws && client.name && client.id).map(client => {
    return {name: client.name, id: client.id}
  });
  ws.send(JSON.stringify({type: 'users', value: clients}));
});