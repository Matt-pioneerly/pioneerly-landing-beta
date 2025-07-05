// DOM Elements
const betaForm = document.getElementById('betaForm');
const emailInput = document.getElementById('email');
const submitBtn = document.querySelector('.submit-btn');
const formGroup = document.querySelector('.form-group');

// Form handling
betaForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Simulate API call (replace with actual endpoint)
        await submitEmail(email);
        
        // Show success state
        showSuccess('Thank you! We\'ll notify you when the beta launches.');
        
        // Reset form
        emailInput.value = '';
        
    } catch (error) {
        showError('Something went wrong. Please try again.');
    } finally {
        setLoadingState(false);
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Loading state management
function setLoadingState(loading) {
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Success state
function showSuccess(message) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    successMsg.style.cssText = `
        color: #10b981;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        font-weight: 500;
    `;
    
    // Remove existing messages
    const existingMsg = formGroup.parentNode.querySelector('.success-message, .error-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    formGroup.parentNode.appendChild(successMsg);
    
    // Remove success state after 5 seconds
    setTimeout(() => {
        formGroup.classList.remove('success');
        successMsg.remove();
    }, 5000);
}

// Error state
function showError(message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    errorMsg.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        font-weight: 500;
    `;
    
    // Remove existing messages
    const existingMsg = formGroup.parentNode.querySelector('.success-message, .error-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    formGroup.parentNode.appendChild(errorMsg);
    
    // Remove error state after 5 seconds
    setTimeout(() => {
        formGroup.classList.remove('error');
        errorMsg.remove();
    }, 5000);
}

// Simulate API call (replace with actual implementation)
async function submitEmail(email) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

// Smooth scroll for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe benefit cards for staggered animation
document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Input focus effects
emailInput.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
});

emailInput.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
});

// Keyboard navigation
emailInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !submitBtn.disabled) {
        betaForm.dispatchEvent(new Event('submit'));
    }
});

// Add subtle parallax effect to background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const backgroundOverlay = document.querySelector('.background-overlay');
    
    if (backgroundOverlay) {
        backgroundOverlay.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effect to benefit cards
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(function() {
    // Any additional scroll-based animations can go here
}, 16));

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Pioneerly Beta Landing Page loaded successfully');
    
    // Preload any critical resources
    const criticalImages = [
        // Add any critical image URLs here if needed
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Analytics tracking (example - replace with actual analytics)
function trackEvent(eventName, properties = {}) {
    // Replace with your analytics implementation
    console.log('Analytics Event:', eventName, properties);
    
    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
}

// Track form submission
betaForm.addEventListener('submit', function() {
    trackEvent('beta_signup_attempt', {
        email_domain: emailInput.value.split('@')[1] || 'unknown'
    });
});

// Track successful signup
function trackSuccessfulSignup(email) {
    trackEvent('beta_signup_success', {
        email_domain: email.split('@')[1] || 'unknown'
    });
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Page Error:', e.error);
    trackEvent('page_error', {
        message: e.error?.message || 'Unknown error',
        filename: e.filename,
        lineno: e.lineno
    });
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Modal open/close logic
document.getElementById('open-modal-btn').onclick = function() {
  document.getElementById('modal-overlay').style.display = 'flex';
};
document.getElementById('modal-close').onclick = function() {
  document.getElementById('modal-overlay').style.display = 'none';
};
// Optional: close modal when clicking outside the modal content
document.getElementById('modal-overlay').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
}; 
