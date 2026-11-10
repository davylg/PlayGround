(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const shell = document.getElementById('gameShell');
  const $ = (id) => document.getElementById(id);
  const ui = {
    score: $('score'), timer: $('timer'), lives: $('lives'), intro: $('introOverlay'),
    pause: $('pauseOverlay'), end: $('endOverlay'), pauseButton: $('pauseButton'),
    start: $('startButton'), resume: $('resumeButton'), again: $('againButton'),
    sound: $('soundButton'), combo: $('comboCallout'), final: $('finalScore'),
    endTitle: $('endTitle'), endEyebrow: $('endEyebrow'), resultBest: $('resultBest'),
    best: $('bestScore'), hint: $('bottomHint'), mobileTip: $('mobileTip')
  };
  const fruitTypes = [
    { name:'CITRUS', color:'#f4aa3c', dark:'#d86c27', light:'#ffd96c', leaf:'#64834e' },
    { name:'PEAR', color:'#b6d75c', dark:'#659548', light:'#e7f48b', leaf:'#789950' },
    { name:'PLUM', color:'#9a73c8', dark:'#594584', light:'#d3a8df', leaf:'#829a55' },
    { name:'APPLE', color:'#ed6652', dark:'#ae3e49', light:'#ffb27b', leaf:'#6b9550' },
    { name:'KIWI', color:'#9dc955', dark:'#62833d', light:'#d6e87a', leaf:'#719150' },
    { name:'PEACH', color:'#f28a68', dark:'#ce5360', light:'#ffd184', leaf:'#6d8d4b' }
  ];
  let W=0,H=0,dpr=1,state='intro',score=0,lives=3,timeLeft=60,missCooldown=0,best=Number(localStorage.getItem('orchard-edge-best')||0);
  let fruits=[],particles=[],trail=[],floating=[],lastTime=0,spawnClock=0,lastCut=0,combo=0,strokeHits=0,pointerDown=false,lastPoint=null,shake=0,soundOn=false,audio=null;
  let bgLeaves=[];
  ui.best.textContent=String(best).padStart(4,'0');

  function resize(){
    const rect=shell.getBoundingClientRect(); W=rect.width; H=rect.height; dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(W*dpr); canvas.height=Math.round(H*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
    bgLeaves=Array.from({length:Math.max(14,Math.floor(W/52))},(_,i)=>({x:(i*91+31)%W,y:(i*137+56)%H,r:18+(i*19)%45,rot:(i*1.7)%6.28,side:i%2?1:-1,alpha:.04+((i*7)%7)*.008}));
  }
  window.addEventListener('resize',resize); resize();
  const rand=(a,b)=>a+Math.random()*(b-a);
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function setScore(){ui.score.textContent=String(score).padStart(4,'0')}
  function setLives(){ui.lives.innerHTML=Array.from({length:3},(_,i)=>`<span class="${i>=lives?'lost':''}">♥</span>`).join('');ui.lives.setAttribute('aria-label',`${lives} lives`)}
  function showCombo(text){ui.combo.textContent=text;ui.combo.classList.remove('show');void ui.combo.offsetWidth;ui.combo.classList.add('show')}
  function popText(x,y,text,color='#f5efdc'){const el=document.createElement('span');el.className='combo-pop';el.textContent=text;el.style.left=`${x}px`;el.style.top=`${y}px`;el.style.color=color;shell.appendChild(el);setTimeout(()=>el.remove(),700)}
  function activateSound(){if(!audio){audio=new(window.AudioContext||window.webkitAudioContext)()} if(audio.state==='suspended')audio.resume()}
  function tone(freq,duration,type='sine',volume=.035,slide=0){if(!soundOn)return;try{activateSound();const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.setValueAtTime(freq,audio.currentTime);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),audio.currentTime+duration);g.gain.setValueAtTime(volume,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+duration)}catch(_){}}
  function startGame(){
    state='playing';score=0;lives=3;timeLeft=60;missCooldown=0;combo=0;strokeHits=0;lastCut=0;spawnClock=.35;fruits=[];particles=[];trail=[];setScore();setLives();
    ui.intro.hidden=true;ui.end.hidden=true;ui.pause.hidden=true;ui.pauseButton.hidden=false;ui.hint.style.opacity='0';ui.mobileTip.style.display='block';lastTime=performance.now();
  }
  function pauseGame(){if(state!=='playing')return;state='paused';ui.pause.hidden=false;ui.pauseButton.hidden=true;ui.mobileTip.style.display='none'}
  function resumeGame(){if(state!=='paused')return;state='playing';ui.pause.hidden=true;ui.pauseButton.hidden=false;ui.mobileTip.style.display='block';lastTime=performance.now()}
  function endGame(reason){if(state==='over')return;state='over';pointerDown=false;ui.pauseButton.hidden=true;ui.mobileTip.style.display='none';ui.end.hidden=false;ui.endTitle.textContent=reason==='bomb'?'A fiery finish.':score>=500?'Masterfully done.':score>=200?'A fine cut.':'The orchard will wait.';ui.endEyebrow.textContent=reason==='bomb'?'BOMB! HARVEST OVER':'HARVEST COMPLETE';ui.final.textContent=String(score).padStart(4,'0');if(score>best){best=score;localStorage.setItem('orchard-edge-best',String(best));ui.best.textContent=String(best).padStart(4,'0');ui.resultBest.textContent='✦  NEW PERSONAL BEST  ✦'}else ui.resultBest.textContent=`PERSONAL BEST  ${String(best).padStart(4,'0')}`;tone(reason==='bomb'?100:540,.35,'triangle',.05,-180)}
  function createFruit(x,y,type,bomb=false){const size=rand(28,39)*(Math.min(W,H)<600?.89:1);const vx=rand(-110,110),vy=rand(-690,-550)*(H<600?.86:1);fruits.push({x,y,vx,vy,r:bomb?size*.72:size,type,bomb,rot:rand(0,6.28),spin:rand(-3.2,3.2),age:0,sliced:false,seed:Math.random()})}
  function spawnWave(){let count=Math.random()<.48?1:Math.random()<.75?2:3;const center=rand(W*.32,W*.68),spacing=Math.min(77,W*.19);for(let i=0;i<count;i++){const x=clamp(center+(i-(count-1)/2)*spacing,40,W-40);const type=fruitTypes[Math.floor(Math.random()*fruitTypes.length)];createFruit(x,H+25,type,false)}if(Math.random()<.14&&timeLeft<48){const x=clamp(center+rand(-W*.27,W*.27),45,W-45);createFruit(x,H+25,null,true)}}
  function addParticles(f){const colors=f.bomb?['#ffb34e','#ff683f','#ffd770']: [f.type.light,f.type.color,f.type.dark,'#f9edcb'];for(let i=0;i<(f.bomb?22:14);i++){const a=rand(0,Math.PI*2),speed=rand(55,260);particles.push({x:f.x,y:f.y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed-rand(10,110),life:rand(.35,.8),max:.8,r:rand(1.7,5),color:colors[i%colors.length],gravity:360})}}
  function slice(f,p){f.sliced=true;addParticles(f);strokeHits++;const now=performance.now();if(now-lastCut<1150)combo++;else combo=1;lastCut=now;const multiplier=Math.min(5,1+Math.floor((combo-1)/3));const earned=10*multiplier;score+=earned;setScore();popText(f.x,f.y-14,`+${earned}${multiplier>1?`  ×${multiplier}`:''}`,multiplier>1?'#d7ff8e':'#f5efdc');if(strokeHits>=2){const chainBonus=5*(strokeHits-1);score+=chainBonus;setScore();showCombo(`${strokeHits} HIT CHAIN  +${chainBonus}`);tone(720+strokeHits*90,.12,'sine',.04,180)}else if(combo>=3){showCombo(`${combo}× COMBO`);tone(650+Math.min(combo,8)*60,.1,'triangle',.035,120)}else tone(450,.09,'sine',.03,260);shake=Math.max(shake,2.2);}
  function pointFromEvent(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
  function checkHits(a,b){if(state!=='playing')return;for(let i=fruits.length-1;i>=0;i--){const f=fruits[i];if(f.sliced)continue;const dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy;const t=len?clamp(((f.x-a.x)*dx+(f.y-a.y)*dy)/len,0,1):0;const px=a.x+dx*t,py=a.y+dy*t;if(Math.hypot(f.x-px,f.y-py)<f.r*.88){if(f.bomb){addParticles(f);shake=13;tone(115,.4,'sawtooth',.09,-65);endGame('bomb');return}slice(f,{x:px,y:py});}}}
  canvas.addEventListener('pointerdown',e=>{e.preventDefault();if(state!=='playing')return;pointerDown=true;strokeHits=0;lastPoint=pointFromEvent(e);trail.push({...lastPoint,life:.22})});
  canvas.addEventListener('pointermove',e=>{if(!pointerDown||state!=='playing')return;e.preventDefault();const p=pointFromEvent(e);if(lastPoint){trail.push({...p,life:.24});checkHits(lastPoint,p)}lastPoint=p});
  function release(){pointerDown=false;lastPoint=null}canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')release()});
  ui.start.addEventListener('click',()=>{if(soundOn)activateSound();startGame()});ui.again.addEventListener('click',startGame);ui.pauseButton.addEventListener('click',pauseGame);ui.resume.addEventListener('click',resumeGame);
  ui.sound.addEventListener('click',()=>{soundOn=!soundOn;ui.sound.classList.toggle('muted',!soundOn);ui.sound.setAttribute('aria-label',soundOn?'Turn sound off':'Turn sound on');ui.sound.querySelector('.sound-icon').textContent=soundOn?'♪':'♩';if(soundOn){activateSound();tone(550,.08)}});
  window.addEventListener('keydown',e=>{if(e.code==='Escape'||e.code==='KeyP'){if(state==='playing')pauseGame();else if(state==='paused')resumeGame()}if(e.code==='Space'&&state==='intro')startGame()});

  function drawBackground(t){
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#172728');g.addColorStop(.44,'#1c3030');g.addColorStop(1,'#111d1d');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    let glow=ctx.createRadialGradient(W*.5,H*.48,5,W*.5,H*.48,Math.max(W,H)*.65);glow.addColorStop(0,'rgba(200,158,91,.12)');glow.addColorStop(.45,'rgba(111,137,93,.055)');glow.addColorStop(1,'rgba(7,14,15,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
    // Distant orchard ridgelines
    ctx.fillStyle='rgba(10,20,20,.17)';ctx.beginPath();ctx.moveTo(0,H*.65);for(let x=0;x<=W+20;x+=50)ctx.lineTo(x,H*.61+Math.sin(x*.012+t*.00012)*16+Math.sin(x*.033)*5);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
    bgLeaves.forEach((l,i)=>{const sway=Math.sin(t*.00045+i)*.07;ctx.save();ctx.translate(l.x,l.y);ctx.rotate(l.rot+sway);ctx.fillStyle=`rgba(165,195,131,${l.alpha})`;ctx.beginPath();ctx.ellipse(0,0,l.r*.34,l.r,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=`rgba(198,216,153,${l.alpha*.8})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,l.r*.75);ctx.quadraticCurveTo(l.side*4,0,l.side*2,-l.r*.65);ctx.stroke();ctx.restore()});
    // Restrained bottom vignette
    const v=ctx.createLinearGradient(0,H*.55,0,H);v.addColorStop(0,'rgba(10,17,17,0)');v.addColorStop(1,'rgba(8,15,15,.53)');ctx.fillStyle=v;ctx.fillRect(0,H*.5,W,H*.5);
  }
  function drawFruit(f){
    ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.rot);
    if(f.bomb){
      const glow=ctx.createRadialGradient(-4,-5,2,0,0,f.r*1.8);glow.addColorStop(0,'rgba(255,131,49,.38)');glow.addColorStop(1,'rgba(255,83,42,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,f.r*1.8,0,Math.PI*2);ctx.fill();
      const bg=ctx.createRadialGradient(-f.r*.3,-f.r*.35,2,0,0,f.r);bg.addColorStop(0,'#534747');bg.addColorStop(.6,'#282b2a');bg.addColorStop(1,'#151c1c');ctx.fillStyle=bg;ctx.beginPath();ctx.arc(0,0,f.r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ff9354';ctx.lineWidth=2;ctx.stroke();
      ctx.strokeStyle='#e9874d';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(f.r*.34,-f.r*.62);ctx.quadraticCurveTo(f.r*.85,-f.r*1.25,f.r*.56,-f.r*1.5);ctx.stroke();ctx.fillStyle='#ffe39a';ctx.shadowColor='#ff7d37';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(f.r*.55,-f.r*1.48,3,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='rgba(251,156,78,.75)';ctx.font=`bold ${f.r*.67}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('✦',0,1);
    }else{
      const type=f.type;const r=f.r;
      // soft fruit shadow and rounded natural body
      ctx.fillStyle='rgba(4,10,10,.23)';ctx.beginPath();ctx.ellipse(2,r*.76,r*.78,r*.28,0,0,Math.PI*2);ctx.fill();
      let grad=ctx.createRadialGradient(-r*.34,-r*.43,r*.06,r*.15,r*.15,r*1.22);grad.addColorStop(0,type.light);grad.addColorStop(.39,type.color);grad.addColorStop(1,type.dark);
      ctx.fillStyle=grad;ctx.beginPath();
      if(type.name==='APPLE'){ctx.moveTo(0,-r*.78);ctx.bezierCurveTo(-r*.13,-r*1.02,-r*.6,-r*.89,-r*.77,-r*.43);ctx.bezierCurveTo(-r*1.05,r*.21,-r*.58,r*.87,0,r*.87);ctx.bezierCurveTo(r*.58,r*.87,r*1.05,r*.21,r*.77,-r*.43);ctx.bezierCurveTo(r*.6,-r*.89,r*.13,-r*1.02,0,-r*.78)}else{ctx.ellipse(0,0,r*.8,r*.91,0,0,Math.PI*2)}ctx.fill();
      // warm key-light and skin detail
      ctx.fillStyle='rgba(255,248,207,.24)';ctx.beginPath();ctx.ellipse(-r*.28,-r*.32,r*.13,r*.26,-.5,0,Math.PI*2);ctx.fill();
      if(type.name==='KIWI'){ctx.strokeStyle='rgba(241,245,197,.46)';ctx.lineWidth=1.4;for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.arc(0,0,r*.44,a,a+.18);ctx.stroke()}}
      ctx.strokeStyle='#71573a';ctx.lineWidth=Math.max(2,r*.09);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-r*.72);ctx.quadraticCurveTo(r*.05,-r*.96,r*.15,-r*1.04);ctx.stroke();
      ctx.fillStyle=type.leaf;ctx.beginPath();ctx.ellipse(r*.29,-r*.88,r*.27,r*.12,-.52,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(235,240,186,.5)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(r*.1,-r*.86);ctx.lineTo(r*.48,-r*.9);ctx.stroke();
    }
    ctx.restore();
  }
  function drawTrail(){if(trail.length<2)return;for(let i=1;i<trail.length;i++){const a=trail[i-1],b=trail[i],alpha=Math.min(a.life,b.life)/.24;ctx.lineCap='round';ctx.strokeStyle=`rgba(154,246,225,${alpha*.25})`;ctx.lineWidth=20*alpha;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.strokeStyle=`rgba(189,255,239,${alpha*.68})`;ctx.lineWidth=7*alpha;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.strokeStyle=`rgba(255,255,244,${alpha*.95})`;ctx.lineWidth=2*alpha;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
  function drawParticles(dt){for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.gravity*dt;p.vx*=Math.pow(.985,dt*60);if(p.life<=0){particles.splice(i,1);continue}ctx.globalAlpha=Math.min(1,p.life/p.max);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r*(.4+.6*p.life/p.max),0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1}
  function render(now){const dt=Math.min(.034,(now-lastTime)/1000||0);lastTime=now;drawBackground(now);
    if(state==='playing'){
      timeLeft-=dt;missCooldown=Math.max(0,missCooldown-dt);if(timeLeft<=0){timeLeft=0;endGame('time')}ui.timer.textContent=String(Math.ceil(timeLeft)).padStart(2,'0');ui.timer.style.color=timeLeft<=10?'#f18a5c':'';
      spawnClock-=dt;if(spawnClock<=0){spawnWave();spawnClock=rand(.76,1.22)*Math.max(.63,1-(60-timeLeft)*.004)}
      for(let i=fruits.length-1;i>=0;i--){const f=fruits[i];f.age+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=560*dt;f.rot+=f.spin*dt;if(f.sliced){fruits.splice(i,1);continue}if(f.y>H+f.r+10){if(!f.bomb&&missCooldown<=0){lives--;missCooldown=1.35;setLives();tone(180,.13,'sine',.025,-50);if(lives<=0)endGame('miss')}fruits.splice(i,1)}}
      for(const p of trail)p.life-=dt;trail=trail.filter(p=>p.life>0);if(shake>0)shake=Math.max(0,shake-dt*14);
    }
    ctx.save();if(shake>0)ctx.translate(rand(-shake,shake),rand(-shake,shake));for(const f of fruits)drawFruit(f);drawParticles(dt);drawTrail();ctx.restore();
    if(state==='intro'){
      // a quiet orbit of orchard motes gives the title screen a little life
      for(let i=0;i<5;i++){const x=W*(.16+i*.17)+Math.sin(now*.00035+i*2)*16,y=H*.72+Math.sin(now*.0006+i*2.7)*13;ctx.fillStyle=`rgba(203,231,141,${.18+Math.sin(now*.002+i)*.1})`;ctx.beginPath();ctx.arc(x,y,1.1+(i%2),0,Math.PI*2);ctx.fill()}
    }
    requestAnimationFrame(render);
  }
  ui.timer.textContent='60';setLives();requestAnimationFrame(render);
})();
