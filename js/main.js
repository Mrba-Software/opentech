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

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  // Sélection des éléments
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  // Gestion du menu mobile
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Fermer le menu quand on clique en dehors
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });

  // Fermer le menu quand on redimensionne la fenêtre
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
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