import './styles.css';
import { GameManager } from './managers/gameManager.js';

const game = new GameManager();
window.VEM_COMER = game;

export default game;
