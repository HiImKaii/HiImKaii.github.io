document.addEventListener("DOMContentLoaded", function () {
  const GITHUB_USERNAME = "ninhhaidang";

  // Function to fetch GitHub stats
  async function fetchGitHubStats() {
    try {
      // Fetch user data for public repos and followers
      const userResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`
      );
      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      const userData = await userResponse.json();

      // Fetch contributions data using a public proxy
      const contribResponse = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      );
      if (!contribResponse.ok) {
        throw new Error(`Contributions API error: ${contribResponse.status}`);
      }
      const contribData = await contribResponse.json();
      const totalContributions = contribData.total.lastYear;

      // Update the DOM
      updateDOM(userData, totalContributions);
    } catch (error) {
      console.error("Failed to fetch GitHub stats:", error);
      // Keep existing values as a fallback
    }
  }

  // Function to update the DOM with fetched data
  function updateDOM(userData, totalContributions) {
    const contributionsEl = document.getElementById("contributions-count");
    const reposEl = document.getElementById("repos-count");
    const followersEl = document.getElementById("followers-count");

    if (contributionsEl && totalContributions) {
      contributionsEl.textContent = totalContributions;
    }
    if (reposEl && userData.public_repos) {
      reposEl.textContent = userData.public_repos;
    }
    if (followersEl && userData.followers) {
      followersEl.textContent = userData.followers;
    }
  }

  // Initial fetch
  fetchGitHubStats();

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Function to apply theme
  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      body.removeAttribute("data-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isDarkMode = body.hasAttribute("data-theme");
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });

  // Language Toggle
  const languageToggle = document.getElementById("language-toggle");
  const languageText = document.getElementById("language-text");

  function updateLanguage(lang) {
    document.querySelectorAll("[data-vi]").forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.innerHTML = text;
      }
    });
    if (languageText) {
      languageText.textContent = lang.toUpperCase();
    }
    document.documentElement.lang = lang;
  }

  languageToggle.addEventListener("click", () => {
    const currentLang = document.documentElement.lang === "vi" ? "en" : "vi";
    localStorage.setItem("language", currentLang);
    updateLanguage(currentLang);
  });

  // Load saved language
  const savedLang = localStorage.getItem("language") || "vi";
  updateLanguage(savedLang);

  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }

  // Back to Top button
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
