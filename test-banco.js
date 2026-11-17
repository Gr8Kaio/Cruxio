// Uso: node test-banco.js index.html  (duplicados, niveles, consigna de 7 letras y respuestas de muestra)
const s=require('fs').readFileSync(process.argv[2],'utf8');
const a=s.indexOf('var QUESTIONS='),b=s.indexOf('function judge'),e=s.indexOf('\n}',b)+2;
eval(s.slice(a,e).replace('var QUESTIONS=','globalThis.QUESTIONS='));
let bad=0;
QUESTIONS.forEach(q=>{const seen={};q.keys.forEach(k=>{if(seen[k.k]&&seen[k.k]!==k.name){bad++;console.log('DUP',q.q,'|',k.k,':',seen[k.k],'/',k.name);}seen[k.k]=k.name;});
  if(/7 letras/.test(q.q))q.a.forEach(r=>{if(norm(r[1]).includes(' ')||norm(r[1]).length<7){bad++;console.log('CORTO',r[1]);}});
  q.a.forEach(r=>{if(!(r[0]>=0&&r[0]<=5)){bad++;console.log('NIVEL',q.q,r);}});});
const find=p=>QUESTIONS.find(q=>q.q.startsWith(p));
[['Un río de Sudamérica','rio pinto','Pinto'],['Un río de Sudamérica','pinto','Pinto'],['Un río de Sudamérica','cosquin','Cosquín'],['Un río de Sudamérica','rio primero','Suquía'],
 ['Un río de Sudamérica','ctalamochita','Tercero'],['Un barrio de la ciudad de Córdoba','guemes','Güemes'],['Una ciudad o pueblo de la provincia de Córdoba','agua de oro','Agua de Oro'],
 ['Un océano o un mar','mar mediterraneo','Mediterráneo'],['Un océano o un mar','mar chiquita','Mar Chiquita'],['Una isla','malvinas','Malvinas'],
 ['Una bebida con alcohol','fernet con coca','Fernet'],['Un pintor','quinquela','Quinquela Martín'],['Una serie animada','hijitus','Hijitus'],
 ['Una cordillera','sierras chicas','Sierras Chicas'],['Un científico','favaloro','René Favaloro']]
 .forEach(([p,t,want])=>{const h=judge(find(p),t);const ok=h&&h.name===want;if(!ok)bad++;console.log(ok?'ok ':'MAL',p.slice(0,28),'|',t,'->',h&&h.name);});
console.log(bad?'FALLAS: '+bad:'todo ok');process.exit(bad?1:0);
