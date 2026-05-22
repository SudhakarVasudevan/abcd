
// ─── FAQ ACCORDION ───
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── COUNTER ANIMATION ───
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    if (!target) return;
    let start = 0;
    const duration = 1800;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = (target >= 1000 ? current.toLocaleString() : current) + '+';
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ─── FORM SUBMISSION ───
document.querySelectorAll('.btn-form').forEach(btn => {
  btn.addEventListener('click', function() {
    const form = this.closest('.hero-form-card, .appt-form');
    if (!form) return;
    const inputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) { input.style.borderColor = '#e53e3e'; valid = false; }
      else input.style.borderColor = '';
    });
    if (valid) {
      this.textContent = '✓ Request Sent!';
      this.style.background = '#1ac8c8';
      setTimeout(() => {
        this.textContent = 'Send Inquiry →';
        this.style.background = '';
      }, 3000);
    }
  });
});



/* NAV SCROLL */

const mvNav = document.getElementById("mvNav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){
        mvNav.classList.add("mv-nav-solid");
    }else{
        mvNav.classList.remove("mv-nav-solid");
    }

});

/* MOBILE MENU */

const mvToggle = document.getElementById("mvMobileToggle");
const mvMenu = document.getElementById("mvNavMenu");
const mvIcon = mvToggle.querySelector("i");

mvToggle.addEventListener("click", () => {

    mvMenu.classList.toggle("mv-menu-active");
    document.body.classList.toggle("mv-body-lock");

    if(mvMenu.classList.contains("mv-menu-active")){

        mvIcon.classList.remove("fa-bars");
        mvIcon.classList.add("fa-xmark");

    }else{

        mvIcon.classList.remove("fa-xmark");
        mvIcon.classList.add("fa-bars");

    }

});

/* MOBILE DROPDOWN */

document.querySelectorAll(".mv-has-dropdown > .mv-nav-link").forEach((dropdownLink)=>{

    dropdownLink.addEventListener("click", function(e){

        if(window.innerWidth <= 992){

            e.preventDefault();

            const parent = this.parentElement;

            parent.classList.toggle("active");

        }

    });

});
