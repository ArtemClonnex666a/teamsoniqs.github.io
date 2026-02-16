// DOM Elements
const header = document.querySelector('.header');
const burgerMenu = document.getElementById('burgerMenu');
const navList = document.getElementById('navList');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const progressBar = document.getElementById('progressBar');
const modal = document.getElementById('videoModal');
const modalClose = document.querySelector('.close');
const youtubePlayer = document.getElementById('youtubePlayer');

// Mobile Menu Toggle
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth scrolling for anchor links
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

// Active link highlighting
function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll animations for sections
function checkVisibility() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// Progress bar
function updateProgressBar() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
}

// Header background change on scroll
function updateHeader() {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}

// Video modal function
function openVideo(videoId) {
    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    youtubePlayer.src = '';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        youtubePlayer.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Event listeners
window.addEventListener('scroll', () => {
    updateActiveLink();
    updateProgressBar();
    updateHeader();
});

window.addEventListener('load', () => {
    checkVisibility();
    updateActiveLink();
    updateHeader();
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});

// Prevent scroll when menu is open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        youtubePlayer.src = '';
        document.body.style.overflow = 'auto';
    }
});
