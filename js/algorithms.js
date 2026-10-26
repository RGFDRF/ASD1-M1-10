/* Badane algorytmy. Generatory zmieniają stan w trakcie wykonania i emitują zdarzenia dla wizualizacji. */
(function(global){
  const validateKey = value => Number.isInteger(value) && value >= 0 && value <= 999;
  const normalizeAction = (type,key) => ({type,key});
  class HashTable {
    constructor(kind){this.kind=kind;this.m=7;this.n=0;this.order=[];this.buckets=Array.from({length:this.m},()=>[]);this.cells=Array.from({length:this.m},()=>({state:'EMPTY',key:null}));this.metrics={comparisons:0,visits:0,rehashCount:0,rehashMoves:0};this.current=null;}
    hash(key,m=this.m){return key % m;}
    reset(){this.m=7;this.n=0;this.order=[];this.buckets=Array.from({length:7},()=>[]);this.cells=Array.from({length:7},()=>({state:'EMPTY',key:null}));this.metrics={comparisons:0,visits:0,rehashCount:0,rehashMoves:0};this.current=null;}
    activeKeys(){return this.order.slice();}
    *insert(key){
      this.current={type:'insert',key,probe:null,firstDeleted:null,index:this.hash(key)};
      if(!validateKey(key)){yield this.event('Walidacja odrzuciła klucz; stan bez zmian.',1);return {ok:false,reason:'invalid'};}
      if(this.kind==='chain'){
        let home=this.hash(key);this.current.index=home;const before=this.buckets[home];
        for(let j=0;j<before.length;j++){this.current.probe=home;this.metrics.visits++;this.metrics.comparisons++;yield this.event(`Kontrola duplikatu: węzeł ${before[j]} w koszyku ${home}.`,2,{i:home,j});if(before[j]===key){yield this.event('Klucz już istnieje; nie wykonuję przebudowy.',2,{i:home,j});return {ok:false,reason:'duplicate'};}}
        if(this.n>=20){yield this.event('Limit 20 aktywnych kluczy osiągnięty.',2);return {ok:false,reason:'limit'};}
        if((this.n+1)/this.m>.7)yield* this.rebuild();
        home=this.hash(key);this.current.index=home;
        const list=this.buckets[home];let at=0;
        at=list.length;
        list.push(key);this.order.push(key);this.n++;yield this.event(`Dopisuję ${key} na końcu łańcucha ${home}.`,6,{i:home,j:list.length-1});return {ok:true,index:home};
      }
      let home=this.hash(key);this.current.index=home;let firstDeleted=null,empty=null;
      for(let step=0;step<this.m;step++){
        const i=(home+step)%this.m;this.current.probe=i;this.metrics.visits++;this.current.firstDeleted=firstDeleted;
        const cell=this.cells[i];yield this.event(`Kontrola duplikatu: sprawdzam komórkę ${i} (${step+1}/${this.m}).`,3,{i});
        if(cell.state==='OCCUPIED'){this.metrics.comparisons++;yield this.event(`Porównuję ${cell.key} z ${key}.`,4,{i});if(cell.key===key){yield this.event('Duplikat znaleziony; nie wykonuję przebudowy.',2,{i});return {ok:false,reason:'duplicate'};}}
        else if(cell.state==='DELETED'&&firstDeleted===null){firstDeleted=i;this.current.firstDeleted=i;yield this.event(`Zapamiętuję pierwszy DELETED=${i}, ale kontynuuję kontrolę duplikatu.`,5,{i});}
        else if(cell.state==='EMPTY'){empty=i;break;}
      }
      if(this.n>=20){yield this.event('Limit 20 aktywnych kluczy osiągnięty.',2);return {ok:false,reason:'limit'};}
      if(empty===null&&firstDeleted===null){yield this.event('Pełne okrążenie: brak EMPTY i DELETED.',7);return {ok:false,reason:'full'};}
      const mustRebuild=(this.n+1)/this.m>.7;
      if(mustRebuild){yield* this.rebuild();home=this.hash(key);this.current.index=home;firstDeleted=null;this.current.firstDeleted=null;empty=null;
        for(let step=0;step<this.m;step++){const i=(home+step)%this.m;this.current.probe=i;this.metrics.visits++;yield this.event(`Po przebudowie szukam miejsca w ${i} (${step+1}/${this.m}).`,3,{i});if(this.cells[i].state==='EMPTY'){empty=i;break;}}
      }
      const target=firstDeleted!==null?firstDeleted:empty;if(target===null){yield this.event('Pełne okrążenie po przebudowie: brak miejsca.',7);return {ok:false,reason:'full'};}
      this.cells[target]={state:'OCCUPIED',key};this.order.push(key);this.n++;yield this.event(`Wstawiam ${key} do ${target}${firstDeleted!==null?` — wykorzystuję DELETED po sprawdzeniu do EMPTY ${empty??'braku EMPTY'}`:''}.`,6,{i:target});return {ok:true,index:target};
    }
    *find(key){
      this.current={type:'find',key,probe:null,firstDeleted:null,index:this.hash(key)};
      if(!validateKey(key)){yield this.event('Niepoprawny klucz.',1);return {found:false,reason:'invalid'};}
      const home=this.hash(key);this.current.index=home;
      if(this.kind==='chain'){
        const list=this.buckets[home];for(let j=0;j<list.length;j++){this.current.probe=home;this.metrics.visits++;this.metrics.comparisons++;yield this.event(`Szukam w łańcuchu ${home}, węzeł ${j}: ${list[j]}.`,3,{i:home,j});if(list[j]===key)return {found:true,index:home};}
        yield this.event('Koniec łańcucha — klucza nie ma.',7,{i:home});return {found:false};
      }
      for(let step=0;step<this.m;step++){const i=(home+step)%this.m;this.current.probe=i;this.metrics.visits++;const c=this.cells[i];yield this.event(`Sondowanie ${i} (krok ${step+1}/${this.m}).`,3,{i});if(c.state==='EMPTY'){yield this.event('EMPTY kończy poszukiwanie.',7,{i});return {found:false};}if(c.state==='DELETED'){yield this.event('DELETED: kontynuuję sondowanie.',5,{i});continue;}this.metrics.comparisons++;if(c.key===key){yield this.event(`Znaleziono ${key} w komórce ${i}.`,6,{i});return {found:true,index:i};}yield this.event(`${c.key} ≠ ${key}; przechodzę dalej.`,6,{i});}
      yield this.event('Pełne okrążenie — klucza nie ma.',7);return {found:false};
    }
    *remove(key){
      this.current={type:'remove',key,probe:null,firstDeleted:null,index:this.hash(key)};
      if(!validateKey(key)){yield this.event('Niepoprawny klucz.',1);return {removed:false,reason:'invalid'};}
      const result=yield* this.findForRemove(key);
      if(result.index===null){yield this.event('Klucz nie istnieje; niczego nie usuwam.',7);return {removed:false};}
      if(this.kind==='chain'){const list=this.buckets[result.index];list.splice(result.position,1);}
      else this.cells[result.index]={state:'DELETED',key:null};
      this.order=this.order.filter(k=>k!==key);this.n--;yield this.event(this.kind==='chain'?`Usuwam ${key} z łańcucha.`:`Oznaczam komórkę ${result.index} jako DELETED.`,8,{i:result.index});return {removed:true,index:result.index};
    }
    *findForRemove(key){const home=this.hash(key);this.current.index=home;if(this.kind==='chain'){const list=this.buckets[home];for(let j=0;j<list.length;j++){this.current.probe=home;this.metrics.visits++;this.metrics.comparisons++;yield this.event(`Usuwanie: sprawdzam węzeł ${list[j]} w łańcuchu ${home}.`,3,{i:home,j});if(list[j]===key)return {index:home,position:j};}return {index:null};}
      for(let step=0;step<this.m;step++){const i=(home+step)%this.m;this.current.probe=i;this.metrics.visits++;const c=this.cells[i];yield this.event(`Usuwanie: sprawdzam ${i}.`,3,{i});if(c.state==='EMPTY')return {index:null};if(c.state==='DELETED')continue;this.metrics.comparisons++;if(c.key===key)return {index:i};}return {index:null};
    }
    containsFast(key){if(this.kind==='chain')return this.buckets[this.hash(key)].includes(key);for(let s=0;s<this.m;s++){const c=this.cells[(this.hash(key)+s)%this.m];if(c.state==='EMPTY')return false;if(c.state==='OCCUPIED'&&c.key===key)return true;}return false;}
    *rebuild(){const oldM=this.m,keys=this.order.slice(),oldIndices=keys.map(k=>this.kind==='chain'?this.hash(k,oldM):this.cells.findIndex(c=>c.state==='OCCUPIED'&&c.key===k));this.m=2*this.m+1;this.buckets=Array.from({length:this.m},()=>[]);this.cells=Array.from({length:this.m},()=>({state:'EMPTY',key:null}));this.metrics.rehashCount++;this.metrics.rehashMoves+=keys.length;yield this.event(`Przebudowa ${oldM} → ${this.m}; przenoszę ${keys.length} aktywnych kluczy w kolejności dodania.`,9,{oldM,newM:this.m});
      for(let index=0;index<keys.length;index++){const key=keys[index],oldIndex=oldIndices[index],ni=this.hash(key);let placed=ni;if(this.kind==='chain'){this.buckets[ni].push(key);}else{let i=ni;for(let s=0;s<this.m;s++){if(this.cells[i].state==='EMPTY'){this.cells[i]={state:'OCCUPIED',key};placed=i;break;}i=(i+1)%this.m;}}this.current.probe=placed;yield this.event(`Rehash: ${key}, indeks ${oldIndex} → ${placed} (h=${ni}).`,10,{i:placed},{key,oldIndex,newIndex:placed});}
    }
    event(reason,line,focus={},vars={}){return {kind:this.kind,reason,line,focus,vars:{m:this.m,n:this.n,alpha:(this.n/this.m).toFixed(3),...(this.current||{}),...vars},metrics:{...this.metrics}};}
    snapshot(){return {kind:this.kind,m:this.m,n:this.n,order:this.order.slice(),buckets:this.buckets.map(x=>x.slice()),cells:this.cells.map(x=>({...x})),metrics:{...this.metrics},current:this.current&&{...this.current}};}
  }
  global.HashLab={HashTable,validateKey,normalizeAction};
})(window);
