// Main JavaScript file for Tshewang Rinzin's portfolio

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded successfully!');
  
  // Initialize smooth scrolling for navigation links
  initSmoothScroll();
  
  // Initialize navigation highlighting
  initNavHighlighting();
  
  // Initialize animations
  initAnimations();
});

// Smooth scrolling functionality for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Offset for header height
          behavior: 'smooth'
        });
      }
    });
  });
}

// Highlight active navigation section based on scroll position
function initNavHighlighting() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Add animations to elements when they come into view
function initAnimations() {
  // Add a class to the body when the page is loaded
  document.body.classList.add('loaded');
  
  // Simple reveal animation for sections
  const revealElements = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight - 150) {
        section.classList.add('revealed');
      }
    });
  };
  
  // Initial check for elements in view
  revealElements();
  
  // Check on scroll
  window.addEventListener('scroll', revealElements);
  
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });
}

// Add CSS class for active navigation link
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  
  // Add active class to style.css
  const style = document.createElement('style');
  style.textContent = `
    nav a.active {
      color: var(--primary-color);
      font-weight: 700;
    }
    
    nav a.active::after {
      width: 100%;
    }
    
    .section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .project-card.hovered {
      transform: translateY(-10px);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
    }
    
    body.loaded .hero-content h2 {
      animation: fadeInUp 1s ease forwards;
    }
    
    body.loaded .hero-content p {
      animation: fadeInUp 1s ease 0.3s forwards;
      opacity: 0;
    }
    
    body.loaded .cta-buttons {
      animation: fadeInUp 1s ease 0.6s forwards;
      opacity: 0;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  
  document.head.appendChild(style);
});

// Add a simple typing effect to the hero section
document.addEventListener('DOMContentLoaded', () => {
  const titles = [
    'Full Stack Developer',
    'AI Enthusiast',
    'Data Analyst',
    'Problem Solver'
  ];
  
  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const typingElement = document.createElement('span');
  typingElement.className = 'typing';
  typingElement.style.color = 'var(--primary-color)';
  typingElement.style.fontWeight = '600';
  
  // Insert after the first paragraph in hero section
  const heroContent = document.querySelector('.hero-content');
  const firstParagraph = heroContent.querySelector('p');
  firstParagraph.parentNode.insertBefore(typingElement, firstParagraph.nextSibling);
  
  function typeText() {
    const currentTitle = titles[currentTitleIndex];
    
    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      typingElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // Normal speed when typing
    }
    
    // If finished typing the current title
    if (!isDeleting && currentCharIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end
    }
    
    // If finished deleting the current title
    if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before typing next title
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  // Start the typing effect
  setTimeout(typeText, 1500); // Start after initial page load animations
});