import assert from 'node:assert/strict';
import { demo, challenges, demoStart, demoSteps, cellEdges, solved } from '../src/data/loop-demo.ts';
// Enumerate every simple cycle on the 4x4 vertex graph, independently of supplied answers.
const neighbors=Array.from({length:16},(_,v)=>{
 const r=Math.floor(v/4),c=v%4;
 return [r?v-4:-1,r<3?v+4:-1,c?v-1:-1,c<3?v+1:-1].filter(n=>n>=0);
});
function edge(a,b){const r=Math.floor(a/4),c=a%4,s=Math.floor(b/4),d=b%4;return r===s?`h-${r}-${Math.min(c,d)}`:`v-${Math.min(r,s)}-${c}`;}
const cycles=[];
for(let start=0;start<16;start++){
 const walk=(path,seen)=>{for(const v of neighbors[path.at(-1)]){
  if(v===start&&path.length>=4&&path[1]<path.at(-1))cycles.push(new Set(path.map((a,i)=>edge(a,path[(i+1)%path.length]))));
  else if(v>start&&!seen.has(v))walk([...path,v],new Set([...seen,v]));
 }};walk([start],new Set([start]));
}
assert.equal(cycles.length,213);
for(const p of [demo,...challenges]){
 const matches=cycles.filter(lines=>solved(lines,p.clues));
 assert.equal(matches.length,1,'Clues alone must have exactly one solution');
 assert.deepEqual(matches[0],new Set(p.solution));
}
const all=Array.from(new Set(cycles.flatMap(s=>[...s])));
const state=new Map(all.map(e=>[e,null]));demoStart.forEach(e=>state.set(e,1));
const constraints=[];
for(let r=0;r<3;r++)for(let c=0;c<3;c++)if(demo.clues[r][c]!==null)constraints.push([cellEdges(r,c),demo.clues[r][c]]);
for(let v=0;v<16;v++)constraints.push([neighbors[v].map(n=>edge(v,n)),null]);
function propagate(){
 let changed=true;
 while(changed){changed=false;for(const [es,n] of constraints){
  const yes=es.filter(e=>state.get(e)===1).length,unknown=es.filter(e=>state.get(e)===null);if(!unknown.length)continue;
  let value=null;
  if(n!==null){if(yes===n)value=0;else if(yes+unknown.length===n)value=1;}
  else if(yes===2||(yes===0&&unknown.length===1))value=0;else if(yes===1&&unknown.length===1)value=1;
  if(value!==null)for(const e of unknown){state.set(e,value);changed=true;}
 }}
}
propagate();
const drawn=new Set(demoStart);
for(const step of demoSteps){if(!step.edge)continue;assert.equal(state.get(step.edge),1,'Demo edge must follow from clue counts and vertex rules, without guessing');assert(!drawn.has(step.edge));drawn.add(step.edge);}
assert(solved(drawn,demo.clues));
assert.equal(drawn.size,demoStart.length+demoSteps.filter(s=>s.edge).length);
console.log('PASS: 213 possible loops; all 3 boards unique from clues alone; demo lines follow from constraint propagation; each step adds one line.');

const {feedback}=await import('../src/data/loop-demo.ts');
const grid=[[1,null,null],[null,null,null],[null,null,2]];
const excess=new Set(['h-0-0','v-0-0']);
let status=feedback(excess,grid);
assert.deepEqual([...status.excessCells],['0-0']);
assert.deepEqual(status.excessEdges,excess);
assert.equal(status.satisfied,0);
excess.delete('v-0-0');status=feedback(excess,grid);
assert.equal(status.excessCells.size,0);assert.equal(status.excessEdges.size,0);assert.equal(status.satisfied,1);
status=feedback(new Set(['h-1-0','h-1-1','v-0-1']),Array.from({length:3},()=>[null,null,null]));
assert.equal(status.branchEdges.size,3);assert.equal(status.excessCells.size,0);
status=feedback(new Set(challenges[0].solution),challenges[0].clues);
assert.equal(status.excessEdges.size,0);assert.equal(status.branchEdges.size,0);assert.equal(status.satisfied,status.total);
console.log('PASS: excess cell/edge feedback, recovery after undo, branching and solved-board feedback.');

const {previewFrames}=await import('../src/data/loop-demo.ts');
assert.equal(previewFrames[0].edge,null,'Preview must start with zero drawn lines');
const previewLines=new Set();
for(const frame of previewFrames.slice(1)){assert(frame.edge);assert(!previewLines.has(frame.edge));previewLines.add(frame.edge);}
assert.deepEqual(previewLines,new Set(demo.solution));
assert(solved(previewLines,demo.clues));
console.log('PASS: preview starts empty, adds exactly one new line per frame and completes the solution.');

// The introductory 0-and-2 puzzle must also solve by local deductions from an EMPTY board.
{
 const puzzle=challenges[0];
 assert.deepEqual(puzzle.clues,[[0,2,null],[2,null,1],[null,1,2]]);
 const values=new Map(all.map(e=>[e,null]));
 const rules=[];
 for(let r=0;r<3;r++)for(let c=0;c<3;c++)if(puzzle.clues[r][c]!==null)rules.push([cellEdges(r,c),puzzle.clues[r][c]]);
 for(let v=0;v<16;v++)rules.push([neighbors[v].map(n=>edge(v,n)),null]);
 let changed=true;
 while(changed){changed=false;for(const [es,n] of rules){
  const count=es.filter(e=>values.get(e)===1).length,unknown=es.filter(e=>values.get(e)===null);if(!unknown.length)continue;
  let value=null;
  if(n!==null){if(count===n)value=0;else if(count+unknown.length===n)value=1;}
  else if(count===2||count===0&&unknown.length===1)value=0;else if(count===1&&unknown.length===1)value=1;
  if(value!==null)for(const e of unknown){values.set(e,value);changed=true;}
 }}
 assert(solved(new Set([...values].filter(([,v])=>v===1).map(([e])=>e)),puzzle.clues));
 console.log('PASS: 0-and-2 puzzle solves from empty using clue counts and vertex rules, without guessing.');
}
