// Minimal room relay for Vem Comer cross-device squad play.
// Run: npm run relay
// Then open the game with ?relay=ws://<host>:3003

import { WebSocketServer } from 'ws';

const PORT = Number(process.env.RELAY_PORT || process.env.PORT || 3003);
const wss = new WebSocketServer({ port: PORT });
const rooms = new Map();

function roomFor(name) {
  const key = String(name || '').toUpperCase();
  if (!rooms.has(key)) rooms.set(key, new Map());
  return rooms.get(key);
}

function send(ws, payload) {
  if (ws.readyState === 1) ws.send(JSON.stringify(payload));
}

wss.on('connection', ws => {
  ws.room = null;
  ws.peerId = null;

  ws.on('message', raw => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }
    if (!msg || typeof msg !== 'object') return;

    if (msg.t === 'join') {
      ws.room = String(msg.room || '').toUpperCase();
      ws.peerId = String(msg.id || '').slice(0, 40);
      if (!ws.room || !ws.peerId) return;
      const room = roomFor(ws.room);
      room.set(ws.peerId, ws);
      send(ws, { t: 'joined', room: ws.room, peers: [...room.keys()] });
      return;
    }

    if (msg.t === 'msg' && ws.room && ws.peerId) {
      const room = roomFor(ws.room);
      const payload = { t: 'msg', from: ws.peerId, data: msg.data };
      if (msg.to) {
        const target = room.get(String(msg.to));
        if (target) send(target, payload);
      } else {
        for (const [id, peer] of room) if (id !== ws.peerId) send(peer, payload);
      }
    }
  });

  ws.on('close', () => {
    if (!ws.room || !ws.peerId) return;
    const room = rooms.get(ws.room);
    if (!room) return;
    room.delete(ws.peerId);
    for (const peer of room.values()) send(peer, { t: 'left', id: ws.peerId });
    if (room.size === 0) rooms.delete(ws.room);
  });
});

console.log(`Vem Comer relay listening on ws://0.0.0.0:${PORT}`);
