document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Merci pour votre message ! Nous vous répondrons rapidement.');
      form.reset();
    });
  }
});

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });

  // Fermer le menu quand on clique en dehors
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
      toggleMenu();
    }
  });

  // Fermer le menu avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Gestion du carrousel des témoignages
class TestimonialCarousel {
  constructor() {
    this.track = document.querySelector('.testimonial-track');
    this.slides = document.querySelectorAll('.testimonial-slide');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.dotsContainer = document.querySelector('.carousel-dots');
    
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    
    this.init();
  }
  
  init() {
    // Créer les points de navigation
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
    
    // Ajouter les événements pour les boutons
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Démarrer l'auto-play
    this.startAutoPlay();
  }
  
  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    this.updateDots();
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
    this.goToSlide(this.currentIndex);
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.goToSlide(this.currentIndex);
  }
  
  startAutoPlay() {
    setInterval(() => this.nextSlide(), 5000); // Change de slide toutes les 5 secondes
  }
}

// Initialiser le carrousel
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialCarousel();
}); 