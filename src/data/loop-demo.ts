export type Grid = (number | null)[][];
export function pathEdges(points: number[][]) {
 const edges:string[]=[];
 for(let i=1;i<points.length;i++){
  const [x,y]=points[i-1],[ex,ey]=points[i];const dx=Math.sign(ex-x),dy=Math.sign(ey-y);
  for(let n=0;n<Math.abs(ex-x)+Math.abs(ey-y);n++){
   const a=x+dx*n,b=y+dy*n;
   edges.push(dx?`h-${b}-${Math.min(a,a+dx)}`:`v-${Math.min(b,b+dy)}-${a}`);
  }
 }
 return edges;
}
export const cellEdges=(r:number,c:number)=>[`h-${r}-${c}`,`h-${r+1}-${c}`,`v-${r}-${c}`,`v-${r}-${c+1}`];
function puzzle(points:number[][],missing:string[],shown:number[][]){
 const solution=pathEdges(points),set=new Set(solution);
 const clues:Grid=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>shown.some(([y,x])=>y===r&&x===c)?cellEdges(r,c).filter(e=>set.has(e)).length:null));
 return {solution,clues,fixed:solution.filter(e=>!missing.includes(e)),missing};
}
// Three purpose-built website examples. These are not claimed to be app screenshots or stages.
export const demo=puzzle([[1,1],[0,1],[0,2],[1,2],[1,3],[3,3],[3,0],[1,0],[1,1]],[],[[0,1],[1,0],[1,1],[1,2],[2,0]]);
export const challenges=[
 puzzle([[2,0],[3,0],[3,3],[0,3],[0,2],[1,2],[1,1],[2,1],[2,0]],[],[[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]),
 puzzle([[0,0],[3,0],[3,3],[2,3],[2,1],[1,1],[1,3],[0,3],[0,0]],['v-2-2','v-1-2','h-1-1','v-1-1'],[[0,1],[1,0],[1,1],[1,2],[2,0],[2,2]])
];
export function solved(lines: Set<string>, grid:Grid) {
 if(!lines.size)return false;
 for(let r=0;r<3;r++)for(let c=0;c<3;c++)if(grid[r][c]!==null&&cellEdges(r,c).filter(e=>lines.has(e)).length!==grid[r][c])return false;
 const graph=new Map<string,string[]>();
 for(const key of lines){
  if(!/^[hv]-[0-3]-[0-3]$/.test(key))return false;
  const [d,rs,cs]=key.split('-'),r=+rs,c=+cs;if(d==='h'?c>2:r>2)return false;
  const a=`${r},${c}`,b=d==='h'?`${r},${c+1}`:`${r+1},${c}`;
  for(const [u,v] of [[a,b],[b,a]])graph.set(u,[...(graph.get(u)??[]),v]);
 }
 if([...graph.values()].some(v=>v.length!==2))return false;
 const seen=new Set<string>(),queue=[graph.keys().next().value!];
 while(queue.length){const u=queue.pop()!;if(seen.has(u))continue;seen.add(u);queue.push(...graph.get(u)!);}
 return seen.size===graph.size;
}

// Start empty. The adjacent 3 and 0 establish the first three lines.
export const demoStart: string[] = [];
export const demoSteps = [
 { edge: null, cell: '1-1', ja: '「0」の周りには、線を引きません。', en: 'No lines go around the 0.' },
 { edge: 'h-1-0', cell: '1-0', ja: '隣の「3」は、0と接しない上・左・下に3本。', en: 'The neighboring 3 needs its top, left and bottom edges.' },
 { edge: 'v-1-0', cell: '1-0', ja: '隣の「3」は、0と接しない上・左・下に3本。', en: 'The neighboring 3 needs its top, left and bottom edges.' },
 { edge: 'h-2-0', cell: '1-0', ja: 'これで「3」の周りに、3本そろいました。', en: 'All three lines around the 3 are in place.' },
 { edge: 'v-2-1', cell: '1-1', ja: '下の線の端は、0を避けて下へつなぎます。', en: 'Extend the lower end downward, away from the 0.' },
 { edge: 'h-3-1', cell: '2-0', ja: '左下の「2」は上と右で2本。下端は右へ。', en: 'The lower-left 2 has its top and right lines. Continue right.' },
 { edge: 'v-0-1', cell: '1-1', ja: '上の線の端も、0を避けて上へつなぎます。', en: 'Extend the upper end upward, away from the 0.' },
 { edge: 'h-0-1', cell: '0-1', ja: '左へ進むと3の角で枝分かれするので、右へ。', en: 'Going left would branch at the 3. Turn right.' },
 { edge: 'h-0-2', cell: '0-1', ja: '上の「2」も2本そろったので、さらに右へ。', en: 'The upper 2 has both lines. Keep going right.' },
 { edge: 'v-0-3', cell: '0-1', ja: '右上の角で、下へ曲がります。', en: 'Turn downward at the top-right corner.' },
 { edge: 'v-1-3', cell: '1-2', ja: '左へ曲がると0か上の2に触れるので、下へ。', en: 'Turning left would reach the 0 or the satisfied 2. Go down.' },
 { edge: 'v-2-3', cell: '1-2', ja: '右の「1」もそろったので、そのまま下へ。', en: 'The right-hand 1 has its line. Continue downward.' },
 { edge: 'h-3-2', cell: '1-2', ja: '全部の数字を満たして、ひとつの輪に。', en: 'Satisfy every number. Make one loop.' },
];

export function feedback(lines:Set<string>, grid:Grid) {
 const excessCells=new Set<string>(),excessEdges=new Set<string>(),branchEdges=new Set<string>();
 let satisfied=0,total=0;
 for(let r=0;r<3;r++)for(let c=0;c<3;c++){
  const n=grid[r][c];if(n===null)continue;total++;
  const surrounding=cellEdges(r,c).filter(e=>lines.has(e));
  if(surrounding.length===n)satisfied++;
  if(surrounding.length>n){excessCells.add(`${r}-${c}`);surrounding.forEach(e=>excessEdges.add(e));}
 }
 for(let r=0;r<4;r++)for(let c=0;c<4;c++){
  const incident=[`h-${r}-${c-1}`,`h-${r}-${c}`,`v-${r-1}-${c}`,`v-${r}-${c}`].filter(e=>lines.has(e));
  if(incident.length>2)incident.forEach(e=>branchEdges.add(e));
 }
 return {excessCells,excessEdges,branchEdges,satisfied,total};
}

// Playback and deduction checks share the same explicit drawing order.
export const previewFrames = demoSteps;
