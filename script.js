/* Optional image enlargement. All page content is available without JavaScript. */
(() => {
  const dialog = document.getElementById('image-dialog');
  const image = document.getElementById('dialog-image');
  const title = document.getElementById('dialog-title');
  const close = document.getElementById('close-image');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let opener = null;
  document.querySelectorAll('a[data-image-title]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.getAttribute('href');
      image.alt = link.querySelector('img')?.alt || link.dataset.imageTitle;
      title.textContent = link.dataset.imageTitle;
      dialog.showModal();
      document.body.classList.add('dialog-open');
      close.focus();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    opener?.focus();
  });
})();
