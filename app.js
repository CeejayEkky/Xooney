document.addEventListener('DOMContentLoaded', function() {
    // UI Elements
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const roleSelect = document.getElementById('register-role');
    const sellerFields = document.getElementById('seller-fields');
    const closeModals = document.querySelectorAll('.close-modal');
    const paymentModal = document.getElementById('payment-modal');
    const paymentItems = document.getElementById('payment-items');
    const paymentTotal = document.getElementById('payment-total');
    const completePaymentBtn = document.getElementById('complete-payment');
    const paymentMethods = document.querySelectorAll('.payment-method');


    const productsContainer = document.getElementById('products-container');
    const sellersContainer = document.getElementById('sellers-container');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message');
    const cartCount = document.querySelector('.cart-count');
    
    // Load initial data
    loadProducts();
    loadSellers();
    updateCartCount();
    
    // Set up event listeners
    setupAuthEventListeners();

    function setupAuthEventListeners() {
        // Show/hide auth modals
        document.querySelector('a[href="#profile"]').addEventListener('click', function(e) {
            e.preventDefault();
            if (window.db.getCurrentUser()) {
                toggleProfileMenu();
            } else {
                loginModal.style.display = 'flex';
            }
        });
        
        // Switch between login/register
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'flex';
        });
        
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
        
        // Close modals
        closeModals.forEach(btn => {
            btn.addEventListener('click', function() {
                loginModal.style.display = 'none';
                registerModal.style.display = 'none';
            });
        });
        
        // Show seller fields when role is seller
        roleSelect.addEventListener('change', function() {
            sellerFields.style.display = this.value === 'seller' ? 'block' : 'none';
        });
        
        // Login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            socialSellAPI.login(email, password)
                .then(user => {
                    loginModal.style.display = 'none';
                    showToast(`Welcome back, ${user.name}!`);
                    updateUIForAuthState();
                })
                .catch(error => {
                    showToast(error.message, true);
                });
        });
        
        // Register form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById('register-name').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value,
                role: document.getElementById('register-role').value
            };
            
            if (userData.role === 'seller') {
                userData.shopName = document.getElementById('register-shop-name').value;
                userData.shopDescription = document.getElementById('register-shop-desc').value;
            }
            
            socialSellAPI.register(userData)
                .then(user => {
                    registerModal.style.display = 'none';
                    showToast(`Welcome to SocialSell, ${user.name}!`);
                    updateUIForAuthState();
                })
                .catch(error => {
                    showToast(error.message, true);
                });
        });
    }

    function toggleProfileMenu() {
        document.getElementById('profile-menu').classList.toggle('show');
    }

    function updateUIForAuthState() {
        const user = window.db.getCurrentUser();
        const profileLink = document.querySelector('a[href="#profile"]');
        
        if (user) {
            // Update profile link to show user's name or avatar
            profileLink.innerHTML = `<i class="fas fa-user"></i> ${user.name.split(' ')[0]}`;
            
            // Create profile menu if it doesn't exist
            if (!document.getElementById('profile-menu')) {
                const profileMenu = document.createElement('div');
                profileMenu.id = 'profile-menu';
                profileMenu.className = 'profile-menu';
                
                let menuItems = `
                    <a href="#profile">My Profile</a>
                    <a href="#purchases">My Purchases</a>
                `;
                
                if (user.role === 'seller') {
                    menuItems += `<a href="#dashboard">Seller Dashboard</a>`;
                }
                
                menuItems += `<a href="#logout" id="logout-btn">Logout</a>`;
                profileMenu.innerHTML = menuItems;
                
                profileLink.parentNode.appendChild(profileMenu);
                
                // Add logout handler
                document.getElementById('logout-btn').addEventListener('click', function(e) {
                    e.preventDefault();
                    socialSellAPI.logout().then(() => {
                        showToast('Logged out successfully');
                        updateUIForAuthState();
                        if (document.getElementById('profile-menu')) {
                            document.getElementById('profile-menu').remove();
                        }
                    });
                });
            }
        } else {
            profileLink.innerHTML = '<i class="fas fa-user"></i>';
        }
    }

    setupPaymentEventListeners();

    function setupPaymentEventListeners() {
        // Cart icon click
        document.querySelector('a[href="#cart"]').addEventListener('click', function(e) {
            e.preventDefault();
            if (window.db.getCurrentUser()) {
                showPaymentModal();
            } else {
                showToast('Please login to proceed to checkout', true);
                loginModal.style.display = 'flex';
            }
        });
        
        // Payment method selection
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('selected'));
                this.classList.add('selected');
                
                // Show the corresponding payment form
                document.querySelectorAll('.payment-form').forEach(form => {
                    form.style.display = 'none';
                });
                
                const methodId = this.getAttribute('data-method');
                document.getElementById(`${methodId}-payment`).style.display = 'block';
            });
        });
        
        // Complete payment
        completePaymentBtn.addEventListener('click', function() {
            processPayment();
        });
    }

function showPaymentModal() {
    // Get current cart
    socialSellAPI.getCart().then(cart => {
        if (cart.items.length === 0) {
            showToast('Your cart is empty', true);
            return;
        }
        
        // Calculate total and display items
        let total = 0;
        paymentItems.innerHTML = '';
        
        Promise.all(cart.items.map(item => {
            return socialSellAPI.getProductById(item.productId)
                .then(product => {
                    const itemTotal = product.price * item.quantity;
                    total += itemTotal;
                    
                    const itemElement = document.createElement('div');
                    itemElement.className = 'payment-item';
                    itemElement.innerHTML = `
                        <span>${product.name} x${item.quantity}</span>
                        <span>$${itemTotal.toFixed(2)}</span>
                    `;
                    paymentItems.appendChild(itemElement);
                });
        }).then(() => {
            paymentTotal.textContent = `$${total.toFixed(2)}`;
            paymentModal.style.display = 'flex';
        }));
    });
}

function processPayment() {
    const selectedMethod = document.querySelector('.payment-method.selected');
    const paymentMethod = selectedMethod.getAttribute('data-method');
    
    // Get cart items and total
    socialSellAPI.getCart().then(cart => {
        if (cart.items.length === 0) {
            showToast('Your cart is empty', true);
            return;
        }
        
        // Calculate total
        let total = 0;
        const itemsWithDetails = [];
        
        Promise.all(cart.items.map(item => {
            return socialSellAPI.getProductById(item.productId)
                .then(product => {
                    const itemTotal = product.price * item.quantity;
                    total += itemTotal;
                    itemsWithDetails.push({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity
                    });
                });
        })).then(() => {
            // Process payment
            const paymentData = {
                amount: total,
                currency: 'USD',
                method: paymentMethod,
                items: itemsWithDetails
            };
            
            completePaymentBtn.disabled = true;
            completePaymentBtn.textContent = 'Processing...';
            
            // In a real app, you would:
            // 1. For Stripe: Create a PaymentIntent and confirm the card payment
            // 2. For PayPal: Redirect to PayPal approval URL
            
            // For our simulation:
            socialSellAPI.processPayment(paymentData)
                .then(paymentResult => {
                    if (paymentResult.success) {
                        // Create order
                        return socialSellAPI.createOrder({
                            items: itemsWithDetails,
                            total: total,
                            paymentMethod: paymentMethod
                        });
                    } else {
                        throw new Error('Payment failed');
                    }
                })
                .then(order => {
                    paymentModal.style.display = 'none';
                    showToast('Payment successful! Order #' + order.id);
                    updateCartCount();
                })
                .catch(error => {
                    showToast('Payment failed: ' + error.message, true);
                })
                .finally(() => {
                    completePaymentBtn.disabled = false;
                    completePaymentBtn.textContent = 'Pay Now';
                });
        });
    });
}

    setupEventListeners();
    
    function loadProducts() {
        socialSellAPI.getProducts()
            .then(products => {
                renderProducts(products);
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });
    }
    
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }
    
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-seller">By ${getSellerName(product.sellerId)}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-outline view-details" data-id="${product.id}">Details</button>
                </div>
            </div>
        `;
        
        return productElement;
    }
    
    function getSellerName(sellerId) {
        const seller = window.db.getSellers().find(s => s.id === sellerId);
        return seller ? seller.name : 'Unknown Seller';
    }
    
    function loadSellers() {
        socialSellAPI.getSellers()
            .then(sellers => {
                renderSellers(sellers);
            })
            .catch(error => {
                console.error('Error loading sellers:', error);
            });
    }
    
    function renderSellers(sellers) {
        sellersContainer.innerHTML = '';
        
        sellers.forEach(seller => {
            const sellerElement = createSellerElement(seller);
            sellersContainer.appendChild(sellerElement);
        });
    }
    
    function createSellerElement(seller) {
        const sellerElement = document.createElement('div');
        sellerElement.className = 'seller-card';
        
        sellerElement.innerHTML = `
            <img src="${seller.avatar}" alt="${seller.name}" class="seller-avatar">
            <h4 class="seller-name">${seller.name}</h4>
            <div class="seller-rating">
                ${renderRatingStars(seller.rating)}
            </div>
            <button class="btn btn-outline view-seller" data-id="${seller.id}">View Shop</button>
        `;
        
        return sellerElement;
    }
    
    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    function updateCartCount() {
        socialSellAPI.getCart()
            .then(cart => {
                cartCount.textContent = cart.totalItems;
            });
    }
    
    function setupEventListeners() {
        // Add to cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = e.target.getAttribute('data-id');
                addToCart(productId);
            }
            
            // View seller buttons
            if (e.target.classList.contains('view-seller')) {
                const sellerId = e.target.getAttribute('data-id');
                viewSeller(sellerId);
            }
            
            // View product details buttons
            if (e.target.classList.contains('view-details')) {
                const productId = e.target.getAttribute('data-id');
                viewProductDetails(productId);
            }
            
            // Chat icon
            if (e.target.closest('a[href="#messages"]')) {
                e.preventDefault();
                toggleChat();
            }
            
            // Close chat
            if (e.target.classList.contains('close-chat')) {
                closeChat();
            }
        });
        
        // Send message
        sendMessageBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function addToCart(productId) {
        socialSellAPI.addToCart(productId)
            .then(() => {
                updateCartCount();
                showToast('Item added to cart!');
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                showToast('Failed to add item to cart', true);
            });
    }
    
    function viewSeller(sellerId) {
        // In a real app, this would navigate to a seller page
        socialSellAPI.getSellerById(sellerId)
            .then(seller => {
                showToast(`Viewing ${seller.name}'s shop`);
            })
            .catch(error => {
                console.error('Error loading seller:', error);
            });
    }
    
    function viewProductDetails(productId) {
        // In a real app, this would navigate to a product detail page
        socialSellAPI.getProductById(productId)
            .then(product => {
                showToast(`Viewing details for ${product.name}`);
            })
            .catch(error => {
                console.error('Error loading product:', error);
            });
    }
    
    function toggleChat() {
        const chatWidget = document.querySelector('.chat-widget');
        if (chatWidget.style.display === 'block') {
            chatWidget.style.display = 'none';
        } else {
            chatWidget.style.display = 'block';
            loadChatMessages();
        }
    }
    
    function closeChat() {
        document.querySelector('.chat-widget').style.display = 'none';
    }
    
    function loadChatMessages() {
        socialSellAPI.getMessages()
            .then(messages => {
                renderMessages(messages);
            })
            .catch(error => {
                console.error('Error loading messages:', error);
            });
    }
    
    function renderMessages(messages) {
        chatMessages.innerHTML = '';
        
        // Sort messages by timestamp
        messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.senderId === window.db.getCurrentUser().id ? 'sent' : 'received'}`;
            messageElement.textContent = message.content;
            chatMessages.appendChild(messageElement);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function sendMessage() {
        const content = messageInput.value.trim();
        if (!content) return;
        
        const currentUser = window.db.getCurrentUser();
        // For demo, we'll send to the first seller
        const sellerId = window.db.getSellers()[0].id;
        
        socialSellAPI.sendMessage(content, currentUser.id, sellerId)
            .then(() => {
                messageInput.value = '';
                loadChatMessages();
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
    
    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'error' : ''}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Add toast styles dynamically
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        
        .toast.show {
            opacity: 1;
        }
        
        .toast.error {
            background-color: var(--danger-color);
        }
    `;
    document.head.appendChild(toastStyles);

    updateUIForAuthState();
});