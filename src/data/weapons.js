export const WEAPONS = {
  pistol: {
    id: 'pistol',
    name: 'CORAL P9',
    class: 'PISTOLA',
    slot: 'secondary',
    damage: 34,
    fireRate: 0.3,
    magazine: 12,
    reserve: 36,
    reload: 1.3,
    range: 80,
    automatic: false,
    spread: 0.006,
    pellets: 1,
    recoil: 0.9,
    color: '#ff6547',
    description: 'Precisão cirúrgica, cadência controlada. A garantia de que você nunca está desarmada.',
    stats: { dano: 62, cadencia: 38, alcance: 64, controle: 82 }
  },
  rifle: {
    id: 'rifle',
    name: 'VCI-7 BRASA',
    class: 'FUZIL DE ASSALTO',
    slot: 'primary',
    damage: 24,
    fireRate: 0.108,
    magazine: 30,
    reserve: 96,
    reload: 2.05,
    range: 130,
    automatic: true,
    spread: 0.011,
    pellets: 1,
    recoil: 0.42,
    color: '#ffb24a',
    description: 'Rifle modular de plataforma aberta. O equilíbrio entre pressão constante e controle de longo alcance.',
    stats: { dano: 58, cadencia: 82, alcance: 78, controle: 66 }
  },
  smg: {
    id: 'smg',
    name: 'VESPA-9',
    class: 'SUBMETRALHADORA',
    slot: 'primary',
    damage: 17,
    fireRate: 0.072,
    magazine: 36,
    reserve: 108,
    reload: 1.75,
    range: 70,
    automatic: true,
    spread: 0.022,
    pellets: 1,
    recoil: 0.35,
    color: '#cfff53',
    description: 'Compacta, nervosa e feita para corredores. Dispara mais rápido do que o bom senso permite.',
    stats: { dano: 42, cadencia: 96, alcance: 48, controle: 52 }
  },
  shotgun: {
    id: 'shotgun',
    name: 'BRASA 12',
    class: 'ESPINGARDA',
    slot: 'primary',
    damage: 16,
    fireRate: 0.82,
    magazine: 6,
    reserve: 30,
    reload: 2.55,
    range: 38,
    automatic: false,
    spread: 0.065,
    pellets: 7,
    recoil: 1.35,
    color: '#ff5d8f',
    description: 'Sete oportunidades por gatilho. Domina qualquer corredor, desaparece em qualquer distância.',
    stats: { dano: 92, cadencia: 20, alcance: 28, controle: 40 }
  },
  sniper: {
    id: 'sniper',
    name: 'CORVO .50',
    class: 'FUZIL DE PRECISÃO',
    slot: 'primary',
    damage: 88,
    fireRate: 1.15,
    magazine: 5,
    reserve: 20,
    reload: 2.85,
    range: 210,
    automatic: false,
    spread: 0.0015,
    pellets: 1,
    recoil: 1.7,
    zoom: 2.5,
    color: '#b28bff',
    description: 'Um tiro, uma decisão. A janela é pequena, mas o mapa inteiro cabe nela.',
    stats: { dano: 100, cadencia: 14, alcance: 100, controle: 32 }
  }
};

export const PRIMARY_WEAPONS = ['rifle', 'smg', 'shotgun', 'sniper'];
export const SECONDARY_WEAPONS = ['pistol'];

export function getWeapon(id) {
  return WEAPONS[id] || WEAPONS.rifle;
}

export function createAmmoState(weaponId) {
  const weapon = getWeapon(weaponId);
  return {
    current: weapon.magazine,
    reserve: weapon.reserve
  };
}
