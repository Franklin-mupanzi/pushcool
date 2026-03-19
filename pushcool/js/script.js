// ===== ATTENDRE QUE LE DOM SOIT CHARGÉ =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initBackToTop();
    initSmoothScroll();
    highlightActivePage();
});

// ===== NAVIGATION MOBILE (HAMBUGER MENU) =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== ANIMATIONS AU SCROLL =====
function initAnimations() {
    // Animation d'entrée pour la page d'accueil
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }

    // Intersection Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation supplémentaire pour les cartes
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('team-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);

    // Observer les cartes de services et d'équipe
    document.querySelectorAll('.service-card, .team-card').forEach(card => {
        observer.observe(card);
    });

    // Observer les titres de section
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
}

// ===== BOUTON RETOUR EN HAUT =====
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SCROLL DOUX POUR LES LIENS INTERNES =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SURLIGNER LA PAGE ACTIVE DANS LA NAVIGATION =====
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATION DE CHARGEMENT DES PAGES =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Animation supplémentaire pour les éléments
    const elements = document.querySelectorAll('.service-card, .team-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== GESTION DU RÉSIZE POUR LE MENU MOBILE =====
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});