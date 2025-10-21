/**
 * Navigation Active State Management with Magnification Effect
 * Handles scroll-based section detection and applies .active class
 * to navigation links based on visible section in viewport
 */

(function() {
  'use strict';

  // Get all navigation links and sections
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // Track current active section
  let currentActiveId = null;

  /**
   * Determine which section is currently most visible in viewport
   * Returns the ID of the section that occupies most viewport space
   */
  function getCurrentSection() {
    let maxVisibleHeight = 0;
    let currentSectionId = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // Track section with maximum visible height
      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        currentSectionId = section.id;
      }
    });

    return currentSectionId;
  }

  /**
   * Update navigation active states based on current section
   * Uses explicit directional classes for smooth, coordinated animations
   */
  function updateActiveNavigation() {
    const activeSectionId = getCurrentSection();

    // Only update if section changed (avoid unnecessary DOM updates)
    if (activeSectionId === currentActiveId) {
      return;
    }

    currentActiveId = activeSectionId;

    // Find the new active link
    const newActiveLink = activeSectionId
      ? document.querySelector(`.nav-link[data-section="${activeSectionId}"]`)
      : null;

    // If no new active link found, remove all state classes
    if (!newActiveLink) {
      navLinks.forEach(link => {
        link.classList.remove('active', 'before-active', 'after-active');
      });
      return;
    }

    // Find index of new active link
    const newActiveIndex = Array.from(navLinks).indexOf(newActiveLink);

    // Add transitioning class to all links for coordinated animation
    navLinks.forEach(link => {
      link.classList.add('nav-transitioning');
    });

    // Apply directional classes explicitly based on position relative to active
    navLinks.forEach((link, index) => {
      // Remove all state classes first
      link.classList.remove('active', 'before-active', 'after-active');

      // Apply new state classes based on position
      if (index < newActiveIndex) {
        link.classList.add('before-active');
      } else if (index > newActiveIndex) {
        link.classList.add('after-active');
      }
    });

    // Add active class to new link after ensuring browser has processed changes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        newActiveLink.classList.add('active');

        // Remove transitioning class after transitions complete (350ms + buffer)
        setTimeout(() => {
          navLinks.forEach(link => {
            link.classList.remove('nav-transitioning');
          });
        }, 400);
      });
    });
  }

  /**
   * Handle smooth scroll to section when navigation link clicked
   */
  function handleNavClick(event) {
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute('data-section');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update URL hash without triggering scroll
      if (history.pushState) {
        history.pushState(null, null, `#${targetId}`);
      }
    }
  }

  /**
   * Initialize navigation behavior
   */
  function init() {
    // Set initial active state
    updateActiveNavigation();

    // Update on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNavigation();
      });
    }, { passive: true });

    // Handle navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Update on resize (section positions may change)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateActiveNavigation();
      }, 150);
    }, { passive: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
