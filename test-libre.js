// Uso: node test-libre.js index.html strict  (falla si el modo libre repite sets)
// Simula subidas libres seguidas y mide cuántas veces se repite el mismo par de consignas.
const s=require('fs').readFileSync(process.argv[2],'utf8');
const q0=s.indexOf('var QUESTIONS='),q1=s.indexOf('\n];',q0)+3;
eval(s.slice(q0,q1).replace('var QUESTIONS=','globalThis.QUESTIONS='));
QUESTIONS.forEach((q,i)=>q.id='q'+i);
let store={},clock=1e12;Date.now=()=>(clock+=60000);
const loadJ=(k,d)=>store[k]?JSON.parse(store[k]):d, saveJ=(k,o)=>store[k]=JSON.stringify(o);
const ROUND=7;
const f0=s.indexOf('var memSeen'),f1=s.indexOf('function renderBet');
eval(s.slice(f0,f1));
const pairs={},RUNS=300;let maxRep=0,repeatedSets=0;const sets=new Set();
for(let r=0;r<RUNS;r++){const set=freeSet();markSeen(set);
  if(set.length!==ROUND||new Set(set).size!==ROUND)throw new Error('set inválido '+set);
  const key=[...set].sort((a,b)=>a-b).join(',');if(sets.has(key))repeatedSets++;sets.add(key);
  for(let i=0;i<ROUND;i++)for(let j=i+1;j<ROUND;j++){const k=Math.min(set[i],set[j])+'-'+Math.max(set[i],set[j]);pairs[k]=(pairs[k]||0)+1;maxRep=Math.max(maxRep,pairs[k]);}}
const n=QUESTIONS.length,expected=RUNS*21/(n*(n-1)/2);
console.log(`${RUNS} subidas, ${n} consignas | sets idénticos repetidos: ${repeatedSets} | par más repetido: ${maxRep} veces (azar puro ≈ ${expected.toFixed(1)} de media)`);
process.exit(+(process.argv[3]==='strict'&&(repeatedSets>0||maxRep>10)));
