// AI-Powered Authentication System
const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');

// Initialize AI Particle System
function initAIParticles() {
    const canvas = document.getElementById('ai-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// AI Password Strength Analyzer
function analyzePasswordStrength(password) {
    let strength = 0;
    const tips = [];
    
    if (password.length >= 8) strength += 1;
    else tips.push('Use at least 8 characters');
    
    if (/[a-z]/.test(password)) strength += 1;
    else tips.push('Add lowercase letters');
    
    if (/[A-Z]/.test(password)) strength += 1;
    else tips.push('Add uppercase letters');
    
    if (/[0-9]/.test(password)) strength += 1;
    else tips.push('Add numbers');
    
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    else tips.push('Add special characters');
    
    if (password.length >= 12) strength += 1;
    
    return { strength, tips };
}

function updatePasswordStrength(input, strengthElement) {
    const password = input.value;
    if (!password) {
        strengthElement.style.opacity = '0';
        return;
    }
    
    const { strength, tips } = analyzePasswordStrength(password);
    const fill = strengthElement.querySelector('.strength-fill');
    const text = strengthElement.querySelector('.strength-text');
    const tipsContainer = strengthElement.querySelector('.strength-tips');
    
    fill.className = 'strength-fill';
    if (strength <= 2) {
        fill.classList.add('weak');
        text.textContent = 'Weak password';
        text.style.color = '#ff4444';
    } else if (strength <= 4) {
        fill.classList.add('medium');
        text.textContent = 'Medium password';
        text.style.color = '#ffaa00';
    } else {
        fill.classList.add('strong');
        text.textContent = 'Strong password';
        text.style.color = '#00ff88';
    }
    
    tipsContainer.innerHTML = tips.map(tip => 
        `<span class="tip">${tip}</span>`
    ).join('');
}

// AI Username Suggestions Generator
function generateUsernameSuggestions(input) {
    const value = input.value.toLowerCase().trim();
    if (!value || value.length < 2) return [];
    
    const suggestions = [];
    const prefixes = ['ai_', 'smart_', 'neo_', 'cyber_', 'tech_'];
    const suffixes = ['_ai', '_pro', '_dev', '_2024', '_x'];
    const numbers = ['123', '2024', '01', '99'];
    
    // Add variations
    suggestions.push(value + '_ai');
    suggestions.push('ai_' + value);
    suggestions.push(value + numbers[0]);
    
    prefixes.forEach(prefix => {
        if (!value.startsWith(prefix.replace('_', ''))) {
            suggestions.push(prefix + value);
        }
    });
    
    suffixes.forEach(suffix => {
        if (!value.endsWith(suffix.replace('_', ''))) {
            suggestions.push(value + suffix);
        }
    });
    
    return [...new Set(suggestions)].slice(0, 5);
}

function showUsernameSuggestions(input, suggestionsElement) {
    const suggestions = generateUsernameSuggestions(input);
    
    if (suggestions.length === 0) {
        suggestionsElement.classList.remove('show');
        return;
    }
    
    suggestionsElement.innerHTML = suggestions.map(suggestion => 
        `<div class="suggestion-item">${suggestion}</div>`
    ).join('');
    
    suggestionsElement.classList.add('show');
    
    suggestionsElement.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            input.value = item.textContent;
            suggestionsElement.classList.remove('show');
            input.focus();
        });
    });
}

// AI Email Validator
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const domain = email.split('@')[1];
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    
    if (domain && commonDomains.includes(domain.toLowerCase())) {
        return { valid: true, message: 'Valid email', verified: true };
    }
    
    return { valid: true, message: 'Valid email' };
}

function updateEmailValidation(input, validationElement) {
    const email = input.value.trim();
    
    if (!email) {
        validationElement.classList.remove('show', 'error', 'success');
        return;
    }
    
    const result = validateEmail(email);
    validationElement.textContent = result.message;
    validationElement.classList.add('show');
    
    if (result.valid) {
        validationElement.classList.remove('error');
        validationElement.classList.add('success');
    } else {
        validationElement.classList.remove('success');
        validationElement.classList.add('error');
    }
}

// Password Toggle Visibility
function setupPasswordToggle(toggle, input) {
    toggle.addEventListener('click', () => {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        toggle.classList.toggle('fa-eye');
        toggle.classList.toggle('fa-eye-slash');
    });
}

// Character Counter
function setupCharacterCounter(input, counter) {
    input.addEventListener('input', () => {
        const count = input.value.length;
        counter.textContent = `${count}/20`;
        
        if (count > 20) {
            counter.style.color = '#ff4444';
        } else if (count > 15) {
            counter.style.color = '#ffaa00';
        } else {
            counter.style.color = '#00d4ff';
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initAIParticles();
    
    // Login form elements
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    const loginPasswordToggle = document.getElementById('loginPasswordToggle');
    const loginPasswordStrength = document.getElementById('loginPasswordStrength');
    const loginSuggestions = document.getElementById('loginSuggestions');
    
    // Signup form elements
    const signupUsername = document.getElementById('signupUsername');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const signupPasswordToggle = document.getElementById('signupPasswordToggle');
    const signupPasswordStrength = document.getElementById('signupPasswordStrength');
    const signupSuggestions = document.getElementById('signupSuggestions');
    const usernameCounter = document.getElementById('usernameCounter');
    const emailValidation = document.getElementById('emailValidation');
    
    // Setup password toggles
    if (loginPasswordToggle && loginPassword) {
        setupPasswordToggle(loginPasswordToggle, loginPassword);
    }
    
    if (signupPasswordToggle && signupPassword) {
        setupPasswordToggle(signupPasswordToggle, signupPassword);
    }
    
    // Setup password strength indicators
    if (loginPassword && loginPasswordStrength) {
        loginPassword.addEventListener('input', () => {
            updatePasswordStrength(loginPassword, loginPasswordStrength);
        });
    }
    
    if (signupPassword && signupPasswordStrength) {
        signupPassword.addEventListener('input', () => {
            updatePasswordStrength(signupPassword, signupPasswordStrength);
        });
    }
    
    // Setup username suggestions
    if (loginUsername && loginSuggestions) {
        loginUsername.addEventListener('input', () => {
            showUsernameSuggestions(loginUsername, loginSuggestions);
        });
        
        document.addEventListener('click', (e) => {
            if (!loginSuggestions.contains(e.target) && e.target !== loginUsername) {
                loginSuggestions.classList.remove('show');
            }
        });
    }
    
    if (signupUsername && signupSuggestions) {
        signupUsername.addEventListener('input', () => {
            showUsernameSuggestions(signupUsername, signupSuggestions);
        });
        
        document.addEventListener('click', (e) => {
            if (!signupSuggestions.contains(e.target) && e.target !== signupUsername) {
                signupSuggestions.classList.remove('show');
            }
        });
    }
    
    // Setup character counter
    if (signupUsername && usernameCounter) {
        setupCharacterCounter(signupUsername, usernameCounter);
    }
    
    // Setup email validation
    if (signupEmail && emailValidation) {
        signupEmail.addEventListener('input', () => {
            updateEmailValidation(signupEmail, emailValidation);
        });
    }
    
    // Form submissions with AI feedback
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = loginForm.querySelector('.submit-button');
            button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<span class="button-text">Login Successful!</span><i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<span class="button-text">Login</span><i class="fa-solid fa-sparkles ai-sparkle"></i>';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = signupForm.querySelector('.submit-button');
            button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<span class="button-text">Account Created!</span><i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<span class="button-text">Register</span><i class="fa-solid fa-sparkles ai-sparkle"></i>';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
});

// Toggle between login and signup
registerTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.add('toggled');
});

loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    authWrapper.classList.remove('toggled');
});