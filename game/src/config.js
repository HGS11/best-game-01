export const W=1280,H=720,TILE=80,COLS=16,ROWS=9;
export const COLORS={sky:'#111832',grass:'#263653',grass2:'#2b3c57',path:'#64513f',edge:'#a58257',gold:'#f7d98e',amber:'#ffb34f',teal:'#8bd9dd',white:'#f1edda'};
export const TOWERS=[
 {id:'ember',name:'Ember Post',cost:45,range:170,damage:13,rate:.55,color:'#ff9c42',role:'Burns chilled foes for 25% extra'},
 {id:'frost',name:'Frost Lantern',cost:70,range:155,damage:7,rate:.9,color:'#8fe1ea',role:'Slow foes; Ember deals +25%'},
 {id:'arc',name:'Arc Spire',cost:105,range:190,damage:21,rate:1.25,color:'#b4a4ff',role:'Lightning chains to 3'},
 {id:'mortar',name:'Starfall Mortar',cost:135,range:230,damage:48,rate:2.4,color:'#ffe19a',role:'Heavy splash from above'}
];
export const ENEMIES={
 skulk:{name:'Skulk',hp:46,speed:86,reward:8,leak:1,color:'#bd7183',size:16},
 husk:{name:'Husk',hp:145,speed:44,reward:18,leak:2,color:'#b78a60',size:24},
 wisp:{name:'Wisp',hp:82,speed:66,reward:13,leak:1,color:'#7bcbd0',size:20},
 gloomlord:{name:'Gloomlord',hp:2200,speed:27,reward:140,leak:10,color:'#9c68bb',size:50}
};
