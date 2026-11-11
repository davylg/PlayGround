export class MobileInputController {
  constructor({ settings, audio }) {
    this.settings = settings;
    this.audio = audio;
    this.state = {
      moveX: 0,
      moveZ: 0,
      lookX: 0,
      lookY: 0,
      jump: false,
      sprint: false,
      shoot: false,
      reload: false,
      ability: false,
      special: false,
      interact: false,
      deployHeld: false,
    };
    this.joystickActive = false;
    this.lookActive = false;
    this.lastLook = { x: 0, y: 0 };
    this.elements = {
      joystickZone: document.getElementById('joystick-zone'),
      joystickBase: document.getElementById('joystick-base'),
      joystickKnob: document.getElementById('joystick-knob'),
      lookZone: document.getElementById('look-zone'),
      shoot: document.getElementById('m-btn-shoot'),
      reload: document.getElementById('m-btn-reload'),
      jump: document.getElementById('m-btn-jump'),
      interact: document.getElementById('m-btn-interact'),
      ability: document.getElementById('m-btn-ability'),
      special: document.getElementById('m-btn-special'),
      pause: document.getElementById('pause-btn'),
    };
    this.init();
  }

  init() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    document.body.classList.toggle('touch-device', isTouch);
    if (isTouch) this.elements.mobileControls = document.getElementById('mobile-controls');

    const zone = this.elements.joystickZone;
    const knob = this.elements.joystickKnob;
    const base = this.elements.joystickBase;
    const handleJoystick = event => {
      event.preventDefault();
      const rect = zone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const maxRadius = rect.width / 2 - 12;
      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance > maxRadius) {
        dx = (dx / distance) * maxRadius;
        dy = (dy / distance) * maxRadius;
      }
      knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      const normalizedX = dx / maxRadius;
      const normalizedY = dy / maxRadius;
      this.state.moveX = normalizedX;
      this.state.moveZ = normalizedY;
      this.state.sprint = Math.hypot(normalizedX, normalizedY) > 0.82;
      this.joystickActive = true;
    };
    const resetJoystick = () => {
      this.joystickActive = false;
      this.state.moveX = 0;
      this.state.moveZ = 0;
      this.state.sprint = false;
      knob.style.transform = 'translate(-50%,-50%)';
    };
    zone.addEventListener('pointerdown', event => {
      zone.setPointerCapture(event.pointerId);
      handleJoystick(event);
      this.vibrate(8);
    });
    zone.addEventListener('pointermove', event => { if (this.joystickActive) handleJoystick(event); });
    zone.addEventListener('pointerup', resetJoystick);
    zone.addEventListener('pointercancel', resetJoystick);
    zone.addEventListener('lostpointercapture', resetJoystick);

    const lookZone = this.elements.lookZone;
    lookZone.addEventListener('pointerdown', event => {
      lookZone.setPointerCapture(event.pointerId);
      this.lookActive = true;
      this.lastLook.x = event.clientX;
      this.lastLook.y = event.clientY;
    });
    lookZone.addEventListener('pointermove', event => {
      if (!this.lookActive) return;
      const sensitivity = this.settings.get('sensitivity');
      const invert = this.settings.get('invertY') ? -1 : 1;
      const dx = event.clientX - this.lastLook.x;
      const dy = event.clientY - this.lastLook.y;
      this.state.lookX += dx * 0.0024 * sensitivity;
      this.state.lookY += dy * 0.0024 * sensitivity * invert;
      this.lastLook.x = event.clientX;
      this.lastLook.y = event.clientY;
    });
    const resetLook = () => {
      this.lookActive = false;
    };
    lookZone.addEventListener('pointerup', resetLook);
    lookZone.addEventListener('pointercancel', resetLook);
    lookZone.addEventListener('lostpointercapture', resetLook);

    this.bindButton(this.elements.shoot, 'shoot', true);
    this.bindButton(this.elements.reload, 'reload', true);
    this.bindButton(this.elements.jump, 'jump', true);
    this.bindButton(this.elements.interact, 'interact', true);
    this.bindButton(this.elements.ability, 'ability', true);
    this.bindButton(this.elements.special, 'special', true);
    this.elements.pause?.addEventListener('click', () => this.audio.ui('click'));
  }

  bindButton(element, key, hold) {
    if (!element) return;
    const down = event => {
      event.preventDefault();
      this.state[key] = true;
      element.classList.add('active');
      this.vibrate(4);
      if (key === 'ability' || key === 'special') this.audio.ui('click');
    };
    const up = event => {
      event.preventDefault();
      this.state[key] = false;
      element.classList.remove('active');
    };
    element.addEventListener('pointerdown', down);
    element.addEventListener('pointerup', up);
    element.addEventListener('pointercancel', up);
    element.addEventListener('pointerleave', up);
  }

  vibrate(pattern = 4) {
    if (!this.settings.get('vibration') || !navigator.vibrate) return;
    try { navigator.vibrate(pattern); } catch (error) { /* ignore */ }
  }

  update() {
    // Reset per-frame deltas; they are consumed by the camera controller.
    this.frameLookX = this.state.lookX;
    this.frameLookY = this.state.lookY;
    this.state.lookX = 0;
    this.state.lookY = 0;
  }

  read() {
    return {
      moveX: this.state.moveX,
      moveZ: this.state.moveZ,
      lookX: this.frameLookX || 0,
      lookY: this.frameLookY || 0,
      jump: this.state.jump,
      sprint: this.state.sprint,
      shoot: this.state.shoot,
      reload: this.state.reload,
      ability: this.state.ability,
      special: this.state.special,
      interact: this.state.interact,
    };
  }

  showInteract(label = 'INTERAGIR') {
    if (!this.elements.interact) return;
    this.elements.interact.classList.remove('hidden');
    this.elements.interact.querySelector('small').textContent = label;
  }

  hideInteract() {
    this.elements.interact?.classList.add('hidden');
  }

  consumeLook() {
    const result = { lookX: this.frameLookX || 0, lookY: this.frameLookY || 0 };
    this.frameLookX = 0;
    this.frameLookY = 0;
    return result;
  }
}
