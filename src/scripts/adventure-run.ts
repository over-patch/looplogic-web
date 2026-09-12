for (const example of document.querySelectorAll<HTMLElement>('[data-adventure-run]')) {
 const nav = example.querySelector<HTMLElement>('.run-navigation');
 const buttons = [...example.querySelectorAll<HTMLButtonElement>('[data-run-stage]')];
 const panels = [...example.querySelectorAll<HTMLElement>('[data-run-panel]')];
 if (!nav || buttons.length !== panels.length) continue;
 function select(index: number) {
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  panels.forEach((panel,i)=>{ panel.hidden = i!==index; });
 }
 buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
 select(0);
 nav.hidden = false;
}
