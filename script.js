document.addEventListener("DOMContentLoaded", function () {
  // Dark mode toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme") || "light";

  // Apply saved theme
  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    icon.className = "fas fa-sun";
  } else {
    body.setAttribute("data-theme", "light");
    icon.className = "fas fa-moon";
  }

  // Theme toggle event listener
  themeToggle.addEventListener("click", function () {
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "dark") {
      body.setAttribute("data-theme", "light");
      icon.className = "fas fa-moon";
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      icon.className = "fas fa-sun";
      localStorage.setItem("theme", "dark");
    }

    // Add animation effect
    themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate the offset position considering the fixed navbar height
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20; // Extra 20px padding

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }

      // Close mobile menu after clicking
      if (navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Active navigation link highlighting
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar.offsetHeight;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 50; // Adjust for navbar height + extra margin
      const sectionHeight = section.clientHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Navbar background change on scroll
  function handleNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    // Remove hardcoded styles to let CSS variables handle the theme
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  // Scroll event listener
  window.addEventListener("scroll", function () {
    highlightActiveNavLink();
    handleNavbarScroll();
    animateOnScroll();
  });

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".project-card, .skill-category, .stat-item, .info-item"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate-in");
      }
    });
  }

  // Typing animation for hero text
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Initialize typing animation
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 500);
  }

  // Smooth reveal animation for sections
  function revealSections() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionVisible = 150;

      if (sectionTop < window.innerHeight - sectionVisible) {
        section.classList.add("section-visible");
      }
    });
  }

  // Initialize reveal animation
  window.addEventListener("scroll", revealSections);
  revealSections(); // Run on page load

  // Social links hover effects
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Project cards hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Skill items interactive effects
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Add a pulse effect
      this.style.animation = "pulse 0.6s ease-in-out";
      setTimeout(() => {
        this.style.animation = "";
      }, 600);
    });
  });

  // Counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-item h4");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent);
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };

      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.disconnect();
          }
        });
      });

      observer.observe(counter.parentElement);
    });
  }

  // Initialize counter animation
  animateCounters();

  // Fetch GitHub stats
  async function fetchGitHubStats() {
    try {
      const username = 'ninhhaidang';

      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await reposResponse.json();

      // Update repositories count
      document.getElementById('repos-count').textContent = userData.public_repos || 7;

      // Update followers count
      document.getElementById('followers-count').textContent = userData.followers || 2;

      // Fetch contributions (GitHub API doesn't provide this directly, so we'll keep the current value)
      // For real contributions, you'd need GitHub GraphQL API with authentication

    } catch (error) {
      console.log('GitHub API call failed, using default values');
      // Keep default values if API fails
    }
  }

  // Fetch GitHub stats on page load
  fetchGitHubStats();

  // Parallax effect for hero section (disabled to prevent overlay issues)
  function parallaxEffect() {
    // Reset any existing transform on hero section to prevent overlay
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = "none";
    }
  }

  // Reset parallax effect on page load
  parallaxEffect();

  // Easter egg - Konami code
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join("") === konamiSequence.join("")) {
      // Easter egg activation
      document.body.style.animation = "rainbow 2s infinite";
      setTimeout(() => {
        document.body.style.animation = "";
      }, 4000);
    }
  });

  // Add loading animation to elements
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-category, .stat-item"
  );
  animatedElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Smooth scrolling for buttons
  const buttons = document.querySelectorAll('.btn[href^="#"]');
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate the offset position considering the fixed navbar height
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight - 20; // Extra 20px padding

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Add ripple effect to buttons
  const rippleButtons = document.querySelectorAll(".btn");
  rippleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Performance optimization - Debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll events
  window.addEventListener(
    "scroll",
    debounce(function () {
      highlightActiveNavLink();
      handleNavbarScroll();
      animateOnScroll();
      // parallaxEffect(); // Disabled to prevent overlay issues
    }, 10)
  );

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Back to Top Button functionality
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Add CSS keyframes for animations
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .theme-toggle:hover {
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    
    .nav-link.active {
        color: var(--accent-primary) !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-primary);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;

document.head.appendChild(style);
