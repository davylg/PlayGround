# PlayGround

## VEM COMER — Arena Tática 3D (Beta Jogável)

Jogo de tiro tático 4v4 em 3D (first-person) feito com **Vite + Three.js**, jogável no navegador (desktop e Android/mobile touch).

### Como jogar

```bash
npm install
npm run dev        # abre http://localhost:5173
npm run build      # build de produção em dist/
npm run preview    # serve o build de produção
```

### Loop de jogo
- 4v4 · ATTACKERS vs DEFENDERS · primeiro time a vencer **4 rounds** ganha.
- Attackers plantam a bomba no Site A ou B (segure **E** na área do site).
- Defenders impedem o plant e desarmam (segure **E** perto da bomba).
- Bots atacam, defendem, plantam, desarmam e usam habilidades.

### Controles desktop
| Tecla | Ação |
|---|---|
| W/A/S/D | Mover |
| Shift | Correr |
| Espaço | Pular |
| Mouse | Mirar |
| Clique esq. | Atirar |
| R | Recarregar |
| Q | Habilidade ativa |
| F | Habilidade especial |
| E (segurar) | Plantar / desarmar |
| 1 / 2 | Trocar arma |
| Esc | Pausa / Configurações |

### Controles mobile
Joystick virtual à esquerda, botões à direita (atirar, pular, recarregar, usar, habilidades, trocar arma). Forçáveis em Configurações → Controles Mobile → Sempre.

### Arquitetura
```
src/
├── main.js                 # bootstrap, render loop, pointer lock
├── data/characters.js      # 12 agentes (dados + habilidades + skins)
├── data/weapons.js         # definições de armas
└── game/
    ├── GameManager.js      # estado central, zonas, espectador
    ├── RoundManager.js     # máquina de estados dos rounds
    ├── TeamManager.js      # equipes, placar, vivos
    ├── BombController.js   # plant/defuse/explosão
    ├── Player.js           # movimento 1ª pessoa, câmera, dano
    ├── Bot.js              # IA: pathfinding, combate, objetivos
    ├── World.js            # mapa, colisão, nav grid, sites
    ├── WeaponController.js # raycast, munição, recarga
    ├── AbilityController.js# cooldowns e efeitos
    ├── CharacterFactory.js # modelos 3D procedurais + visualizador
    ├── HUDController.js    # HUD, minimapa, killfeed, resultados
    ├── InputManager.js     # teclado/mouse + touch
    ├── AudioManager.js     # áudio procedural
    └── SettingsManager.js  # preferências persistentes
```

### Notas
- Todas as personagens são adultas e com roupas — designs táticos estilizados originais.
- Ferramentas de teste automatizado ficam em `tools/` (scripts Playwright para screenshots e simulação de partidas).

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/davylg/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/davylg/PlayGround)

- 🎮 [Open the project](https://go.ondev.store/davylg/PlayGround).
- ✨ [Remix this project](https://go.ondev.store/davylg/PlayGround?remix=1).
- 💻 [Explore the source](https://github.com/davylg/PlayGround).
- 🛠️ [Check build runs](https://github.com/davylg/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/davylg/PlayGround/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/davylg).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
<!-- omgithub:readme:end -->
