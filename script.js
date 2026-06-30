// ===== Pinal Design — shared script =====

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll state
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Portfolio filters (if present)
  const filterBtns = document.querySelectorAll('.tag-pill[data-filter]');
  const workItems = document.querySelectorAll('[data-cat]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      workItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Contact form (demo submit)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message envoyé ✓';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.opacity = '1';
        form.reset();
      }, 2400);
    });
  }

  // FAQ accordion (pricing page)
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});
