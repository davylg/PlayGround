(()=>{
'use strict';
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const W=960,H=540,FLOOR=440;
const palette=[
 {name:'LUNA',title:'GUARDIÃ DA LUA',fur:'#f1e8dc',dark:'#b2a7b3',cloth:'#7164b7',accent:'#d8c9ff',power:'ORBE LUNAR'},
 {name:'BRASA',title:'PANTERA SOLAR',fur:'#ee9c59',dark:'#8c4b50',cloth:'#bd4e4c',accent:'#ffd06f',power:'RUGIDO ÍGNEO'},
 {name:'NÉVOA',title:'NINJA DAS SOMBRAS',fur:'#9ba4c9',dark:'#505579',cloth:'#37435f',accent:'#9bf1e2',power:'PASSO FANTASMA'},
 {name:'PIPOCA',title:'MESTRE DO TROVÃO',fur:'#f0d47a',dark:'#b88442',cloth:'#66a890',accent:'#b5fff0',power:'CHOQUE FELINO'},
 {name:'RUBI',title:'ROSEIRA DE AÇO',fur:'#e38ca7',dark:'#984d77',cloth:'#9b496c',accent:'#ffc3dc',power:'CHUVA DE ESPINHOS'},
 {name:'TUFÃO',title:'LOBO DA TEMPESTADE',fur:'#8dc5d0',dark:'#477b91',cloth:'#486c9b',accent:'#d2f6ff',power:'VENTO CORTANTE'}
];
let selected=0,mode='menu',last=0,elapsed=0,shake=0,particles=[],projectiles=[],keys={},touch={},round=1,soundOn=true,audio=null,roundTimer=0,gameOverAt=0;
const roster=document.getElementById('roster'), overlay=document.getElementById('overlay'),fightUI=document.getElementById('fight-ui');
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function fighter(id,x,player){return {id,x,y:FLOOR,vx:0,vy:0,face:player?1:-1,hp:100,power:0,grounded:true,attack:0,attackDone:false,stun:0,flash:0,anim:0,player,airAttack:false,aiWait:rnd(.4,.9),specialAnim:0}}
let p1=fighter(0,315,true),p2=fighter(1,645,false);
function rounded(x,y,w,h,r,fill){ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
function makeRoster(){palette.forEach((c,i)=>{const b=document.createElement('button');b.className='fighter-choice'+(i===selected?' selected':'');b.title=`${c.name} — ${c.power}`;b.setAttribute('aria-label',`${c.name}, ${c.power}`);const cv=document.createElement('canvas');cv.width=84;cv.height=92;b.append(cv);const g=cv.getContext('2d');drawFighter(g,cv.width/2,80,i,1,true,0);const n=document.createElement('span');n.className='choice-num';n.textContent=`0${i+1}`;b.append(n);b.onclick=()=>chooseFighter(i);roster.append(b)});updateSelected()}
function chooseFighter(i){selected=i;[...roster.children].forEach((el,n)=>el.classList.toggle('selected',n===i));updateSelected();playTone(420+i*45,.07,'sine',.04)}
function updateSelected(){let d=document.getElementById('selected-name');if(!d){d=document.createElement('div');d.id='selected-name';d.className='selected-name';roster.after(d)}d.textContent=`${palette[selected].name}  ·  ${palette[selected].title}  ·  ${palette[selected].power}`}
function drawBackground(t){
 const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#1d2039');sky.addColorStop(.52,'#493b56');sky.addColorStop(1,'#e28b70');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
 // moon + distant clouds
 ctx.save();ctx.shadowColor='#ffe7bc';ctx.shadowBlur=35;ctx.fillStyle='#ffe9be';ctx.beginPath();ctx.arc(754,124,54,0,Math.PI*2);ctx.fill();ctx.restore();ctx.fillStyle='#d5b6b0';ctx.beginPath();ctx.arc(773,110,49,0,Math.PI*2);ctx.fill();
 for(let i=0;i<36;i++){let x=(i*173+42)%W,y=(i*79+32)%220;let blink=.35+.55*Math.abs(Math.sin(t*1.3+i));ctx.fillStyle=`rgba(255,235,202,${blink})`;ctx.fillRect(x,y,(i%5===0?2:1),(i%5===0?2:1))}
 for(let layer=0;layer<3;layer++){let base=300+layer*31;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=40){const y=base+Math.sin((x+layer*35)*.012)*18+Math.sin(x*.027+layer)*10;ctx.lineTo(x,y)}ctx.lineTo(W,H);ctx.closePath();ctx.fillStyle=['#363249','#302d43','#29283c'][layer];ctx.fill();}
 // lanterns
 for(let i=0;i<7;i++){const x=85+i*130,y=234+(i%2)*18;ctx.save();ctx.globalAlpha=.6+.2*Math.sin(t*2+i);ctx.shadowColor='#ffc36f';ctx.shadowBlur=18;rounded(x-6,y,12,22,4,'#ffb85f');ctx.restore();ctx.strokeStyle='#c89c72';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y-8);ctx.lineTo(x,y);ctx.stroke()}
 // arena floor
 const floor=ctx.createLinearGradient(0,340,0,H);floor.addColorStop(0,'#5e4550');floor.addColorStop(.35,'#382d3e');floor.addColorStop(1,'#1d2030');ctx.fillStyle=floor;ctx.fillRect(0,340,W,H-340);
 ctx.strokeStyle='#f0bd8a';ctx.globalAlpha=.38;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,366);ctx.lineTo(W,366);ctx.stroke();ctx.globalAlpha=1;
 // perspective tiles
 for(let i=0;i<13;i++){let x=i*80-20;ctx.strokeStyle='rgba(236,179,143,.12)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,366);ctx.lineTo(W/2+(x-W/2)*1.8,H);ctx.stroke()}
 for(let y=385;y<540;y+=31){ctx.strokeStyle=`rgba(238,183,148,${.1-(y-385)*.0003})`;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
 // arena sigil
 ctx.save();ctx.translate(480,462);ctx.strokeStyle='rgba(255,199,139,.21)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,118,22,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.ellipse(0,0,83,14,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(255,214,155,.24)';ctx.font='20px serif';ctx.textAlign='center';ctx.fillText('✦',0,6);ctx.restore();
 // foreground petals
 for(let i=0;i<10;i++){let x=(i*121+t*12)%W,y=346+(i*47)%130;ctx.fillStyle='rgba(248,148,161,.28)';ctx.beginPath();ctx.ellipse(x,y,3,7,Math.sin(t+i),0,Math.PI*2);ctx.fill()}
}
function ellipse(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill()}
function drawFighter(g,x,y,id,scale=1,faceRight=true,time=0,st={}){
 const c=palette[id];g.save();const rounded=(x,y,w,h,r,fill)=>{g.fillStyle=fill;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()};g.translate(x,y);g.scale(scale*(faceRight?1:-1),scale);const bob=Math.sin(time*8)*1.6,tailWave=Math.sin(time*4+id)*.34;
 // shadow
 g.fillStyle='#10101b55';g.beginPath();g.ellipse(0,0,23,6,0,0,Math.PI*2);g.fill();g.translate(0,bob);
 // tail behind body, individual two-segment curling tail
 g.lineCap='round';g.lineJoin='round';g.strokeStyle=c.dark;g.lineWidth=9;g.beginPath();g.moveTo(-7,-42);g.bezierCurveTo(-27,-43,-34,-56+Math.sin(time*5)*4,-27,-68+Math.sin(time*5)*4);g.bezierCurveTo(-17,-83+tailWave*9,-3,-69+tailWave*8,-12,-64+tailWave*6);g.stroke();g.strokeStyle=c.fur;g.lineWidth=5;g.beginPath();g.moveTo(-7,-42);g.bezierCurveTo(-27,-43,-34,-56+Math.sin(time*5)*4,-27,-68+Math.sin(time*5)*4);g.bezierCurveTo(-17,-83+tailWave*9,-3,-69+tailWave*8,-12,-64+tailWave*6);g.stroke();ellipse(-12,-64+tailWave*6,5,4,c.accent);
 // legs and boots
 g.strokeStyle=c.dark;g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(-6,-24);g.lineTo(-8,-9);g.lineTo(-14,-3);g.moveTo(6,-24);g.lineTo(9,-10);g.lineTo(15,-3);g.stroke();rounded(g,-19,-7,14,7,3,c.cloth);rounded(g,7,-7,14,7,3,c.cloth);
 // body + outfit (fully covered fantasy tunic)
 g.fillStyle=c.fur;g.beginPath();g.moveTo(-10,-48);g.quadraticCurveTo(0,-54,10,-48);g.lineTo(12,-27);g.quadraticCurveTo(0,-21,-12,-27);g.closePath();g.fill();rounded(g,-13,-39,26,17,5,c.cloth);g.fillStyle=c.accent;g.fillRect(-12,-34,24,3);g.fillStyle=c.dark;g.beginPath();g.moveTo(-12,-23);g.lineTo(12,-23);g.lineTo(9,-18);g.lineTo(-9,-18);g.closePath();g.fill();
 // arms
 g.strokeStyle=c.fur;g.lineWidth=7;g.beginPath();g.moveTo(-10,-44);g.lineTo(-17,-35);g.lineTo(-14,-29);g.moveTo(10,-44);g.lineTo(17,-37);g.lineTo(20,-42);g.stroke();ellipse(20,-43,5,5,c.accent);
 // head and ears
 ellipse(0,-57,13,13,c.fur);g.fillStyle=c.fur;g.beginPath();g.moveTo(-11,-64);g.lineTo(-11,-79);g.lineTo(-1,-69);g.closePath();g.fill();g.beginPath();g.moveTo(5,-69);g.lineTo(14,-80);g.lineTo(13,-63);g.closePath();g.fill();g.fillStyle=c.dark;g.beginPath();g.moveTo(-8,-66);g.lineTo(-9,-74);g.lineTo(-3,-68);g.fill();g.beginPath();g.moveTo(8,-69);g.lineTo(12,-75);g.lineTo(11,-65);g.fill();
 // forehead accent, eyes, muzzle
 rounded(g,-6,-68,12,5,2,c.accent);ellipse(5,-59,1.8,2,'#262331');ellipse(-5,-59,1.8,2,'#262331');ellipse(0,-54,3,2,'#f4b2a7');g.strokeStyle='#413445';g.lineWidth=.8;g.beginPath();g.moveTo(0,-52);g.lineTo(0,-50);g.lineTo(2,-50);g.stroke();
 // whiskers
 g.strokeStyle='#fff0d6aa';g.lineWidth=.6;for(let i=0;i<2;i++){g.beginPath();g.moveTo(4,-54+i*2);g.lineTo(12,-55+i*3);g.stroke()}
 // optional weapon/back charm
 if(id===1){g.strokeStyle='#ffd06f';g.lineWidth=2;g.beginPath();g.moveTo(-12,-42);g.lineTo(-20,-51);g.stroke();ellipse(-20,-52,3,3,'#ffcf77')}
 if(id===2){g.fillStyle='#9bf1e2';g.globalAlpha=.75;g.beginPath();g.moveTo(-11,-47);g.lineTo(-19,-34);g.lineTo(-10,-31);g.fill();g.globalAlpha=1}
 if(st.attack>0){g.save();g.translate(22,-42);g.rotate(-.8+st.attack*1.3);g.strokeStyle=c.accent;g.lineWidth=4;g.beginPath();g.arc(0,0,17,-1,1);g.stroke();g.restore()}
 if(st.flash>0){g.globalAlpha=.4+Math.sin(time*35)*.3;g.fillStyle='#fff';g.beginPath();g.ellipse(0,-43,18,38,0,0,Math.PI*2);g.fill()}
 g.restore();
}
function playTone(freq,duration=.12,type='sine',volume=.06){if(!soundOn)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),gain=audio.createGain();o.type=type;o.frequency.setValueAtTime(freq,audio.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(45,freq*.45),audio.currentTime+duration);gain.gain.setValueAtTime(volume,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(gain);gain.connect(audio.destination);o.start();o.stop(audio.currentTime+duration)}catch{}}
function soundHit(){playTone(120,.13,'sawtooth',.09);playTone(330,.07,'triangle',.04)}
function burst(x,y,color,n=12){for(let i=0;i<n;i++){const a=rnd(0,Math.PI*2),speed=rnd(50,230);particles.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed-50,life:rnd(.25,.65),max:.65,size:rnd(2,6),color,star:Math.random()>.65})}}
function startGame(){p1=fighter(selected,300,true);const rival=(selected+1+Math.floor(Math.random()*5))%6;p2=fighter(rival,660,false);p1.face=1;p2.face=-1;round=1;mode='intro';overlay.classList.add('hidden');fightUI.classList.remove('hidden');document.getElementById('touch-controls').classList.remove('hidden');document.getElementById('player-name').textContent=palette[selected].name;document.getElementById('cpu-name').textContent=palette[rival].name;document.getElementById('round-number').textContent='01';announcement('READY?');playTone(460,.15,'triangle',.05);roundTimer=1.4;updateHUD()}
function announcement(text){const el=document.getElementById('announcement');el.textContent=text;el.classList.remove('hidden');void el.offsetWidth;el.style.animation='none';requestAnimationFrame(()=>{el.style.animation='';el.classList.add('show')});setTimeout(()=>el.classList.add('hidden'),950)}
function updateHUD(){document.getElementById('player-health').style.width=`${p1.hp}%`;document.getElementById('cpu-health').style.width=`${p2.hp}%`;document.getElementById('player-power').style.width=`${p1.power}%`;document.getElementById('cpu-power').style.width=`${p2.power}%`}
function doAttack(f,op,special=false){if(f.stun>0||f.attack>0||mode!=='fight')return;if(special&&f.power<35){playTone(150,.12,'square',.03);return}f.attack=special?.42:.27;f.attackDone=false;f.specialAnim=special?.48:0;if(special){f.power-=35;const c=palette[f.id];playTone(f.id===1?115:520,.32,f.id===2?'sine':'sawtooth',.07);if(f.id===2){f.x+=f.face*95;f.flash=.25;burst(f.x,f.y-40,c.accent,14)}else{projectiles.push({x:f.x+f.face*25,y:f.y-48,vx:f.face*(f.id===5?510:360),life:1.5,owner:f,id:f.id,size:f.id===1?20:14});burst(f.x+f.face*27,f.y-47,c.accent,7)}}else playTone(235,.08,'triangle',.04)}
function hit(f,op,damage,power){f.hp=Math.max(0,f.hp-damage);f.power=Math.min(100,f.power+power);op.power=Math.min(100,op.power+power*.55);f.stun=.22;f.flash=.18;f.vx=op.face*180;shake=9;burst(f.x,f.y-45,palette[op.id].accent,13);soundHit();updateHUD()}
function controlsForPlayer(f,dt){const left=keys.KeyA||keys.ArrowLeft||touch.left,right=keys.KeyD||keys.ArrowRight||touch.right;if(left){f.vx=-215;f.face=-1}else if(right){f.vx=215;f.face=1}else f.vx*=Math.pow(.001,dt);if((keys.KeyW||keys.ArrowUp||keys.Space||touch.jump)&&f.grounded){f.vy=-410;f.grounded=false;playTone(300,.09,'sine',.03)}if(keys.KeyJ||keys.KeyZ||touch.attack){if(!f._atk){doAttack(f,p2);f._atk=true}}else f._atk=false;if(keys.KeyK||keys.KeyX||touch.special){if(!f._sp){doAttack(f,p2,true);f._sp=true}}else f._sp=false}
function controlsForCPU(f,op,dt){f.aiWait-=dt;const dist=op.x-f.x;f.face=dist>0?1:-1;if(Math.abs(dist)>92)f.vx=Math.sign(dist)*145;else f.vx*=.8;if(f.aiWait<=0){if(f.power>=35&&Math.random()<.36)doAttack(f,op,true);else doAttack(f,op);if(Math.random()<.14&&f.grounded){f.vy=-360;f.grounded=false}f.aiWait=rnd(.35,.8)}}
function stepFighter(f,op,dt){f.anim+=dt;if(f.stun>0)f.stun-=dt;if(f.flash>0)f.flash-=dt;if(f.attack>0){f.attack-=dt;if(!f.attackDone&&f.attack<.19){f.attackDone=true;const dist=Math.abs(op.x-f.x);if(f.specialAnim&&f.id===2){if(dist<125)hit(op,f,24,16)}else if(dist<76&&Math.abs(op.y-f.y)<56){hit(op,f,f.specialAnim?18:9,f.specialAnim?12:8);if(f.specialAnim)hit(op,f,5,0)}}}if(f.specialAnim>0)f.specialAnim-=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=960*dt;if(f.y>=FLOOR){f.y=FLOOR;f.vy=0;f.grounded=true}f.x=clamp(f.x,48,W-48);if(f.stun<=0&&f.attack<=0)f.vx*=Math.pow(.08,dt)}
function update(dt){elapsed+=dt;if(mode==='menu'){return}if(mode==='intro'){roundTimer-=dt;if(roundTimer<=0){mode='fight';announcement('FIGHT!');playTone(680,.2,'square',.07)}return}if(mode==='paused')return;if(mode==='result'){if(elapsed>=gameOverAt){mode='menu';overlay.classList.remove('hidden');fightUI.classList.add('hidden');document.getElementById('touch-controls').classList.add('hidden')}return}if(mode!=='fight')return;controlsForPlayer(p1,dt);controlsForCPU(p2,p1,dt);stepFighter(p1,p2,dt);stepFighter(p2,p1,dt);if(Math.abs(p1.x-p2.x)<34){let d=p2.x-p1.x||1;p1.x-=Math.sign(d)*1.5;p2.x+=Math.sign(d)*1.5}for(let i=projectiles.length-1;i>=0;i--){const q=projectiles[i];q.x+=q.vx*dt;q.life-=dt;if(q.life<=0||q.x<0||q.x>W){projectiles.splice(i,1);continue}if(q.owner!==p1&&Math.abs(q.x-p1.x)<34&&Math.abs(q.y-(p1.y-45))<40){hit(p1,q.owner,q.id===1?18:14,12);projectiles.splice(i,1)}else if(q.owner!==p2&&Math.abs(q.x-p2.x)<34&&Math.abs(q.y-(p2.y-45))<40){hit(p2,q.owner,q.id===1?18:14,12);projectiles.splice(i,1)}}particles.forEach(a=>{a.x+=a.vx*dt;a.y+=a.vy*dt;a.vy+=360*dt;a.life-=dt});particles=particles.filter(a=>a.life>0);if(p1.hp<=0||p2.hp<=0){mode='result';gameOverAt=elapsed+2;announcement(p1.hp>0?'VITÓRIA!':'DERROTA!');playTone(p1.hp>0?760:160,.5,p1.hp>0?'sine':'triangle',.08)}if(shake>0)shake=Math.max(0,shake-dt*28);updateHUD()}
function draw(){ctx.clearRect(0,0,W,H);ctx.save();if(shake>0)ctx.translate(rnd(-shake,shake),rnd(-shake,shake));drawBackground(elapsed);
 // decorative side banners
 ctx.globalAlpha=.72;ctx.fillStyle='#211c30';ctx.beginPath();ctx.moveTo(20,174);ctx.lineTo(91,191);ctx.lineTo(91,301);ctx.lineTo(20,319);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(940,174);ctx.lineTo(869,191);ctx.lineTo(869,301);ctx.lineTo(940,319);ctx.closePath();ctx.fill();ctx.globalAlpha=1;ctx.font='20px serif';ctx.fillStyle='#e7bb7f';ctx.textAlign='center';ctx.fillText('✦',55,251);ctx.fillText('✦',905,251);
 if(mode==='menu'){const idle=Math.sin(elapsed*1.1)*12;drawFighter(ctx,612,440,1,1.9,false,elapsed);drawFighter(ctx,790,440,4,1.55,true,elapsed+1);drawFighter(ctx,535,440,2,1.14,false,elapsed+.4);ctx.globalAlpha=.12;ctx.fillStyle='#f9c97d';ctx.beginPath();ctx.ellipse(670,432,180+idle,34,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}
 else {for(const q of projectiles){const c=palette[q.id];ctx.save();ctx.shadowColor=c.accent;ctx.shadowBlur=22;ctx.fillStyle=c.accent;ctx.beginPath();ctx.arc(q.x,q.y,q.size,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.5;ctx.beginPath();ctx.ellipse(q.x-q.vx*.028,q.y,q.size*1.6,q.size*.55,0,0,Math.PI*2);ctx.fill();ctx.restore()}drawFighter(ctx,p1.x,p1.y,p1.id,1.5,p1.face>0,p1.anim,p1);drawFighter(ctx,p2.x,p2.y,p2.id,1.5,p2.face>0,p2.anim,p2);
 for(const a of particles){ctx.globalAlpha=clamp(a.life/a.max,0,1);ctx.fillStyle=a.color;if(a.star){ctx.font=`${a.size*2}px serif`;ctx.fillText('✦',a.x,a.y)}else{ctx.beginPath();ctx.arc(a.x,a.y,a.size,0,Math.PI*2);ctx.fill()}}ctx.globalAlpha=1;
 if(mode==='menu'){ctx.fillStyle='#fff0d2';ctx.textAlign='center';ctx.font='12px monospace';ctx.fillText('ESCOLHA SEU CAMPEÃO',670,154)}
 }
 ctx.restore();requestAnimationFrame(frame)}
function frame(now){const dt=Math.min(.034,(now-last)/1000||0);last=now;update(dt);draw()}
function togglePause(){if(mode==='fight'){mode='paused';document.getElementById('pause-badge').classList.remove('hidden')}else if(mode==='paused'){mode='fight';document.getElementById('pause-badge').classList.add('hidden')}}
makeRoster();document.getElementById('start-button').addEventListener('click',startGame);
document.getElementById('sound-toggle').addEventListener('click',e=>{soundOn=!soundOn;e.currentTarget.innerHTML=soundOn?'♫ <span>SOM</span>':'♩ <span>MUDO</span>';if(soundOn)playTone(540,.1,'sine',.04)});
window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','Space'].includes(e.code))e.preventDefault();keys[e.code]=true;if(mode==='menu'){if(e.code.startsWith('Digit')){const n=Number(e.code.slice(5));if(n>=1&&n<=6)chooseFighter(n-1)}if(e.code==='Enter'||e.code==='Space')startGame()}if(e.code==='KeyP'||e.code==='Escape')togglePause()});window.addEventListener('keyup',e=>keys[e.code]=false);window.addEventListener('blur',()=>{keys={};touch={}});
document.querySelectorAll('.touch-controls button').forEach(button=>{const key=button.dataset.key;const down=e=>{e.preventDefault();touch[key]=true;if(key==='attack')doAttack(p1,p2);if(key==='special')doAttack(p1,p2,true);if(key==='jump'&&p1.grounded){p1.vy=-410;p1.grounded=false}};const up=e=>{e.preventDefault();touch[key]=false};button.addEventListener('pointerdown',down);button.addEventListener('pointerup',up);button.addEventListener('pointercancel',up);button.addEventListener('pointerleave',up)});
requestAnimationFrame(frame);
})();
