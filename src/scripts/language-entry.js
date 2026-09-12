// Only the neutral entry point chooses a language; explicit URLs stay put.
(() => {
  if (window.location.pathname !== '/') return;
  let preferred;
  try {
    const saved = localStorage.getItem('looplogic-language-choice');
    if (saved === 'ja' || saved === 'en') preferred = saved;
  } catch {
    // Browser language detection also works when storage is blocked.
  }
  if (!preferred) {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
    preferred = languages.map(language => language.toLowerCase().split('-')[0])
      .find(language => language === 'ja' || language === 'en') || 'en';
  }
  window.location.replace(`/${preferred}/${window.location.search}${window.location.hash}`);
})();
