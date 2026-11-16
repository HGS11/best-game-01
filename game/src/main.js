import {createGame} from './game.js';
import {createUI} from './ui.js';
import {wireInput} from './input.js';
import {draw} from './render.js';
import {shotMode,setupShot} from './shots.js';
import {updateFx} from './particles.js';
const canvas=document.getElementById('board'),ctx=canvas.getContext('2d'),ui=createUI(),shot=shotMode(),seed=shot?shot.seed:Math.floor(Math.random()*4294967295),g=createGame(ui,seed);
g.effects.alarm=false;g.best=Math.max(0,Number(localStorage.getItem('lkBest')||0)||0);g.bestWave=Math.max(0,Number(localStorage.getItem('lkBestWave')||0)||0);
let mouse=wireInput(g,canvas,ui);
if(shot){g.ui.sound=()=>{};setupShot(g,shot.scene)}else ui.title(g.best,()=>{let d=ui.difficulty;g.gold=d==='Story'?220:d==='Hard'?115:160;g.lives=d==='Story'?26:d==='Hard'?14:20;g.state='build';ui.start()},g.bestWave);
if(shot){for(let i=0;i<150;i++){g.step(1/60);updateFx(g.effects,1/60)}}
let acc=0,last=0,step=1/60;
function frame(now){let dt=Math.min(.1,(now-last)/1000||0);last=now;if(!shot){acc+=dt*g.speed;while(acc>=step){g.step(step);updateFx(g.effects,step);acc-=step}}draw(ctx,g,mouse);ui.refresh(g);if(shot)window.__shotReady=true;requestAnimationFrame(frame)}
requestAnimationFrame(frame);
