/* =====================================================================
   main.js — navigation, mobile menu, active-link, analytics helpers
   ===================================================================== */
(function () {
  'use strict';

  /* ── Mobile nav toggle ──────────────────────────────────────── */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var open = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close menu after tapping a link
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ── Highlight current page in nav ──────────────────────────── */
  // Normalize a path/href to a canonical key so clean URLs ("/", "/about")
  // and legacy ones ("index.html", "about.html") both resolve the same.
  function pageKey(p) {
    p = (p || '').replace(/^\/+/, '').replace(/\.html$/, '').replace(/\/$/, '');
    return (p === '' || p === 'index') ? 'home' : p;
  }
  var here = pageKey(location.pathname);
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (pageKey(a.getAttribute('href')) === here) {
      a.classList.add('active');
    }
  });

  /* ── Analytics helper: safe event wrapper ───────────────────── */
  // Works whether or not gtag has loaded (queues to dataLayer); never throws.
  window.track = function (name, params) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, params || {});
      }
    } catch (e) { /* analytics must never break the page */ }
  };

  /* ── Automatic outbound + mailto link tracking ──────────────── */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var isExternal = /^https?:\/\//i.test(href) && link.hostname !== location.hostname;
    if (isExternal) {
      window.track('outbound_click', { link_url: href, link_text: (link.textContent || '').trim().slice(0, 80) });
    } else if (/^mailto:/i.test(href)) {
      window.track('contact_click', { method: 'email' });
    }
  }, true);

  /* ── Wavy scroll-driven headline ────────────────────────────── */
  // Builds a long periodic wave path, fills it with repeated text, and
  // drifts the whole thing left as the page scrolls down.
  (function () {
    var arc = document.querySelector('.arc-svg');
    if (!arc) return;
    var path  = arc.querySelector('#arcPath');
    var tp    = arc.querySelector('.arc-text textPath');
    if (!path || !tp) return;

    // Build a smooth sine-like wave well beyond the viewBox on both sides.
    var y = 110, amp = 34, half = 190, x0 = -1000, x1 = 3400;
    var d = 'M ' + x0 + ',' + y, up = true, x = x0;
    while (x < x1) {
      var nx = x + half, cx = x + half / 2, cy = up ? y - amp : y + amp;
      d += ' Q ' + cx + ',' + cy + ' ' + nx + ',' + y;
      up = !up; x = nx;
    }
    path.setAttribute('d', d);

    var phrase = 'Design leader. Creator. Builder. Community maker. ';
    tp.textContent = phrase.repeat(14);

    // The path is static; we move the text ALONG it by shifting startOffset,
    // so letters ride up and over the wave as they travel left on scroll.
    var SPEED = 0.6, ticking = false;
    function update() {
      tp.setAttribute('startOffset', -(window.scrollY * SPEED));
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ── Nav background on scroll ───────────────────────────────── */
  // The nav stays fixed and transparent at the top of the page (over
  // the hero); as soon as the user scrolls, the blurred bg fades in.
  (function () {
    if (!nav) return;
    var navTicking = false;
    function setNavBg() {
      nav.classList.toggle('scrolled', window.scrollY > 24);
      navTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!navTicking) { requestAnimationFrame(setNavBg); navTicking = true; }
    }, { passive: true });
    window.addEventListener('resize', setNavBg, { passive: true });
    setNavBg();
  })();

  /* ── Hero hello pill: text comes from assets/hello.md ───────── */
  (function () {
    var pill = document.querySelector('[data-hello]');
    if (!pill || !window.fetch) return;
    fetch('assets/hello.md', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (md) {
        if (!md) return;
        var line = md
          .replace(/<!--[\s\S]*?-->/g, '')          // strip comments
          .split('\n')
          .map(function (l) { return l.trim(); })
          .filter(function (l) { return l && l.charAt(0) !== '#'; })[0];
        if (line) pill.textContent = line;
      })
      .catch(function () { /* keep the HTML fallback text */ });
  })();

  /* ── Timeline entries fade in as they enter the viewport ────── */
  (function () {
    var groups = document.querySelectorAll('.timeline-group');
    if (!groups.length) return;
    if (!('IntersectionObserver' in window)) {
      groups.forEach(function (g) { g.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('visible', en.isIntersecting);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
    groups.forEach(function (g) { io.observe(g); });
  })();

  /* ── Timeline spine: draw the line as you scroll down ───────── */
  // The central spine (and the 2025 connector) fill from the top down,
  // tracking a reference line near the lower part of the viewport, so the
  // line appears to "draw" itself as the reader scrolls through the timeline.
  (function () {
    var rail = document.querySelector('.timeline-rail');
    if (!rail) return;
    var finale = document.querySelector('.story-finale-year');
    var FINALE_LINE = 56;   // px height of the 2025 connector (see CSS)
    var drawTicking = false;
    function drawUpdate() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var ref = vh * 0.82;                         // the line draws down to here
      var r = rail.getBoundingClientRect();
      var d = (ref - r.top) / r.height;
      rail.style.setProperty('--tl-draw', Math.max(0, Math.min(1, d)).toFixed(4));
      if (finale) {
        var fr = finale.getBoundingClientRect();
        // the connector sits just above the 2025 — start it once the spine is done
        var fd = (ref - (fr.top - 16 - FINALE_LINE)) / FINALE_LINE;
        finale.style.setProperty('--finale-draw', Math.max(0, Math.min(1, fd)).toFixed(4));
      }
      drawTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!drawTicking) { requestAnimationFrame(drawUpdate); drawTicking = true; }
    }, { passive: true });
    window.addEventListener('resize', drawUpdate, { passive: true });
    drawUpdate();
  })();

  /* ── Folder deck: per-card sticky offset ─────────────────────── */
  // Cards pin at 96px below the top — unless a card is taller than the
  // viewport (mobile), in which case it pins once its BOTTOM is 16px above
  // the viewport edge, so all of its content scrolls into view first.
  // Each folder pins PEEK px lower than the previous, so as the deck stacks
  // the earlier folders' rounded tops peek out above the current one.
  (function () {
    var cards = document.querySelectorAll('.card-grid .card');
    if (!cards.length) return;
    var PEEK = 8;   // each folder pins 8px lower so the previous tops peek out
    function setTops() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // One shared base derived from the TALLEST card — so every folder pins at
      // base + i*PEEK (strictly increasing). A per-card base broke the order:
      // a taller card's value dropped below the 96 cap, pinning it higher than
      // its shorter neighbours and popping it out in front.
      var maxH = 0;
      cards.forEach(function (c) { if (c.offsetHeight > maxH) maxH = c.offsetHeight; });
      var base = Math.min(96, vh - maxH - 16);
      cards.forEach(function (c, i) {
        c.style.setProperty('--stick-top', (base + i * PEEK) + 'px');
        c.style.zIndex = String(i + 1);   // later folders always stack in front
      });
    }
    window.addEventListener('resize', setTops, { passive: true });
    window.addEventListener('load', setTops);   // re-measure once images land
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(setTops);
      cards.forEach(function (c) { ro.observe(c); });
    }
    setTops();
  })();

  /* ── Fade in + up on scroll into view ───────────────────────── */
  (function () {
    var els = document.querySelectorAll('[data-reveal-up]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle('in', en.isIntersecting);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ── Community gallery: seamless infinite leftward marquee ──── */
  (function () {
    var strip = document.querySelector('.community-strip');
    if (!strip) return;
    var track = strip.querySelector('.community-track');
    if (!track) return;
    // Respect reduced motion — leave it as a manual horizontal scroller.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var marquee = document.createElement('div');
    marquee.className = 'community-marquee';
    strip.insertBefore(marquee, track);
    marquee.appendChild(track);
    var clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marquee.appendChild(clone);
  })();

  /* ── Parallax headers: pin, then fade as the next content scrolls over ── */
  (function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var items = [].map.call(document.querySelectorAll('.phead-wrap'), function (w) {
      return {
        pin: w.querySelector('.phead'),
        head: w.querySelector('[data-phead]'),
        body: w.querySelector('.phead-body')
      };
    }).filter(function (i) { return i.pin && i.head && i.body; });
    if (!items.length) return;

    var ticking = false;
    function update() {
      ticking = false;
      if (reduce.matches) return;
      items.forEach(function (it) {
        // Measure the (transform-free) sticky wrapper; the inner header carries the transform.
        var r = it.pin.getBoundingClientRect();
        var h = r.height || 1;
        var bodyTop = it.body.getBoundingClientRect().top;
        // 0 while the body sits below the pinned header, 1 once it has scrolled fully over it.
        var fade = Math.max(0, Math.min(1, (r.bottom - bodyTop) / h));
        it.head.style.opacity = (1 - fade).toFixed(3);
        it.head.style.transform = 'translateY(' + (-fade * 36).toFixed(1) + 'px)';
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  /* ── Podcast: fade the grid in, then rows drift horizontally on scroll ─ */
  (function () {
    var section = document.querySelector('.podcast');
    if (!section) return;
    var guests = section.querySelector('[data-podcast-guests]');
    if (!guests) return;
    // Fade the tile grid in when the section scrolls into view (runs for everyone).
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { guests.classList.add('is-in'); io.disconnect(); }
        });
      }, { threshold: 0.15 });
      io.observe(section);
    } else {
      guests.classList.add('is-in');
    }
    // Parallax drift is motion — skip it (but keep the fade) under reduced motion.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var rows = section.querySelectorAll('.podcast-row');
    if (!rows.length) return;
    var ticking = false;
    function update() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // t: -1 entering from below, 0 centered, +1 leaving past the top.
      var center = rect.top + rect.height / 2;
      var t = (vh / 2 - center) / (vh / 2 + rect.height / 2);
      t = Math.max(-1, Math.min(1, t));
      // Whole tile field rises gently as you scroll down (parallax).
      guests.style.transform = 'translate3d(0,' + (t * -28) + 'px,0)';
      // Each row drifts sideways by its own amount/direction (set via data-px).
      rows.forEach(function (row) {
        var px = parseFloat(row.getAttribute('data-px')) || 0;
        row.style.transform = 'translate3d(' + (t * px) + 'px,0,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  /* ── Home: reveal the nav brand only after scrolling past the hero ── */
  (function () {
    if (!document.body.classList.contains('home')) return;
    var hero = document.querySelector('.hero');
    var nav = document.querySelector('.nav');
    if (!hero) return;
    var ticking = false;
    function check() {
      var navH = nav ? nav.offsetHeight : 64;
      document.body.classList.toggle('show-brand', hero.getBoundingClientRect().bottom <= navH);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(check); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check();
  })();

  /* ── Home hero: photo parallax — drifts up slightly faster than scroll ── */
  // As the page scrolls down, lift the whole hero photo (frame + image +
  // decorations) by an extra fraction of scrollY so it rides up a touch faster
  // than the rest of the hero (effective speed 1x + SPEED).
  (function () {
    var photo = document.querySelector('.hero .hero-photo');
    if (!photo) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var SPEED = 0.18; // extra upward speed on top of the normal 1x scroll
    photo.style.willChange = 'transform';
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset || 0;
      if (y > 0) {
        // !important so the parallax overrides the photo's CSS entrance animation,
        // which keeps a transform via animation-fill-mode: both.
        photo.style.setProperty('transform', 'translate3d(0,' + (-y * SPEED).toFixed(1) + 'px,0)', 'important');
      } else {
        // At the very top, drop the override so the entrance animation can play.
        photo.style.removeProperty('transform');
      }
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ── Newsletter popover (home) ──────────────────────────────── */
  (function () {
    var root = document.querySelector('[data-subpop]');
    if (!root) return;
    var panel  = root.querySelector('.subpop-panel');
    var closeB = root.querySelector('[data-subpop-close]');
    var form   = root.querySelector('[data-subpop-form]');
    var input  = form && form.querySelector('input[type="email"]');
    var submit = form && form.querySelector('.subpop-submit');
    var msg    = root.querySelector('[data-subpop-msg]');
    var title  = root.querySelector('.subpop-title');
    var copy   = root.querySelector('.subpop-copy');
    if (!panel || !form || !input) return;

    // Signups POST to the beehiiv-subscribe Cloudflare Worker (free; the site
    // stays on GitHub Pages), which forwards to beehiiv with the secret API key.
    // See /beehiiv-worker. Set this to the Worker URL from `wrangler deploy`:
    //   https://beehiiv-subscribe.<your-subdomain>.workers.dev
    var SUBSCRIBE_ENDPOINT = 'https://beehiiv-subscribe.harrisonwheeler.workers.dev';
    var DISMISS_KEY = 'subpop-dismissed';

    function dismissed() { try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch (e) { return false; } }
    function remember() { try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) {} }
    function isOpen() { return root.classList.contains('is-open'); }
    function open() { root.classList.add('is-open'); }
    function close() { root.classList.remove('is-open'); remember(); }

    // Appear once the user starts scrolling down (after a short delay), unless
    // already dismissed/subscribed.
    if (!dismissed()) {
      var SCROLL_TRIGGER = 150;   // px scrolled down before it arms
      var APPEAR_DELAY = 1000;    // ms after that before the popover opens
      var armed = false;
      var onScrollArm = function () {
        if (armed) return;
        if ((window.scrollY || window.pageYOffset || 0) > SCROLL_TRIGGER) {
          armed = true;
          window.removeEventListener('scroll', onScrollArm);
          setTimeout(function () { if (!dismissed() && !isOpen()) open(); }, APPEAR_DELAY);
        }
      };
      window.addEventListener('scroll', onScrollArm, { passive: true });
    }

    if (closeB) closeB.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(); });

    function setMsg(text, kind) {
      if (!msg) return;
      msg.textContent = text || '';
      msg.className = 'subpop-msg' + (kind ? ' ' + kind : '');
      msg.hidden = !text;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.classList.add('invalid'); input.focus();
        setMsg('Please enter a valid email address.', 'err');
        return;
      }
      input.classList.remove('invalid');
      if (submit) submit.disabled = true;
      setMsg('Subscribing…', '');
      // Real CORS request — the Worker returns JSON, so success/failure is exact.
      fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (data) {
          return { ok: r.ok && data.ok !== false, data: data };
        });
      }).then(function (res) {
        if (res.ok) {
          if (window.track) window.track('newsletter_signup', { method: 'beehiiv' });
          // Swap the card into a confirmation: success text replaces the title/copy,
          // the email field goes away, and Subscribe becomes a Close button.
          if (title) title.textContent = 'Thanks for subscribing!';
          if (copy) copy.textContent = 'Check your inbox to confirm your subscription.';
          input.hidden = true; input.removeAttribute('required');
          setMsg('', '');
          submit.type = 'button';
          submit.disabled = false;
          submit.textContent = 'Close';
          submit.addEventListener('click', close);
          remember();   // don't pop up again once they've signed up
        } else {
          if (submit) submit.disabled = false;
          setMsg('Something went wrong. Please try again.', 'err');
        }
      }).catch(function () {
        if (submit) submit.disabled = false;
        setMsg('Something went wrong. Please try again.', 'err');
      });
    });
  })();

  /* ── Current year in footer ─────────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();


/* ── Hero intro: once the fade-up finishes, drop the animation so the copy's
   scroll parallax (--plx-name) can take back over the transform. ── */
(function () {
  var content = document.querySelector('.hero--stage .hero-stage-content');
  if (!content) return;
  content.addEventListener('animationend', function (e) {
    if (e.animationName === 'hero-content-rise') content.classList.add('intro-played');
  });
})();

/* ── Hero parallax: logo backdrop lags behind the name/copy on scroll ── */
(function () {
  var hero = document.querySelector('.hero--stage');
  var logo = document.querySelector('.hero-logo-bg');
  if (!hero || !logo) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // The hero clips its overflow, so the drifting logo must never cross the
  // hero's bottom edge (it was getting chopped there on phones). Measure the
  // room below the logo and pace the drift so it lands on that edge exactly
  // as the fade completes — full parallax, no cut-off, on any viewport.
  var EDGE = 12;        // breathing room above the hero's clip edge
  var avail = 0, fadeEnd = 1;
  function measure() {
    var heroH = hero.offsetHeight;
    fadeEnd = (window.innerHeight || document.documentElement.clientHeight) * 0.5;
    // logo is centered on its `top` line, so its bottom = offsetTop + half height
    avail = Math.max(0, heroH - (logo.offsetTop + logo.offsetHeight / 2) - EDGE);
  }

  var ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    if (y > hero.offsetHeight) return;   // hero scrolled past — nothing to do
    /* logo (background layer) drifts down within its room; copy rises a little */
    var t = Math.min(1, y / fadeEnd);
    hero.style.setProperty('--plx-logo', (t * avail).toFixed(1) + 'px');
    hero.style.setProperty('--plx-name', (y * -0.35).toFixed(1) + 'px');
    /* dissolve the logo before its drift reaches the hero's edge */
    hero.style.setProperty('--plx-fade', (1 - t).toFixed(3));
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', function () { measure(); update(); }, { passive: true });
  if (logo.complete) { measure(); } else {
    logo.addEventListener('load', function () { measure(); update(); });
    measure();   // provisional numbers until the SVG lands
  }
})();

