/**
 * AutoParts Pro - LocalStorage State Engine
 * Handles reactive state persistence for Cart, Wishlist, Compare, Saved Vehicles, User Auth, and Preferences.
 */

window.AutoPartsStore = {
    // Keys
    KEYS: {
        CART: 'autoparts_cart',
        WISHLIST: 'autoparts_wishlist',
        COMPARE: 'autoparts_compare',
        VEHICLE: 'autoparts_saved_vehicle',
        USER: 'autoparts_user_session',
        ORDERS: 'autoparts_orders',
        THEME: 'autoparts_theme',
        RTL: 'autoparts_rtl'
    },

    // Initialize default states if missing
    init() {
        const CLEAN_INIT_FLAG = 'autoparts_clean_defaults_v7';
        if (!localStorage.getItem(CLEAN_INIT_FLAG)) {
            // Reset any previous demo items & user session so site starts logged-out with 0 items
            localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
            localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify([]));
            localStorage.setItem(this.KEYS.COMPARE, JSON.stringify([]));
            localStorage.setItem(this.KEYS.USER, JSON.stringify({ id: "usr_guest", name: "Guest", email: "", isLoggedIn: false }));
            localStorage.setItem(CLEAN_INIT_FLAG, 'true');
        }

        // Guarantee that before login (when user is guest/logged-out), cart starts strictly empty
        if (!this.isLoggedIn()) {
            localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
        }

        if (!localStorage.getItem(this.KEYS.CART)) {
            localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.WISHLIST)) {
            localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.COMPARE)) {
            localStorage.setItem(this.KEYS.COMPARE, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.VEHICLE)) {
            // Default saved vehicle demo
            const defaultVehicle = {
                make: "Toyota",
                model: "Camry",
                year: "2018",
                engine: "3.5L V6"
            };
            localStorage.setItem(this.KEYS.VEHICLE, JSON.stringify(defaultVehicle));
        }
        if (!localStorage.getItem(this.KEYS.USER)) {
            // Default customer user (Logged out by default)
            const defaultUser = {
                id: "usr_guest",
                name: "Guest",
                email: "",
                isLoggedIn: false
            };
            localStorage.setItem(this.KEYS.USER, JSON.stringify(defaultUser));
        }
        if (!localStorage.getItem(this.KEYS.ORDERS)) {
            const defaultOrders = [
                {
                    id: "ORD-89412",
                    date: "2026-08-10",
                    itemsCount: 3,
                    total: 318.48,
                    status: "Delivered",
                    items: [
                        { name: "NGK Laser Iridium Spark Plug 4-Pack", qty: 2, price: 49.99 },
                        { name: "Brembo High Carbon Front Brake Disc Set", qty: 1, price: 189.99 }
                    ]
                }
            ];
            localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(defaultOrders));
        }
    },

    // CART METHODS
    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.CART)) || [];
        } catch (e) {
            return [];
        }
    },

    saveCart(cart) {
        localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    },

    addToCart(productId, quantity = 1) {
        const cart = this.getCart();
        const existingIndex = cart.findIndex(item => item.productId === productId);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += parseInt(quantity);
        } else {
            cart.push({ productId, quantity: parseInt(quantity) });
        }
        this.saveCart(cart);
        const product = window.AutoPartsData.products.find(p => p.id === productId);
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast(`Added <strong>${product ? product.name : 'Item'}</strong> to your cart`, 'success');
        }
    },

    updateCartQuantity(productId, newQty) {
        let cart = this.getCart();
        if (newQty <= 0) {
            cart = cart.filter(item => item.productId !== productId);
        } else {
            const item = cart.find(i => i.productId === productId);
            if (item) item.quantity = parseInt(newQty);
        }
        this.saveCart(cart);
    },

    removeFromCart(productId) {
        const cart = this.getCart().filter(item => item.productId !== productId);
        this.saveCart(cart);
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast('Item removed from cart', 'info');
        }
    },

    clearCart() {
        this.saveCart([]);
    },

    getCartTotals() {
        const cart = this.getCart();
        let subtotal = 0;
        let itemsCount = 0;

        cart.forEach(item => {
            const p = window.AutoPartsData.products.find(prod => prod.id === item.productId);
            if (p) {
                subtotal += p.price * item.quantity;
                itemsCount += item.quantity;
            }
        });

        const tax = subtotal * 0.08;
        const shipping = subtotal > 150 ? 0 : 15.00;
        const total = subtotal + tax + shipping;

        return { subtotal, itemsCount, tax, shipping, total };
    },

    // WISHLIST METHODS
    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.WISHLIST)) || [];
        } catch (e) {
            return [];
        }
    },

    toggleWishlist(productId) {
        let wishlist = this.getWishlist();
        const index = wishlist.indexOf(productId);
        let added = false;
        if (index > -1) {
            wishlist.splice(index, 1);
        } else {
            wishlist.push(productId);
            added = true;
        }
        localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(wishlist));
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: wishlist }));
        
        const product = window.AutoPartsData.products.find(p => p.id === productId);
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast(
                added ? `Added <strong>${product ? product.name : 'Item'}</strong> to wishlist` : 'Removed from wishlist',
                added ? 'success' : 'info'
            );
        }
        return added;
    },

    isInWishlist(productId) {
        return this.getWishlist().includes(productId);
    },

    // COMPARE METHODS
    getCompare() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.COMPARE)) || [];
        } catch (e) {
            return [];
        }
    },

    toggleCompare(productId) {
        let compare = this.getCompare();
        const index = compare.indexOf(productId);
        let added = false;
        if (index > -1) {
            compare.splice(index, 1);
        } else {
            if (compare.length >= 4) {
                if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
                    window.AutoPartsUI.showToast('You can compare up to 4 items max', 'warning');
                }
                return false;
            }
            compare.push(productId);
            added = true;
        }
        localStorage.setItem(this.KEYS.COMPARE, JSON.stringify(compare));
        window.dispatchEvent(new CustomEvent('compareUpdated', { detail: compare }));
        
        const product = window.AutoPartsData.products.find(p => p.id === productId);
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast(
                added ? `Added <strong>${product ? product.name : 'Item'}</strong> to compare list` : 'Removed from compare list',
                added ? 'success' : 'info'
            );
        }
        return added;
    },

    // SAVED VEHICLE METHODS
    getSavedVehicle() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.VEHICLE));
        } catch (e) {
            return null;
        }
    },

    saveVehicle(vehicleObj) {
        localStorage.setItem(this.KEYS.VEHICLE, JSON.stringify(vehicleObj));
        window.dispatchEvent(new CustomEvent('vehicleSaved', { detail: vehicleObj }));
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast(`Vehicle saved: <strong>${vehicleObj.year} ${vehicleObj.make} ${vehicleObj.model} (${vehicleObj.engine})</strong>`, 'success');
        }
    },

    clearSavedVehicle() {
        localStorage.removeItem(this.KEYS.VEHICLE);
        window.dispatchEvent(new CustomEvent('vehicleSaved', { detail: null }));
    },

    // USER AUTH SESSION
    getUser() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.USER));
        } catch (e) {
            return null;
        }
    },

    isLoggedIn() {
        const user = this.getUser();
        return !!(user && user.isLoggedIn === true);
    },

    saveUser(userObj) {
        localStorage.setItem(this.KEYS.USER, JSON.stringify(userObj));
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: userObj }));
    },

    logoutUser() {
        localStorage.removeItem(this.KEYS.USER);
        localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: null }));
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast('Logged out successfully', 'info');
        }
    },

    // ORDERS
    getOrders() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.ORDERS)) || [];
        } catch (e) {
            return [];
        }
    },

    createOrder(orderDetails) {
        const orders = this.getOrders();
        const newOrder = {
            id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toISOString().split('T')[0],
            status: "Processing",
            ...orderDetails
        };
        orders.unshift(newOrder);
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
        this.clearCart();
        return newOrder;
    },

    // THEME & RTL PREFERENCES
    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'light';
    },

    setTheme(theme) {
        localStorage.setItem(this.KEYS.THEME, theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    },

    getRTL() {
        return localStorage.getItem(this.KEYS.RTL) === 'true';
    },

    setRTL(isRTL) {
        localStorage.setItem(this.KEYS.RTL, isRTL);
        if (isRTL) {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
        window.dispatchEvent(new CustomEvent('rtlChanged', { detail: isRTL }));
    }
};

// Initialize store execution
window.AutoPartsStore.init();
