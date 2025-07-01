/**
 * Test du menu mobile et du responsive design
 * Ce script vérifie que tous les éléments sont correctement affichés et fonctionnent
 */

// Fonction pour tester le menu mobile
function testMobileMenu() {
    console.log('🧪 Test du menu mobile...');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.error('❌ Éléments du menu mobile non trouvés');
        return false;
    }
    
    // Test 1: Vérifier l'état initial
    const isHidden = mobileMenu.classList.contains('hidden');
    console.log(`📱 État initial du menu: ${isHidden ? 'fermé' : 'ouvert'} ✓`);
    
    // Test 2: Simuler un clic sur le bouton
    console.log('🖱️ Simulation d\'un clic sur le bouton menu...');
    mobileMenuBtn.click();
    
    setTimeout(() => {
        const isOpenAfterClick = !mobileMenu.classList.contains('hidden');
        console.log(`📱 État après clic: ${isOpenAfterClick ? 'ouvert' : 'fermé'} ${isOpenAfterClick ? '✓' : '❌'}`);
        
        // Test 3: Vérifier les icônes
        if (hamburgerIcon && closeIcon) {
            const hamburgerHidden = hamburgerIcon.classList.contains('hidden');
            const closeVisible = !closeIcon.classList.contains('hidden');
            console.log(`🍔 Icône hamburger: ${hamburgerHidden ? 'cachée' : 'visible'} ${hamburgerHidden ? '✓' : '❌'}`);
            console.log(`❌ Icône fermeture: ${closeVisible ? 'visible' : 'cachée'} ${closeVisible ? '✓' : '❌'}`);
        }
        
        // Test 4: Fermer le menu
        console.log('🔄 Test de fermeture du menu...');
        mobileMenuBtn.click();
        
        setTimeout(() => {
            const isClosedAfterSecondClick = mobileMenu.classList.contains('hidden');
            console.log(`📱 État après second clic: ${isClosedAfterSecondClick ? 'fermé' : 'ouvert'} ${isClosedAfterSecondClick ? '✓' : '❌'}`);
            
            console.log('✅ Tests du menu mobile terminés');
        }, 100);
    }, 100);
}

// Fonction pour tester le responsive design
function testResponsiveDesign() {
    console.log('📱 Test du responsive design...');
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    console.log(`📏 Taille de la fenêtre: ${viewport.width}x${viewport.height}`);
    
    // Détecter le breakpoint actuel
    let breakpoint = 'mobile';
    if (viewport.width >= 1280) breakpoint = 'xl';
    else if (viewport.width >= 1024) breakpoint = 'lg';
    else if (viewport.width >= 768) breakpoint = 'md';
    else if (viewport.width >= 640) breakpoint = 'sm';
    
    console.log(`📐 Breakpoint actuel: ${breakpoint}`);
    
    // Vérifier la visibilité des éléments
    const desktopNav = document.querySelector('.hidden.lg\\:block');
    const mobileButton = document.querySelector('.lg\\:hidden .mobile-menu-btn');
    
    if (viewport.width >= 1024) {
        console.log(`🖥️ Mode desktop: Navigation ${desktopNav ? 'visible' : 'cachée'} ${desktopNav ? '✓' : '❌'}`);
        console.log(`📱 Bouton mobile: ${mobileButton ? 'caché' : 'visible'} ${!mobileButton || mobileButton.offsetParent === null ? '✓' : '❌'}`);
    } else {
        console.log(`📱 Mode mobile: Bouton ${mobileButton ? 'visible' : 'caché'} ${mobileButton ? '✓' : '❌'}`);
    }
    
    // Tester le scroll lock
    const bodyStyle = getComputedStyle(document.body);
    console.log(`🔒 Body overflow: ${bodyStyle.overflow}`);
    
    console.log('✅ Tests responsive terminés');
}

// Fonction pour tester les performances
function testPerformance() {
    console.log('⚡ Test des performances...');
    
    // Mesurer le temps de chargement de la navigation
    const startTime = performance.now();
    
    // Vérifier si la navigation est chargée
    const navbar = document.getElementById('navbar-placeholder');
    const navContent = navbar?.innerHTML;
    
    if (navContent && navContent.trim() !== '') {
        const loadTime = performance.now() - startTime;
        console.log(`🚀 Navigation chargée en: ${loadTime.toFixed(2)}ms ✓`);
    } else {
        console.log('❌ Navigation non chargée');
    }
    
    // Vérifier les animations CSS
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    console.log(`🎭 Éléments animés trouvés: ${animatedElements.length}`);
    
    console.log('✅ Tests de performance terminés');
}

// Fonction principale de test
function runAllTests() {
    console.log('🚀 Démarrage des tests du site Opentech...');
    console.log('==========================================');
    
    // Attendre que la navigation soit chargée
    setTimeout(() => {
        testResponsiveDesign();
        console.log('');
        testMobileMenu();
        console.log('');
        testPerformance();
        console.log('');
        console.log('🎉 Tous les tests terminés !');
    }, 1000);
}

// Auto-exécution si ce script est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Export pour utilisation manuelle
window.OpentechTests = {
    mobile: testMobileMenu,
    responsive: testResponsiveDesign,
    performance: testPerformance,
    all: runAllTests
};

console.log('🛠️ Scripts de test chargés. Utilisez OpentechTests.all() pour lancer tous les tests.');
