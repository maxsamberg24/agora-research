/* Soft cross-fade between pages. Falls back to a normal navigation if anything
   here fails — the fade-in is pure CSS, so the page is never left invisible. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    if (reduce && reduce.matches) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    if (/^(mailto:|tel:|https?:)/i.test(href) && a.origin !== location.origin) return;
    if (a.origin && a.origin !== location.origin) return;
    if (/\.(pdf|zip|jpg|png)$/i.test(href)) return;

    e.preventDefault();
    var url = a.href;
    document.body.classList.add('leaving');
    var went = false;
    var go = function () { if (!went) { went = true; location.href = url; } };
    setTimeout(go, 290);
  }, false);

  /* coming back via the back button must not land on a faded-out page */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.body.classList.remove('leaving');
  });
})();
