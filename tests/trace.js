/* Regresje oznaczeń zdarzeń; uruchom: node tests/trace.js */
const assert=require('assert');global.window=global;require('../js/algorithms.js');
const {HashTable}=HashLab;
function drain(g){return [...g];}
const c=new HashTable('chain');
assert.equal(drain(c.insert(10)).at(-1).line,6);
assert.equal(drain(c.find(99)).at(-1).line,7);
const l=new HashTable('linear');
assert.equal(drain(l.find(99)).at(-1).line,7);
[10,17,24,31].forEach(k=>drain(l.insert(k)));
const rehash=drain(l.insert(38)).filter(e=>e.line===10);
assert(rehash.length===4&&rehash.every(e=>e.vars.newIndex===e.focus.i));
console.log('4/4 regresje zdarzeń PASS');
