// Script phong cách thời tiết 3D - Cute Edition
document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo các hiệu ứng
    initVantaBackground();
    setupParallaxEffect();
    setupTypingEffect();
    setupScrollReveal();
    setupMobileMenu();
    setupThemeToggle();
    updateCopyrightYear();
    createRainEffect();
    createWeatherEmojis();
    setupRainToggle();
    createSkillRaindrops();
    setupStickyHeader();
    setupCuteElements();
    setupCartoonButtons();
    setupHoverEffects();

    // Tạo hiệu ứng tuyết rơi nếu người dùng bật chế độ đêm
    if (document.body.classList.contains('night-mode')) {
        createSnowEffect();
    }
});

// Khởi tạo nền 3D clouds (sử dụng VANTA.js)
function initVantaBackground() {
    // Chỉ khởi tạo nếu có thư viện VANTA
    if (window.VANTA) {
        VANTA.CLOUDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: getComputedStyle(document.documentElement).getPropertyValue('--color-sky-light').trim(),
            cloudColor: getComputedStyle(document.documentElement).getPropertyValue('--color-cloud').trim(),
            sunColor: getComputedStyle(document.documentElement).getPropertyValue('--color-sun').trim(),
            sunGlareColor: getComputedStyle(document.documentElement).getPropertyValue('--color-sun-bright').trim(),
            speed: 1.0,
            cloudShadowColor: "#1E40AF",
            scale: 1.0,
            scaleMobile: 1.0,
            quantity: 5
        });
    }
}

// Tạo hiệu ứng mưa
function createRainEffect() {
    const containers = document.querySelectorAll('.rain-container');
    containers.forEach(container => {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const dropCount = Math.floor(containerWidth / 20); // Số giọt mưa dựa trên chiều rộng

        // Xóa giọt mưa cũ
        container.innerHTML = '';

        // Tạo giọt mưa mới
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('rain-drop');

            // Vị trí ngẫu nhiên
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 1.5}s`;
            drop.style.animationDuration = `${0.8 + Math.random() * 0.8}s`;
            drop.style.height = `${15 + Math.random() * 10}px`;
            drop.style.opacity = 0.3 + Math.random() * 0.5;

            container.appendChild(drop);
        }
    });
}

// Tạo hiệu ứng "nhấn phím"
function animateSplitText() {
    const splitTexts = document.querySelectorAll('.split-text');

    splitTexts.forEach(container => {
        const text = container.textContent;
        container.textContent = '';
        container.style.opacity = 1;

        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            charSpan.style.animationDelay = `${i * 0.08}s`;
            charSpan.className = 'split-char';
            container.appendChild(charSpan);
        }
    });
}

// Hiệu ứng gõ chữ
function setupTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
        "GIS Developer",
        "Remote Sensing Specialist",
        "Earth Observation Expert",
        "Spatial Data Analyst",
        "Cloud GIS Engineer",
        "Weather Data Scientist"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseEnd = 1500;

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            // Xóa
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Tốc độ xóa nhanh hơn
        } else {
            // Thêm
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 150; // Tốc độ gõ chậm hơn
        }

        // Con trỏ nhấp nháy
        typingElement.classList.toggle('blink');

        // Xác định trạng thái tiếp theo
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Hoàn thành cụm từ, tạm dừng rồi xóa
            isDeleting = true;
            typingSpeed = pauseEnd;
        } else if (isDeleting && currentCharIndex === 0) {
            // Đã xóa xong, chuyển sang cụm từ tiếp theo
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }

        setTimeout(type, typingSpeed);
    }

    // Bắt đầu hiệu ứng
    setTimeout(type, 1000);
}

// Hiệu ứng hiện dần khi cuộn
function setupScrollReveal() {
    // Sử dụng Intersection Observer để phát hiện khi phần tử vào viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class để kích hoạt animation
                entry.target.classList.add('revealed');

                // Kích hoạt hiệu ứng đếm số nếu có
                if (entry.target.classList.contains('counter')) {
                    animateCounters(entry.target);
                }

                // Kích hoạt hiệu ứng thanh kỹ năng nếu có
                if (entry.target.classList.contains('skill-bar')) {
                    animateSkillBars(entry.target);
                }

                // Ngừng theo dõi sau khi đã được hiển thị
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Theo dõi các phần tử
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Theo dõi các bộ đếm
    document.querySelectorAll('.counter').forEach(el => {
        observer.observe(el);
    });

    // Theo dõi các thanh kỹ năng
    document.querySelectorAll('.skill-bar').forEach(el => {
        observer.observe(el);
    });
}

// Hiệu ứng đếm số
function animateCounters(counterElement) {
    const target = parseInt(counterElement.getAttribute('data-target'));
    const duration = 2000; // thời gian animation (ms)
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(progress * target);

        counterElement.textContent = currentCount;

        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        } else {
            counterElement.textContent = target; // Đảm bảo đúng số cuối cùng
        }
    };

    animate();
}

// Hiệu ứng thanh kỹ năng
function animateSkillBars(skillBar) {
    const progressBar = skillBar.querySelector('.progress-bar');
    const targetWidth = skillBar.getAttribute('data-progress') + '%';

    progressBar.style.width = '0%';
    progressBar.style.opacity = 1;

    setTimeout(() => {
        progressBar.style.width = targetWidth;
    }, 200);

    // Cập nhật phần trăm
    const percentElement = skillBar.querySelector('.skill-percent');
    if (percentElement) {
        const percent = skillBar.getAttribute('data-progress');
        let currentPercent = 0;
        const interval = setInterval(() => {
            currentPercent += 1;
            percentElement.textContent = currentPercent + '%';

            if (currentPercent >= parseInt(percent)) {
                clearInterval(interval);
            }
        }, 2000 / parseInt(percent));
    }
}

// Tạo hiệu ứng tuyết rơi
function createSnowEffect() {
    const container = document.createElement('div');
    container.className = 'snow-container';
    container.style.position = 'fixed';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.top = '0';
    container.style.left = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    const flakeCount = 50;

    for (let i = 0; i < flakeCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.opacity = `${0.5 + Math.random() * 0.5}`;
        flake.style.animationDelay = `${Math.random() * 10}s`;
        flake.style.animationDuration = `${10 + Math.random() * 20}s`;
        flake.style.width = `${3 + Math.random() * 7}px`;
        flake.style.height = flake.style.width;

        container.appendChild(flake);
    }
}

// Tạo hiệu ứng khí tượng emoji "bay lượn"
function createWeatherEmojis() {
    const emojis = ['☁️', '🌤️', '⛅', '🌩️', '🌧️', '❄️', '☀️', '🌈', '🍃'];
    const container = document.createElement('div');
    container.className = 'weather-emoji-container';
    container.style.position = 'fixed';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.top = '0';
    container.style.left = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    document.body.appendChild(container);

    const emojiCount = 10;

    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.fontSize = `${1 + Math.random() * 2}rem`;
        emoji.style.opacity = '0.3';
        emoji.style.animation = `float-emoji ${20 + Math.random() * 20}s ease-in-out infinite`;
        emoji.style.animationDelay = `${Math.random() * 20}s`;
        emoji.style.transform = 'scale(1) rotate(0deg)';
        emoji.style.filter = 'blur(1px)';

        container.appendChild(emoji);
    }

    // Thêm CSS cho animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes float-emoji {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 20}deg); }
        50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * -20}deg); }
        75% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 20}deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
    }`;
    document.head.appendChild(style);
}

// Hiệu ứng parallax cho 3D
function setupParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(element => {
            const depth = element.getAttribute('data-depth') || 0.1;
            const shiftX = (mouseX - windowWidth / 2) * depth;
            const shiftY = (mouseY - windowHeight / 2) * depth;

            // Di chuyển phần tử dựa trên vị trí chuột
            element.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        });
    });

    // Cập nhật scroll parallax
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    });
}

// Chuyển đổi chế độ màu
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Kiểm tra chế độ được lưu trong localStorage
    const savedTheme = localStorage.getItem('night-mode');
    if (savedTheme === 'true') {
        document.body.classList.add('night-mode');
        createSnowEffect(); // Chế độ tối kích hoạt hiệu ứng tuyết
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        const isNightMode = document.body.classList.contains('night-mode');

        // Lưu chế độ vào localStorage
        localStorage.setItem('night-mode', isNightMode);

        // Thêm hoặc xóa hiệu ứng tuyết
        if (isNightMode) {
            createSnowEffect();
        } else {
            const snowContainer = document.querySelector('.snow-container');
            if (snowContainer) {
                snowContainer.remove();
            }
        }
    });
}

// Menu di động
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');

        // Hiệu ứng chuyển đổi ngộ nghĩnh
        if (mobileMenu.classList.contains('active')) {
            const links = mobileMenu.querySelectorAll('a');
            links.forEach((link, index) => {
                link.style.animationDelay = `${index * 0.1}s`;
                link.style.animation = 'bounce-in 0.5s forwards';
            });
        }
    });

    // Đóng menu khi nhấp vào liên kết
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });
}

// Cập nhật năm copyright trong footer
function updateCopyrightYear() {
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
}

// Bật tắt hiệu ứng mưa khi hover
function setupRainToggle() {
    const rainCards = document.querySelectorAll('.rain-card');

    rainCards.forEach(card => {
        const container = card.querySelector('.rain-container');
        if (!container) return;

        // Tạo hiệu ứng mưa nhưng ẩn mặc định
        createRainEffect();

        // Hiện hiệu ứng mưa khi hover
        card.addEventListener('mouseenter', () => {
            container.style.opacity = 1;
            container.querySelectorAll('.rain-drop').forEach(drop => {
                drop.style.animationPlayState = 'running';
            });
        });

        // Ẩn hiệu ứng mưa khi không hover
        card.addEventListener('mouseleave', () => {
            container.style.opacity = 0;
            container.querySelectorAll('.rain-drop').forEach(drop => {
                drop.style.animationPlayState = 'paused';
            });
        });
    });
}

// Tạo giọt mưa nhỏ cho phần kỹ năng
function createSkillRaindrops() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;

    // Tạo container cho giọt mưa
    const rainContainer = document.createElement('div');
    rainContainer.className = 'skill-raindrops';
    rainContainer.style.position = 'absolute';
    rainContainer.style.top = '0';
    rainContainer.style.left = '0';
    rainContainer.style.width = '100%';
    rainContainer.style.height = '100%';
    rainContainer.style.pointerEvents = 'none';
    rainContainer.style.zIndex = '1';
    rainContainer.style.opacity = '0.2';
    skillSection.style.position = 'relative';
    skillSection.appendChild(rainContainer);

    // Tạo các giọt mưa
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'skill-raindrop';
        drop.style.position = 'absolute';
        drop.style.top = `${Math.random() * 100}%`;
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.width = '2px';
        drop.style.height = '10px';
        drop.style.borderRadius = '0 0 5px 5px';
        drop.style.background = 'var(--color-rain)';
        drop.style.opacity = '0';
        drop.style.transform = 'scale(0)';

        // Tạo hiệu ứng "rơi" khi scroll đến phần skills
        const animeDelay = Math.random() * 5;
        drop.style.animation = `raindrop-appear 3s ease-out ${animeDelay}s forwards, raindrop-fall 2s ease-in ${animeDelay + 0.5}s forwards`;

        rainContainer.appendChild(drop);
    }

    // Thêm CSS cho animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes raindrop-appear {
        0% { opacity: 0; transform: scale(0); }
        100% { opacity: 0.7; transform: scale(1); }
    }
    @keyframes raindrop-fall {
        0% { transform: translateY(0); }
        100% { transform: translateY(100px); opacity: 0; }
    }`;
    document.head.appendChild(style);
}

// Header dính khi cuộn
function setupStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
            // Thêm hiệu ứng mây
            if (!header.querySelector('.sticky-cloud')) {
                const cloud = document.createElement('div');
                cloud.className = 'sticky-cloud';
                cloud.style.position = 'absolute';
                cloud.style.bottom = '-15px';
                cloud.style.left = '0';
                cloud.style.width = '100%';
                cloud.style.height = '30px';
                cloud.style.background = 'var(--color-cloud)';
                cloud.style.borderRadius = '50% 50% 0 0';
                cloud.style.filter = 'blur(10px)';
                cloud.style.opacity = '0.7';
                cloud.style.zIndex = '-1';
                header.appendChild(cloud);
            }
        } else {
            header.classList.remove('sticky');
            const cloud = header.querySelector('.sticky-cloud');
            if (cloud) {
                cloud.remove();
            }
        }
    });
}

// Thêm hiệu ứng đáng yêu cho các phần tử
function setupCuteElements() {
    // Thêm class cho các phần tử cần hiệu ứng cute
    const elements = document.querySelectorAll('.weather-heading, .section-title, .profile-img, .weather-btn, .cloud-badge');
    elements.forEach(element => {
        element.classList.add('cute-element');
    });

    // Thêm hiệu ứng nảy lên khi click
    document.querySelectorAll('.cute-element').forEach(element => {
        element.addEventListener('click', () => {
            element.style.animation = 'none';
            void element.offsetWidth; // Trigger reflow
            element.style.animation = 'cute-bounce 0.5s ease';
        });
    });

    // Thêm CSS cho animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes cute-bounce {
        0% { transform: scale(1); }
        40% { transform: scale(1.1); }
        60% { transform: scale(0.9); }
        80% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }`;
    document.head.appendChild(style);
}

// Chuyển đổi nút thường thành nút hoạt hình
function setupCartoonButtons() {
    // Thêm nút hoạt hình
    const buttons = document.querySelectorAll('.weather-btn');
    buttons.forEach(button => {
        if (button.classList.contains('primary-btn')) {
            button.classList.add('cartoon-btn');
        }
    });
}

// Thêm hiệu ứng hover 3D cho các phần tử
function setupHoverEffects() {
    const cards = document.querySelectorAll('.weather-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            // Tính toán vị trí chuột tương đối
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // Vị trí x trong card
            const y = e.clientY - rect.top; // Vị trí y trong card

            // Tính toán góc xoay dựa trên vị trí chuột
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // Góc xoay theo trục X
            const rotateY = (centerX - x) / 20; // Góc xoay theo trục Y

            // Áp dụng hiệu ứng xoay
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

            // Thêm hiệu ứng ánh sáng
            const glareX = ((x / rect.width) * 100);
            const glareY = ((y / rect.height) * 100);

            // Tạo phần tử ánh sáng nếu chưa có
            let glare = this.querySelector('.card-glare');
            if (!glare) {
                glare = document.createElement('div');
                glare.className = 'card-glare';
                glare.style.position = 'absolute';
                glare.style.top = '0';
                glare.style.left = '0';
                glare.style.width = '100%';
                glare.style.height = '100%';
                glare.style.borderRadius = 'inherit';
                glare.style.pointerEvents = 'none';
                glare.style.zIndex = '1';
                this.appendChild(glare);
            }

            // Cập nhật vị trí ánh sáng
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`;
        });

        // Trở về trạng thái ban đầu khi rời chuột
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            const glare = this.querySelector('.card-glare');
            if (glare) {
                glare.style.background = 'none';
            }
        });
    });
} 