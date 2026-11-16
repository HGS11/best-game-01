import {rng} from './random.js';
import {waveDef} from './levels.js';
import {spawn,hurt,updateEnemies} from './enemies.js';
import {updateTowers,upgrade,sell} from './towers.js';
import {updateShots} from './projectiles.js';
import {effects,updateFx,burst} from './particles.js';
import {setMuted,sound} from './audio.js';
export function createGame(ui,seed=1){let g={state:'title',gold:160,lives:20,wave:0,wavesCleared:0,waveLeaks:0,score:0,kills:0,earned:0,towers:[],enemies:[],shots:[],effects:{...effects(),beams:[],blasts:[],muzzle:[],burst:(x,y,c,n)=>burst(g.effects,x,y,c,n)},time:0,seed:seed>>>0,random:rng(seed),ui:ui,selected:null,placing:null,queue:[],spawnWait:0,remaining:0,speed:1,muted:false,upgrades:0};
g.effects.text=(x,y,t,c)=>{g.effects.texts.push({x,y,text:t,color:c,life:1})};g.effects.burst=(x,y,c,n)=>burst(g.effects,x,y,c,n,g.random);g.ui.sound=sound;g.damage=(e,n,src)=>hurt(g,e,n,src);
g.startWave=()=>{if(g.state!=='build')return;g.wave++;g.bestWave=Math.max(g.bestWave||0,g.wave);localStorage.setItem('lkBestWave',String(g.bestWave));g.waveLeaks=0;g.state='wave';g.queue=[];let def=waveDef(g.wave),mult=1+g.wave*.17;for(let group of def)for(let i=0;i<group.count;i++)g.queue.push({kind:group.kind,gap:group.gap,mult:mult*(group.mult||1)});g.remaining=g.queue.length;g.spawnWait=.2;ui.banner(g.wave===4||g.wave===8?'SURGE WAVE '+g.wave+' · THE SKULKS SWARM':'WAVE '+g.wave);sound('wave')};
g.step=dt=>{g.time+=dt;if(g.state==='paused'||g.state==='title'||g.state==='victory'||g.state==='defeat')return;if(g.state==='wave'){g.spawnWait-=dt;if(g.queue.length&&g.spawnWait<=0){let q=g.queue.shift();spawn(g,q.kind,q.mult);g.spawnWait=q.gap}updateEnemies(g,dt);updateTowers(g,dt);updateShots(g,dt);g.remaining=g.queue.length+g.enemies.filter(e=>!e.dead).length;if(!g.queue.length&&!g.enemies.length){if(g.waveLeaks===0)g.wavesCleared++;g.gold+=25+g.wave*8;g.score+=250+g.wave*25;g.earned+=25+g.wave*8;g.state='build';ui.banner('WAVE '+g.wave+' CLEARED  +'+(25+g.wave*8));if(g.wave>=12)g.finish(true)}}else updateFx(g.effects,dt);if(g.lives<=0)g.finish(false)};
g.finish=win=>{if(g.state==='victory'||g.state==='defeat')return;g.state=win?'victory':'defeat';g.remaining=0;g.queue=[];g.enemies=[];g.stars=win?(g.lives>=15?3:g.lives>=8?2:1):0;g.best=Math.max(0,Number(localStorage.getItem('lkBest')||0)||0,g.score+(win?g.lives*40:0));localStorage.setItem('lkBest',String(g.best));ui.end(g,win)};
g.togglePause=()=>{if(g.state==='wave'||g.state==='build')g.state='paused';else if(g.state==='paused')g.state=g.queue.length||g.enemies.length?'wave':'build'};
g.toggleSpeed=()=>g.speed=g.speed===3?1:g.speed+1;g.toggleMute=()=>{g.muted=!g.muted;setMuted(g.muted)};g.upgrade=()=>upgrade(g,g.selected);g.sell=()=>{sell(g,g.selected);g.selected=null};return g}
