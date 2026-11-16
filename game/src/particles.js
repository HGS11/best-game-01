export function effects(){return{bits:[],texts:[],shake:0}}
export function burst(e,x,y,color,n=12,random=Math.random){for(let i=0;i<n;i++){let a=random()*Math.PI*2,s=30+random()*150;e.bits.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.4+random()*.5,max:.9,color})}}
export function floatText(e,x,y,text,color){e.texts.push({x,y,text,color,life:1})}
export function updateFx(e,dt){for(let p of e.bits){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;p.vx*=.98;p.vy*=.98}e.bits=e.bits.filter(p=>p.life>0);for(let t of e.texts){t.y-=28*dt;t.life-=dt}e.texts=e.texts.filter(t=>t.life>0);for(let m of e.muzzle||[])m.life-=dt;e.muzzle=(e.muzzle||[]).filter(m=>m.life>0);e.shake=Math.max(0,e.shake-dt*20)}
