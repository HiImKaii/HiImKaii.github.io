// Khởi tạo nền mây 3D với VANTA.js
function initVantaBackground() {
    if (window.VANTA) {
        window.vantaEffect = VANTA.CLOUDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x87ceeb,
            cloudColor: 0xffffff,
            cloudShadowColor: 0x003971,
            sunColor: 0xfbbf24,
            sunGlareColor: 0xf59e0b,
            sunlightColor: 0xfbbf24,
            speed: 0.8
        });
    } else {
        // Nếu thư viện chưa được tải, thử lại sau 500ms
        setTimeout(initVantaBackground, 500);
    }
}

// Hiệu ứng mưa
function createRainEffect() {
    const rainContainer = document.getElementById('rain-effect');
    if (!rainContainer) return;

    // Xóa các giọt mưa cũ
    rainContainer.innerHTML = '';

    // Tạo giọt mưa mới
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        rainContainer.appendChild(drop);
    }
}

// Hiệu ứng split text animation
function animateSplitText() {
    const elements = document.querySelectorAll('.split-text-reveal');

    elements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        element.style.opacity = '1';

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? ' ' : text[i];
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${i * 0.03}s`;
            element.appendChild(span);
        }

        setTimeout(() => {
            element.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 100);
    });
}

// Hiệu ứng typing
function setupTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const texts = [
        "Tôi phân tích dữ liệu không gian địa lý để tạo giá trị.",
        "Tôi sử dụng GIS và Cloud để xử lý dữ liệu vệ tinh.",
        "Tôi xây dựng ứng dụng theo dõi biến đổi khí hậu.",
        "Tôi yêu thích mọi thứ về dữ liệu địa lý và bản đồ."
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Delay trước khi xóa
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Delay trước khi gõ text mới
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Hiệu ứng animated scroll reveal
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Nếu là card có counter, bắt đầu đếm
                if (entry.target.querySelector('.counter')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    animateCounters(counters);
                }

                // Nếu là skill bar, bắt đầu animation
                if (entry.target.querySelector('[data-width]')) {
                    const skillBars = entry.target.querySelectorAll('[data-width]');
                    animateSkillBars(skillBars);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Theo dõi các thẻ weather-card để hiệu ứng xuất hiện
    document.querySelectorAll('.weather-card').forEach(card => {
        observer.observe(card);
    });
}

// Hiệu ứng counter
function animateCounters(counters) {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 giây
        const step = target / (duration / 16); // 60fps

        let current = 0;
        const timer = setInterval(() => {
            current += step;
            counter.textContent = Math.round(current);

            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

// Hiệu ứng skill bars
function animateSkillBars(skillBars) {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Hiệu ứng tuyết rơi (sử dụng khi cần)
function createSnowEffect() {
    const body = document.body;

    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;

        body.appendChild(snowflake);
    }
}

// Hiệu ứng parallax cơ bản
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.float-3d');

    window.addEventListener('mousemove', (event) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        parallaxElements.forEach(element => {
            const depth = element.querySelector('.depth-1') ? 10 : 5;
            element.style.transform = `translateX(${x * depth}px) translateY(${y * depth}px)`;
        });
    });
}

// Toggle menu mobile
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('h-0')) {
            mobileMenu.classList.remove('h-0', 'opacity-0');
            mobileMenu.classList.add('h-auto', 'opacity-100');
        } else {
            mobileMenu.classList.add('h-0', 'opacity-0');
            mobileMenu.classList.remove('h-auto', 'opacity-100');
        }
    });

    // Đóng menu khi click vào link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('h-0', 'opacity-0');
            mobileMenu.classList.remove('h-auto', 'opacity-100');
        });
    });
}

// Toggle theme (light/dark)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Kiểm tra theme đã lưu
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('night-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');

        // Lưu trạng thái theme
        if (document.body.classList.contains('night-mode')) {
            localStorage.setItem('theme', 'dark');
            if (window.vantaEffect) {
                window.vantaEffect.setOptions({
                    skyColor: 0x0f172a,
                    cloudShadowColor: 0x000000
                });
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (window.vantaEffect) {
                window.vantaEffect.setOptions({
                    skyColor: 0x87ceeb,
                    cloudShadowColor: 0x003971
                });
            }
        }
    });
}

// Cập nhật năm hiện tại
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Toggle hiệu ứng mưa (ví dụ: khi hover vào card rain)
function setupRainToggle() {
    const rainCards = document.querySelectorAll('.rain-card');
    const rainEffect = document.getElementById('rain-effect');

    if (!rainEffect) return;

    rainCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createRainEffect();
            rainEffect.classList.remove('hidden');
        });

        card.addEventListener('mouseleave', () => {
            setTimeout(() => {
                rainEffect.classList.add('hidden');
            }, 1000);
        });
    });
}

// Tạo thêm giọt mưa cho phần skill (trang trí)
function createSkillRaindrops() {
    const container = document.getElementById('skill-raindrops');
    if (!container) return;

    container.classList.remove('hidden');

    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.top = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 1 + 2}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = '0.3';
        container.appendChild(drop);
    }
}

// Thiết lập hiệu ứng fixed header khi scroll
function setupStickyHeader() {
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/80', 'dark:bg-sky-900/80', 'backdrop-blur-md', 'shadow-md');
        } else {
            navbar.classList.remove('bg-white/80', 'dark:bg-sky-900/80', 'backdrop-blur-md', 'shadow-md');
        }
    });
}

// Khởi tạo tất cả các hiệu ứng khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo nền mây 3D
    initVantaBackground();

    // Thiết lập các hiệu ứng và animation
    animateSplitText();
    setupTypingEffect();
    setupScrollReveal();
    setupParallaxEffect();
    setupMobileMenu();
    setupThemeToggle();
    updateCopyrightYear();
    setupRainToggle();
    createSkillRaindrops();
    setupStickyHeader();
}); 