const preferenceKey = 'looplogic-language-choice';

function rememberLanguage(language: string) {
  try {
    localStorage.setItem(preferenceKey, language);
  } catch {
    // Language links still work when browser storage is unavailable.
  }
}

document.querySelectorAll<HTMLAnchorElement>('[data-language-choice]').forEach(link => {
  // Carry the current section and query parameters across a language switch.
  function updateDestination() {
    const destination = new URL(link.href);
    destination.search = window.location.search;
    destination.hash = window.location.hash;
    link.href = destination.href;
  }
  updateDestination();
  window.addEventListener('hashchange', updateDestination);
  link.addEventListener('click', () => {
    updateDestination();
    rememberLanguage(link.dataset.languageChoice!);
  });
});

