const preferenceKey = 'looplogic-language';
const currentLanguage = document.documentElement.lang;
const suggestion = document.querySelector<HTMLElement>('[data-language-suggestion]');

function rememberLanguage(language: string) {
  try {
    localStorage.setItem(preferenceKey, language);
  } catch {
    // Language links still work when browser storage is unavailable.
  }
}

let preferredLanguage;
try {
  const saved = localStorage.getItem(preferenceKey);
  if (saved === 'ja' || saved === 'en') preferredLanguage = saved;
} catch {
  // Fall back to browser preferences without requiring storage access.
}

if (!preferredLanguage) {
  preferredLanguage = (navigator.languages?.length ? navigator.languages : [navigator.language])
    .map(language => language.toLowerCase().split('-')[0])
    .find(language => language === 'ja' || language === 'en') ?? 'en';
}

if (suggestion && preferredLanguage !== currentLanguage) suggestion.hidden = false;

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

document.querySelector('[data-language-dismiss]')?.addEventListener('click', () => {
  rememberLanguage(currentLanguage);
  if (suggestion) suggestion.hidden = true;
  document.querySelector<HTMLAnchorElement>('.header-actions [data-language-choice]')?.focus();
});
