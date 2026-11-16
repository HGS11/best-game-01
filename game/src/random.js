export function rng(seed){let s=(seed>>>0)||1;return function(){s=(s+0x6D2B79F5)|0;let t=Math.imul(s^(s>>>15),1|s);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296}}
export function pick(random,list){return list[Math.floor(random()*list.length)]}
