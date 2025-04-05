// Simulated backend API
class SocialSellAPI {
    constructor() {
        this.products = window.db.getProducts();
        this.sellers = window.db.getSellers();
        this.messages = window.db.getMessages();
        this.cart = window.db.getCart();
        this.currentUser = window.db.getCurrentUser();
    }

    // Product methods
    getProducts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 500); // Simulate network delay
        });
    }

    getProductById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id === id);
                if (product) {
                    resolve(product);
                } else {
                    reject(new Error('Product not found'));
                }
            }, 300);
        });
    }

    // Seller methods
    getSellers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.sellers);
            }, 500);
        });
    }

    getSellerById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const seller = this.sellers.find(s => s.id === id);
                if (seller) {
                    resolve(seller);
                } else {
                    reject(new Error('Seller not found'));
                }
            }, 300);
        });
    }

    // Cart methods
    getCart() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.cart);
            }, 200);
        });
    }

    addToCart(productId, quantity = 1) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingItem = this.cart.items.find(item => item.productId === productId);
                
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    this.cart.items.push({
                        productId,
                        quantity
                    });
                }
                
                this.cart.totalItems += quantity;
                this.cart.lastUpdated = new Date().toISOString();
                
                window.db.saveCart(this.cart);
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
                window.db.saveCart(this.cart);
                resolve(this.cart);
            }, 300);
        });
    }

    // Message methods
    getMessages() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.messages);
            }, 500);
        });
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
                window.db.saveMessages(this.messages);
                resolve(newMessage);
            }, 300);
        });
    }

    // User methods
    getCurrentUser() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.currentUser);
            }, 200);
        });
    }

    // Add to SocialSellAPI class
    login(email, password) {
        return window.db.authenticateUser(email, password);
    }

    register(userData) {
        return window.db.registerUser(userData);
    }

    logout() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    window.db.logoutUser();
                    resolve(true);
                }, 300);
            });
        }

        // Add to SocialSellAPI class
        createOrder(orderData) {
            return window.db.createOrder(orderData);
        }

        processPayment(paymentData) {
            return window.db.processPayment(paymentData);
        }

        getOrders(userId) {
            return window.db.getOrders(userId);
        }
    }

// Initialize the API
window.socialSellAPI = new SocialSellAPI();