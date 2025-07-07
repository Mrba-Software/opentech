/**
 * Navigation Loader - Simple Version
 * Charge la navigation dans #navbar-placeholder
 */

// Fonction pour charger la navigation
async function loadNavigation() {
    try {
        // Récupérer le placeholder
        const placeholder = document.getElementById('navbar-placeholder');
        if (!placeholder) {
            console.warn('Placeholder #navbar-placeholder non trouvé');
            return;
        }

        // Charger le contenu de la navigation
        const response = await fetch('composants/nav-bar.html');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const html = await response.text();
        
        // Insérer le HTML dans le placeholder
        placeholder.innerHTML = html;
        
        // Définir la page active
        setActivePage();
        
        // Initialiser le menu mobile
        initMobileMenu();
        
        console.log('✅ Navigation chargée avec succès');
        
    } catch (error) {
        console.error('❌ Erreur lors du chargement de la navigation:', error);
        
        // Fallback en cas d'erreur
        const placeholder = document.getElementById('navbar-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="fixed top-0 w-full bg-red-50 border-b border-red-200 z-50 p-4 text-center">
                    <span class="text-red-800 font-medium">Erreur de chargement de la navigation</span>
                </div>
            `;
        }
    }
}

/**
 * footer Loader - Simple Version
 * Charge le footer dans #footer-placeholder
 */

// Fonction pour charger le footer
async function loadFooter() {
    try {
        // Récupérer le placeholder
        const placeholder = document.getElementById('footer-placeholder');
        if (!placeholder) {
            console.warn('Placeholder #footer-placeholder non trouvé');
            return;
        }

        // Charger le contenu du footer
        const response = await fetch('composants/footer.html');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const html = await response.text();
        // Insérer le HTML dans le placeholder
        placeholder.innerHTML = html;
        console.log('✅ Footer chargé avec succès');
    } catch (error) {
        console.error('❌ Erreur lors du chargement du footer:', error);
        // Fallback en cas d'erreur
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="w-full bg-red-50 border-t border-red-200 z-50 p-4 text-center">
                    <span class="text-red-800 font-medium">Erreur de chargement du footer</span>
                </div>
            `;
        }
    }
}

// Fonction pour définir la page active
function setActivePage() {
    // Déterminer la page active depuis l'URL
    const path = window.location.pathname;
    const filename = path.split('/').pop().toLowerCase();
    
    let activePage = 'home';
    switch(filename) {
        case 'index.html':
        case '':
            activePage = 'home';
            break;
        case 'about.html':
            activePage = 'about';
            break;
        case 'services.html':
            activePage = 'services';
            break;
        case 'programmes.html':
            activePage = 'programmes';
            break;
        case 'projects.html':
            activePage = 'projects';
            break;
        case 'contact.html':
            activePage = 'contact';
            break;
        case 'parrainage.html':
            activePage = 'parrainage';
            break;
    }
    
    // Définir l'attribut sur le body
    document.body.setAttribute('data-active-page', activePage);
    
    // Mettre à jour les liens de navigation
    updateNavigationState(activePage);
    
    console.log('🎯 Page active définie:', activePage);
}

// Fonction pour mettre à jour l'état de la navigation
function updateNavigationState(activePage) {
    console.log(`🔄 Mise à jour navigation pour: ${activePage}`);
    
    // Réinitialiser tous les liens
    const allNavLinks = document.querySelectorAll('.nav-link');
    const allMobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const ctaButton = document.querySelector('.cta-button');
    const ctaButtonMobile = document.querySelector('.cta-button-mobile');
    
    console.log(`📊 Éléments trouvés: ${allNavLinks.length} desktop, ${allMobileNavLinks.length} mobile`);
    
    // Réinitialiser tous les styles
    allNavLinks.forEach((link, index) => {
        link.className = 'nav-link text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors';
        link.style.cssText = ''; // Supprimer les styles inline
    });
    
    allMobileNavLinks.forEach((link, index) => {
        link.className = 'mobile-nav-link text-gray-600 hover:text-primary-600 hover:bg-gray-50 block px-4 py-3 text-base font-medium transition-colors rounded-lg';
        link.style.cssText = ''; // Supprimer les styles inline
        const icon = link.querySelector('i');
        if (icon) icon.style.cssText = ''; // Réinitialiser l'icône
    });
    
    // Réinitialiser les boutons CTA
    if (ctaButton) {
        ctaButton.classList.remove('active');
    }
    if (ctaButtonMobile) {
        ctaButtonMobile.classList.remove('active');
    }
    
    // Couleurs par page
    const pageColors = {
        home: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
        about: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
        services: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
        programmes: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
        projects: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
        contact: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
        parrainage: { bg: '#7c3aed', bgHover: '#a855f7', shadow: 'rgba(124, 58, 237, 0.4)' },
    };
    
    const colors = pageColors[activePage] || pageColors.contact;
    
    // Appliquer les styles actifs
    const activeNavLink = document.querySelector(`.nav-${activePage}`);
    const activeMobileNavLink = document.querySelector(`.mobile-nav-${activePage}`);
    
    if (activeNavLink) {
        // Appliquer les styles avec CSS inline pour être sûr qu'ils s'affichent
        activeNavLink.style.cssText = `
            background: linear-gradient(135deg, ${colors.bg}, ${colors.bgHover}) !important;
            color: white !important;
            padding: 10px 16px !important;
            border-radius: 8px !important;
            font-weight: bold !important;
            transform: scale(1.05) !important;
            box-shadow: 0 4px 15px ${colors.shadow} !important;
            border-bottom: 2px solid ${colors.bg} !important;
            transition: all 0.3s ease !important;
            text-decoration: none !important;
        `;
        console.log(`🎨 Desktop nav actif avec couleur ${colors.bg}`);
    } else {
        console.warn(`❌ Lien desktop .nav-${activePage} non trouvé`);
    }
    
    if (activeMobileNavLink) {
        // Appliquer les styles avec CSS inline pour le mobile
        activeMobileNavLink.style.cssText = `
            background: linear-gradient(135deg, ${colors.bg}, ${colors.bgHover}) !important;
            color: white !important;
            padding: 12px 16px !important;
            border-radius: 8px !important;
            font-weight: bold !important;
            box-shadow: 0 4px 15px ${colors.shadow} !important;
            border-left: 4px solid ${colors.bg} !important;
            margin: 4px 0 !important;
            text-decoration: none !important;
        `;
        
        // Rendre l'icône blanche aussi
        const icon = activeMobileNavLink.querySelector('i');
        if (icon) {
            icon.style.color = 'white !important';
        }
        
        console.log(`📱 Mobile nav actif avec couleur ${colors.bg}`);
    } else {
        console.warn(`❌ Lien mobile .mobile-nav-${activePage} non trouvé`);
    }
    
    // Activer le bouton CTA si on est sur la page contact
    if (activePage === 'contact') {
        if (ctaButton) {
            ctaButton.classList.add('active');
        }
        if (ctaButtonMobile) {
            ctaButtonMobile.classList.add('active');
        }
    }
}

// Fonction pour initialiser le menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileMenuBtn && mobileMenu) {
        // Supprimer les anciens event listeners
        mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true));
        const newMobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        // Fonction pour ouvrir le menu
        function openMenu() {
            newMobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
            
            // Gérer les icônes
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            }
        }
        
        // Fonction pour fermer le menu
        function closeMenu() {
            newMobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Restaurer le scroll
            
            // Gérer les icônes
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }
        
        // Toggle menu au clic du bouton
        newMobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = newMobileMenuBtn.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Fermer le menu en cliquant sur l'overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMenu);
        }
        
        // Fermer le menu en cliquant sur un lien
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Petit délai pour permettre la navigation
                setTimeout(closeMenu, 100);
            });
        });
        
        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        });
        
        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024) { // lg breakpoint
                closeMenu();
            }
        });
        
        console.log('📱 Menu mobile initialisé avec animations');
    }
}

// Chargement automatique au démarrage
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
    loadFooter();
});

// Export pour utilisation manuelle
window.NavigationLoader = {
    load: loadNavigation,
    setActive: setActivePage,
    initMobile: initMobileMenu
};
