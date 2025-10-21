// Minimal smooth interactions
(function() {
  'use strict';

  const toggleButton = document.querySelector('.toggle-button');
  const navLinks = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('active');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 820) {
          navLinks.classList.remove('active');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 820 && 
          navLinks.classList.contains('active') &&
          !navLinks.contains(e.target) && 
          !toggleButton.contains(e.target)) {
        navLinks.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth page transitions (only fades main content, keeps navbar)
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip external, fragment, mailto, tel links
      if (!href || 
          href.startsWith('http') || 
          href.startsWith('#') || 
          href.startsWith('mailto:') ||
          href.startsWith('tel:')) {
        return;
      }

      // Skip if current page
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (href === currentPage) {
        e.preventDefault();
        return;
      }

      // Fade out main content and navigate
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => { window.location.href = this.href; }, 150);
    });
  });

  // Fade in main content on load
  window.addEventListener('load', function() {
    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 50);
  });

})();