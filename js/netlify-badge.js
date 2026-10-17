// Rimuove il badge "Powered by Netlify" che Netlify inietta in produzione.
// Lo script HUD (/.netlify/scripts/hud) monta un iframe #nl-badge-frame in
// basso a destra dopo il caricamento: non fa parte del nostro markup e sul
// piano gratuito spesso non esiste il toggle per disattivarlo.
// Le regole CSS in main.css lo nascondono; qui lo eliminiamo dal DOM appena
// appare (anche se iniettato dopo), così non resta spazio morto.
(function () {
    var SELECTORS = [
        '#nl-badge-frame',
        '.nl-badge',
        'iframe[src*="/.netlify/"]',
        'a[href*="netlify.com"]',
    ].join(',');

    function remove() {
        var nodes = document.querySelectorAll(SELECTORS);
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].remove();
        }
    }

    remove();

    // L'iframe compare DOPO il parsing: osserviamo il DOM e lo rimuoviamo
    // appena viene iniettato.
    if (typeof MutationObserver !== 'undefined') {
        var obs = new MutationObserver(remove);
        obs.observe(document.documentElement, { childList: true, subtree: true });
    }
})();
