/* Theme toggle + loading screen condiviso per tutte le pagine */
(function() {
    var saved = localStorage.getItem('theme');
    var theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    function updateIcon(t) {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        var icon = btn.querySelector('i');
        if (icon) icon.className = t === 'dark' ? 'nf nf-fa-sun' : t === 'light' ? 'nf nf-fa-moon' : 'nf nf-fa-terminal';
    }
    updateIcon(theme);

    window.toggleTheme = function() {
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = cur === 'dark' ? 'light' : cur === 'light' ? 'brutal' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        updateIcon(next);
        localStorage.setItem('theme', next);
    };

    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('themeToggle');
        if (btn) btn.addEventListener('click', window.toggleTheme);
    });

    var screen = document.getElementById('loadingScreen');
    if (screen) {
        var spinner = document.getElementById('spinner');
        var chars = ['\\', '|', '/', '-'];
        var i = 0;
        var start = performance.now();
        var interval = setInterval(function() { if (spinner) spinner.textContent = chars[i++ % 4]; }, 100);
        function hide() {
            clearInterval(interval);
            var elapsed = performance.now() - start;
            setTimeout(function() { screen.remove(); }, Math.max(0, 200 - elapsed));
        }
        if (document.readyState === 'complete') hide();
        else window.addEventListener('load', hide);
    }
})();
