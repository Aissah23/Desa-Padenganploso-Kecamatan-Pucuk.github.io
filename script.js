// Toggle menu
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    // Handle internal page links
    if (targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    } else {
      // Handle links to other pages
      window.location.href = this.href;
    }
  });
});

// Sticky header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    header.style.background = 'var(--primary-color)';
  } else {
    header.style.boxShadow = 'none';
    header.style.background = 'var(--primary-color)';
  }
});

// Highlight active page in navigation
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if ((currentPage === 'index.html' && linkPage === '#beranda') || 
        linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Lightbox functionality
function initLightbox() {
  const galleryItems = document.querySelectorAll('.galeri-item');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lightbox.classList.add('active');
      const img = document.createElement('img');
      img.src = item.querySelector('img').src;
      img.alt = item.querySelector('.galeri-caption').textContent;
      
      // Clear previous content
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      
      lightbox.appendChild(img);
      
      // Add caption
      const caption = document.createElement('p');
      caption.textContent = item.querySelector('.galeri-caption').textContent;
      lightbox.appendChild(caption);
    });
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  initLightbox();
  initScrollAnimation();
});

