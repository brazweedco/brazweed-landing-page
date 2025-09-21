// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initPricingToggle();
    initScrollAnimations();
    initJoinWaitlistButtons();
    initHeaderScroll();
    initInteractiveSimulator();
    initFeaturesCarousel();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Pricing Configuration - Variables for easy management
const PRICING_CONFIG = {
    monthly: {
        basic: 99,
        pro: 149
    },
    yearly: {
        basic: 89, // 10% discount for yearly billing
        pro: 134   // 10% discount for yearly billing
    },
    currency: 'CAD',
    discountPercentage: 10
};

// Pricing Toggle (Monthly/Yearly)
function initPricingToggle() {
    const toggle = document.getElementById('billing-toggle');
    
    if (!toggle) {
        console.warn('Pricing toggle not found');
        return;
    }
    
    // Initial setup
    updatePricingDisplay(false);
    
    toggle.addEventListener('change', function() {
        const isYearly = this.checked;
        updatePricingDisplay(isYearly);
        
        // Add animation effect
        animatePricingCards();
        
        // Update billing labels
        updateBillingLabels(isYearly);
        
        console.log(`Switched to ${isYearly ? 'yearly' : 'monthly'} billing`);
    });
    
    // Make labels clickable
    const monthlyLabel = document.querySelector('.billing-label:first-child');
    const yearlyLabel = document.querySelector('.billing-label:last-child');
    
    if (monthlyLabel) {
        monthlyLabel.addEventListener('click', () => {
            toggle.checked = false;
            toggle.dispatchEvent(new Event('change'));
        });
    }
    
    if (yearlyLabel) {
        yearlyLabel.addEventListener('click', () => {
            toggle.checked = true;
            toggle.dispatchEvent(new Event('change'));
        });
    }
}

function updatePricingDisplay(isYearly) {
    const prices = isYearly ? PRICING_CONFIG.yearly : PRICING_CONFIG.monthly;
    const period = isYearly ? '/ year' : '/ month';
    
    // Update Basic plan price
    const basicAmount = document.querySelector('.pricing-card:not(.featured) .amount');
    const basicPeriod = document.querySelector('.pricing-card:not(.featured) .period');
    
    if (basicAmount) {
        basicAmount.textContent = prices.basic;
        basicAmount.style.color = isYearly ? '#28a745' : '';
    }
    if (basicPeriod) {
        basicPeriod.textContent = period;
    }
    
    // Update Pro plan price
    const proAmount = document.querySelector('.pricing-card.featured .amount');
    const proPeriod = document.querySelector('.pricing-card.featured .period');
    
    if (proAmount) {
        proAmount.textContent = prices.pro;
        proAmount.style.color = isYearly ? '#28a745' : '';
    }
    if (proPeriod) {
        proPeriod.textContent = period;
    }
    
    // Add savings indicator for yearly billing
    if (isYearly) {
        addSavingsIndicator();
    } else {
        removeSavingsIndicator();
    }
}

function updateBillingLabels(isYearly) {
    const monthlyLabel = document.querySelector('.billing-label:first-child');
    const yearlyLabel = document.querySelector('.billing-label:last-child');
    
    if (monthlyLabel && yearlyLabel) {
        if (isYearly) {
            monthlyLabel.style.opacity = '0.6';
            yearlyLabel.style.opacity = '1';
            yearlyLabel.style.fontWeight = '600';
            yearlyLabel.style.color = 'var(--orange-light)';
            monthlyLabel.style.color = 'var(--orange-color)';
        } else {
            monthlyLabel.style.opacity = '1';
            monthlyLabel.style.fontWeight = '600';
            monthlyLabel.style.color = 'var(--orange-light)';
            yearlyLabel.style.opacity = '0.6';
            yearlyLabel.style.color = 'var(--orange-color)';
        }
    }
}

function animatePricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
}

function addSavingsIndicator() {
    // Remove existing indicators
    removeSavingsIndicator();
    
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        const planType = index === 0 ? 'basic' : 'pro';
        const monthlyPrice = PRICING_CONFIG.monthly[planType];
        const yearlyPrice = PRICING_CONFIG.yearly[planType];
        const savings = monthlyPrice - yearlyPrice;
        const savingsPercentage = Math.round((savings / monthlyPrice) * 100);
        
        const indicator = document.createElement('div');
        indicator.className = 'savings-indicator';
        indicator.innerHTML = `
            <span class="savings-text">Save ${savingsPercentage}%</span>
            <span class="savings-amount">$${savings}/month</span>
        `;
        
        const priceDisplay = card.querySelector('.price-display');
        if (priceDisplay) {
            priceDisplay.appendChild(indicator);
        }
    });
}

function removeSavingsIndicator() {
    const existingIndicators = document.querySelectorAll('.savings-indicator');
    existingIndicators.forEach(indicator => indicator.remove());
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .feature-item, .pricing-card, .hero-content, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Join Waitlist Buttons
function initJoinWaitlistButtons() {
    const waitlistButtons = document.querySelectorAll(
        '.nav-cta, .btn-primary, .btn-primary-enhanced, .pricing-btn'
    );
    
    waitlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openWaitlistModal();
        });
    });
}

// Waitlist Modal
function openWaitlistModal() {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="waitlist-modal">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>Join Our Waitlist</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Be among the first to experience Brazweed's powerful cannabis retail platform.</p>
                    <form class="waitlist-form" id="waitlist-form">
                        <div class="form-group">
                            <label for="business-name">Business Name</label>
                            <input type="text" id="business-name" name="businessName" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-name">Contact Name</label>
                            <input type="text" id="contact-name" name="contactName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="plan">Interested Plan</label>
                            <select id="plan" name="plan" required>
                                <option value="">Select a plan</option>
                                <option value="basic">Basic - CAD $99/month</option>
                                <option value="pro">Pro - CAD $149/month</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-primary full-width">Join Waitlist</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-container {
                background: white;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .modal-overlay.active .modal-container {
                transform: translateY(0);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid var(--border-light);
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 1.5rem;
                color: var(--text-dark);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-gray);
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: var(--bg-light);
                color: var(--text-dark);
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-body p {
                margin-bottom: 1.5rem;
                color: var(--text-gray);
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-dark);
            }
            
            .form-group input,
            .form-group select {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid var(--border-light);
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group select:focus {
                outline: none;
                border-color: var(--primary-color);
            }
            
            .full-width {
                width: 100%;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Remove existing modal if any
    const existingModal = document.getElementById('waitlist-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('waitlist-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('#waitlist-form');
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal handlers
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleWaitlistSubmission(form);
    });
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Handle Waitlist Form Submission
function handleWaitlistSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        // Success state
        submitBtn.textContent = 'Success!';
        submitBtn.style.background = '#6366f1';
        
        // Show success message
        const modalBody = form.closest('.modal-body');
        modalBody.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Welcome to the waitlist!</h3>
                <p>Thank you for your interest in Brazweed. We'll be in touch soon with updates on our launch.</p>
                <button class="btn-primary full-width" onclick="document.getElementById('waitlist-modal').querySelector('.modal-close').click()">
                    Close
                </button>
            </div>
        `;
        
        // Add success styles
        const successStyles = `
            .success-message {
                text-align: center;
                padding: 2rem 0;
            }
            
            .success-icon {
                font-size: 4rem;
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .success-message h3 {
                color: var(--text-dark);
                margin-bottom: 1rem;
            }
            
            .success-message p {
                color: var(--text-gray);
                margin-bottom: 2rem;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = successStyles;
        document.head.appendChild(styleElement);
        
        // Log form data (replace with actual API call)
        console.log('Waitlist submission:', data);
        
    }, 2000);
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

// Initialize active nav link tracking
updateActiveNavLink();

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('waitlist-modal');
        if (modal) {
            modal.querySelector('.modal-close').click();
        }
    }
});

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://via.placeholder.com/120x40/00C851/FFFFFF?text=BRAZWEED'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add CSS for additional animations and states
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .header {
        transition: all 0.3s ease;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 2rem;
            box-shadow: var(--shadow);
            z-index: 999;
        }
        
        .nav-menu.active .nav-item {
            margin: 1rem 0;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;

document.head.appendChild(additionalStyles);

// Interactive Simulator
function initInteractiveSimulator() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Tab switching functionality
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all nav items and tab contents
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding tab
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update chart if dashboard tab is selected
            if (targetTab === 'dashboard') {
                setTimeout(() => {
                    drawSalesChart();
                }, 100);
            }
        });
    });
    
    // Initialize chart
    setTimeout(() => {
        drawSalesChart();
    }, 500);
    
    // Animate stats on load
    animateStats();
}

function drawSalesChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Sample data for sales chart
    const data = [120, 190, 300, 500, 200, 300, 450];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Chart dimensions
    const chartPadding = 40;
    const chartWidth = width - chartPadding * 2;
    const chartHeight = height - chartPadding * 2;
    
    // Find max value for scaling
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const valueRange = maxValue - minValue;
    
    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
        const y = chartPadding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(chartPadding, y);
        ctx.lineTo(width - chartPadding, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= data.length - 1; i++) {
        const x = chartPadding + (chartWidth / (data.length - 1)) * i;
        ctx.beginPath();
        ctx.moveTo(x, chartPadding);
        ctx.lineTo(x, height - chartPadding);
        ctx.stroke();
    }
    
    // Draw line chart
    ctx.strokeStyle = '#b65843';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = chartPadding + (chartWidth / (data.length - 1)) * index;
        const y = height - chartPadding - ((value - minValue) / valueRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#b65843';
    data.forEach((value, index) => {
        const x = chartPadding + (chartWidth / (data.length - 1)) * index;
        const y = height - chartPadding - ((value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
        const x = chartPadding + (chartWidth / (data.length - 1)) * index;
        ctx.fillText(label, x, height - 10);
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = /^\d+$/.test(finalValue);
        const isCurrency = finalValue.includes('$');
        const isPercentage = finalValue.includes('%');
        
        if (isNumber || isCurrency || isPercentage) {
            let numValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
            let currentValue = 0;
            const increment = numValue / 50; // 50 steps
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numValue) {
                    currentValue = numValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(currentValue);
                if (isCurrency) {
                    displayValue = '$' + displayValue.toLocaleString();
                } else if (isPercentage) {
                    displayValue = displayValue + '%';
                }
                
                stat.textContent = displayValue;
            }, 30);
        }
    });
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stat boxes
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});

// Features Carousel
function initFeaturesCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const featureItems = document.querySelectorAll('.feature-item-right');
    let currentSlide = 0;
    let autoplayInterval;
    
    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Feature item hover handlers
    featureItems.forEach((item, index) => {
        const featureIndex = parseInt(item.getAttribute('data-feature'));
        
        item.addEventListener('mouseenter', () => {
            if (featureIndex !== undefined && featureIndex !== currentSlide) {
                goToSlide(featureIndex);
            }
        });
    });
    
    function goToSlide(index) {
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Draw chart if it's the dashboard slide
        if (currentSlide === 0) {
            setTimeout(() => {
                drawCarouselChart();
            }, 100);
        }
        
        // Reset autoplay
        resetAutoplay();
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Initialize chart and autoplay
    setTimeout(() => {
        drawCarouselChart();
        startAutoplay();
    }, 500);
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.features-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }
}

function drawCarouselChart() {
    const canvas = document.getElementById('carouselChart1');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Sample data
    const data = [150, 230, 180, 320, 280, 400, 350];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Chart dimensions
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find max and min values
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const valueRange = maxValue - minValue;
    
    // Draw grid
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw area under curve
    ctx.fillStyle = 'rgba(181, 88, 67, 0.1)';
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, height - padding);
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = '#b65843';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#b65843';
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}
