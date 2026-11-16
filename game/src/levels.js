import {TILE,COLS,ROWS} from './config.js';
export const PATH=[[-1,3],[2,3],[2,1],[5,1],[5,5],[8,5],[8,2],[11,2],[11,6],[13,6],[13,4],[14,4]];
export const points=PATH.map(p=>[p[0]*TILE+TILE/2,p[1]*TILE+TILE/2]);
export const keep={x:1160,y:360};
export function pathDistance(x,y){let best=1e9;for(let i=0;i<points.length-1;i++){let a=points[i],b=points[i+1],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));best=Math.min(best,Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t))}return best}
export function buildable(c,r){if(c<0||r<0||c>=COLS||r>=ROWS)return false;let x=c*TILE+TILE/2,y=r*TILE+TILE/2;return pathDistance(x,y)>50&&Math.hypot(x-keep.x,y-keep.y)>82}
export function waveDef(n){if(n===12)return [{kind:'gloomlord',count:1,gap:0},{kind:'husk',count:8,gap:.52},{kind:'wisp',count:8,gap:.46}];if(n===4||n===8)return [{kind:'skulk',count:22,gap:.25,mult:.78}];let size=7+n*2;let list=[];let kinds=n<3?['skulk','husk']:['skulk','husk','wisp'];for(let i=0;i<kinds.length;i++){let count=i===0?Math.ceil(size*.5):Math.floor(size/(kinds.length));if(n>5&&i===2)count+=2;list.push({kind:kinds[i],count,gap:Math.max(.34,.62-n*.018)})}return list}
