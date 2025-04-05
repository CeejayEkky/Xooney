// Simulated database for Social Selling App
class SocialSellDB {
    constructor() {
        // Initialize with sample data
        this.products = [
            {
                id: '1',
                name: 'Handmade Ceramic Mug',
                description: 'Beautiful handcrafted ceramic mug with unique design',
                price: 24.99,
                sellerId: '101',
                image: 'assets/products/mug.jpg',
                rating: 4.8,
                tags: ['home', 'kitchen', 'handmade'],
                stock: 15,
                createdAt: '2023-01-10T09:30:00Z'
            },
            {
                id: '2',
                name: 'Organic Cotton T-Shirt',
                description: '100% organic cotton t-shirt, eco-friendly',
                price: 29.99,
                sellerId: '102',
                image: 'assets/products/tshirt.jpg',
                rating: 4.5,
                tags: ['clothing', 'eco'],
                stock: 42,
                createdAt: '2023-02-15T11:20:00Z'
            },
            {
                id: '3',
                name: 'Wooden Phone Stand',
                description: 'Minimalist wooden stand for your phone or tablet',
                price: 15.99,
                sellerId: '103',
                image: 'assets/products/stand.jpg',
                rating: 4.7,
                tags: ['tech', 'wood'],
                stock: 28,
                createdAt: '2023-01-25T14:15:00Z'
            },
            {
                id: '4',
                name: 'Handwoven Basket',
                description: 'Traditional handwoven basket for storage or decor',
                price: 34.99,
                sellerId: '104',
                image: 'assets/products/basket.jpg',
                rating: 4.9,
                tags: ['home', 'decor'],
                stock: 8,
                createdAt: '2023-03-05T10:00:00Z'
            },
            {
                id: '5',
                name: 'Leather Wallet',
                description: 'Genuine leather wallet with multiple card slots',
                price: 39.99,
                sellerId: '105',
                image: 'assets/products/wallet.jpg',
                rating: 4.6,
                tags: ['accessories'],
                stock: 20,
                createdAt: '2023-02-28T16:45:00Z'
            },
            {
                id: '6',
                name: 'Aromatherapy Candle',
                description: 'Soy wax candle with lavender essential oils',
                price: 19.99,
                sellerId: '106',
                image: 'assets/products/candle.jpg',
                rating: 4.7,
                tags: ['home', 'wellness'],
                stock: 35,
                createdAt: '2023-03-12T13:10:00Z'
            }
        ];

        this.sellers = [
            {
                id: '101',
                name: 'Crafty Ceramics',
                avatar: 'assets/sellers/ceramics.jpg',
                rating: 4.8,
                products: ['1'],
                joined: '2022-01-15',
                description: 'Handcrafted ceramic products made with love',
                location: 'Portland, OR'
            },
            {
                id: '102',
                name: 'Eco Threads',
                avatar: 'assets/sellers/ecothreads.webp',
                rating: 4.5,
                products: ['2'],
                joined: '2022-03-22',
                description: 'Sustainable clothing for the eco-conscious',
                location: 'Austin, TX'
            },
            {
                id: '103',
                name: 'Wood Works',
                avatar: 'assets/sellers/woodworks.jpg',
                rating: 4.7,
                products: ['3'],
                joined: '2021-11-05',
                description: 'Handmade wooden goods from reclaimed materials',
                location: 'Denver, CO'
            },
            {
                id: '104',
                name: 'Weave Masters',
                avatar: 'assets/sellers/weavers.jpg',
                rating: 4.9,
                products: ['4'],
                joined: '2022-05-18',
                description: 'Traditional weaving techniques for modern homes',
                location: 'Santa Fe, NM'
            },
            {
                id: '105',
                name: 'Leather & Co',
                avatar: 'assets/sellers/leather.jpg',
                rating: 4.6,
                products: ['5'],
                joined: '2022-02-10',
                description: 'Fine leather goods crafted to last',
                location: 'Chicago, IL'
            },
            {
                id: '106',
                name: 'Scented Moments',
                avatar: 'assets/sellers/scented.jpg',
                rating: 4.7,
                products: ['6'],
                joined: '2022-04-30',
                description: 'Hand-poured candles for relaxing moments',
                location: 'Seattle, WA'
            }
        ];

        this.users = [
            {
                id: '201',
                name: 'User',
                email: 'user@example.com',
                password: 'password123', // In real app, store hashed passwords
                role: 'buyer',
                avatar: 'assets/users/jay.jpg',
                joined: '2023-01-15',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '90210',
                    country: 'USA'
                },
                paymentMethods: [
                    {
                        id: 'card_1',
                        type: 'card',
                        last4: '4242',
                        brand: 'Visa',
                        exp_month: 12,
                        exp_year: 2025
                    }
                ]
            },
            {
                id: '202',
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password123',
                role: 'seller',
                shopName: 'Crafty Ceramics',
                shopDescription: 'Handmade ceramic products',
                avatar: 'assets/users/jane.jpg',
                joined: '2022-11-20',
                address: {
                    street: '456 Artisan Way',
                    city: 'Portland',
                    state: 'OR',
                    zip: '97201',
                    country: 'USA'
                }
            },
            {
                id: '203',
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123',
                role: 'admin',
                avatar: 'assets/users/admin.jpg',
                joined: '2021-05-10'
            }
        ];

        this.messages = [
            {
                id: '1',
                content: 'Hi there! I have a question about your ceramic mug',
                senderId: '201',
                receiverId: '101',
                timestamp: '2023-05-10T10:30:00Z',
                status: 'read'
            },
            {
                id: '2',
                content: 'Hello! What would you like to know?',
                senderId: '101',
                receiverId: '201',
                timestamp: '2023-05-10T10:32:00Z',
                status: 'read'
            }
        ];

        this.cart = {
            items: [],
            totalItems: 0,
            lastUpdated: null
        };

        this.orders = [
            {
                id: '1001',
                userId: '201',
                items: [
                    {
                        productId: '1',
                        name: 'Handmade Ceramic Mug',
                        price: 24.99,
                        quantity: 2
                    }
                ],
                total: 49.98,
                shippingAddress: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '90210',
                    country: 'USA'
                },
                paymentMethod: 'stripe',
                paymentStatus: 'paid',
                status: 'shipped',
                trackingNumber: 'USPS123456789',
                date: '2023-04-15T14:30:00Z'
            }
        ];

        this.paymentMethods = [
            { id: 'stripe', name: 'Credit/Debit Card', icon: 'assets/payment/stripe.png' },
            { id: 'paypal', name: 'PayPal', icon: 'assets/payment/paypal.png' }
        ];

        this.reviews = [
            {
                id: '1',
                productId: '1',
                userId: '201',
                rating: 5,
                comment: 'Absolutely love this mug! The craftsmanship is amazing.',
                date: '2023-04-20T09:15:00Z'
            }
        ];

        this.currentUser = this.users[0]; // Default to first user for demo
        
        // Load from localStorage if available
        this.loadFromLocalStorage();
    }

    // Save to localStorage
    saveToLocalStorage() {
        localStorage.setItem('socialSellCart', JSON.stringify(this.cart));
        localStorage.setItem('socialSellMessages', JSON.stringify(this.messages));
        localStorage.setItem('socialSellOrders', JSON.stringify(this.orders));
        localStorage.setItem('socialSellCurrentUser', JSON.stringify(this.currentUser));
    }

    // Load from localStorage
    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('socialSellCart');
        const savedMessages = localStorage.getItem('socialSellMessages');
        const savedOrders = localStorage.getItem('socialSellOrders');
        const savedCurrentUser = localStorage.getItem('socialSellCurrentUser');
        
        if (savedCart) this.cart = JSON.parse(savedCart);
        if (savedMessages) this.messages = JSON.parse(savedMessages);
        if (savedOrders) this.orders = JSON.parse(savedOrders);
        if (savedCurrentUser) this.currentUser = JSON.parse(savedCurrentUser);
    }

    // ======================
    // PRODUCT METHODS
    // ======================
    getProducts() {
        return [...this.products];
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    addProduct(productData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newProduct = {
                    id: Date.now().toString(),
                    ...productData,
                    rating: 0,
                    stock: productData.stock || 0,
                    createdAt: new Date().toISOString()
                };
                
                this.products.push(newProduct);
                
                // Add to seller's product list
                const seller = this.sellers.find(s => s.id === productData.sellerId);
                if (seller) {
                    seller.products.push(newProduct.id);
                }
                
                resolve(newProduct);
            }, 500);
        });
    }

    updateProduct(id, updates) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.products.findIndex(p => p.id === id);
                if (index !== -1) {
                    this.products[index] = { ...this.products[index], ...updates };
                    resolve(this.products[index]);
                } else {
                    reject(new Error('Product not found'));
                }
            }, 500);
        });
    }

    // ======================
    // USER AUTHENTICATION
    // ======================
    authenticateUser(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(u => 
                    u.email === email && u.password === password
                );
                
                if (user) {
                    this.currentUser = { ...user };
                    this.saveToLocalStorage();
                    resolve(user);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 500);
        });
    }

    registerUser(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check if email already exists
                if (this.users.some(u => u.email === userData.email)) {
                    reject(new Error('Email already in use'));
                    return;
                }
                
                const newUser = {
                    id: Date.now().toString(),
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                    avatar: userData.avatar || 'assets/users/default.jpg',
                    joined: new Date().toISOString()
                };
                
                if (userData.role === 'seller') {
                    newUser.shopName = userData.shopName;
                    newUser.shopDescription = userData.shopDescription;
                    
                    // Create a seller profile
                    const newSeller = {
                        id: newUser.id,
                        name: userData.shopName,
                        avatar: newUser.avatar,
                        rating: 0,
                        products: [],
                        joined: newUser.joined,
                        description: userData.shopDescription
                    };
                    this.sellers.push(newSeller);
                }
                
                this.users.push(newUser);
                this.currentUser = { ...newUser };
                this.saveToLocalStorage();
                resolve(newUser);
            }, 800);
        });
    }

    logoutUser() {
        this.currentUser = null;
        this.cart = { items: [], totalItems: 0, lastUpdated: null };
        this.saveToLocalStorage();
    }

    getCurrentUser() {
        return this.currentUser ? { ...this.currentUser } : null;
    }

    // ======================
    // CART METHODS
    // ======================
    getCart() {
        return { ...this.cart };
    }

    addToCart(productId, quantity = 1) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id === productId);
                if (!product) {
                    resolve(this.cart);
                    return;
                }
                
                const existingItem = this.cart.items.find(item => item.productId === productId);
                
                if (existingItem) {
                    // Check stock availability
                    if (product.stock < existingItem.quantity + quantity) {
                        resolve(this.cart);
                        return;
                    }
                    existingItem.quantity += quantity;
                } else {
                    // Check stock availability
                    if (product.stock < quantity) {
                        resolve(this.cart);
                        return;
                    }
                    this.cart.items.push({
                        productId,
                        quantity
                    });
                }
                
                this.cart.totalItems += quantity;
                this.cart.lastUpdated = new Date().toISOString();
                
                this.saveToLocalStorage();
                resolve(this.cart);
            }, 300);
        });
    }

    removeFromCart(productId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const itemIndex = this.cart.items.findIndex(item => item.productId === productId);
                
                if (itemIndex !== -1) {
                    const removedItem = this.cart.items[itemIndex];
                    this.cart.totalItems -= removedItem.quantity;
                    this.cart.items.splice(itemIndex, 1);
                }
                
                this.cart.lastUpdated = new Date().toISOString();
                this.saveToLocalStorage();
                resolve(this.cart);
            }, 300);
        });
    }

    updateCartItemQuantity(productId, newQuantity) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const item = this.cart.items.find(item => item.productId === productId);
                const product = this.products.find(p => p.id === productId);
                
                if (item && product) {
                    // Check stock availability
                    if (product.stock < newQuantity) {
                        resolve(this.cart);
                        return;
                    }
                    
                    const quantityDifference = newQuantity - item.quantity;
                    item.quantity = newQuantity;
                    this.cart.totalItems += quantityDifference;
                    this.cart.lastUpdated = new Date().toISOString();
                }
                
                this.saveToLocalStorage();
                resolve(this.cart);
            }, 300);
        });
    }

    // ======================
    // ORDER METHODS
    // ======================
    createOrder(orderData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newOrder = {
                    id: `ORD${Date.now()}`,
                    userId: this.currentUser.id,
                    items: orderData.items,
                    total: orderData.total,
                    shippingAddress: orderData.shippingAddress || 
                                    (this.currentUser.address ? {...this.currentUser.address} : null),
                    paymentMethod: orderData.paymentMethod,
                    paymentStatus: 'paid',
                    status: 'processing',
                    date: new Date().toISOString()
                };
                
                // Update product stock
                orderData.items.forEach(item => {
                    const product = this.products.find(p => p.id === item.productId);
                    if (product) {
                        product.stock -= item.quantity;
                    }
                });
                
                this.orders.push(newOrder);
                this.cart = { items: [], totalItems: 0, lastUpdated: null };
                this.saveToLocalStorage();
                resolve(newOrder);
            }, 1000);
        });
    }

    getOrders(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.orders.filter(order => order.userId === userId));
            }, 500);
        });
    }

    getOrderById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const order = this.orders.find(o => o.id === id);
                if (order) {
                    resolve(order);
                } else {
                    reject(new Error('Order not found'));
                }
            }, 300);
        });
    }

    // ======================
    // PAYMENT METHODS
    // ======================
    processPayment(paymentData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would communicate with a payment processor
                resolve({
                    success: true,
                    transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                    amount: paymentData.amount,
                    currency: 'USD',
                    paymentMethod: paymentData.method
                });
            }, 1500);
        });
    }

    getPaymentMethods() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.paymentMethods]);
            }, 200);
        });
    }

    // ======================
    // MESSAGE METHODS
    // ======================
    getMessages() {
        return [...this.messages];
    }

    getMessagesBetweenUsers(userId1, userId2) {
        return this.messages.filter(msg => 
            (msg.senderId === userId1 && msg.receiverId === userId2) ||
            (msg.senderId === userId2 && msg.receiverId === userId1)
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    sendMessage(content, senderId, receiverId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newMessage = {
                    id: Date.now().toString(),
                    content,
                    senderId,
                    receiverId,
                    timestamp: new Date().toISOString(),
                    status: 'delivered'
                };
                
                this.messages.push(newMessage);
                this.saveToLocalStorage();
                resolve(newMessage);
            }, 300);
        });
    }

    // ======================
    // SELLER METHODS
    // ======================
    getSellers() {
        return [...this.sellers];
    }

    getSellerById(id) {
        return this.sellers.find(s => s.id === id);
    }

    getSellerProducts(sellerId) {
        return this.products.filter(p => p.sellerId === sellerId);
    }

    // ======================
    // REVIEW METHODS
    // ======================
    getProductReviews(productId) {
        return this.reviews.filter(r => r.productId === productId);
    }

    addReview(reviewData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newReview = {
                    id: Date.now().toString(),
                    ...reviewData,
                    date: new Date().toISOString()
                };
                
                this.reviews.push(newReview);
                
                // Update product rating
                const productReviews = this.getProductReviews(reviewData.productId);
                const product = this.products.find(p => p.id === reviewData.productId);
                if (product) {
                    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
                    product.rating = totalRating / productReviews.length;
                }
                
                resolve(newReview);
            }, 500);
        });
    }
}

// Initialize the database
window.db = new SocialSellDB();