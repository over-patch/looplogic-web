const dialog = document.querySelector<HTMLDialogElement>('.image-dialog');
if (dialog && typeof dialog.showModal === 'function') {
 const image = dialog.querySelector<HTMLImageElement>('img')!;
 let opener: HTMLAnchorElement | null = null;
 document.querySelectorAll<HTMLAnchorElement>('[data-screenshot]').forEach(link => {
  link.addEventListener('click', event => {
   if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   event.preventDefault();
   opener = link;
   image.src = link.href;
   image.alt = link.querySelector('img')?.alt ?? '';
   dialog.showModal();
   document.documentElement.classList.add('image-open');
  });
 });
 dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
 });
 dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('image-open');
  opener?.focus({ preventScroll: true });
 });
}
