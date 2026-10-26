/* Rzeczywiste liczniki dla historii porównawczych z karty. */
const fs=require('fs'),path=require('path');global.window=global;require('../js/algorithms.js');const {HashTable}=global.HashLab;
const sets=[
 {name:'Równomiernie rozłożone',keys:[8,16,24,32],find:[24,99],remove:[16]},
 {name:'Kolizje: 10, 17, 24, 31',keys:[10,17,24,31],find:[24,99],remove:[17]}
];
function run(g){let r;do{r=g.next();}while(!r.done);return r.value;}
const report={date:new Date().toISOString(),definition:{inputSize:'4 klucze; następnie 2 wyszukiwania (jedno trafione, jedno nietrafione) i 1 usunięcie',comparisons:'Liczba porównań klucza z aktywnym kluczem w strukturze; EMPTY/DELETED nie są porównaniem kluczy.',visits:'Liczba odwiedzonych węzłów łańcucha lub komórek tablicy w badanych operacjach.',rehash:'Osobna liczba przebudów i przeniesionych aktywnych kluczy; nie sumowana z odwiedzinami operacji.',timing:'Nie raportowano czasu ściennego — liczono operacje elementarne, aby uniknąć szumu środowiska.'},results:[]};
for(const set of sets){const methods={};for(const kind of ['chain','linear']){const t=new HashTable(kind);set.keys.forEach(k=>run(t.insert(k)));set.find.forEach(k=>run(t.find(k)));set.remove.forEach(k=>run(t.remove(k)));methods[kind]={n:t.n,m:t.m,loadFactor:Number((t.n/t.m).toFixed(3)),...t.metrics};}report.results.push({dataset:set.name,keys:set.keys,successfulFind:set.find[0],unsuccessfulFind:set.find[1],removed:set.remove[0],methods});}
fs.writeFileSync(path.join(__dirname,'../results/comparison.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
