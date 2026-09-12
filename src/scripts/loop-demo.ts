import { demo, previewFrames, challenges, cellEdges, solved, feedback } from '../data/loop-demo';
document.querySelectorAll<HTMLElement>('[data-tutorial]').forEach(root=>{
 const ja=root.dataset.lang==='ja',choose=(a:string,b:string)=>ja?a:b;
 const buttons=[...root.querySelectorAll<HTMLButtonElement>('[data-edge]')];
 const next=root.querySelector<HTMLButtonElement>('[data-next]')!,reset=root.querySelector<HTMLButtonElement>('[data-reset]')!;
 const instruction=root.querySelector<HTMLElement>('[data-instruction]')!,progress=root.querySelector<HTMLElement>('[data-progress]')!;
 let mode:'watch'|'play'|'done'='watch',beat=0,round=0,visible=false;
 let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let timer:ReturnType<typeof setTimeout>|undefined;
 const placed=new Set<string>();
 const finalBeat=previewFrames.length-1;
 let demoCelebrated=false;
 const celebrate=()=>{
  root.querySelector('.puzzle-confetti')?.remove();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const layer=document.createElement('div');
  layer.className='puzzle-confetti';layer.setAttribute('aria-hidden','true');
  const board=root.querySelector<HTMLElement>('.tutorial-board')!;
  const width=board.clientWidth,height=board.clientHeight;
  const colors=['#c4a0ff','#76f0c3','#ffdc68','#ff82aa','#82d9ff','#fff4c4'];
  board.append(layer);
  for(let side=0;side<2;side++){
   const originX=width*(side===0?.1:.9),originY=height*.85;
   const burst=document.createElement('span');
   burst.className='confetti-burst';burst.style.left=`${originX}px`;burst.style.top=`${originY}px`;layer.append(burst);
   for(let i=0;i<38;i++){
    const piece=document.createElement('i');
    const ribbon=i%6===0;
    piece.style.cssText=`left:${originX}px;top:${originY}px;width:${ribbon?4:5+Math.random()*4}px;height:${ribbon?22:7+Math.random()*6}px;background:${colors[i%colors.length]};`;
    layer.append(piece);
    const vx=(side===0?1:-1)*width*(.18+Math.random()*.3);
    const vy=-height*(1.1+Math.random()*.9);
    const duration=1250+Math.random()*350,seconds=duration/1000;
    const spin=(Math.random()-.5)*1200,flip=360+Math.random()*720;
    const frames=Array.from({length:31},(_,frame)=>{
     const progress=frame/30,t=progress*seconds;
     // Fast launch followed by a gravity-driven arc, rather than a slow fall.
     const x=vx*t,y=vy*t+height*1.5*t*t;
     return {offset:progress,transform:`translate3d(${x}px,${y}px,0) rotate(${spin*progress}deg) rotateY(${flip*progress}deg)`,opacity:progress<.7?1:Math.max(0,(1-progress)/.3)};
    });
    piece.animate(frames,{duration,delay:Math.random()*45,easing:'linear',fill:'both'});
   }
  }
  setTimeout(()=>layer.remove(),1800);
 };

 const baseLabels=new Map(buttons.map(b=>[b,b.getAttribute('aria-label')!]));
 const stop=()=>{if(timer)clearTimeout(timer);timer=undefined;};
 const draw=()=>{
  const puzzle=mode==='watch'?demo:challenges[round];
  const status=feedback(placed,puzzle.clues);
  root.dataset.mode=mode;
  root.classList.toggle('has-mistake',mode==='play'&&(status.excessCells.size>0||status.branchEdges.size>0));
  const score=root.querySelector<HTMLElement>('[data-score]');
  if(score){score.hidden=mode==='watch';score.textContent=mode==='watch'?'':mode==='done'?'CLEAR':`${status.satisfied} / ${status.total}`;}
  root.classList.toggle('is-complete',mode==='done'||mode==='watch'&&beat===finalBeat);
  root.querySelectorAll<HTMLElement>('[data-clue]').forEach(el=>{
   const [r,c]=el.dataset.clue!.split('-').map(Number),n=puzzle.clues[r][c];el.textContent=String(n??'');
   el.classList.toggle('is-counting',mode==='watch'&&beat<finalBeat&&previewFrames[beat].cell===`${r}-${c}`);
   el.classList.toggle('is-satisfied',n!==null&&cellEdges(r,c).filter(e=>placed.has(e)).length===n);
   el.classList.toggle('is-over',mode==='play'&&status.excessCells.has(`${r}-${c}`));
   if(n!==null){const count=cellEdges(r,c).filter(e=>placed.has(e)).length;el.setAttribute('role','img');el.setAttribute('aria-label',choose(`${r+1}行${c+1}列の${n}：周りに${count}本${count>n?'、線が多すぎます':''}`,`Row ${r+1}, column ${c+1}: clue ${n}, ${count} lines${count>n?', too many lines':''}`));}else{el.removeAttribute('role');el.removeAttribute('aria-label');}
  });
  buttons.forEach(b=>{const e=b.dataset.edge!;const newlyDrawn=mode==='watch'&&previewFrames[beat].edge===e&&b.dataset.state!=='line';b.classList.toggle('is-new-line',newlyDrawn);b.dataset.state=placed.has(e)?'line':'empty';b.disabled=mode!=='play';b.classList.remove('is-fixed');b.setAttribute('aria-pressed',String(placed.has(e)));const invalid=mode==='play'&&(status.excessEdges.has(e)||status.branchEdges.has(e));b.classList.toggle('is-error',invalid);b.setAttribute('aria-label',baseLabels.get(b)!+choose(placed.has(e)?'、線あり':'、線なし',placed.has(e)?', line drawn':', no line')+(invalid?choose('、つながりを見直してください',', check this connection'):''));});
 };
 const schedule=()=>{stop();if(mode==='watch'&&beat<finalBeat&&!paused&&visible&&!document.hidden)timer=setTimeout(()=>{beat++;watch();},beat===1||beat===2?900:2200);};
 const watch=()=>{
  if(beat===0){demoCelebrated=false;root.querySelector('.puzzle-confetti')?.remove();}
  placed.clear();
  previewFrames.slice(0,beat+1).forEach(step=>{if(step.edge)placed.add(step.edge);});
  draw();progress.textContent=beat===finalBeat?choose('つながった。今度は、あなたも。','It connects. Now it’s your turn.'):choose('数字と同じ本数、線を引く。','Match the number with lines.');
  instruction.textContent=choose(previewFrames[beat].ja,previewFrames[beat].en);
  if(beat===finalBeat&&!demoCelebrated){demoCelebrated=true;celebrate();}
  reset.disabled=false;
  reset.textContent=beat===finalBeat?choose('もう一度見る','Watch again'):paused?choose('再生','Play'):choose('一時停止','Pause');next.textContent=choose('一問、遊んでみる','Try a puzzle');schedule();
 };
 const invite=(n:number)=>{
  stop();root.querySelector('.puzzle-confetti')?.remove();round=n;mode='play';placed.clear();buttons.forEach(b=>b.classList.remove('is-target'));draw();
  progress.textContent=n===0?choose('この輪、つくれる？','Can you make this loop?'):choose('じゃあ、これは？','How about this one?');
  instruction.textContent=n===0?choose('0の周りは線なし。隣の2から考えてみよう。','No lines around 0. Start with the neighboring 2s.'):choose('タップで線を引く。もう一度で取り消し。','Tap to draw. Tap again to undo.');
  reset.disabled=false;reset.textContent=choose('やり直す','Reset');next.textContent=choose('ヒント','Hint');
 };
 next.addEventListener('click',()=>{
  if(mode==='watch'){invite(0);return;}
  if(mode==='done'){if(round===0)invite(1);else document.querySelector('#adventure')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
  const wrong=[...placed].find(e=>!challenges[round].solution.includes(e));
  buttons.forEach(b=>b.classList.remove('is-target'));
  const suggested=wrong??challenges[round].solution.find(e=>!placed.has(e));
  buttons.find(b=>b.dataset.edge===suggested)?.classList.add('is-target');
  instruction.textContent=wrong?choose('光っている線を、外してみよう。','Try removing the highlighted line.'):choose('光っている辺に、線を引いてみよう。','Try drawing the highlighted edge.');
 });
 reset.addEventListener('click',()=>{
  if(mode==='watch'){if(beat===finalBeat){beat=0;paused=false;}else paused=!paused;watch();}
  else if(mode==='play'){invite(round);next.focus();}
  else{mode='watch';beat=0;paused=matchMedia('(prefers-reduced-motion: reduce)').matches;watch();}
 });
 buttons.forEach(b=>b.addEventListener('click',()=>{
  if(mode!=='play')return;
  buttons.forEach(b=>b.classList.remove('is-target'));
  const e=b.dataset.edge!;placed.has(e)?placed.delete(e):placed.add(e);
  if(solved(placed,challenges[round].clues)){
   mode='done';draw();celebrate();progress.textContent=choose('できた！すべてが、つながった。','You did it! Everything connects.');
   instruction.textContent=round===0?choose('もう一問、やってみる？','Ready for one more?'):choose('アプリでは、この先にアドベンチャーも。','There’s more to discover in Adventure Mode.');
   next.textContent=round===0?choose('次の一問を見る','See the next puzzle'):choose('アドベンチャーを見る','Discover Adventure');reset.textContent=choose('説明をもう一度','Watch again');next.focus({preventScroll:true});return;
  }
  draw();
  const status=feedback(placed,challenges[round].clues);
  const over=status.excessCells.size>0,branch=status.branchEdges.size>0;
  progress.textContent=over?choose('ここ、少し線が多いみたい。','A few too many lines here.'):branch?choose('線は、枝分かれせずにつなごう。','Keep the loop from branching.'):choose('数字を満たして、ひとつの輪に。','Satisfy the numbers. Close one loop.');
  instruction.textContent=over||branch?choose('赤い部分を見直そう。タップで線を消せるよ。','Check the red connections. Tap a line to remove it.'):choose('タップで線を引く。もう一度で取り消し。','Tap to draw. Tap again to undo.');
 }));
 root.querySelector<HTMLElement>('.tutorial-actions')!.hidden=false;
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&mode==='watch')watch();else stop();},{threshold:.3});observer.observe(root);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else schedule();});
 watch();
});
