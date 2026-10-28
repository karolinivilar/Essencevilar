// --- Script da Navbar e Menu Mobile ---
const nav = document.getElementById('main-nav');
const logo = document.getElementById('nav-logo');
let isScrolled = false;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 40) {
                if (!isScrolled) {
                    nav.classList.add('scrolled');
                    // Suaviza a transição da logo
                    logo.style.opacity = '0';
                    setTimeout(() => {
                        logo.src = 'fotos/logo2.webp';
                        logo.style.opacity = '1';
                    }, 150);
                    isScrolled = true;
                }
            } else {
                if (isScrolled) {
                    nav.classList.remove('scrolled');
                    logo.style.opacity = '0';
                    setTimeout(() => {
                        logo.src = 'fotos/logo.webp';
                        logo.style.opacity = '1';
                    }, 150);
                    isScrolled = false;
                }
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

const hamburgerBtn = document.getElementById('hamburger-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
    if (mobileMenu.classList.contains('translate-x-full')) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    });
});


// --- Scripts do Modal e FAQ ---
function openCatalogModal() {
    const modal = document.getElementById('catalogModal');
    const content = document.getElementById('catalogContent');
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
    
    document.body.style.overflow = 'hidden';
    if(typeof lenis !== 'undefined') lenis.stop();
}

function closeCatalogModal() {
    const modal = document.getElementById('catalogModal');
    const content = document.getElementById('catalogContent');
    
    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    
    document.body.style.overflow = '';
    if(typeof lenis !== 'undefined') lenis.start();
}

window.addEventListener('click', function(event) {
    const catalogModal = document.getElementById('catalogModal');
    if (event.target === catalogModal) {
        closeCatalogModal();
    }
});

const faqHeaders = document.querySelectorAll('.faq-header');
faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.faq-content');
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-content').style.maxHeight = null;
        });
        
        if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});


// --- Scripts Globais (Lenis, Parallax e Animações de Entrada) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

gsap.to(".parallax-bg", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.from(".hero-title-anim", { opacity: 0, y: 40, duration: 1.2, ease: "power3.out", delay: 0.1 });
gsap.from(".hero-desc-anim", { opacity: 0, y: 30, duration: 1.2, ease: "power3.out", delay: 0.3 });
gsap.from(".hero-btn-anim", { opacity: 0, y: 20, duration: 1.2, ease: "power3.out", delay: 0.5 });

const revealElements = document.querySelectorAll('.reveal-up');
revealElements.forEach((el) => {
    gsap.fromTo(el,
        { opacity: 0, y: 40, autoAlpha: 0 },
        {
            opacity: 1,
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                lenis.scrollTo(targetElement, {
                    offset: -100,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        }
    });
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    
    preloaderBar.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            preloader.remove();
        }, 700);
    }, 400);
});
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    
    preloaderBar.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        
        // Remove tanto a classe quanto o estilo inline para libertar o scroll
        document.body.classList.remove('overflow-hidden');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            preloader.remove();
        }, 700);
    }, 400);
});