import { operators } from './data.js';
import { createGame } from './world.js';

const $ = s => document.querySelector(s);
const menu = $('#menu'), roster = $('#roster'), settings = $('#settings'), hud = $('#gameHud');
let selected = 0, game = null;

function renderRoster(){
  const list=$('#operatorList'); list.innerHTML='';
  operators.forEach((op,i)=>{const btn=document.createElement('button');btn.className='operator-item'+(selected===i?' active':'');btn.innerHTML=`<span class="op-avatar">${op.name.slice(0,1)}</span><span class="op-meta"><b>${op.name}</b><small>${op.role}</small></span>`;btn.onclick=()=>{selected=i;renderRoster()};list.append(btn)});
  const op=operators[selected];$('#operatorName').textContent=op.name;$('#operatorRole').textContent=`${op.role} · ${op.tag}`;$('#operatorDesc').textContent=`${op.age} ANOS · ${op.desc}`;$('#operatorAbility').textContent=op.active;$('#operatorSpecial').textContent=op.special;$('.portrait-number').textContent=String(selected+1).padStart(2,'0');$('#menuOperator').textContent=`${op.name} / ${op.role}`;
}
function show(el){el.classList.remove('hidden')};function hide(el){el.classList.add('hidden')};
$('#rosterBtn').onclick=()=>{renderRoster();show(roster)};document.querySelectorAll('[data-nav="OPERADORAS"]').forEach(b=>b.onclick=()=>{renderRoster();show(roster)});
$('#confirmOperator').onclick=()=>{hide(roster);renderRoster()};
$('#settingsBtn').onclick=$('#settingsNav').onclick=()=>show(settings);
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>{hide(b.closest('.modal'))});
document.querySelectorAll('[data-nav="ARSENAL"],[data-nav="PERSONALIZAÇÃO"]').forEach(b=>b.onclick=()=>toast('ARSENAL E PERSONALIZAÇÃO CHEGAM EM UMA PRÓXIMA OPERAÇÃO'));
$('#sensitivity').oninput=e=>e.target.nextElementSibling.value=e.target.value;$('#volume').oninput=e=>e.target.nextElementSibling.value=e.target.value+'%';
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2100)}
$('#playBtn').onclick=()=>{
  hide(menu);hide(roster);hide(settings);show(hud);
  if(!game)game=createGame({operator:operators[selected],onUpdate:updateHud,onToast:toast,onRound:endRound,onMatch:finishMatch});
  game.start();
};
$('#exitGame').onclick=()=>{if(game)game.stop();hide(hud);hide(roster);hide(settings);show(menu)};
function updateHud(state){
  $('#attScore').textContent=state.attScore;$('#defScore').textContent=state.defScore;$('#roundLabel').textContent=`ROUND ${String(state.round).padStart(2,'0')}`;$('#roundTimer').textContent=`${Math.floor(state.time/60)}:${String(Math.floor(state.time%60)).padStart(2,'0')}`;$('#objectiveLabel').textContent=state.bomb==='planted'?'DISPOSITIVO ATIVO — PROTEJA O SITE':state.team==='ATT'?'ELIMINE OS DEFENSORES':'DEFENDA O SITE';$('#healthValue').textContent=Math.ceil(state.health);$('#healthBar').style.width=`${Math.max(0,state.health)}%`;
  $('#ammoValue').textContent=state.ammo;$('#reserveValue').textContent=state.reserve;$('#weaponName').textContent=state.weapon;$('#abilityCooldown').textContent=state.cooldown>0?`${Math.ceil(state.cooldown)}S`:'PRONTA';$('#siteIndicator').innerHTML=`<i></i> ${state.nearSite?`SITE ${state.nearSite}`:state.bomb==='planted'?'DISPOSITIVO PLANTADO':'SITE A  ·  SITE B'}`;
  const prompt=$('#interactPrompt');if(state.interact){show(prompt);$('#interactText').textContent=state.interact==='plant'?'PLANTAR DISPOSITIVO':state.interact==='defuse'?'DESARMAR DISPOSITIVO':'INTERAGIR';$('#interactProgress').style.width=`${state.progress*100}%`}else hide(prompt);
  $('#abilityLabel').textContent=state.abilityName;
}
function endRound({won,reason,match}){
 const panel=$('#roundResult');show(panel);$('#resultEyebrow').textContent=match?'OPERAÇÃO CONCLUÍDA':`ROUND ${String(game.state.round).padStart(2,'0')}`;$('#resultTitle').textContent=match?(won?'VITÓRIA':'DERROTA'):(won?'ROUND VENCIDO':'ROUND PERDIDO');$('#resultText').textContent=reason;
 setTimeout(()=>hide(panel),match?4500:2400);
}
function finishMatch(won){setTimeout(()=>{if(!hud.classList.contains('hidden')){game.stop();hide(hud);show(menu);toast(won?'MISSÃO CONCLUÍDA · VITÓRIA':'MISSÃO ENCERRADA · DERROTA')}},4600)}

const mobile=$('#mobileControls'), isTouch=matchMedia('(pointer:coarse)').matches||innerWidth<750;if(isTouch)mobile.style.display='block';
$('#fireTouch').addEventListener('pointerdown',e=>{e.preventDefault();game?.setFire(true)});['pointerup','pointercancel','pointerleave'].forEach(ev=>$('#fireTouch').addEventListener(ev,()=>game?.setFire(false)));
$('#reloadTouch').onclick=()=>game?.reload();$('#jumpTouch').onclick=()=>game?.jump();$('#interactTouch').addEventListener('pointerdown',e=>{e.preventDefault();game?.interact(true)});['pointerup','pointercancel','pointerleave'].forEach(ev=>$('#interactTouch').addEventListener(ev,()=>game?.interact(false)));$('#abilityTouch').onclick=()=>game?.ability();
const joy=$('#joystick'),knob=joy.querySelector('.joy-knob');let joyId=null;
joy.addEventListener('pointerdown',e=>{joyId=e.pointerId;joy.setPointerCapture(joyId);moveJoy(e)});joy.addEventListener('pointermove',e=>{if(e.pointerId===joyId)moveJoy(e)});joy.addEventListener('pointerup',e=>{if(e.pointerId===joyId){joyId=null;knob.style.transform='translate(0,0)';game?.setMove(0,0)}});joy.addEventListener('pointercancel',()=>{joyId=null;knob.style.transform='translate(0,0)';game?.setMove(0,0)});
function moveJoy(e){const r=joy.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),len=Math.min(34,Math.hypot(dx,dy)),a=Math.atan2(dy,dx),x=Math.cos(a)*len,y=Math.sin(a)*len;knob.style.transform=`translate(${x}px,${y}px)`;game?.setMove(x/34,-y/34)}
const look=$('#lookZone');let lookId=null,lx=0,ly=0;look.addEventListener('pointerdown',e=>{lookId=e.pointerId;look.setPointerCapture(lookId);lx=e.clientX;ly=e.clientY});look.addEventListener('pointermove',e=>{if(e.pointerId===lookId){game?.look((e.clientX-lx)*.006,(e.clientY-ly)*.006);lx=e.clientX;ly=e.clientY}});look.addEventListener('pointerup',()=>lookId=null);
