// Smooth page transitions and mobile menu
(function() {
  'use strict';

  const toggleButton = document.querySelector('.toggle-button');
  const navLinks = document.querySelector('.nav-links');

  // Toggle mobile menu with smooth animation
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('active');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a nav link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
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

  // Smooth fade-out on internal link navigation
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's an external link, fragment link, mailto, or tel
      if (!href || 
          href.startsWith('http') || 
          href.startsWith('#') || 
          href.startsWith('mailto:') ||
          href.startsWith('tel:')) {
        return;
      }

      // Skip if it's the current page
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (href === currentPage) {
        e.preventDefault();
        return;
      }

      // Fade out and navigate
      e.preventDefault();
      document.body.classList.add('fade-out');
      
      setTimeout(() => { 
        window.location.href = this.href; 
      }, 300);
    });
  });

  // Smooth fade-in on page load
  window.addEventListener('load', function() {
    // Small delay to ensure fonts are loaded
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.remove('preload');
      }, 50);
    });
  });

  // Smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

})();