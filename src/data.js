// VEM COMER — game data. All characters are adult tactical operatives.
// The design intentionally uses grounded tactical gear rather than sexualized content.

export const WEAPONS = {
  standard: {
    id: 'standard', name: 'STANDARD-9', type: 'Sidearm', cost: 0, damage: 28, headMult: 2.8,
    rate: 4.6, mag: 12, reserve: 48, reload: 1.35, spread: 0.012, moveSpread: 0.02,
    recoil: 0.012, auto: false, pellets: 1, range: 55, zoom: 1.15, color: '#cfd6e4',
    desc: 'Reliable service pistol. Free every round.'
  },
  rift9: {
    id: 'rift9', name: 'RIFT-9', type: 'Sidearm', cost: 500, damage: 35, headMult: 2.7,
    rate: 5.2, mag: 13, reserve: 52, reload: 1.5, spread: 0.009, moveSpread: 0.018,
    recoil: 0.016, auto: false, pellets: 1, range: 58, zoom: 1.2, color: '#8df5ff',
    desc: 'High-impact sidearm with a crisp break.', signature: 'sable'
  },
  echo7: {
    id: 'echo7', name: 'ECHO-7', type: 'Sidearm', cost: 600, damage: 31, headMult: 2.5,
    rate: 6.5, mag: 15, reserve: 60, reload: 1.4, spread: 0.011, moveSpread: 0.02,
    recoil: 0.011, auto: true, pellets: 1, range: 52, zoom: 1.15, color: '#d2b6ff',
    desc: 'Fully automatic machine pistol. Forgiving up close.', signature: 'mirage'
  },
  nightfall: {
    id: 'nightfall', name: 'NIGHTFALL', type: 'SMG', cost: 1800, damage: 24, headMult: 2.4,
    rate: 13.2, mag: 32, reserve: 96, reload: 1.75, spread: 0.018, moveSpread: 0.022,
    recoil: 0.005, auto: true, pellets: 1, range: 38, zoom: 1.2, color: '#a678ff',
    desc: 'Whisper-quiet submachine gun with a vicious fire rate.', signature: 'vesper'
  },
  prism6: {
    id: 'prism6', name: 'PRISM-6', type: 'SMG', cost: 1900, damage: 26, headMult: 2.3,
    rate: 12.0, mag: 26, reserve: 78, reload: 1.65, spread: 0.015, moveSpread: 0.019,
    recoil: 0.0055, auto: true, pellets: 1, range: 42, zoom: 1.2, color: '#7fffd4',
    desc: 'Surgical SMG with tight first-shot accuracy.', signature: 'iris'
  },
  cinderbreak: {
    id: 'cinderbreak', name: 'CINDERBREAK', type: 'Shotgun', cost: 2100, damage: 12, headMult: 1.6,
    rate: 1.55, mag: 7, reserve: 28, reload: 2.65, spread: 0.075, moveSpread: 0.09,
    recoil: 0.055, auto: false, pellets: 8, range: 22, zoom: 1.1, color: '#ff8a3d',
    desc: 'Eight-pellet breaching shotgun. Room-clearing authority.', signature: 'ember'
  },
  talon: {
    id: 'talon', name: 'TALON DMR', type: 'Marksman', cost: 2400, damage: 62, headMult: 2.9,
    rate: 2.3, mag: 8, reserve: 40, reload: 2.3, spread: 0.0035, moveSpread: 0.03,
    recoil: 0.032, auto: false, pellets: 1, range: 95, zoom: 2.2, color: '#ffcf5a',
    desc: 'Semi-auto marksman rifle. Two shots, one problem.', signature: 'kestrel'
  },
  daybreak: {
    id: 'daybreak', name: 'DAYBREAK', type: 'Rifle', cost: 2800, damage: 36, headMult: 3.0,
    rate: 9.0, mag: 30, reserve: 90, reload: 2.45, spread: 0.011, moveSpread: 0.026,
    recoil: 0.0065, auto: true, pellets: 1, range: 80, zoom: 1.35, color: '#ffd35a',
    desc: 'Balanced assault rifle. Rises with the sun.', signature: 'sol'
  },
  solaris: {
    id: 'solaris', name: 'SOLARIS AR', type: 'Rifle', cost: 2900, damage: 38, headMult: 3.1,
    rate: 9.5, mag: 25, reserve: 75, reload: 2.35, spread: 0.010, moveSpread: 0.025,
    recoil: 0.007, auto: true, pellets: 1, range: 82, zoom: 1.35, color: '#ff6b3d',
    desc: 'Nova’s signature rifle. Fast, bright, unforgiving.', signature: 'nova'
  },
  nocturne: {
    id: 'nocturne', name: 'NOCTURNE', type: 'Rifle', cost: 3000, damage: 40, headMult: 3.0,
    rate: 8.4, mag: 30, reserve: 90, reload: 2.55, spread: 0.012, moveSpread: 0.027,
    recoil: 0.0075, auto: true, pellets: 1, range: 84, zoom: 1.4, color: '#8f8cff',
    desc: 'Heavy-hitting rifle that thrives in blackout conditions.', signature: 'nyx'
  },
  bastion: {
    id: 'bastion', name: 'BASTION LMG', type: 'LMG', cost: 3200, damage: 34, headMult: 2.4,
    rate: 10.2, mag: 60, reserve: 120, reload: 4.3, spread: 0.028, moveSpread: 0.045,
    recoil: 0.0085, auto: true, pellets: 1, range: 72, zoom: 1.25, color: '#f0b45a',
    desc: 'Sixty rounds of hold-the-line energy.', signature: 'rook'
  },
  havoc: {
    id: 'havoc', name: 'HAVOC LMG', type: 'LMG', cost: 3400, damage: 38, headMult: 2.35,
    rate: 8.6, mag: 50, reserve: 100, reload: 4.0, spread: 0.025, moveSpread: 0.04,
    recoil: 0.009, auto: true, pellets: 1, range: 74, zoom: 1.25, color: '#ff5b8a',
    desc: 'Overclocked suppression. More bark, more bite.', signature: 'vex'
  },
  longshot: {
    id: 'longshot', name: 'LONGSHOT', type: 'Sniper', cost: 4700, damage: 150, headMult: 2.0,
    rate: 0.82, mag: 5, reserve: 20, reload: 3.3, spread: 0.0012, moveSpread: 0.06,
    recoil: 0.09, auto: false, pellets: 1, range: 130, zoom: 4.2, color: '#b9f4ff',
    desc: 'One shot. One silent prayer. Bolt-action sniper.', signature: 'wraith'
  }
};

export const WEAPON_ORDER = ['standard', 'rift9', 'echo7', 'nightfall', 'prism6', 'cinderbreak', 'talon', 'daybreak', 'solaris', 'nocturne', 'bastion', 'havoc', 'longshot'];

export const AGENTS = [
  {
    id: 'nova', name: 'NOVA', realName: 'Iara Voss', role: 'Duelist', country: 'BR',
    color: '#ff5b3a', accent: '#ffd166', weapon: 'solaris', hair: '#2a1512',
    power: { name: 'Photon Burst', type: 'flash', cooldown: 24, desc: 'Detonate a blinding star that flashes enemies in line of sight.' },
    bio: 'A former solar-racing pilot who treats every firefight like a photo finish.',
    quote: '“Blink and you lose.”'
  },
  {
    id: 'vesper', name: 'VESPER', realName: 'Sena Okafor', role: 'Controller', country: 'NG',
    color: '#8a5cff', accent: '#c6a8ff', weapon: 'nightfall', hair: '#1c1726',
    power: { name: 'Nightfall Veil', type: 'smoke', cooldown: 20, desc: 'Deploy a dense smoke veil that blocks vision and gunfire lanes.' },
    bio: 'A nightclub sound engineer turned information broker. Silence is her favorite weapon.',
    quote: '“The dark is a door. I hold the key.”'
  },
  {
    id: 'kestrel', name: 'KESTREL', realName: 'Ayla Demir', role: 'Initiator', country: 'TR',
    color: '#ffc94d', accent: '#fff0b0', weapon: 'talon', hair: '#3b2a1b',
    power: { name: 'Recon Dart', type: 'reveal', cooldown: 26, desc: 'Fire a recon dart that reveals nearby enemies through walls.' },
    bio: 'A search-and-rescue spotter who never lost a target in the mountains.',
    quote: '“I see the whole board.”'
  },
  {
    id: 'sable', name: 'SABLE', realName: 'Mara Quinn', role: 'Duelist', country: 'IE',
    color: '#3de0c0', accent: '#c4fff2', weapon: 'rift9', hair: '#101a1d',
    power: { name: 'Phase Dash', type: 'dash', cooldown: 18, desc: 'Phase forward in a burst of motion, slipping past danger.' },
    bio: 'A competitive fencer whose footwork makes her impossible to pin down.',
    quote: '“You were aiming at where I was.”'
  },
  {
    id: 'ember', name: 'EMBER', realName: 'Rosa Calder', role: 'Controller', country: 'ES',
    color: '#ff7a2f', accent: '#ffd08a', weapon: 'cinderbreak', hair: '#4a1c12',
    power: { name: 'Firewall', type: 'fire', cooldown: 25, desc: 'Ignite a burning zone that damages and denies enemy space.' },
    bio: 'A wildfire ranger with a talent for making the map smaller.',
    quote: '“Some doors are better burned.”'
  },
  {
    id: 'rook', name: 'ROOK', realName: 'Dalia Haddad', role: 'Sentinel', country: 'MA',
    color: '#d9a441', accent: '#ffe6a8', weapon: 'bastion', hair: '#23160f',
    power: { name: 'Bulwark', type: 'wall', cooldown: 27, desc: 'Project a hard-light barrier that blocks movement and bullets.' },
    bio: 'A combat engineer who builds cover where there was none.',
    quote: '“Stand behind me.”'
  },
  {
    id: 'nyx', name: 'NYX', realName: 'Jun Park', role: 'Initiator', country: 'KR',
    color: '#7a7cff', accent: '#d7d8ff', weapon: 'nocturne', hair: '#0c0d1d',
    power: { name: 'Blackout', type: 'emp', cooldown: 30, desc: 'Emit an EMP that scrambles enemy HUDs and slows their reactions.' },
    bio: 'An ex-signal intelligence officer who weaponized the quiet spectrum.',
    quote: '“Signal lost.”'
  },
  {
    id: 'iris', name: 'IRIS', realName: 'Nia Mensah', role: 'Sentinel', country: 'GH',
    color: '#49e6a7', accent: '#c4ffe6', weapon: 'prism6', hair: '#17110e',
    power: { name: 'Life Bloom', type: 'heal', cooldown: 28, desc: 'Release a healing bloom that restores health to you and nearby allies.' },
    bio: 'A field medic whose calm under fire is almost supernatural.',
    quote: '“Stay with me. We’re not done.”'
  },
  {
    id: 'wraith', name: 'WRAITH', realName: 'Elira Novak', role: 'Duelist', country: 'RS',
    color: '#9fe9ff', accent: '#f0fdff', weapon: 'longshot', hair: '#d8e6ea',
    power: { name: 'Ghost Walk', type: 'invis', cooldown: 31, desc: 'Bend light around yourself, becoming nearly invisible for a short time.' },
    bio: 'A former stage illusionist who disappeared from the public eye — literally.',
    quote: '“Look closer.”'
  },
  {
    id: 'sol', name: 'SOL', realName: 'Camila Reyes', role: 'Initiator', country: 'MX',
    color: '#ffb31a', accent: '#fff1a8', weapon: 'daybreak', hair: '#1d120b',
    power: { name: 'Solar Flare', type: 'flare', cooldown: 29, desc: 'Launch a flare that marks and scorches enemies in a wide radius.' },
    bio: 'A rescue pilot who flies toward the fire, not away from it.',
    quote: '“Morning comes early.”'
  },
  {
    id: 'mirage', name: 'MIRAGE', realName: 'Zara Belkacem', role: 'Controller', country: 'DZ',
    color: '#c69bff', accent: '#f0e3ff', weapon: 'echo7', hair: '#2a1a2c',
    power: { name: 'Echo Decoy', type: 'decoy', cooldown: 22, desc: 'Project a convincing decoy that draws enemy fire and attention.' },
    bio: 'A con artist with a theater degree and a very flexible moral compass.',
    quote: '“Meet the other me.”'
  },
  {
    id: 'vex', name: 'VEX', realName: 'Tessa Rourke', role: 'Duelist', country: 'US',
    color: '#ff4d7d', accent: '#ffc0d0', weapon: 'havoc', hair: '#34141b',
    power: { name: 'Overclock', type: 'overclock', cooldown: 27, desc: 'Push your weapon past its limits for faster fire and reloads.' },
    bio: 'A dirt-track mechanic who never met an engine she couldn’t redline.',
    quote: '“Redline it.”'
  }
];

export const AGENT_BY_ID = Object.fromEntries(AGENTS.map(a => [a.id, a]));

// Wall tuple: x, z, width, depth, height, material key
const W = (x, z, w, d, h = 4, m = 'wall') => ({ x, z, w, d, h, m });

function border() {
  return [
    W(0, 50.5, 104, 3, 7, 'wall'),
    W(0, -50.5, 104, 3, 7, 'wall'),
    W(50.5, 0, 3, 104, 7, 'wall'),
    W(-50.5, 0, 3, 104, 7, 'wall')
  ];
}

function crate(x, z, s = 2.4, h = 1.8) { return W(x, z, s, s, h, 'crate'); }
function lowWall(x, z, w, d, h = 1.3) { return W(x, z, w, d, h, 'low'); }

export const MAPS = [
  {
    id: 'docks', name: 'NEON DOCKS', location: 'ROTTERDAM // 23:40',
    subtitle: 'Rain-slick container yards and electric cargo lanes.',
    theme: {
      skyTop: '#071323', skyBottom: '#18405c', fog: '#0b1a2c', fogDensity: 0.010,
      ground: '#1b2732', ground2: '#253643', wall: '#263b4d', wallAlt: '#182a38',
      accent: '#39e7ff', accent2: '#ff6b3d', ambient: '#88b8d8', sun: '#a9dfff',
      crate: '#b45532', low: '#2c4454', metal: '#385a70', plant: '#1c5a4a'
    },
    sites: [
      { id: 'A', x: -21, z: -4, w: 16, d: 16, color: '#ff6b3d' },
      { id: 'B', x: 22, z: 3, w: 16, d: 16, color: '#39e7ff' }
    ],
    spawns: { attack: { x: 0, z: 43 }, defense: { x: 0, z: -43 } },
    walls: [
      ...border(),
      W(-35, 22, 20, 13, 5.5, 'wall'), W(35, 22, 20, 13, 5.5, 'wall'),
      W(-35, -22, 20, 13, 5.5, 'wall'), W(35, -22, 20, 13, 5.5, 'wall'),
      W(0, 1, 8, 18, 3.2, 'metal'),
      W(-10, 25, 12, 2.4, 3.4, 'wall'), W(11, -25, 14, 2.4, 3.4, 'wall'),
      W(-32, 6, 2.4, 13, 4.2, 'wall'), W(33, -8, 2.4, 14, 4.2, 'wall'),
      W(-8, -29, 2.4, 10, 3.8, 'wall'), W(9, 30, 2.4, 9, 3.8, 'wall'),
      crate(-29, -13), crate(-13, 3, 2.8, 2.0), crate(-26, 4, 2.2, 1.5),
      crate(15, 8), crate(29, -3, 2.8, 2.0), crate(26, -11, 2.2, 1.5),
      crate(1, 34, 3.2, 2.1), crate(-2, -35, 3.2, 2.1),
      lowWall(-4, -12, 6, 1.2), lowWall(5, 14, 7, 1.2),
      lowWall(17, -21, 1.2, 7), lowWall(-18, 21, 1.2, 7)
    ],
    props: [
      { type: 'sign', x: -45, z: 35, text: 'DOCKS 07', color: '#39e7ff' },
      { type: 'sign', x: 45, z: -28, text: 'CARGO / A', color: '#ff6b3d' },
      { type: 'barrel', x: -16, z: 17 }, { type: 'barrel', x: 18, z: 16 },
      { type: 'barrel', x: -11, z: -21 }, { type: 'barrel', x: 31, z: 11 },
      { type: 'lamp', x: -20, z: -4 }, { type: 'lamp', x: 22, z: 3 }
    ]
  },
  {
    id: 'citadel', name: 'SAND CITADEL', location: 'MARRAKECH // 06:12',
    subtitle: 'A sunbaked fortress split by courtyards and killing lanes.',
    theme: {
      skyTop: '#2a1838', skyBottom: '#f08a5a', fog: '#6e3e3a', fogDensity: 0.012,
      ground: '#8c6a4c', ground2: '#a87e58', wall: '#b38a61', wallAlt: '#7d5a3d',
      accent: '#ffb45a', accent2: '#6fffe0', ambient: '#ffd6a8', sun: '#ffd09b',
      crate: '#6f4b2f', low: '#c49a6c', metal: '#5b4636', plant: '#526b38'
    },
    sites: [
      { id: 'A', x: -22, z: -3, w: 16, d: 16, color: '#ffb45a' },
      { id: 'B', x: 22, z: 3, w: 16, d: 16, color: '#6fffe0' }
    ],
    spawns: { attack: { x: 0, z: 43 }, defense: { x: 0, z: -43 } },
    walls: [
      ...border(),
      W(0, 0, 11, 11, 3.4, 'wall'),
      W(-14, 17, 12, 2, 3.0, 'wall'), W(15, -17, 12, 2, 3.0, 'wall'),
      W(-32, 27, 15, 2, 3.8, 'wall'), W(32, 27, 15, 2, 3.8, 'wall'),
      W(-32, -27, 15, 2, 3.8, 'wall'), W(32, -27, 15, 2, 3.8, 'wall'),
      W(-35, 12, 2, 15, 3.8, 'wall'), W(35, -12, 2, 15, 3.8, 'wall'),
      W(-9, -23, 2, 11, 3.5, 'wall'), W(9, 23, 2, 11, 3.5, 'wall'),
      W(-38, -7, 9, 2, 2.6, 'wall'), W(38, 8, 9, 2, 2.6, 'wall'),
      crate(-30, -13), crate(-13, 4), crate(-28, 8, 2.6, 1.9),
      crate(14, -5), crate(30, 13), crate(28, -9, 2.6, 1.9),
      crate(3, 31, 3, 2), crate(-3, -31, 3, 2),
      lowWall(-6, 13, 8, 1.3), lowWall(7, -13, 8, 1.3),
      lowWall(17, 18, 1.3, 8), lowWall(-17, -18, 1.3, 8)
    ],
    props: [
      { type: 'sign', x: -46, z: 37, text: 'CITADEL', color: '#ffb45a' },
      { type: 'sign', x: 46, z: -35, text: 'SITE B', color: '#6fffe0' },
      { type: 'palm', x: -17, z: 30 }, { type: 'palm', x: 20, z: -31 },
      { type: 'palm', x: 38, z: 20 }, { type: 'palm', x: -39, z: -20 },
      { type: 'lamp', x: -22, z: -3 }, { type: 'lamp', x: 22, z: 3 }
    ]
  },
  {
    id: 'frostline', name: 'FROSTLINE', location: 'SVALBARD // 02:03',
    subtitle: 'A frozen research station where every corridor is a crosshair.',
    theme: {
      skyTop: '#020a17', skyBottom: '#1f4c66', fog: '#0d2232', fogDensity: 0.013,
      ground: '#b8d2db', ground2: '#d8e9ef', wall: '#6f8c9b', wallAlt: '#425c6b',
      accent: '#61e7ff', accent2: '#d9fbff', ambient: '#bde9ff', sun: '#e8fbff',
      crate: '#396477', low: '#8aa6b2', metal: '#4d7484', plant: '#2f6b64'
    },
    sites: [
      { id: 'A', x: -21, z: -2, w: 16, d: 16, color: '#61e7ff' },
      { id: 'B', x: 22, z: 4, w: 16, d: 16, color: '#d9fbff' }
    ],
    spawns: { attack: { x: 0, z: 43 }, defense: { x: 0, z: -43 } },
    walls: [
      ...border(),
      W(0, 0, 16, 14, 5.0, 'metal'),
      W(-11, 0, 2, 14, 4.2, 'wall'), W(11, 0, 2, 14, 4.2, 'wall'),
      W(-29, 19, 18, 2, 4.5, 'wall'), W(29, 19, 18, 2, 4.5, 'wall'),
      W(-29, -19, 18, 2, 4.5, 'wall'), W(29, -19, 18, 2, 4.5, 'wall'),
      W(-38, 3, 2, 20, 4.0, 'wall'), W(38, -3, 2, 20, 4.0, 'wall'),
      W(-8, 29, 2, 9, 4.0, 'wall'), W(8, -29, 2, 9, 4.0, 'wall'),
      W(-16, -27, 10, 2, 3.8, 'wall'), W(16, 27, 10, 2, 3.8, 'wall'),
      crate(-29, -10), crate(-14, 6, 2.8, 2.2), crate(-27, 6, 2.4, 1.7),
      crate(15, -7), crate(29, 11, 2.8, 2.2), crate(26, 8, 2.4, 1.7),
      crate(0, 34, 3.2, 2.2), crate(0, -34, 3.2, 2.2),
      lowWall(-5, -13, 7, 1.2), lowWall(5, 14, 7, 1.2),
      lowWall(-18, 18, 1.2, 7), lowWall(18, -18, 1.2, 7)
    ],
    props: [
      { type: 'sign', x: -45, z: 38, text: 'FROSTLINE', color: '#61e7ff' },
      { type: 'sign', x: 45, z: -39, text: 'CRYO / B', color: '#d9fbff' },
      { type: 'barrel', x: -33, z: 28 }, { type: 'barrel', x: 33, z: -28 },
      { type: 'lamp', x: -21, z: -2 }, { type: 'lamp', x: 22, z: 4 },
      { type: 'crystal', x: -42, z: -34 }, { type: 'crystal', x: 42, z: 33 }
    ]
  },
  {
    id: 'skyforge', name: 'SKYFORGE', location: 'OSAKA // 21:18',
    subtitle: 'A vertical foundry of molten steel and blind corners.',
    theme: {
      skyTop: '#130b1e', skyBottom: '#51273d', fog: '#251526', fogDensity: 0.011,
      ground: '#2c2a33', ground2: '#3d3844', wall: '#4a3b45', wallAlt: '#30252f',
      accent: '#ff7b39', accent2: '#ffcf5a', ambient: '#ffb48a', sun: '#ffd1a1',
      crate: '#74402b', low: '#5a4342', metal: '#5d4b57', plant: '#4a3b2a'
    },
    sites: [
      { id: 'A', x: -20, z: 4, w: 16, d: 16, color: '#ff7b39' },
      { id: 'B', x: 22, z: -3, w: 16, d: 16, color: '#ffcf5a' }
    ],
    spawns: { attack: { x: 0, z: 43 }, defense: { x: 0, z: -43 } },
    walls: [
      ...border(),
      W(0, 0, 14, 14, 5.5, 'metal'),
      W(-7.5, 0, 2, 14, 4.6, 'wall'), W(7.5, 0, 2, 14, 4.6, 'wall'),
      W(-33, 24, 16, 3, 5, 'wall'), W(33, 24, 16, 3, 5, 'wall'),
      W(-33, -24, 16, 3, 5, 'wall'), W(33, -24, 16, 3, 5, 'wall'),
      W(-13, 24, 2, 12, 4.4, 'wall'), W(13, -24, 2, 12, 4.4, 'wall'),
      W(-42, 0, 2, 16, 4.2, 'wall'), W(42, 0, 2, 16, 4.2, 'wall'),
      W(-10, -30, 12, 2, 4.0, 'wall'), W(10, 30, 12, 2, 4.0, 'wall'),
      crate(-31, -12), crate(-14, 8, 2.8, 2.2), crate(-30, 9, 2.4, 1.8),
      crate(14, -8), crate(31, 12, 2.8, 2.2), crate(29, 7, 2.4, 1.8),
      crate(-1, 35, 3.2, 2.2), crate(2, -36, 3.2, 2.2),
      lowWall(-4, -14, 8, 1.3), lowWall(4, 15, 8, 1.3),
      lowWall(19, 18, 1.3, 8), lowWall(-19, -18, 1.3, 8)
    ],
    props: [
      { type: 'sign', x: -46, z: 38, text: 'SKYFORGE', color: '#ff7b39' },
      { type: 'sign', x: 46, z: -38, text: 'FOUNDRY / A', color: '#ffcf5a' },
      { type: 'barrel', x: -20, z: 4 }, { type: 'barrel', x: 22, z: -3 },
      { type: 'lamp', x: -20, z: 4 }, { type: 'lamp', x: 22, z: -3 },
      { type: 'crystal', x: -38, z: 34 }, { type: 'crystal', x: 37, z: -34 }
    ]
  },
  {
    id: 'ruins', name: 'JUNGLE RUINS', location: 'YUCATÁN // 17:52',
    subtitle: 'An overgrown temple complex with a hundred places to hide.',
    theme: {
      skyTop: '#07160f', skyBottom: '#2e5a3b', fog: '#10261b', fogDensity: 0.013,
      ground: '#31432c', ground2: '#415d38', wall: '#5f6749', wallAlt: '#3b4935',
      accent: '#a8ff5a', accent2: '#ffd76a', ambient: '#c4e8a6', sun: '#f1ffc2',
      crate: '#65482c', low: '#5a6042', metal: '#48543b', plant: '#2f6b32'
    },
    sites: [
      { id: 'A', x: -22, z: -2, w: 16, d: 16, color: '#a8ff5a' },
      { id: 'B', x: 21, z: 4, w: 16, d: 16, color: '#ffd76a' }
    ],
    spawns: { attack: { x: 0, z: 43 }, defense: { x: 0, z: -43 } },
    walls: [
      ...border(),
      W(0, 0, 12, 12, 4.2, 'wall'),
      W(-17, 12, 9, 2, 2.8, 'wall'), W(17, -12, 9, 2, 2.8, 'wall'),
      W(-34, 25, 12, 4, 4.0, 'wall'), W(34, 25, 12, 4, 4.0, 'wall'),
      W(-34, -25, 12, 4, 4.0, 'wall'), W(34, -25, 12, 4, 4.0, 'wall'),
      W(-12, 28, 2, 9, 3.4, 'wall'), W(12, -28, 2, 9, 3.4, 'wall'),
      W(-40, 8, 2, 13, 3.6, 'wall'), W(40, -8, 2, 13, 3.6, 'wall'),
      W(-9, -20, 2, 8, 3.2, 'wall'), W(9, 20, 2, 8, 3.2, 'wall'),
      crate(-30, -10), crate(-14, 7, 2.8, 2.0), crate(-28, 7, 2.4, 1.7),
      crate(15, -7), crate(30, 11, 2.8, 2.0), crate(27, 8, 2.4, 1.7),
      crate(2, 34, 3.2, 2.0), crate(-2, -35, 3.2, 2.0),
      lowWall(-5, -14, 7, 1.3), lowWall(5, 15, 7, 1.3),
      lowWall(17, 19, 1.3, 8), lowWall(-17, -19, 1.3, 8)
    ],
    props: [
      { type: 'sign', x: -46, z: 38, text: 'RUINS', color: '#a8ff5a' },
      { type: 'sign', x: 46, z: -38, text: 'TEMPLE / B', color: '#ffd76a' },
      { type: 'palm', x: -20, z: 30 }, { type: 'palm', x: 23, z: -30 },
      { type: 'palm', x: 39, z: 20 }, { type: 'palm', x: -40, z: -19 },
      { type: 'palm', x: -11, z: 11 }, { type: 'palm', x: 12, z: -10 },
      { type: 'lamp', x: -22, z: -2 }, { type: 'lamp', x: 21, z: 4 }
    ]
  }
];

export const MAP_BY_ID = Object.fromEntries(MAPS.map(m => [m.id, m]));

export const ROLES = {
  Duelist: 'Entry fragger. Built to take first contact.',
  Controller: 'Shapes the map with vision-blocking utility.',
  Initiator: 'Reveals and disrupts before the push.',
  Sentinel: 'Locks down space and protects the team.'
};

export const BOT_NAMES = ['VANTA', 'KILO', 'ECHO', 'SABLE', 'RUNE', 'HALO', 'ONYX', 'FLUX', 'WISP', 'ZERO', 'NOVA', 'CIPHER'];
