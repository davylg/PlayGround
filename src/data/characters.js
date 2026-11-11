/**
 * VEM COMER — character roster.
 * All agents are adults (21+). The visual direction is stylised tactical fashion.
 * Add a new agent by appending one object here; menus, matchmaking, bots and the
 * ability controller consume the same schema.
 */

export const ROLES = {
  ASSAULT: { id: 'assault', label: 'ASSALTO', icon: '✦', color: '#ff6b4a', description: 'Pressão, mobilidade e entrada em objetivo.' },
  DEFENSE: { id: 'defense', label: 'DEFESA', icon: '⬢', color: '#48d7ff', description: 'Hold de área, barreiras e resistência.' },
  SUPPORT: { id: 'support', label: 'SUPORTE', icon: '✚', color: '#55f0b0', description: 'Cura, escudos e ferramentas de time.' },
  RECON: { id: 'recon', label: 'RECON', icon: '◎', color: '#ffd75e', description: 'Informação, rastreio e leitura de mapa.' },
  CONTROL: { id: 'control', label: 'CONTROLE', icon: '◒', color: '#c88bff', description: 'Fumaça, zonas lentas e bloqueio de rotas.' }
};

const skin = {
  porcelain: '#f0c3a4',
  light: '#e7b18e',
  tan: '#c4865d',
  bronze: '#a96545',
  deep: '#71422f',
  rich: '#4d2a21'
};

export const CHARACTERS = [
  {
    id: 'brasa',
    name: 'Ana "BRASA" Torres',
    shortName: 'BRASA',
    firstName: 'Ana',
    age: 27,
    role: 'assault',
    tagline: 'A primeira a entrar. A última a recuar.',
    description: 'Ex-corredora de rua de São Paulo, Ana transformou adrenalina em doutrina de combate. Entra primeiro, quebra a linha inimiga e usa o caos como cobertura. Seu sorriso aparece no killfeed antes do som do disparo.',
    quote: '“Se esquenta, é porque eu cheguei.”',
    home: 'São Paulo, Brasil',
    palette: { primary: '#221913', secondary: '#ff633f', accent: '#ffc24d', suit: '#2c2725', metal: '#c7b9a8', skin: skin.tan, hair: '#17120f' },
    model: { height: 1.73, build: 'athletic', hairStyle: 'asym-bob', hairColor: '#17120f', accessory: 'earpiece', backGear: 'small-pack', chestGlow: true },
    stats: { mobility: 9, firepower: 8, utility: 6, difficulty: 2 },
    passive: { name: 'Ritmo Quente', desc: 'Abates aceleram recarga e empunhadura em 35% por 6s.', icon: '↯' },
    active: { name: 'Arranque', desc: 'Impulso curto para frente. Recarga: 9s.', icon: '⟫', cooldown: 9, type: 'dash', params: { distance: 7.5 } },
    special: { name: 'Inferno', desc: 'Cria uma zona incendiária que causa dano contínuo. Recarga: 38s.', icon: '✹', cooldown: 38, type: 'damageZone', params: { radius: 4.8, duration: 8, dps: 13, range: 17 } },
    skins: [
      { id: 'default', name: 'Rua Quente', price: 'PADRÃO', color: '#ff633f', secondary: '#221913' },
      { id: 'carbon', name: 'Carbono', price: 'NÍVEL 08', color: '#d8d8d8', secondary: '#171717' },
      { id: 'solar', name: 'Solar', price: 'EVENTO', color: '#ffd34d', secondary: '#3b2708' }
    ]
  },
  {
    id: 'muralha',
    name: 'Larissa "MURALHA" Nunes',
    shortName: 'MURALHA',
    firstName: 'Larissa',
    age: 34,
    role: 'defense',
    tagline: 'O objetivo não passa. Simples assim.',
    description: 'Engenheira de estruturas e ex-atleta de força, Larissa lê uma arena como quem lê uma planta baixa. Sua armadura modular foi construída peça por peça no próprio ateliê. Fala pouco e ocupa muito espaço.',
    quote: '“Tenta de novo. Eu espero.”',
    home: 'Salvador, Brasil',
    palette: { primary: '#11272d', secondary: '#35d5ee', accent: '#f5a65b', suit: '#1d3135', metal: '#93aeb2', skin: skin.deep, hair: '#1c1310' },
    model: { height: 1.83, build: 'strong', hairStyle: 'shaved', hairColor: '#1c1310', accessory: 'tattoo', backGear: 'breacher', chestGlow: true },
    stats: { mobility: 5, firepower: 7, utility: 10, difficulty: 2 },
    passive: { name: 'Peso Morto', desc: 'Começa cada round com 25 de armadura extra.', icon: '⬢' },
    active: { name: 'Escudo Reativo', desc: 'Posiciona uma barreira balística à frente. Recarga: 14s.', icon: '▰', cooldown: 14, type: 'barrier', params: { width: 3.4, height: 2.3, duration: 9, range: 5.5 } },
    special: { name: 'Bastião', desc: 'Concede 55 de escudo a aliados próximos. Recarga: 42s.', icon: '⬣', cooldown: 42, type: 'teamShield', params: { amount: 55, radius: 12 } },
    skins: [
      { id: 'default', name: 'Concreto Frio', price: 'PADRÃO', color: '#35d5ee', secondary: '#11272d' },
      { id: 'brutal', name: 'Brutalista', price: 'NÍVEL 12', color: '#f5a65b', secondary: '#2b2520' },
      { id: 'titan', name: 'Titã', price: 'LOJA', color: '#b8ff5c', secondary: '#17200e' }
    ]
  },
  {
    id: 'sutra',
    name: 'Yumi "SUTRA" Aoki',
    shortName: 'SUTRA',
    firstName: 'Yumi',
    age: 24,
    role: 'support',
    tagline: 'Respira. Eu ainda estou aqui.',
    description: 'Médica de campo nipo-brasileira e praticante de capoeira, Yumi trata ferimentos e posicionamento como o mesmo problema. Sua mochila emite um campo de estabilização que mantém o time de pé quando tudo deveria desabar.',
    quote: '“Dor é informação. Não uma sentença.”',
    home: 'Curitiba, Brasil',
    palette: { primary: '#e9f5f2', secondary: '#ff84b6', accent: '#68f4d0', suit: '#dce8e5', metal: '#b8c7c3', skin: skin.light, hair: '#302525' },
    model: { height: 1.68, build: 'slim', hairStyle: 'twin-buns', hairColor: '#302525', accessory: 'headset', backGear: 'med-pack', chestGlow: true },
    stats: { mobility: 7, firepower: 5, utility: 10, difficulty: 2 },
    passive: { name: 'Cuidado', desc: 'Recupera 2.5 de vida por segundo após 5s sem levar dano.', icon: '✚' },
    active: { name: 'Nuvem Vital', desc: 'Cura 45 de vida em área. Recarga: 12s.', icon: '✚', cooldown: 12, type: 'healArea', params: { amount: 45, radius: 6.5, range: 5 } },
    special: { name: 'Renascer', desc: 'Cura o time e concede velocidade por 4s. Recarga: 40s.', icon: '❋', cooldown: 40, type: 'teamHeal', params: { amount: 70, duration: 4, radius: 18 } },
    skins: [
      { id: 'default', name: 'Pulso Vital', price: 'PADRÃO', color: '#ff84b6', secondary: '#e9f5f2' },
      { id: 'lotus', name: 'Lótus', price: 'NÍVEL 06', color: '#68f4d0', secondary: '#233b3a' },
      { id: 'night', name: 'Turno da Noite', price: 'LOJA', color: '#c88bff', secondary: '#1b1730' }
    ]
  },
  {
    id: 'vespa',
    name: 'Zoe "VESPA" Mendes',
    shortName: 'VESPA',
    firstName: 'Zoe',
    age: 23,
    role: 'recon',
    tagline: 'Você já foi vista. Só não sabe ainda.',
    description: 'Pilota drones de corrida desde os quinze anos. Zoe enxerga o mapa como uma malha de sinais, rotas e pontos cegos. Age rápido, fala mais rápido ainda e nunca entra numa sala sem saber quantas saídas ela tem.',
    quote: '“Relaxa. Eu filmei tudo.”',
    home: 'Recife, Brasil',
    palette: { primary: '#ffcf3f', secondary: '#191817', accent: '#8cff5a', suit: '#29271f', metal: '#c9c3a6', skin: skin.bronze, hair: '#25140d' },
    model: { height: 1.64, build: 'compact', hairStyle: 'afro', hairColor: '#25140d', accessory: 'goggles', backGear: 'drone', chestGlow: true },
    stats: { mobility: 8, firepower: 5, utility: 9, difficulty: 3 },
    passive: { name: 'Antena', desc: 'Inimigos que atiram perto de você ficam marcados por 2s.', icon: '◎' },
    active: { name: 'Dardo-Sonar', desc: 'Revela inimigos num raio de 30m por 4s. Recarga: 11s.', icon: '⌁', cooldown: 11, type: 'reveal', params: { radius: 30, duration: 4 } },
    special: { name: 'Panóptico', desc: 'Revela o mapa inteiro por 7s. Recarga: 45s.', icon: '◉', cooldown: 45, type: 'reveal', params: { radius: 999, duration: 7 } },
    skins: [
      { id: 'default', name: 'Zumbido', price: 'PADRÃO', color: '#ffcf3f', secondary: '#191817' },
      { id: 'wasp', name: 'Vespa Rainha', price: 'NÍVEL 10', color: '#ff7a1a', secondary: '#241309' },
      { id: 'neon', name: 'Neon Verde', price: 'EVENTO', color: '#8cff5a', secondary: '#13240d' }
    ]
  },
  {
    id: 'laco',
    name: 'Nina "LAÇO" Barreto',
    shortName: 'LAÇO',
    firstName: 'Nina',
    age: 29,
    role: 'control',
    tagline: 'O mapa é meu. Você só está visitando.',
    description: 'Nina cresceu entre palcos de dança e oficinas de pirotecnia. Aprendeu que presença é uma questão de ângulo, fumaça e ritmo. Hoje desenha rotas com cortinas de fumaça e obriga o inimigo a jogar no tempo dela.',
    quote: '“Fecha os olhos. Vai ficar mais fácil.”',
    home: 'Belo Horizonte, Brasil',
    palette: { primary: '#24152e', secondary: '#be7bff', accent: '#ff69ba', suit: '#2d1b38', metal: '#b6a1c9', skin: skin.rich, hair: '#1b1118' },
    model: { height: 1.75, build: 'athletic', hairStyle: 'long-braid', hairColor: '#1b1118', accessory: 'choker', backGear: 'canisters', chestGlow: true },
    stats: { mobility: 7, firepower: 6, utility: 10, difficulty: 3 },
    passive: { name: 'Dentro do Ritmo', desc: 'Move-se 15% mais rápido dentro de fumaça.', icon: '◒' },
    active: { name: 'Cortina', desc: 'Lança uma fumaça densa no ponto mirado. Recarga: 12s.', icon: '◒', cooldown: 12, type: 'smoke', params: { radius: 5.2, duration: 8, range: 18 } },
    special: { name: 'Névoa Total', desc: 'Uma cortina gigante ao seu redor. Recarga: 42s.', icon: '☁', cooldown: 42, type: 'smokeSelf', params: { radius: 9, duration: 10 } },
    skins: [
      { id: 'default', name: 'Cortina', price: 'PADRÃO', color: '#be7bff', secondary: '#24152e' },
      { id: 'rose', name: 'Rosa Choque', price: 'NÍVEL 09', color: '#ff69ba', secondary: '#2b1021' },
      { id: 'ink', name: 'Tinta', price: 'LOJA', color: '#7d66ff', secondary: '#11101f' }
    ]
  },
  {
    id: 'volt',
    name: 'Kira "VOLT" Salles',
    shortName: 'VOLT',
    firstName: 'Kira',
    age: 26,
    role: 'assault',
    tagline: 'A cidade pisca quando eu passo.',
    description: 'Técnica de palco e especialista em sistemas elétricos, Kira transforma infraestrutura em arma. Seu exoesqueleto leve descarrega energia em pulsos controlados. Vaidade não é distração: é a última coisa que o inimigo vê.',
    quote: '“Apaga a luz. Eu acendo.”',
    home: 'Porto Alegre, Brasil',
    palette: { primary: '#111a2e', secondary: '#61f7ff', accent: '#ff4d9d', suit: '#17233d', metal: '#a9c2d6', skin: skin.porcelain, hair: '#e8e5e1' },
    model: { height: 1.77, build: 'athletic', hairStyle: 'pixie-white', hairColor: '#e5e2dc', accessory: 'circuit-visor', backGear: 'coil-pack', chestGlow: true },
    stats: { mobility: 9, firepower: 7, utility: 7, difficulty: 3 },
    passive: { name: 'Condutor', desc: 'Recarrega 1.5s mais rápido e ganha 5% de velocidade.', icon: '⚡' },
    active: { name: 'Impulso', desc: 'Descarga elétrica que atordoa e causa 15 de dano. Recarga: 10s.', icon: 'ϟ', cooldown: 10, type: 'shock', params: { radius: 5.5, range: 16, damage: 15, stun: 1.2 } },
    special: { name: 'Tempestade', desc: 'Corrente em cadeia nos inimigos próximos. Recarga: 40s.', icon: '⚡', cooldown: 40, type: 'chain', params: { radius: 14, damage: 32, stun: 1.5 } },
    skins: [
      { id: 'default', name: 'Alta Voltagem', price: 'PADRÃO', color: '#61f7ff', secondary: '#111a2e' },
      { id: 'pink', name: 'Choque Rosa', price: 'NÍVEL 11', color: '#ff4d9d', secondary: '#28101b' },
      { id: 'ghost', name: 'Fantasma', price: 'EVENTO', color: '#e6e2d5', secondary: '#1b1b20' }
    ]
  },
  {
    id: 'tigre',
    name: 'Mala "TIGRE" Araripe',
    shortName: 'TIGRE',
    firstName: 'Mala',
    age: 31,
    role: 'assault',
    tagline: 'Não corre atrás. Corta o caminho.',
    description: 'Rastreadora e guia de expedição, Mala aprendeu a se mover por terreno impossível antes de aprender a atirar. Seu estilo é direto: fecha distância, quebra a formação e desaparece antes da resposta. As pinturas faciais são o mapa de vitórias dela.',
    quote: '“A mata não corre. Ela espera.”',
    home: 'Manaus, Brasil',
    palette: { primary: '#10241b', secondary: '#e3a52b', accent: '#ff7048', suit: '#193126', metal: '#a7b39b', skin: skin.bronze, hair: '#120d09' },
    model: { height: 1.79, build: 'strong', hairStyle: 'long-wavy', hairColor: '#120d09', accessory: 'facepaint', backGear: 'none', chestGlow: false },
    stats: { mobility: 9, firepower: 8, utility: 5, difficulty: 3 },
    passive: { name: 'Passo de Caça', desc: 'Alcance de corrida 12% maior.', icon: '⌁' },
    active: { name: 'Salto da Onça', desc: 'Salto alto e avanço curto. Recarga: 10s.', icon: '⇡', cooldown: 10, type: 'leap', params: { distance: 6.5, height: 7 } },
    special: { name: 'Frenesi', desc: 'Cadência +35%, velocidade +20% e 30 de vida por 8s. Recarga: 40s.', icon: '◈', cooldown: 40, type: 'frenzy', params: { duration: 8, fireRate: 1.35, speed: 1.2, heal: 30 } },
    skins: [
      { id: 'default', name: 'Trilha', price: 'PADRÃO', color: '#e3a52b', secondary: '#10241b' },
      { id: 'jaguar', name: 'Jaguar', price: 'NÍVEL 07', color: '#ff7048', secondary: '#24150f' },
      { id: 'eclipse', name: 'Eclipse', price: 'EVENTO', color: '#9bd35e', secondary: '#0b1710' }
    ]
  },
  {
    id: 'santa',
    name: 'Cecília "SANTA" Valente',
    shortName: 'SANTA',
    firstName: 'Cecília',
    age: 30,
    role: 'support',
    tagline: 'Reze. Eu trouxe munição.',
    description: 'Capelã de campo e atiradora de competição, Cecília oferece calma em situações onde calma parece impossível. Veste vermelho porque, segundo ela, o time precisa saber onde está o ponto seguro. Não perde a fé. Não perde a linha.',
    quote: '“Um passo de cada vez. Eu cubro os dois.”',
    home: 'Brasília, Brasil',
    palette: { primary: '#2a0d12', secondary: '#ff4f5e', accent: '#ffe8bc', suit: '#351218', metal: '#d6c5a5', skin: skin.light, hair: '#c8a15f' },
    model: { height: 1.72, build: 'slim', hairStyle: 'elegant-waves', hairColor: '#c8a15f', accessory: 'halo-pin', backGear: 'med-pack', chestGlow: true },
    stats: { mobility: 6, firepower: 6, utility: 10, difficulty: 2 },
    passive: { name: 'Aura Serena', desc: 'Aliados a 6m recuperam 1.2 de vida por segundo.', icon: '✧' },
    active: { name: 'Bênção', desc: 'Cura 50 e concede 25 de escudo. Recarga: 13s.', icon: '✚', cooldown: 13, type: 'blessing', params: { heal: 50, shield: 25, radius: 7 } },
    special: { name: 'Milagre', desc: 'Escudo de 50 para o time e 30% de redução por 5s. Recarga: 44s.', icon: '☩', cooldown: 44, type: 'teamShield', params: { amount: 50, radius: 18, reduction: 0.3, duration: 5 } },
    skins: [
      { id: 'default', name: 'Voto Vermelho', price: 'PADRÃO', color: '#ff4f5e', secondary: '#2a0d12' },
      { id: 'ivory', name: 'Marfim', price: 'NÍVEL 05', color: '#ffe8bc', secondary: '#3d2c20' },
      { id: 'vesper', name: 'Vésper', price: 'LOJA', color: '#ffb347', secondary: '#2b1a09' }
    ]
  },
  {
    id: 'corvo',
    name: 'Dani "CORVO" Rios',
    shortName: 'CORVO',
    firstName: 'Dani',
    age: 28,
    role: 'recon',
    tagline: 'Todo silêncio tem um dono.',
    description: 'Ex-analista de sinais, Dani trocou a sala de escuta pelo campo. Trabalha com frequências, sombras e a desconfortável certeza de que alguém está ouvindo. Seu traje absorve luz; sua presença absorve a atenção do inimigo.',
    quote: '“Eu não sigo. Eu já estava lá.”',
    home: 'Rio de Janeiro, Brasil',
    palette: { primary: '#151318', secondary: '#c9304a', accent: '#8b7dff', suit: '#1c191f', metal: '#77717d', skin: skin.porcelain, hair: '#161218' },
    model: { height: 1.70, build: 'slim', hairStyle: 'shag', hairColor: '#161218', accessory: 'earpiece', backGear: 'antenna', chestGlow: true },
    stats: { mobility: 8, firepower: 6, utility: 9, difficulty: 4 },
    passive: { name: 'Eco', desc: 'Quem causa dano a você fica revelado por 2.5s.', icon: '◈' },
    active: { name: 'Pulso Cego', desc: 'Marca o inimigo mais próximo e o deixa lento. Recarga: 11s.', icon: '◎', cooldown: 11, type: 'markSlow', params: { range: 32, duration: 5, slow: 0.55 } },
    special: { name: 'Caçada', desc: 'Revela três inimigos e aumenta seu dano por 6s. Recarga: 43s.', icon: '◉', cooldown: 43, type: 'hunt', params: { duration: 6, count: 3, damage: 1.2 } },
    skins: [
      { id: 'default', name: 'Sinal Morto', price: 'PADRÃO', color: '#c9304a', secondary: '#151318' },
      { id: 'violet', name: 'Violeta', price: 'NÍVEL 14', color: '#8b7dff', secondary: '#1a1624' },
      { id: 'raven', name: 'Asa Negra', price: 'EVENTO', color: '#d7d3cc', secondary: '#0f0f12' }
    ]
  },
  {
    id: 'areia',
    name: 'Sol "AREIA" Ferreira',
    shortName: 'AREIA',
    firstName: 'Sol',
    age: 33,
    role: 'defense',
    tagline: 'O deserto não perdoa pressa.',
    description: 'Arquiteta de fortificações e sobrevivente de três temporadas em zonas áridas, Sol constrói defesas que parecem parte da paisagem. Paciente até o último segundo, prefere deixar o inimigo cansado antes de apertar o gatilho.',
    quote: '“Você trouxe água? Não vai precisar.”',
    home: 'Petrolina, Brasil',
    palette: { primary: '#3b2c1d', secondary: '#e6bd72', accent: '#ff8f5b', suit: '#4a3826', metal: '#b7a27e', skin: skin.bronze, hair: '#3a2114' },
    model: { height: 1.76, build: 'athletic', hairStyle: 'curly-long', hairColor: '#3a2114', accessory: 'scarf', backGear: 'shield-pack', chestGlow: true },
    stats: { mobility: 5, firepower: 7, utility: 10, difficulty: 2 },
    passive: { name: 'Casca', desc: 'Recupera 25 de escudo após 6s sem dano.', icon: '⬢' },
    active: { name: 'Muralha de Areia', desc: 'Ergue uma parede temporária. Recarga: 14s.', icon: '▰', cooldown: 14, type: 'barrier', params: { width: 4.2, height: 2.5, duration: 8, range: 6, color: '#e6bd72' } },
    special: { name: 'Miragem', desc: 'Escudo para o time e uma isca de distração. Recarga: 41s.', icon: '◌', cooldown: 41, type: 'mirage', params: { amount: 40, radius: 16, decoyDuration: 8 } },
    skins: [
      { id: 'default', name: 'Duna', price: 'PADRÃO', color: '#e6bd72', secondary: '#3b2c1d' },
      { id: 'dusk', name: 'Crepúsculo', price: 'NÍVEL 13', color: '#ff8f5b', secondary: '#2c1710' },
      { id: 'oasis', name: 'Oásis', price: 'LOJA', color: '#55e1c1', secondary: '#12332e' }
    ]
  },
  {
    id: 'glitch',
    name: 'Bianca "GLITCH" Wu',
    shortName: 'GLITCH',
    firstName: 'Bianca',
    age: 22,
    role: 'control',
    tagline: 'O sistema confia em mim. Erro dele.',
    description: 'Hacker de interfaces e campeã de robótica, Bianca trata qualquer arena como um sistema com permissões abertas. Seu traje carrega nano-emissores que distorcem sensores e transformam o chão em areia movediça digital.',
    quote: '“Não é bug. É feature.”',
    home: 'Campinas, Brasil',
    palette: { primary: '#101b18', secondary: '#67ff8e', accent: '#ff4fd8', suit: '#14231f', metal: '#9cc6b1', skin: skin.light, hair: '#1b0e18' },
    model: { height: 1.66, build: 'compact', hairStyle: 'twin-tails', hairColor: '#1b0e18', accessory: 'ar-visor', backGear: 'server-pack', chestGlow: true },
    stats: { mobility: 8, firepower: 5, utility: 10, difficulty: 4 },
    passive: { name: 'Rastreio', desc: 'Inimigos atingidos por você ficam marcados por 2s.', icon: '◈' },
    active: { name: 'Nó de Dados', desc: 'Zona que reduz a velocidade e a mira inimiga. Recarga: 12s.', icon: '⌗', cooldown: 12, type: 'slowField', params: { radius: 5.5, duration: 7, slow: 0.45, range: 17 } },
    special: { name: 'Apagão', desc: 'Sobrecarrega sensores e atordoa inimigos próximos. Recarga: 42s.', icon: '⌁', cooldown: 42, type: 'blackout', params: { radius: 15, duration: 3, damage: 10 } },
    skins: [
      { id: 'default', name: 'Erro 404', price: 'PADRÃO', color: '#67ff8e', secondary: '#101b18' },
      { id: 'magenta', name: 'Magenta', price: 'NÍVEL 15', color: '#ff4fd8', secondary: '#250f20' },
      { id: 'terminal', name: 'Terminal', price: 'EVENTO', color: '#d5ffb0', secondary: '#10160b' }
    ]
  },
  {
    id: 'orquidea',
    name: 'Hana "ORQUÍDEA" Mizuki',
    shortName: 'ORQUÍDEA',
    firstName: 'Hana',
    age: 36,
    role: 'support',
    tagline: 'Florescer também é uma tática.',
    description: 'Cirurgiã de trauma e botânica amadora, Hana montou um sistema de suporte que parece um jardim e funciona como uma fortaleza. A maturidade é arma: enquanto o time entra em pânico, ela reorganiza a respiração de todos pelo rádio.',
    quote: '“Respira. A gente cresce de novo.”',
    home: 'Florianópolis, Brasil',
    palette: { primary: '#1b1420', secondary: '#f3a6d8', accent: '#b6f56b', suit: '#251a2c', metal: '#d9b8c7', skin: skin.light, hair: '#41333a' },
    model: { height: 1.74, build: 'athletic', hairStyle: 'updo-streak', hairColor: '#41333a', accessory: 'orquidea', backGear: 'garden-pack', chestGlow: true },
    stats: { mobility: 6, firepower: 6, utility: 10, difficulty: 2 },
    passive: { name: 'Antídoto', desc: 'Sofre 20% menos dano de zonas e efeitos de controle.', icon: '✚' },
    active: { name: 'Pétala', desc: 'Posiciona uma estação de cura. Recarga: 14s.', icon: '✿', cooldown: 14, type: 'healStation', params: { radius: 5.5, duration: 10, heal: 6, range: 5 } },
    special: { name: 'Jardim', desc: 'Cura o time e concede 20 de armadura por 9s. Recarga: 45s.', icon: '❀', cooldown: 45, type: 'teamHeal', params: { amount: 80, duration: 9, radius: 18, armor: 20 } },
    skins: [
      { id: 'default', name: 'Orquídea', price: 'PADRÃO', color: '#f3a6d8', secondary: '#1b1420' },
      { id: 'garden', name: 'Jardim Secreto', price: 'NÍVEL 16', color: '#b6f56b', secondary: '#15240e' },
      { id: 'night', name: 'Noite Branca', price: 'LOJA', color: '#f5e8f1', secondary: '#2c202c' }
    ]
  }
];

export const CHARACTER_BY_ID = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));

export function getCharacter(id) {
  return CHARACTER_BY_ID[id] || CHARACTERS[0];
}

export function getRole(id) {
  return Object.values(ROLES).find((role) => role.id === id) || ROLES.ASSAULT;
}
