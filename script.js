// Mobile menu toggle and page transitions
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.toggle-button');
  const navLinks = document.querySelector('.nav-links');

  // Toggle mobile menu
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('active');
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a nav link (better mobile UX)
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth fade-out on internal link navigation
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's an external link, fragment link, or mailto
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        return;
      }

      // Skip if it's the current page
      if (href === window.location.pathname.split('/').pop()) {
        return;
      }

      // Fade out and navigate
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => { 
        window.location.href = this.href; 
      }, 250);
    });
  });
});

// Fade-in on page load (with slight delay for font loading)
window.addEventListener('load', function() {
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 50);
});