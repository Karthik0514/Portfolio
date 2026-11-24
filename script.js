(function () {
    var root = document.documentElement;
    var themeBtn = document.getElementById('themeToggle');

    // Theme
    function setTheme(t) {
        root.setAttribute('data-theme', t);
        themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
        try { localStorage.setItem('theme', t); } catch (e) { }
    }
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) { }
    setTheme(saved || 'dark');
    themeBtn.addEventListener('click', function () {
        setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // Mobile menu
    var menuBtn = document.getElementById('menuBtn');
    var navLinks = document.getElementById('navLinks');
    menuBtn.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open);
        menuBtn.textContent = open ? '✕' : '☰';
    });
    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.textContent = '☰';
        }
    });
    navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('open');
            menuBtn.textContent = '☰';
        }
    });

    // Typing effect
    var roles = ['AI-powered products', 'computer vision systems', 'full-stack web apps', 'LLM-powered tools', 'games in Unity'];
    var typed = document.getElementById('typed');
    var ri = 0, ci = 0, deleting = false;
    function type() {
        var word = roles[ri];
        typed.textContent = word.slice(0, ci);
        if (!deleting && ci < word.length) { ci++; setTimeout(type, 70); }
        else if (!deleting) { deleting = true; setTimeout(type, 1500); }
        else if (ci > 0) { ci--; setTimeout(type, 35); }
        else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); }
    }
    type();

    // Reveal on scroll + count up
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
            if (en.isIntersecting) {
                en.target.classList.add('show');
                en.target.querySelectorAll('[data-count]').forEach(countUp);
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 80 + 'ms';
        io.observe(el);
    });
    function countUp(el) {
        var target = +el.getAttribute('data-count'), n = 0;
        var step = Math.max(1, Math.ceil(target / 30));
        var t = setInterval(function () {
            n = Math.min(target, n + step);
            el.textContent = n + (target > 9 ? '+' : '');
            if (n >= target) clearInterval(t);
        }, 40);
    }

    // Scroll progress + active link
    var progress = document.getElementById('progress');
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var links = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (window.scrollY / h) * 100 + '%';
        var current = '';
        sections.forEach(function (s) {
            if (window.scrollY >= s.offsetTop - 140) current = s.id;
        });
        links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // Cursor glow
    var glow = document.getElementById('cursorGlow');
    window.addEventListener('mousemove', function (e) {
        if (window.matchMedia('(hover: none)').matches) return;
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Card tilt
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.tilt').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = 'perspective(900px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-4px)';
            });
            card.addEventListener('mouseleave', function () { card.style.transform = ''; });
        });
    }

    // Image fallbacks (hide broken images so the gradient/emoji shows)
    var photo = document.querySelector('.profile-photo');
    photo.addEventListener('error', function () { photo.parentElement.classList.add('no-img'); });
    document.querySelectorAll('.ach-img img, .hobby-img img').forEach(function (img) {
        img.addEventListener('error', function () { img.style.display = 'none'; });
    });

    document.getElementById('year').textContent = new Date().getFullYear();
})();
