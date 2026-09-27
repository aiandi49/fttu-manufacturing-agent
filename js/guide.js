/* F.T.T.U Manufacturing Playbook — renders guide.html from js/data.js. */
(function () {
  var M = window.FTTU_MFG;
  if (!M) return;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function onActivate(el, fn) {
    el.addEventListener('click', fn);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } });
  }
  var FITLABEL = { yes: 'Offered', maybe: 'Confirm first', no: 'Not offered' };
  var items = M.PRODUCTS.map(function (p) {
    return { src: p.breakdown, title: 'F.T.T.U ' + p.label + ' \u2014 every part', caption: 'AI concept render', alt: 'Exploded view of the F.T.T.U ' + p.label.toLowerCase() + ', AI concept render' };
  });

  /* hero + DIY */
  $('heroImg').src = M.product('sneakers').breakdown;
  onActivate($('heroFig'), function () { Lightbox.open(items, 0); });
  $('diyText').textContent = M.DIY;

  /* the three ways, 5 W's each */
  $('ways').innerHTML = M.ROUTES.map(function (r, i) {
    var links = r.partners.map(M.partner).map(function (p) { return '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.name) + '</a>'; }).join('');
    return '<article class="way"><span class="way-num">Way ' + (i + 1) + '</span><h3>' + esc(r.name) + '</h3><p class="one">' + esc(r.oneLine) + '</p><dl class="ws5">' +
      '<div><dt>Who</dt><dd>' + esc(r.w.who) + '</dd></div>' +
      '<div><dt>What</dt><dd>' + esc(r.w.what) + '</dd></div>' +
      '<div><dt>When</dt><dd>' + esc(r.w.when) + '</dd></div>' +
      '<div><dt>Where</dt><dd>' + esc(r.w.where) + '</dd></div>' +
      '<div><dt>Why</dt><dd>' + esc(r.w.why) + '</dd></div>' +
      '<div class="money"><dt>The money</dt><dd>' + esc(r.money) + '</dd></div>' +
      '<div class="catch"><dt>The catch</dt><dd>' + esc(r.catch) + '</dd></div>' +
      '</dl><div class="way-links">' + links + '</div></article>';
  }).join('');

  /* side-by-side glance */
  var rows = [['Up front', 'upfront'], ['Speed', 'speed'], ['How close to your design', 'closeness'], ['Risk', 'risk']];
  $('glance').innerHTML = '<thead><tr><th scope="col"><span class="sr-only">Way</span></th>' + rows.map(function (r) { return '<th scope="col">' + esc(r[0]) + '</th>'; }).join('') + '</tr></thead><tbody>' +
    M.ROUTES.map(function (r) {
      return '<tr><th scope="row">' + esc(r.short) + '</th>' + rows.map(function (c) { return '<td data-l="' + esc(c[0]) + '">' + esc(r[c[1]]) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';

  /* every product, three ways */
  $('matrix').innerHTML = '<thead><tr><th scope="col">Product</th>' + M.ROUTES.map(function (r) { return '<th scope="col">' + esc(r.short) + '</th>'; }).join('') + '</tr></thead><tbody>' +
    M.PRODUCTS.map(function (p) {
      return '<tr><th scope="row">' + esc(p.label) + '</th>' + M.ROUTES.map(function (r) {
        var f = p.fit[r.key];
        return '<td data-l="' + esc(r.short) + '"><span class="fitb ' + f[0] + '">' + FITLABEL[f[0]] + '</span><span class="fit-text">' + esc(f[1]) + '</span></td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody>';

  /* parts explorer */
  var current = 0, tabs = $('tabs');
  tabs.innerHTML = M.PRODUCTS.map(function (p, i) {
    return '<button class="tab" type="button" role="tab" id="tab-' + p.key + '" aria-controls="explorer" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' + esc(p.label) + '</button>';
  }).join('');
  function showPart(i, focus) {
    current = i;
    var p = M.PRODUCTS[i], btns = tabs.querySelectorAll('.tab');
    for (var k = 0; k < btns.length; k++) { btns[k].setAttribute('aria-selected', String(k === i)); btns[k].tabIndex = k === i ? 0 : -1; }
    if (focus) btns[i].focus();
    $('explorer').setAttribute('aria-labelledby', 'tab-' + p.key);
    $('partImg').src = p.breakdown; $('partImg').alt = items[i].alt;
    $('partCap').textContent = 'The ' + p.label.toLowerCase() + ', taken apart';
    $('partTitle').textContent = p.label + ' \u2014 ' + p.components.length + ' parts';
    $('partBuild').textContent = p.build;
    $('fitStrip').innerHTML = M.ROUTES.map(function (r) {
      var f = p.fit[r.key];
      return '<div><b>' + esc(r.short) + '</b><span class="fitb ' + f[0] + '">' + FITLABEL[f[0]] + '</span><span class="fit-text">' + esc(f[1]) + '</span></div>';
    }).join('');
    $('partRows').innerHTML = p.components.map(function (c) {
      return '<tr><td>' + esc(c[0]) + '</td><td data-l="Material">' + esc(c[1]) + '</td><td data-l="Made by">' + esc(c[2]) + '</td><td class="note">' + esc(c[3]) + '</td></tr>';
    }).join('');
    var flags = M.RULES.filter(function (r) { return r.applies !== 'all' && r.applies.indexOf(p.key) > -1; }).map(function (r) { return '<p class="flag"><strong>' + esc(r.title) + '.</strong> ' + esc(r.body) + '</p>'; });
    if (p.sourcing) flags.unshift('<p class="flag"><strong>Who makes it.</strong> ' + esc(p.sourcing) + '</p>');
    $('partFlags').innerHTML = flags.join('');
  }
  tabs.addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (b) showPart(+b.dataset.i); });
  tabs.addEventListener('keydown', function (e) {
    var n = M.PRODUCTS.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); showPart((current + 1) % n, true); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); showPart((current - 1 + n) % n, true); }
    else if (e.key === 'Home') { e.preventDefault(); showPart(0, true); }
    else if (e.key === 'End') { e.preventDefault(); showPart(n - 1, true); }
  });
  onActivate($('partFig'), function () { Lightbox.open(items, current); });
  showPart(0);

  /* helpers */
  $('helpers').innerHTML = M.PARTNERS.filter(function (p) { return p.route === 'help'; }).map(function (p) {
    return '<article class="partner"><h4><a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.name) + '</a></h4><p>' + esc(p.what) + '</p>' +
      '<p class="ok"><strong>Confirmed:</strong> ' + esc(p.checked) + '</p><p class="unk"><strong>Not confirmed:</strong> ' + esc(p.caveat) + '</p></article>';
  }).join('');

  /* path */
  $('stageList').innerHTML = M.STAGES.map(function (s) {
    return '<li class="stage"><h3>' + esc(s.title) + '</h3><p class="st-route">' + esc(M.route(s.route).short) + '</p><p>' + esc(s.body) + '</p></li>';
  }).join('');

  /* rules */
  $('ruleList').innerHTML = M.RULES.map(function (r) { return '<article class="rule' + (r.key === 'sample' ? ' lead' : '') + '"><h3>' + esc(r.title) + '</h3><p>' + esc(r.body) + '</p></article>'; }).join('');

  /* videos */
  $('videoList').innerHTML = M.VIDEOS.map(function (v, i) {
    return '<li class="video' + (i === 0 ? ' lead' : '') + '"><a href="' + esc(v.url) + '" target="_blank" rel="noopener"><span class="play" aria-hidden="true"></span><div><h3>' + esc(v.title) + '</h3><span class="who">' + esc(v.who) + ', ' + esc(v.year) + ' \u2014 ' + esc(M.route(v.route).short) + ' route</span><p>' + esc(v.why) + '</p></div></a></li>';
  }).join('');
})();
