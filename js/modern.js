/**
 * Opentech - Modern JavaScript
 * Version 2.0 - Refonte complète
 */

// Utility functions
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },

  // Smooth scroll to element
  scrollTo(element, offset = 80) {
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Navigation Management
class Navigation {
  constructor() {
    this.nav = document.querySelector('nav');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.menuSpans = this.mobileMenuBtn?.querySelectorAll('span') || [];
    this.isOpen = false;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // Mobile menu toggle
    this.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu on link clicks
    this.mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.mobileMenu?.contains(e.target) && !this.mobileMenuBtn?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Handle scroll for navbar styling
    window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 10));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
    });
  }

  toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isOpen = true;
    this.mobileMenu?.classList.remove('-translate-y-full', 'opacity-0', 'invisible');
    this.mobileMenu?.classList.add('translate-y-0', 'opacity-100', 'visible');
    
    // Animate hamburger to X
    if (this.menuSpans.length >= 3) {
      this.menuSpans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      this.menuSpans[1].style.opacity = '0';
      this.menuSpans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isOpen = false;
    this.mobileMenu?.classList.add('-translate-y-full', 'opacity-0', 'invisible');
    this.mobileMenu?.classList.remove('translate-y-0', 'opacity-100', 'visible');
    
    // Reset hamburger
    if (this.menuSpans.length >= 3) {
      this.menuSpans[0].style.transform = 'none';
      this.menuSpans[1].style.opacity = '1';
      this.menuSpans[2].style.transform = 'none';
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  handleScroll() {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
      this.nav?.classList.add('backdrop-blur-xl', 'bg-white/98');
      this.nav?.classList.remove('bg-white/95');
    } else {
      this.nav?.classList.remove('backdrop-blur-xl', 'bg-white/98');
      this.nav?.classList.add('bg-white/95');
    }
  }

  handleAnchorClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      Utils.scrollTo(targetElement);
      this.closeMobileMenu();
    }
  }
}

// Testimonials Carousel
class TestimonialsCarousel {
  constructor() {
    this.track = document.getElementById('testimonials-track');
    this.prevBtn = document.getElementById('testimonials-prev');
    this.nextBtn = document.getElementById('testimonials-next');
    this.dots = document.querySelectorAll('.testimonial-dot');
    this.currentSlide = 0;
    this.totalSlides = 6; // Updated to 6 testimonials
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    
    if (this.track) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.startAutoPlay();
    this.updateDots();
  }

  bindEvents() {
    // Previous button
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.restartAutoPlay();
      });
    }

    // Next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.restartAutoPlay();
      });
    }

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.restartAutoPlay();
      });
    });

    // Pause autoplay on hover
    if (this.track) {
      this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    // Touch/swipe support for mobile
    this.addTouchSupport();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlide();
    this.updateDots();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlide();
    this.updateDots();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlide();
    this.updateDots();
  }

  updateSlide() {
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
        dot.classList.remove('bg-slate-300');
        dot.classList.add('bg-primary-600');
      } else {
        dot.classList.remove('active');
        dot.classList.remove('bg-primary-600');
        dot.classList.add('bg-slate-300');
      }
    });
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  addTouchSupport() {
    if (!this.track) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.stopAutoPlay();
    });

    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      const diff = startX - currentX;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      this.startAutoPlay();
    });
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.remove('bg-slate-300');
        dot.classList.add('bg-primary-500');
      } else {
        dot.classList.remove('bg-primary-500');
        dot.classList.add('bg-slate-300');
      }
    });
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Form Management
class FormManager {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    
    if (this.contactForm) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const button = this.contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    button.disabled = true;
    
    try {
      // Simulate form submission (replace with actual API call)
      await this.simulateSubmission();
      
      // Show success state
      button.innerHTML = '<i class="fas fa-check mr-2"></i>Message envoyé !';
      button.classList.remove('from-primary-500', 'to-secondary-500');
      button.classList.add('from-green-500', 'to-green-600');
      
      // Reset form
      this.contactForm.reset();
      
      // Show success notification
      this.showNotification('Votre message a été envoyé avec succès !', 'success');
      
    } catch (error) {
      // Show error state
      button.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Erreur';
      button.classList.remove('from-primary-500', 'to-secondary-500');
      button.classList.add('from-red-500', 'to-red-600');
      
      this.showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
    }
    
    // Reset button after 3 seconds
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.classList.remove('from-green-500', 'to-green-600', 'from-red-500', 'to-red-600');
      button.classList.add('from-primary-500', 'to-secondary-500');
    }, 3000);
  }

  async simulateSubmission() {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }
}

// FAQ Accordion Management
class FAQManager {
  constructor() {
    this.init();
  }

  init() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleFAQ(toggle);
      });
    });
  }

  toggleFAQ(toggle) {
    const targetId = toggle.getAttribute('data-target');
    const content = document.getElementById(targetId);
    const icon = toggle.querySelector('i');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    // Close all other FAQ items
    document.querySelectorAll('.faq-toggle').forEach(otherToggle => {
      if (otherToggle !== toggle) {
        const otherTargetId = otherToggle.getAttribute('data-target');
        const otherContent = document.getElementById(otherTargetId);
        const otherIcon = otherToggle.querySelector('i');
        
        otherToggle.setAttribute('aria-expanded', 'false');
        otherContent.classList.add('hidden');
        otherIcon.style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current FAQ item
    if (isExpanded) {
      toggle.setAttribute('aria-expanded', 'false');
      content.classList.add('hidden');
      icon.style.transform = 'rotate(0deg)';
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      content.classList.remove('hidden');
      icon.style.transform = 'rotate(180deg)';
    }
  }
}

// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          // Unobserve after animation
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements
    this.observeElements();
  }

  observeElements() {
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
      this.observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.group').forEach(card => {
      this.observer.observe(card);
    });
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    if ('performance' in window) {
      this.measurePageLoad();
      this.measureInteractions();
    }
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      this.metrics.pageLoad = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      };
      
      console.log('Performance Metrics:', this.metrics);
    });
  }

  measureInteractions() {
    // Measure form submission time
    document.addEventListener('submit', (e) => {
      const startTime = performance.now();
      e.target.addEventListener('formdata', () => {
        const endTime = performance.now();
        this.metrics.formSubmission = endTime - startTime;
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core components
  new Navigation();
  new TestimonialsCarousel();
  new FormManager();
  new AnimationObserver();
  new FAQManager();
  
  // Initialize performance monitoring in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    new PerformanceMonitor();
  }
  
  // Add loading complete class
  document.body.classList.add('loaded');
  
  console.log('🚀 Opentech website initialized successfully!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navigation,
    TestimonialsCarousel,
    FormManager,
    AnimationObserver,
    FAQManager,
    Utils
  };
}
