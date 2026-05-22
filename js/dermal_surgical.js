// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 60), { passive: true });

// Scroll reveal
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.up').forEach(el => io.observe(el));

// Animated bars on scroll
const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const bars = e.target.querySelectorAll('.bc-bar[data-target]');
            bars.forEach(b => {
                const t = parseInt(b.dataset.target);
                b.style.width = '0';
                setTimeout(() => { b.style.width = t + '%'; }, 200);
            });
        }
    });
}, { threshold: .3 });
document.querySelectorAll('.result-visual').forEach(el => barIO.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// Active nav on scroll
const secs = document.querySelectorAll('section[id]');
const nlinks = document.querySelectorAll('.nlinks a');
window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
    nlinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
}, { passive: true });