import {TOWERS} from './config.js';
import {fireProjectile} from './projectiles.js';
import {buildable} from './levels.js';
export function place(g,kind,c,r){let d=TOWERS.find(x=>x.id===kind);if(!d||g.gold<d.cost||!buildable(c,r)||g.towers.some(t=>t.c===c&&t.r===r)){g.ui.sound('error');return false}g.gold-=d.cost;g.towers.push({kind,c,r,x:c*80+40,y:r*80+40,level:1,damage:d.damage,range:d.range,rate:d.rate,cool:0,color:d.color,recoil:0});g.ui.sound('place');return true}
export function updateTowers(g,dt){for(let t of g.towers){t.cool-=dt;t.recoil=Math.max(0,t.recoil-dt*5);if(t.cool>0)continue;let best=null,bestProg=-1;for(let e of g.enemies){if(e.dead)continue;let d=Math.hypot(e.x-t.x,e.y-t.y);if(d<=t.range&&e.segment*10000+e.progress>bestProg){best=e;bestProg=e.segment*10000+e.progress}}if(best){fireProjectile(g,t,best);t.cool=t.rate/(1+(t.level-1)*.1);t.recoil=1;g.effects.muzzle.push({x:t.x,y:t.y,life:.14,color:t.color});g.ui.sound('fire')}}}
export function upgradeCost(t){return Math.round(TOWERS.find(d=>d.id===t.kind).cost*(t.level===1?.62:.9))}
export function upgrade(g,t){if(!t||t.level>=3||g.gold<upgradeCost(t))return false;g.gold-=upgradeCost(t);t.level++;t.damage*=1.62;t.range+=18;t.rate*=.91;g.ui.sound('upgrade');return true}
export function sell(g,t){if(!t)return;g.gold+=Math.floor(TOWERS.find(d=>d.id===t.kind).cost*t.level*.7);g.towers=g.towers.filter(x=>x!==t);g.ui.sound('sell')}
