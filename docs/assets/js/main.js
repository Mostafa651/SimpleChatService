// Main JavaScript for Advanced Roblox Chat System Documentation

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const demoMessages = document.querySelector('.demo-messages');
const demoInput = document.querySelector('.demo-input input');
const demoSendBtn = document.querySelector('.demo-input button');
const featureButtons = document.querySelectorAll('.feature-btn');

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Stagger animations for child elements
                const children = entry.target.querySelectorAll('.scroll-animate');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Navigation with Mobile Menu
function initEnhancedNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced Button Interactions
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced Performance Metrics Animation
function animateCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Enhanced Chat Demo with More Interactions
function initEnhancedChatDemo() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    
    const demoMessages = [
        { user: 'Player1', message: 'Hey everyone! 👋', type: 'user' },
        { user: 'Admin', message: 'Welcome to the server!', type: 'admin' },
        { user: 'Player2', message: 'This chat system is amazing!', type: 'user' },
        { user: 'System', message: 'Player3 joined the game', type: 'system' },
        { user: 'Player1', message: 'Check out this <b>rich text</b> support!', type: 'user' },
        { user: 'Moderator', message: '/mute Player4 Spamming', type: 'admin' },
        { user: 'System', message: 'Player4 has been muted for 5 minutes', type: 'system' }
    ];
    
    let messageIndex = 0;
    
    function addMessage(messageData, animate = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${messageData.type}-message`;
        
        if (animate) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
        }
        
        messageDiv.innerHTML = `
            <span class="message-user">${messageData.user}:</span>
            <span class="message-text">${messageData.message}</span>
            <span class="message-time">${new Date().toLocaleTimeString()}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        if (animate) {
            setTimeout(() => {
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
                messageDiv.style.transition = 'all 0.3s ease';
            }, 100);
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove old messages to prevent overflow
        if (chatMessages.children.length > 10) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
    }
    
    function startDemoMessages() {
        if (messageIndex < demoMessages.length) {
            addMessage(demoMessages[messageIndex]);
            messageIndex++;
            setTimeout(startDemoMessages, 2000 + Math.random() * 1000);
        } else {
            messageIndex = 0;
            setTimeout(startDemoMessages, 5000);
        }
    }
    
    // User input handling
    function handleUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage({
                user: 'You',
                message: message,
                type: 'user'
            });
            chatInput.value = '';
            
            // Simulate response
            setTimeout(() => {
                const responses = [
                    'Great message!',
                    'Thanks for testing!',
                    'The system works perfectly!',
                    'Nice to see you here!'
                ];
                addMessage({
                    user: 'Bot',
                    message: responses[Math.floor(Math.random() * responses.length)],
                    type: 'system'
                });
            }, 1000);
        }
    }
    
    sendButton.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
    
    // Start demo
    setTimeout(startDemoMessages, 1000);
}

// Theme Switching with Smooth Transitions
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('[data-theme]');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            
            // Add transition class
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
            
            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Loading Screen Animation
function initLoadingScreen() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
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
}

// Enhanced Typewriter Effect
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid var(--primary-color)' 
                        : 'none';
                }, 500);
            }
        };
        
        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initEnhancedNavigation();
    initParallaxEffects();
    initButtonEffects();
    animateCounters();
    initEnhancedChatDemo();
    initThemeSwitcher();
    initLoadingScreen();
    initSmoothScrolling();
    initTypewriterEffect();
    
    // Add scroll-animate classes to elements
    document.querySelectorAll('.feature-card, .performance-card, .demo-card, .section-title, .section-subtitle').forEach((el, index) => {
        el.classList.add('scroll-animate');
        if (index % 3 === 0) el.classList.add('slide-left');
        else if (index % 3 === 1) el.classList.add('zoom-in');
        else el.classList.add('slide-right');
    });
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Demo Chat functionality
function initializeDemoChat() {
    const demoData = {
        messages: [
            { type: 'system', content: 'Server started - Advanced Chat System v1.0.0', timestamp: '12:00' },
            { type: 'system', content: 'Player1 joined the game', timestamp: '12:01' },
            { type: 'player', author: 'Player1', content: 'Hello everyone!', timestamp: '12:01' },
            { type: 'system', content: 'Admin joined the game', timestamp: '12:02' },
            { type: 'admin', author: 'Admin', content: 'Welcome to the server!', timestamp: '12:02' },
            { type: 'player', author: 'Player1', content: 'Thanks! This chat system looks amazing!', timestamp: '12:03' }
        ],
        currentIndex: 0
    };

    // Auto-play demo messages
    function playDemoMessages() {
        if (demoMessages && demoData.currentIndex < demoData.messages.length) {
            const message = demoData.messages[demoData.currentIndex];
            addDemoMessage(message);
            demoData.currentIndex++;
            
            setTimeout(playDemoMessages, 2000);
        } else if (demoMessages) {
            // Reset and replay
            setTimeout(() => {
                demoMessages.innerHTML = '';
                demoData.currentIndex = 0;
                playDemoMessages();
            }, 5000);
        }
    }

    function addDemoMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = `demo-message ${message.type}`;
        
        let content = '';
        if (message.type === 'system') {
            content = `<span class="demo-timestamp">${message.timestamp}</span><span>${message.content}</span>`;
        } else {
            content = `<span class="demo-timestamp">${message.timestamp}</span><span class="demo-author">${message.author}:</span><span>${message.content}</span>`;
        }
        
        messageEl.innerHTML = content;
        demoMessages.appendChild(messageEl);
        demoMessages.scrollTop = demoMessages.scrollHeight;
    }

    // Interactive demo input
    if (demoInput && demoSendBtn) {
        function sendDemoMessage() {
            const text = demoInput.value.trim();
            if (text) {
                const now = new Date();
                const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                
                addDemoMessage({
                    type: 'player',
                    author: 'You',
                    content: text,
                    timestamp: timestamp
                });
                
                demoInput.value = '';
                
                // Auto-response
                setTimeout(() => {
                    const responses = [
                        'Great message!',
                        'I agree!',
                        'Nice one!',
                        'Thanks for sharing!',
                        'Interesting point!'
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    addDemoMessage({
                        type: 'player',
                        author: 'Player2',
                        content: randomResponse,
                        timestamp: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`
                    });
                }, 1000);
            }
        }

        demoSendBtn.addEventListener('click', sendDemoMessage);
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }

    // Feature buttons
    featureButtons.forEach(button => {
        button.addEventListener('click', () => {
            const feature = button.textContent.trim();
            let demoMessage = {};
            
            switch(feature) {
                case '🛡️ Admin Commands':
                    demoMessage = {
                        type: 'admin',
                        author: 'Admin',
                        content: '/mute Player1 5m Spamming',
                        timestamp: '12:05'
                    };
                    break;
                case '⚡ Rate Limiting':
                    demoMessage = {
                        type: 'system',
                        content: 'Rate limit applied to Player1 (3 messages/10s)',
                        timestamp: '12:06'
                    };
                    break;
                case '🌍 Multi-Language':
                    demoMessage = {
                        type: 'player',
                        author: 'Player3',
                        content: 'Hola! ¿Cómo están todos?',
                        timestamp: '12:07'
                    };
                    break;
                case '🔒 Security':
                    demoMessage = {
                        type: 'system',
                        content: 'Message filtered: inappropriate content detected',
                        timestamp: '12:08'
                    };
                    break;
                case '📊 Analytics':
                    demoMessage = {
                        type: 'system',
                        content: 'Chat activity: 45 messages/min | 12 active users',
                        timestamp: '12:09'
                    };
                    break;
                default:
                    demoMessage = {
                        type: 'system',
                        content: `${feature} feature demonstrated`,
                        timestamp: '12:10'
                    };
            }
            
            addDemoMessage(demoMessage);
        });
    });

    // Start demo
    setTimeout(playDemoMessages, 1000);
}

// Animations and scroll effects
function initializeAnimations() {
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.setProperty('--duration', `${8 + index * 2}s`);
        element.style.setProperty('--delay', `${index * 0.5}s`);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .doc-card, .metric, .stat').forEach(el => {
        observer.observe(el);
    });
}

function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Progress indicator (optional)
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Typewriter effect for hero title
function initializeTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            let displayValue = Math.floor(current);
            if (counter.textContent.includes('%')) {
                displayValue += '%';
            } else if (counter.textContent.includes('ms')) {
                displayValue += 'ms';
            } else if (counter.textContent.includes('x')) {
                displayValue += 'x';
            } else if (displayValue >= 1000) {
                displayValue = (displayValue / 1000).toFixed(1) + 'K';
            }
            
            counter.textContent = displayValue;
        }, 16);
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Chat window interactions
function initializeChatPreview() {
    const chatWindow = document.querySelector('.chat-preview');
    if (!chatWindow) return;

    // Add hover effects
    chatWindow.addEventListener('mouseenter', () => {
        chatWindow.style.transform = 'scale(1.05) rotateY(5deg)';
    });

    chatWindow.addEventListener('mouseleave', () => {
        chatWindow.style.transform = 'scale(1) rotateY(0deg)';
    });
}

// Performance chart simulation
function initializePerformanceChart() {
    const chartContainer = document.querySelector('.performance-chart');
    if (!chartContainer) return;

    // Create a simple animated chart
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    chartContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let animationFrame = 0;

    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 10; i++) {
            const x = (canvas.width / 10) * i;
            const y = (canvas.height / 10) * i;
            
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw performance line
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i += 5) {
            const progress = (i + animationFrame) / canvas.width;
            const y = canvas.height - (Math.sin(progress * Math.PI * 4) * 30 + 50 + Math.random() * 10);
            
            if (i === 0) {
                ctx.moveTo(i, y);
            } else {
                ctx.lineTo(i, y);
            }
        }
        
        ctx.stroke();
        
        animationFrame += 2;
        if (animationFrame > canvas.width) animationFrame = 0;
        
        requestAnimationFrame(drawChart);
    }

    drawChart();
}

// Utility functions
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
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Export functions for potential external use
window.ChatSystemDocs = {
    initializeNavigation,
    initializeDemoChat,
    initializeAnimations,
    debounce,
    throttle
};