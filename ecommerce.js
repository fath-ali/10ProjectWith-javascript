// E-commerce Application JavaScript

// Product Data
const products = [
    {
        id: 1,
        title: "iPhone 15 Pro",
        category: "smartphones",
        price: 999,
        originalPrice: 1099,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        description: "Latest iPhone with titanium design and A17 Pro chip",
        badge: "New"
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra",
        category: "smartphones",
        price: 849,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        description: "Flagship Android phone with S Pen and AI features",
        badge: "Sale"
    },
    {
        id: 3,
        title: "MacBook Pro 16\"",
        category: "laptops",
        price: 2499,
        originalPrice: 2699,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        description: "Professional laptop with M3 Pro chip and Liquid Retina XDR display",
        badge: "Hot"
    },
    {
        id: 4,
        title: "Dell XPS 13",
        category: "laptops",
        price: 1299,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        description: "Ultra-portable laptop with Intel Core i7 and stunning display",
        badge: "Sale"
    },
    {
        id: 5,
        title: "Sony WH-1000XM5",
        category: "headphones",
        price: 349,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "Industry-leading noise canceling wireless headphones",
        badge: "Popular"
    },
    {
        id: 6,
        title: "AirPods Pro 2",
        category: "headphones",
        price: 249,
        originalPrice: 279,
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop",
        description: "Active noise cancellation and spatial audio",
        badge: "New"
    },
    {
        id: 7,
        title: "iPad Pro 12.9\"",
        category: "tablets",
        price: 1099,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        description: "Most advanced iPad with M2 chip and Liquid Retina XDR",
        badge: "Pro"
    },
    {
        id: 8,
        title: "Samsung Galaxy Tab S9",
        category: "tablets",
        price: 799,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        description: "Premium Android tablet with S Pen included",
        badge: "Sale"
    },
    {
        id: 9,
        title: "Google Pixel 8 Pro",
        category: "smartphones",
        price: 699,
        originalPrice: 799,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        description: "AI-powered photography and pure Android experience",
        badge: "AI"
    },
    {
        id: 10,
        title: "ASUS ROG Zephyrus G14",
        category: "laptops",
        price: 1599,
        originalPrice: 1799,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
        description: "Gaming laptop with AMD Ryzen 9 and RTX 4060",
        badge: "Gaming"
    },
    {
        id: 11,
        title: "Bose QuietComfort 45",
        category: "headphones",
        price: 279,
        originalPrice: 329,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        description: "World-class noise cancellation and comfort",
        badge: "Comfort"
    },
    {
        id: 12,
        title: "Microsoft Surface Pro 9",
        category: "tablets",
        price: 999,
        originalPrice: 1099,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        description: "2-in-1 tablet and laptop with Intel Core i5",
        badge: "2-in-1"
    }
];

// Application State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');
const navLinks = document.querySelectorAll('.nav-link');
const toast = document.getElementById('toast');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    setupIntersectionObserver();
    setupSmoothScrolling();
});

// Product Rendering
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    const filteredProducts = productsToRender.filter(product => {
        const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Add animation
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                $${product.price}
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showToast(`${product.title} added to cart!`);
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            renderCartItems();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #64748b;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
                <p>Add some products to get started!</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Search and Filter Functionality
function setupEventListeners() {
    // Cart Toggle
    document.getElementById('cartToggle').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    
    // Search
    searchInput.addEventListener('input', handleSearch);
    
    // Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
    
    // Category Cards
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
    
    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
    
    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Mobile Menu Toggle
    document.getElementById('menuToggle').addEventListener('click', toggleMobileMenu);
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
    renderCartItems();
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleSearch(e) {
    searchQuery = e.target.value;
    renderProducts();
}

function handleFilter(e) {
    currentFilter = e.target.dataset.filter;
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    renderProducts();
}

function handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    currentFilter = category;
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    scrollToProducts();
    renderProducts();
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showToast('Processing your order...', 'info');
    
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        renderCartItems();
        closeCart();
        showToast('Order placed successfully! Thank you for shopping with us!', 'success');
    }, 2000);
}

function handleContactForm(e) {
    e.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-open');
}

// Utility Functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showToast(message, type = 'success') {
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Update icon and color based on type
    switch (type) {
        case 'success':
            toast.style.background = '#059669';
            toastIcon.className = 'fas fa-check-circle';
            break;
        case 'error':
            toast.style.background = '#ef4444';
            toastIcon.className = 'fas fa-exclamation-circle';
            break;
        case 'info':
            toast.style.background = '#2563eb';
            toastIcon.className = 'fas fa-info-circle';
            break;
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.category-card, .feature, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
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

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Open cart with Ctrl+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (cartSidebar.classList.contains('open')) {
            closeCart();
        } else {
            toggleCart();
        }
    }
    
    // Focus search with Ctrl+F
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Close cart with Escape
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        closeCart();
    }
});

// Window Load Event for Additional Setup
window.addEventListener('load', () => {
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Setup any additional features that need the page to be fully loaded
    setupAdvancedFeatures();
});

function setupAdvancedFeatures() {
    // Add parallax effect to hero section if supported
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Add lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Export functions for external use if needed
window.ecommerce = {
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    scrollToProducts
};