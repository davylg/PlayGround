export class InputManager {
  constructor(settings, callbacks = {}) {
    this.settings = settings;
    this.callbacks = callbacks;
    this.keys = new Set();
    this.lookX = 0;
    this.lookY = 0;
    this.firing = false;
    this.aiming = false;
    this.interactHeld = false;
    this.enabled = false;
    this.pointerLocked = false;
    this.isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    this.joystick = { x: 0, y: 0, active: false, id: null };
    this.lookTouch = { id: null, x: 0, y: 0 };
    this.buttons = {};
    this.setupKeyboard();
    this.setupMouse();
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      if (['Tab', 'Space', 'KeyR', 'KeyE', 'KeyQ', 'KeyF', 'Digit1', 'Digit2'].includes(e.code)) e.preventDefault();
      if (e.repeat) return;
      this.keys.add(e.code);
      if (e.code === 'Space') this.emit('jump');
      if (e.code === 'KeyR') this.emit('reload');
      if (e.code === 'KeyE') this.interactHeld = true;
      if (e.code === 'KeyQ') this.emit('active');
      if (e.code === 'KeyF') this.emit('special');
      if (e.code === 'Digit1') this.emit('weapon1');
      if (e.code === 'Digit2') this.emit('weapon2');
      if (e.code === 'KeyM') this.emit('map');
      if (e.code === 'Escape' && this.pointerLocked) document.exitPointerLock?.();
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      if (e.code === 'KeyE') this.interactHeld = false;
    });
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.firing = false;
      this.interactHeld = false;
    });
  }

  setupMouse() {
    const canvas = document.querySelector('#game-canvas');
    window.addEventListener('mousemove', (e) => {
      if (!this.enabled || this.isTouch) return;
      if (!this.pointerLocked && e.buttons !== 1) return;
      if (this.pointerLocked) {
        this.lookX += e.movementX;
        this.lookY += e.movementY;
      }
    });
    canvas?.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      if (!this.isTouch && !this.pointerLocked) {
        canvas.requestPointerLock?.();
        return;
      }
      if (e.button === 0) {
        this.firing = true;
        this.emit('triggerDown');
      }
      if (e.button === 2) this.aiming = true;
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.firing = false;
        this.emit('triggerUp');
      }
      if (e.button === 2) this.aiming = false;
    });
    window.addEventListener('contextmenu', (e) => {
      if (this.enabled) e.preventDefault();
    });
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === canvas;
      this.callbacks.onPointerLock?.(this.pointerLocked);
    });
  }

  setupTouch(container) {
    if (!container) return;
    const joystickZone = container.querySelector('#joystick-zone');
    const joystickKnob = container.querySelector('#joystick-knob');
    const lookZone = container.querySelector('#look-zone');
    if (joystickZone && joystickKnob) {
      const radius = 52;
      const update = (e) => {
        const rect = joystickZone.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let dx = e.clientX - cx;
        let dy = e.clientY - cy;
        const len = Math.hypot(dx, dy);
        if (len > radius) { dx = (dx / len) * radius; dy = (dy / len) * radius; }
        this.joystick.x = dx / radius;
        this.joystick.y = dy / radius;
        joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
      };
      joystickZone.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.joystick.id = e.pointerId;
        this.joystick.active = true;
        joystickZone.setPointerCapture(e.pointerId);
        joystickKnob.classList.add('active');
        update(e);
      });
      joystickZone.addEventListener('pointermove', (e) => {
        if (e.pointerId !== this.joystick.id) return;
        e.preventDefault();
        update(e);
      });
      const end = (e) => {
        if (e.pointerId !== this.joystick.id) return;
        this.joystick.active = false;
        this.joystick.x = 0;
        this.joystick.y = 0;
        this.joystick.id = null;
        joystickKnob.style.transform = 'translate(0px, 0px)';
        joystickKnob.classList.remove('active');
      };
      joystickZone.addEventListener('pointerup', end);
      joystickZone.addEventListener('pointercancel', end);
    }
    if (lookZone) {
      let last = { x: 0, y: 0 };
      lookZone.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse') return;
        this.lookTouch.id = e.pointerId;
        last = { x: e.clientX, y: e.clientY };
        lookZone.setPointerCapture(e.pointerId);
      });
      lookZone.addEventListener('pointermove', (e) => {
        if (e.pointerId !== this.lookTouch.id) return;
        const scale = 1.2;
        this.lookX += (e.clientX - last.x) * scale;
        this.lookY += (e.clientY - last.y) * scale;
        last = { x: e.clientX, y: e.clientY };
      });
      const end = (e) => {
        if (e.pointerId === this.lookTouch.id) this.lookTouch.id = null;
      };
      lookZone.addEventListener('pointerup', end);
      lookZone.addEventListener('pointercancel', end);
    }
    container.querySelectorAll('[data-action]').forEach((el) => {
      const action = el.dataset.action;
      const active = (e) => {
        e.preventDefault();
        el.classList.add('pressed');
        if (action === 'fire') {
          this.firing = true;
          this.emit('triggerDown');
        } else {
          this.emit(action);
        }
        if (action === 'interact') this.interactHeld = true;
      };
      const end = (e) => {
        e.preventDefault();
        el.classList.remove('pressed');
        if (action === 'fire') {
          this.firing = false;
          this.emit('triggerUp');
        }
        if (action === 'interact') this.interactHeld = false;
      };
      el.addEventListener('pointerdown', active);
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);
      el.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'mouse') end(e); });
    });
  }

  emit(action) {
    if (!this.enabled) return;
    this.callbacks[action]?.();
  }

  consumeLook() {
    const sensitivity = Number(this.settings.get('sensitivity') || 0.85);
    const scale = 0.0022 * sensitivity;
    const look = { x: this.lookX * scale, y: this.lookY * scale };
    this.lookX = 0;
    this.lookY = 0;
    return look;
  }

  isDown(code) {
    return this.keys.has(code);
  }

  getMoveVector() {
    let x = 0;
    let z = 0;
    if (this.keys.has('KeyW')) z -= 1;
    if (this.keys.has('KeyS')) z += 1;
    if (this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('KeyD')) x += 1;
    if (this.joystick.active) {
      x += this.joystick.x;
      z += this.joystick.y;
    }
    const len = Math.hypot(x, z);
    if (len > 1) { x /= len; z /= len; }
    return { x, z };
  }

  get sprint() {
    return this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
  }

  setEnabled(value) {
    this.enabled = value;
    if (!value) {
      this.keys.clear();
      this.firing = false;
      this.interactHeld = false;
    }
  }
}
