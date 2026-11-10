// Lightweight squad transport.
// Same-browser tabs use BroadcastChannel. Cross-device play uses the optional
// WebSocket relay (server/relay.mjs) and is enabled with ?relay=ws://host:3003
// or the relay field in the Squad Link modal.

const uid = () => Math.random().toString(36).slice(2, 10);

export class SquadLink {
  constructor({ room, role, relayUrl = '', onMessage, onPeerJoin, onPeerLeave, onReady, onStatus, onClose } = {}) {
    this.room = String(room || '').toUpperCase();
    this.role = role === 'join' ? 'join' : 'host';
    this.relayUrl = relayUrl;
    this.onMessage = onMessage;
    this.onPeerJoin = onPeerJoin;
    this.onPeerLeave = onPeerLeave;
    this.onReady = onReady;
    this.onStatus = onStatus;
    this.onClose = onClose;
    this.id = uid();
    this.hostId = null;
    this.channel = null;
    this.ws = null;
    this.closed = false;
  }

  connect() {
    if (this.relayUrl) this.connectRelay();
    else this.connectLocal();
  }

  connectLocal() {
    this.id = 'bc-' + this.id;
    this.channel = new BroadcastChannel('vem-comer-' + this.room);
    this.channel.onmessage = e => {
      const { from, to, data } = e.data || {};
      if (!from || from === this.id) return;
      if (to && to !== this.id) return;
      this.handle(from, data);
    };
    this.post({ kind: 'join', role: this.role });
    this.onStatus?.(this.role === 'host' ? 'Room open. Waiting for squad…' : 'Searching for host…');
  }

  connectRelay() {
    this.id = 'ws-' + this.id;
    try {
      this.ws = new WebSocket(this.relayUrl);
    } catch {
      this.onStatus?.('Relay URL is invalid.');
      this.onClose?.('bad-relay');
      return;
    }
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({ t: 'join', room: this.room, id: this.id }));
      this.post({ kind: 'join', role: this.role });
      this.onStatus?.(this.role === 'host' ? 'Relay connected. Room open.' : 'Relay connected. Searching for host…');
    };
    this.ws.onmessage = ev => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch { return; }
      if (msg.t === 'msg') this.handle(msg.from, msg.data);
      else if (msg.t === 'left') this.onPeerLeave?.(msg.id);
      else if (msg.t === 'error') this.onStatus?.(msg.message || 'Relay error.');
    };
    this.ws.onclose = () => {
      if (!this.closed) this.onStatus?.('Relay disconnected.');
      if (!this.closed) this.onClose?.('relay-closed');
    };
    this.ws.onerror = () => this.onStatus?.('Relay connection failed.');
  }

  handle(from, data) {
    if (!data) return;
    if (data.kind === 'join') {
      if (this.role === 'host') {
        this.send(from, { kind: 'welcome', hostId: this.id });
        this.onPeerJoin?.(from);
      } else if (data.role === 'host' && !this.hostId) {
        // Host connected after us. Re-announce so it can assign a slot.
        this.hostId = from;
        this.send(from, { kind: 'join', role: 'join' });
        this.onReady?.(from);
      }
      return;
    }
    if (data.kind === 'welcome') {
      if (this.role === 'join' && !this.hostId) {
        this.hostId = data.hostId || from;
        this.onReady?.(this.hostId);
      }
      return;
    }
    if (data.kind === 'leave') { this.onPeerLeave?.(from); return; }
    this.onMessage?.(from, data);
  }

  post(data, to = null) {
    if (this.channel) {
      this.channel.postMessage({ from: this.id, to, data });
    } else if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ t: 'msg', room: this.room, to, data }));
    }
  }

  send(to, data) { this.post(data, to); }
  broadcast(data) { this.post(data, null); }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.post({ kind: 'leave' });
    setTimeout(() => {
      this.channel?.close();
      try { this.ws?.close(); } catch { /* already closed */ }
    }, 30);
  }
}
