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
export const demo=puzzle([[0,0],[1,0],[1,1],[3,1],[3,3],[0,3],[0,0]],[],[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]);
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

// Start partway through: these lines are already established, not guessed during the demo.
export const demoStart = ['h-0-0','v-0-0','v-1-0'];
export const demoSteps = [
 { edge: null, cell: '1-0', ja: '途中の盤面から見てみましょう。左中央の「1」は、左の線でもう満たされています。', en: 'Start from a partly solved board. The middle-left 1 already has its line on the left.' },
 { edge: 'v-0-1', cell: '0-0', ja: 'その「1」の上には引けません。だから左上の「3」の残り1本は、右の辺です。', en: 'We cannot draw above that 1. So the top-left 3 must get its third line on the right.' },
 { edge: 'h-1-1', cell: '0-1', ja: '線の端をつなぎます。「3」は満たされているので、右へ伸ばします。', en: 'Continue the open end. The 3 is satisfied, so the line extends to the right.' },
 { edge: 'h-1-2', cell: '1-1', ja: '中央の「1」も満たされました。下に曲がれないので、さらに右へ。', en: 'The central 1 is satisfied too. The line cannot turn down, so continue right.' },
 { edge: 'v-1-3', cell: '0-2', ja: '右上の「1」も満たされています。今度は下へつなぎます。', en: 'The top-right 1 is satisfied. Now continue downward.' },
 { edge: 'v-2-3', cell: '1-2', ja: '右中央の「2」が満たされました。線を途切れさせず、下へ。', en: 'The middle-right 2 is satisfied. Keep the line connected by going down.' },
 { edge: 'h-3-2', cell: '2-2', ja: '盤面の角で左に曲がり、右下の「2」を満たします。', en: 'Turn left at the corner to satisfy the bottom-right 2.' },
 { edge: 'h-3-1', cell: '2-2', ja: '右下の「2」は満たされています。上には曲がれないので、左へ。', en: 'The bottom-right 2 is satisfied. We cannot turn up, so continue left.' },
 { edge: 'h-3-0', cell: '2-1', ja: '下中央の「1」が満たされました。さらに左へ。', en: 'The bottom-middle 1 is satisfied. Continue left.' },
 { edge: 'v-2-0', cell: '2-0', ja: '最後の1本で、すべての数字を満たすひとつの輪が完成。', en: 'One last line completes a single loop and satisfies every number.' },
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

// The marketing preview starts empty and draws the complete loop, one edge per frame.
export const previewFrames = [
 {edge: null as string|null, cell: ''},
 ...demo.solution.map(edge=>{
  let cell='';
  for(let r=0;r<3;r++)for(let c=0;c<3;c++)if(!cell&&demo.clues[r][c]!==null&&cellEdges(r,c).includes(edge))cell=`${r}-${c}`;
  return {edge,cell};
 })
];
