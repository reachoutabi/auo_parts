/**
 * AutoParts Pro - Main UI Controller
 * Controls sticky navigation, drawers, modals, quick view, compare matrix, toast engine, theme & RTL toggles.
 */

window.AutoPartsUI = {
    init() {
        this.applySavedTheme();
        this.applySavedRTL();
        this.bindGlobalEvents();
        this.updateHeaderCounts();
        this.renderCartDrawer();

        // Initialize compatibility finder
        if (window.AutoPartsCompatibility) {
            window.AutoPartsCompatibility.init();
        }

        // Initialize catalog if on products page
        if (window.AutoPartsCatalog && document.getElementById('catalog-products-grid')) {
            window.AutoPartsCatalog.init();
        }

        // Initialize scroll-triggered counter animations
        this.initCounterAnimations();

        // Initialize dynamic mobile navigation drawer & bottom action bar
        this.initMobileNavigation();

        // Initialize dynamic ticking clearance countdown & wishlist state
        this.initClearanceCountdown();
        this.updateWishlistButtons();
        this.highlightActiveNav();
        this.updateAuthTopLink();

        window.addEventListener('userUpdated', () => this.updateAuthTopLink());

        // Global Checkout Auth Protection: Intercept clicks to checkout for guest users
        document.addEventListener('click', (e) => {
            const checkoutLink = e.target.closest('a[href*="checkout.html"]');
            if (checkoutLink) {
                const isLoggedIn = window.AutoPartsStore && window.AutoPartsStore.isLoggedIn ? window.AutoPartsStore.isLoggedIn() : false;
                if (!isLoggedIn) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.requireAuthForCheckout(e);
                }
            }
        });

        // Direct Page Guard: Redirect guest users trying to access checkout.html
        const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (currentPath === 'checkout.html') {
            const isLoggedIn = window.AutoPartsStore && window.AutoPartsStore.isLoggedIn ? window.AutoPartsStore.isLoggedIn() : false;
            if (!isLoggedIn) {
                window.location.href = 'login.html?redirect=checkout.html';
            }
        }
    },

    requireAuthForCheckout(event) {
        const isLoggedIn = window.AutoPartsStore && window.AutoPartsStore.isLoggedIn ? window.AutoPartsStore.isLoggedIn() : false;
        if (!isLoggedIn) {
            if (event && event.preventDefault) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.showToast) {
                this.showToast('Please log in to your account to proceed to checkout.', 'warning');
            }
            setTimeout(() => {
                window.location.href = 'login.html?redirect=checkout.html';
            }, 600);
            return false;
        }
        return true;
    },

    // AUTH TOP LINK CONTROLLER (Log In vs My Account)
    updateAuthTopLink() {
        const authLinks = document.querySelectorAll('.js-auth-top-link');
        const isLoggedIn = window.AutoPartsStore && window.AutoPartsStore.isLoggedIn ? window.AutoPartsStore.isLoggedIn() : false;
        
        authLinks.forEach(link => {
            const hasTextSpan = link.querySelector('span') !== null;
            if (isLoggedIn) {
                link.setAttribute('href', 'account.html');
                link.setAttribute('title', 'My Account');
                if (hasTextSpan) {
                    link.innerHTML = `<i class="fa-solid fa-user-gear"></i> <span>My Account</span>`;
                } else {
                    link.innerHTML = `<i class="fa-solid fa-user-gear text-base sm:text-lg"></i>`;
                }
            } else {
                link.setAttribute('href', 'login.html');
                link.setAttribute('title', 'Log In to your Account');
                if (hasTextSpan) {
                    link.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> <span>Log In</span>`;
                } else {
                    link.innerHTML = `<i class="fa-solid fa-right-to-bracket text-base sm:text-lg"></i>`;
                }
            }
        });
    },

    // HIGHLIGHT ACTIVE NAVIGATION ITEM ACCORDING TO CURRENT URL
    highlightActiveNav() {
        const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        const navLinks = document.querySelectorAll('header nav a');
        const homeBtn = document.querySelector('header nav .nav-dropdown-parent button');

        // Reset Home dropdown button active state
        if (homeBtn) {
            homeBtn.classList.remove('text-red-500', 'font-bold', 'border-b-2', 'border-red-500', 'pb-0.5');
            homeBtn.classList.add('text-slate-200');
        }

        let matched = false;

        navLinks.forEach(link => {
            const href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
            
            // Remove active underline styling from link
            link.classList.remove('text-red-500', 'font-bold', 'border-b-2', 'border-red-500', 'pb-0.5');
            link.classList.add('text-slate-200');

            // Check match for current page or parent page
            if (href && href !== '#' && href !== 'javascript:void(0);') {
                if (href === path || 
                   (path === '' && href === 'index.html') || 
                   (path.includes('product') && href.includes('product')) ||
                   (path.includes('blog') && href.includes('blog'))) {
                    
                    link.classList.add('text-red-500', 'font-bold', 'border-b-2', 'border-red-500', 'pb-0.5');
                    link.classList.remove('text-slate-200');
                    matched = true;
                }
            }
        });

        // Only highlight Home button if strictly on index.html, trade.html, or root path
        const isHomePage = (path === 'index.html' || path === 'trade.html' || path === '');
        if (isHomePage && homeBtn) {
            homeBtn.classList.add('text-red-500', 'font-bold', 'border-b-2', 'border-red-500', 'pb-0.5');
            homeBtn.classList.remove('text-slate-200');
        }
    },

    // THEME & RTL CONTROLLER
    applySavedTheme() {
        const savedTheme = localStorage.getItem('autoparts_theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
        this.updateThemeIcons(savedTheme);
    },

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
        
        localStorage.setItem('autoparts_theme', newTheme);
        this.updateThemeIcons(newTheme);
        
        if (this.showToast) {
            this.showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
        }
    },

    updateThemeIcons(theme) {
        // Toggle visibility of moon/sun icons on all theme switcher buttons
        const isDark = theme === 'dark';
        document.querySelectorAll('.fa-moon').forEach(el => {
            if (isDark) el.classList.add('hidden');
            else el.classList.remove('hidden');
        });
        document.querySelectorAll('.fa-sun').forEach(el => {
            if (isDark) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    },

    applySavedRTL() {
        const savedRTL = localStorage.getItem('autoparts_rtl') === 'true';
        if (savedRTL) {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    },

    toggleRTL() {
        const currentDir = document.documentElement.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('autoparts_rtl', newDir === 'rtl' ? 'true' : 'false');
        
        if (this.showToast) {
            this.showToast(`Switched layout to ${newDir.toUpperCase()}`, 'info');
        }
    },

    // MOBILE NAVIGATION SYSTEM
    initMobileNavigation() {
        this.createMobileMenuDrawer();
        const existingBottomBar = document.getElementById('mobile-bottom-bar');
        if (existingBottomBar) existingBottomBar.remove();
        this.updateMobileDrawerState();
    },

    toggleMobileMenu(open = true) {
        let drawer = document.getElementById('mobile-menu-drawer');
        let backdrop = document.getElementById('mobile-menu-backdrop');
        
        if (!drawer || !backdrop) {
            this.createMobileMenuDrawer();
            drawer = document.getElementById('mobile-menu-drawer');
            backdrop = document.getElementById('mobile-menu-backdrop');
        }

        if (!drawer || !backdrop) return;

        if (open) {
            this.updateMobileDrawerState();
            drawer.classList.remove('-translate-x-full');
            backdrop.classList.remove('hidden');
            setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
            document.body.classList.add('overflow-hidden');
        } else {
            drawer.classList.add('-translate-x-full');
            backdrop.classList.add('opacity-0');
            setTimeout(() => {
                backdrop.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        }
    },

    createMobileMenuDrawer() {
        if (document.getElementById('mobile-menu-drawer')) return;

        const backdrop = document.createElement('div');
        backdrop.id = 'mobile-menu-backdrop';
        backdrop.className = 'fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300';
        backdrop.onclick = () => this.toggleMobileMenu(false);
        document.body.appendChild(backdrop);

        const drawer = document.createElement('div');
        drawer.id = 'mobile-menu-drawer';
        drawer.className = 'fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl flex flex-col -translate-x-full border-r border-slate-200 dark:border-slate-800';
        drawer.innerHTML = `
            <!-- Header -->
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
                <a href="index.html" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-base font-black">
                        <i class="fa-solid fa-gears"></i>
                    </div>
                    <div>
                        <div class="text-base font-black tracking-tight text-slate-900 dark:text-white">
                            AUTO<span class="text-red-600">PARTS</span>
                        </div>
                    </div>
                </a>
                <button type="button" onclick="AutoPartsUI.toggleMobileMenu(false)" class="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 flex items-center justify-center transition-colors" aria-label="Close navigation menu">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <!-- Mobile Search -->
            <div class="p-4 border-b border-slate-100 dark:border-slate-800">
                <div class="relative">
                    <input type="text" placeholder="Search SKU, OEM or Part..." class="js-mobile-search-input w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 ps-9 pe-10 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                    <div class="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none text-slate-400">
                        <i class="fa-solid fa-magnifying-glass text-xs"></i>
                    </div>
                    <button type="button" onclick="const input = this.previousElementSibling.previousElementSibling; if(input.value) window.location.href='products.html?search='+encodeURIComponent(input.value);" class="absolute inset-y-1 right-1 px-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
                        <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 space-y-6">
                <!-- Vehicle Selector Widget Mini -->
                <div class="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Vehicle</span>
                        <a href="compatibility-finder.html" class="text-[10px] font-bold text-red-600 dark:text-red-400">Change</a>
                    </div>
                    <div class="js-mobile-vehicle-badge">
                        <a href="compatibility-finder.html" class="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                            <i class="fa-solid fa-car"></i>
                            <span>Select Your Vehicle &rarr;</span>
                        </a>
                    </div>
                </div>

                <!-- Main Navigation Links -->
                <div class="space-y-1">
                    <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">Home Pages (2 Variants)</div>
                    <div class="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 space-y-1 mb-3">
                        <a href="index.html" class="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors">
                            <div>
                                <div class="leading-tight">Home 1: Retail Landing</div>
                                <div class="text-[10px] text-slate-400 font-normal">Vehicle selector & retail store</div>
                            </div>
                            <span class="text-[9px] bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-extrabold">B2C</span>
                        </a>
                        <a href="trade.html" class="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors">
                            <div>
                                <div class="leading-tight">Home 2: Trade Portal</div>
                                <div class="text-[10px] text-slate-400 font-normal">Multi-SKU quick order & B2B</div>
                            </div>
                            <span class="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-extrabold">B2B</span>
                        </a>
                    </div>

                    <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">Catalog & Features</div>
                    <a href="products.html" class="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-boxes-stacked w-4 text-center text-blue-500"></i>
                            <span>Products Catalog</span>
                        </div>
                        <span class="text-[10px] bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 px-2 py-0.5 rounded-full font-extrabold">50k+</span>
                    </a>
                    <a href="compatibility-finder.html" class="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-car w-4 text-center text-emerald-500"></i>
                            <span>Compatibility Finder</span>
                        </div>
                        <span class="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-extrabold">NEW</span>
                    </a>
                    <a href="brands.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <i class="fa-solid fa-award w-4 text-center text-amber-500"></i>
                        <span>Brands Directory</span>
                    </a>
                    <a href="bulk-pricing.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <i class="fa-solid fa-layer-group w-4 text-center text-purple-500"></i>
                        <span>Bulk Workshop Pricing</span>
                    </a>
                    <a href="about.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <i class="fa-solid fa-circle-info w-4 text-center text-cyan-500"></i>
                        <span>About Us</span>
                    </a>
                    <a href="blog.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <i class="fa-solid fa-newspaper w-4 text-center text-orange-500"></i>
                        <span>Tech Blog</span>
                    </a>
                    <a href="contact.html" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 transition-colors">
                        <i class="fa-solid fa-headset w-4 text-center text-rose-500"></i>
                        <span>Contact Support</span>
                    </a>
                </div>

                <!-- Part Categories Mobile Grid -->
                <div>
                    <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Categories</div>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <a href="products.html?category=brakes" class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 flex items-center gap-2">
                            <i class="fa-solid fa-circle-dot text-red-500 text-xs"></i> Brakes
                        </a>
                        <a href="products.html?category=engine" class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 flex items-center gap-2">
                            <i class="fa-solid fa-gears text-blue-500 text-xs"></i> Engine
                        </a>
                        <a href="products.html?category=electrical" class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 flex items-center gap-2">
                            <i class="fa-solid fa-bolt text-amber-500 text-xs"></i> Electrical
                        </a>
                        <a href="products.html?category=filters" class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 flex items-center gap-2">
                            <i class="fa-solid fa-filter text-emerald-500 text-xs"></i> Filters
                        </a>
                        <a href="products.html?category=suspension" class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 flex items-center gap-2">
                            <i class="fa-solid fa-car-side text-purple-500 text-xs"></i> Suspension
                        </a>
                        <a href="products.html?category=cooling" class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 flex items-center gap-2">
                            <i class="fa-solid fa-temperature-arrow-down text-cyan-500 text-xs"></i> Cooling
                        </a>
                    </div>
                </div>

                <!-- Account & Hotline -->
                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <a href="account.html" class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-xs font-bold text-red-600 dark:text-red-400">
                        <div class="flex items-center gap-2.5">
                            <i class="fa-solid fa-user-gear"></i>
                            <span>My Customer Account</span>
                        </div>
                        <i class="fa-solid fa-chevron-right text-[10px]"></i>
                    </a>

                    <div class="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 p-2">
                        <span>Parts Hotline:</span>
                        <a href="tel:+18005552886" class="text-red-600 font-mono font-bold">+1 (800) 555-AUTO</a>
                    </div>
                </div>
            </div>


        `;
        document.body.appendChild(drawer);

        // Bind enter key on mobile search
        const mobileInput = drawer.querySelector('.js-mobile-search-input');
        if (mobileInput) {
            mobileInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault();
                    window.location.href = `products.html?search=${encodeURIComponent(e.target.value)}`;
                }
            });
        }
    },

    createMobileBottomBar() {
        const existingBottomBar = document.getElementById('mobile-bottom-bar');
        if (existingBottomBar) existingBottomBar.remove();
    },

    updateMobileDrawerState() {
        const vehicleBadge = document.querySelector('.js-mobile-vehicle-badge');
        if (vehicleBadge) {
            const vehicle = window.AutoPartsStore.getSavedVehicle();
            if (vehicle && vehicle.make) {
                vehicleBadge.innerHTML = `
                    <div class="flex items-center justify-between bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl text-xs font-bold">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>${vehicle.year} ${vehicle.make} ${vehicle.model}</span>
                        </div>
                    </div>
                `;
            } else {
                vehicleBadge.innerHTML = `
                    <a href="compatibility-finder.html" class="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                        <i class="fa-solid fa-car"></i>
                        <span>Select Your Vehicle &rarr;</span>
                    </a>
                `;
            }
        }
    },

    // COUNTER ANIMATIONS (COUNT-UP ENGINE)
    initCounterAnimations() {
        const counterElements = document.querySelectorAll('.counter-number');
        if (!counterElements.length) return;

        const animateCount = (el) => {
            if (el.dataset.animated === 'true') return;
            el.dataset.animated = 'true';

            const target = parseFloat(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            const format = el.getAttribute('data-format') || 'integer';
            const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);
            
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const elapsed = timestamp - startTimestamp;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic: 1 - (1 - progress)^3
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = target * easeProgress;

                if (format === 'decimal') {
                    el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;
                } else {
                    el.textContent = `${prefix}${Math.round(currentVal).toLocaleString()}${suffix}`;
                }

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    if (format === 'decimal') {
                        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
                    } else {
                        el.textContent = `${prefix}${Math.round(target).toLocaleString()}${suffix}`;
                    }
                }
            };

            requestAnimationFrame(step);
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            counterElements.forEach(el => observer.observe(el));
        } else {
            counterElements.forEach(el => animateCount(el));
        }
    },

    // THEME & RTL
    applySavedTheme() {
        const theme = window.AutoPartsStore.getTheme();
        window.AutoPartsStore.setTheme(theme);
    },

    toggleTheme() {
        const current = window.AutoPartsStore.getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        window.AutoPartsStore.setTheme(next);
        this.showToast(`Switched to <strong>${next === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>`, 'info');
    },

    applySavedRTL() {
        const isRTL = window.AutoPartsStore.getRTL();
        window.AutoPartsStore.setRTL(isRTL);
    },

    toggleRTL() {
        const isRTL = window.AutoPartsStore.getRTL();
        window.AutoPartsStore.setRTL(!isRTL);
        this.showToast(`Layout switched to <strong>${!isRTL ? 'RTL' : 'LTR'}</strong>`, 'info');
    },

    // TOAST SYSTEM
    showToast(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const iconMap = {
            success: 'fa-circle-check text-emerald-500',
            warning: 'fa-triangle-exclamation text-amber-500',
            info: 'fa-circle-info text-blue-500',
            danger: 'fa-circle-xmark text-red-500'
        };

        toast.className = `pointer-events-auto flex items-start gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-4 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 transform transition-all duration-300 translate-y-4 opacity-0`;
        toast.innerHTML = `
            <div class="text-lg mt-0.5"><i class="fa-solid ${iconMap[type] || iconMap.info}"></i></div>
            <div class="flex-1 text-sm font-medium leading-snug">${message}</div>
            <button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    // HEADER COUNTS
    updateHeaderCounts() {
        const cartTotals = window.AutoPartsStore.getCartTotals();
        const wishlist = window.AutoPartsStore.getWishlist();
        const compare = window.AutoPartsStore.getCompare();

        const cartBadges = document.querySelectorAll('.js-cart-count-badge');
        cartBadges.forEach(b => {
            b.textContent = cartTotals.itemsCount;
            b.classList.toggle('hidden', cartTotals.itemsCount === 0);
        });

        const wishlistBadges = document.querySelectorAll('.js-wishlist-count-badge');
        wishlistBadges.forEach(b => {
            b.textContent = wishlist.length;
            b.classList.toggle('hidden', wishlist.length === 0);
        });

        const compareBadges = document.querySelectorAll('.js-compare-count-badge');
        compareBadges.forEach(b => {
            b.textContent = compare.length;
            b.classList.toggle('hidden', compare.length === 0);
        });

        const cartSubtotals = document.querySelectorAll('.js-cart-subtotal-display');
        cartSubtotals.forEach(s => {
            s.textContent = `$${cartTotals.subtotal.toFixed(2)}`;
        });
    },

    // DRAWER & MODAL CONTROLLERS
    createCartDrawer() {
        if (document.getElementById('cart-drawer')) return;

        // Create backdrop
        let backdrop = document.getElementById('cart-drawer-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'cart-drawer-backdrop';
            backdrop.className = 'hidden opacity-0 fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity duration-300';
            backdrop.onclick = () => this.toggleCartDrawer(false);
            document.body.appendChild(backdrop);
        }

        // Create Drawer Aside
        const drawer = document.createElement('aside');
        drawer.id = 'cart-drawer';
        drawer.className = 'fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col justify-between border-s border-slate-200 dark:border-slate-800';
        drawer.innerHTML = `
            <!-- Header -->
            <div class="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
                <div class="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <div class="w-8 h-8 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center text-sm shadow-sm">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                    <span>Shopping Cart</span>
                    <span id="cart-drawer-count-badge" class="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">0</span>
                </div>
                <button type="button" onclick="AutoPartsUI.toggleCartDrawer(false)" class="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 flex items-center justify-center transition-colors" aria-label="Close Cart Drawer">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <!-- Free Shipping Progress Indicator -->
            <div id="cart-drawer-shipping-promo" class="p-3 bg-red-50 dark:bg-red-950/30 border-b border-red-100 dark:border-red-900/40 text-xs">
                <div class="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-[11px]">
                    <span id="cart-drawer-shipping-text" class="flex items-center gap-1.5"><i class="fa-solid fa-truck-fast text-red-600"></i> Free express shipping over $150</span>
                    <span id="cart-drawer-shipping-percent" class="font-mono text-red-600">0%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div id="cart-drawer-shipping-bar" class="h-full bg-red-600 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>

            <!-- Items List -->
            <div id="cart-drawer-items" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3"></div>

            <!-- Footer Checkout / Total Summary -->
            <div id="cart-drawer-footer" class="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 space-y-3">
                <div class="space-y-1.5 text-xs">
                    <div class="flex justify-between text-slate-500 dark:text-slate-400">
                        <span>Items Subtotal:</span>
                        <span class="js-cart-subtotal-display font-extrabold text-slate-900 dark:text-white">$0.00</span>
                    </div>
                    <div class="flex justify-between text-slate-500 dark:text-slate-400">
                        <span>Estimated Shipping:</span>
                        <span id="cart-drawer-shipping-cost" class="font-bold text-emerald-600 dark:text-emerald-400">Calculated at Checkout</span>
                    </div>
                    <div class="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>Total:</span>
                        <span id="cart-drawer-total-display" class="text-red-600 font-extrabold text-base">$0.00</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-1">
                    <a href="cart.html" onclick="AutoPartsUI.toggleCartDrawer(false)" class="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-red-600 hover:text-red-600 font-bold text-xs text-center transition-colors">
                        View Cart
                    </a>
                    <a href="checkout.html" onclick="AutoPartsUI.toggleCartDrawer(false)" class="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs text-center transition-colors shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5">
                        <span>Checkout</span>
                        <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(drawer);
    },

    toggleCartDrawer(open = true) {
        let drawer = document.getElementById('cart-drawer');
        let backdrop = document.getElementById('cart-drawer-backdrop');

        if (!drawer || !backdrop) {
            this.createCartDrawer();
            drawer = document.getElementById('cart-drawer');
            backdrop = document.getElementById('cart-drawer-backdrop');
        }

        if (!drawer || !backdrop) return;

        if (open) {
            this.renderCartDrawer();
            drawer.classList.remove('translate-x-full');
            backdrop.classList.remove('hidden');
            setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
            document.body.classList.add('overflow-hidden');
        } else {
            drawer.classList.add('translate-x-full');
            backdrop.classList.add('opacity-0');
            setTimeout(() => {
                backdrop.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        }
    },

    renderCartDrawer() {
        this.createCartDrawer();

        const container = document.getElementById('cart-drawer-items');
        const totals = window.AutoPartsStore.getCartTotals();
        const cart = window.AutoPartsStore.getCart();

        // Update header subtotal and badges everywhere
        this.updateHeaderCounts();

        // Update drawer specific elements if they exist
        const drawerCount = document.getElementById('cart-drawer-count-badge');
        if (drawerCount) drawerCount.textContent = totals.itemsCount;

        const drawerTotal = document.getElementById('cart-drawer-total-display');
        if (drawerTotal) drawerTotal.textContent = `$${totals.total.toFixed(2)}`;

        const shippingPromo = document.getElementById('cart-drawer-shipping-promo');
        const shippingText = document.getElementById('cart-drawer-shipping-text');
        const shippingPercent = document.getElementById('cart-drawer-shipping-percent');
        const shippingBar = document.getElementById('cart-drawer-shipping-bar');
        const shippingCost = document.getElementById('cart-drawer-shipping-cost');

        if (shippingPromo && shippingText && shippingPercent && shippingBar) {
            const threshold = 150;
            if (totals.subtotal >= threshold) {
                shippingText.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500"></i> Free Express Shipping unlocked!`;
                shippingPercent.textContent = '100%';
                shippingBar.style.width = '100%';
                shippingBar.className = 'h-full bg-emerald-500 rounded-full transition-all duration-300';
                if (shippingCost) shippingCost.textContent = 'FREE';
            } else {
                const diff = threshold - totals.subtotal;
                const pct = Math.min(100, Math.round((totals.subtotal / threshold) * 100));
                shippingText.innerHTML = `<i class="fa-solid fa-truck-fast text-red-600"></i> Add $${diff.toFixed(2)} for Free Shipping`;
                shippingPercent.textContent = `${pct}%`;
                shippingBar.style.width = `${pct}%`;
                shippingBar.className = 'h-full bg-red-600 rounded-full transition-all duration-300';
                if (shippingCost) shippingCost.textContent = totals.itemsCount > 0 ? '$14.99' : '$0.00';
            }
        }

        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 px-4">
                    <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                    <h4 class="font-black text-slate-800 dark:text-slate-200 text-sm mb-1">Your cart is empty</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mb-5">Browse our parts catalog and add components to your order.</p>
                    <a href="products.html" onclick="AutoPartsUI.toggleCartDrawer(false)" class="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20">
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <span>Explore Catalog</span>
                    </a>
                </div>
            `;
            return;
        }

        container.innerHTML = cart.map(item => {
            const p = window.AutoPartsData.products.find(prod => prod.id === item.productId);
            if (!p) return '';
            return `
                <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 group hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                    <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-xl bg-white p-1 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] uppercase tracking-wider font-extrabold text-red-600 dark:text-red-400">${p.brand}</span>
                            <span class="text-xs font-black text-slate-900 dark:text-white">$${(p.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate hover:text-red-600"><a href="product-detail.html?id=${p.id}">${p.name}</a></h5>
                        <div class="text-[10px] text-slate-400 font-mono">SKU: ${p.sku}</div>
                        <div class="flex items-center justify-between mt-2">
                            <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                                <button type="button" onclick="AutoPartsStore.updateCartQuantity('${p.id}', ${item.quantity - 1})" class="px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold transition-colors">-</button>
                                <span class="px-2 text-xs font-bold text-slate-900 dark:text-white">${item.quantity}</span>
                                <button type="button" onclick="AutoPartsStore.updateCartQuantity('${p.id}', ${item.quantity + 1})" class="px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold transition-colors">+</button>
                            </div>
                            <button type="button" onclick="AutoPartsStore.removeFromCart('${p.id}')" class="text-slate-400 hover:text-red-600 transition-colors p-1 text-xs" title="Remove Item">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // QUICK VIEW MODAL
    openQuickView(productId) {
        const product = window.AutoPartsData.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('quick-view-modal');
        const modalBody = document.getElementById('quick-view-content');
        if (!modal || !modalBody) return;

        const isWish = window.AutoPartsStore.isInWishlist(productId);
        const vehicle = window.AutoPartsStore.getSavedVehicle();
        const fitment = window.AutoPartsCompatibility.checkProductFitment(product, vehicle);

        modalBody.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div class="relative bg-slate-100 dark:bg-slate-700 rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-600">
                        <img id="qv-main-img" src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
                        <span class="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${product.badge}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        ${product.gallery.map(img => `
                            <button type="button" onclick="document.getElementById('qv-main-img').src='${img}'" class="w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent hover:border-red-600 transition-all bg-white p-1">
                                <img src="${img}" class="w-full h-full object-cover rounded-lg">
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">${product.brand}</span>
                            <span class="text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">SKU: ${product.sku}</span>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">${product.name}</h3>

                        <div class="flex items-center gap-3 mb-4">
                            <div class="flex items-center text-amber-400 text-sm">
                                <i class="fa-solid fa-star"></i>
                                <span class="ms-1 font-bold text-slate-800 dark:text-slate-200">${product.rating}</span>
                            </div>
                            <span class="text-xs text-slate-500">(${product.reviewsCount} reviews)</span>
                            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full ${product.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}">
                                ${product.stockStatus}
                            </span>
                        </div>

                        ${fitment.fits !== null ? `
                            <div class="mb-4 p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold ${fitment.fits ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}">
                                <i class="fa-solid ${fitment.fits ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-red-500'}"></i>
                                <span>${fitment.text}</span>
                            </div>
                        ` : ''}

                        <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">${product.shortDesc}</p>

                        <div class="flex items-baseline gap-3 mb-6">
                            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="text-lg text-slate-400 line-through">$${product.oldPrice.toFixed(2)}</span>` : ''}
                            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded">Trade: $${product.workshopPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div class="flex items-center border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden bg-white dark:bg-slate-800 h-12">
                                <button type="button" onclick="const input = document.getElementById('qv-qty'); if(input.value>1) input.value--" class="px-4 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">-</button>
                                <input type="number" id="qv-qty" value="1" min="1" class="w-12 text-center text-sm font-bold bg-transparent text-slate-900 dark:text-white focus:outline-none">
                                <button type="button" onclick="const input = document.getElementById('qv-qty'); input.value++" class="px-4 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">+</button>
                            </div>
                            <button type="button" onclick="AutoPartsStore.addToCart('${product.id}', document.getElementById('qv-qty').value); AutoPartsUI.closeQuickView(); AutoPartsUI.toggleCartDrawer(true)" class="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                                <i class="fa-solid fa-cart-plus"></i>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                        <div class="flex items-center gap-3">
                            <button type="button" onclick="AutoPartsStore.toggleWishlist('${product.id}'); AutoPartsUI.openQuickView('${product.id}')" class="flex-1 h-10 border border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
                                <i class="${isWish ? 'fa-solid text-red-600' : 'fa-regular text-slate-400'} fa-heart"></i>
                                <span>${isWish ? 'In Wishlist' : 'Add to Wishlist'}</span>
                            </button>
                            <a href="product-detail.html?id=${product.id}" class="flex-1 h-10 border border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
                                <span>View Full Specs</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    },

    closeQuickView() {
        const modal = document.getElementById('quick-view-modal');
        if (!modal) return;
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    },

    // COMPARE MODAL
    openCompareModal() {
        const modal = document.getElementById('compare-modal');
        const container = document.getElementById('compare-modal-content');
        if (!modal || !container) return;

        const compareIds = window.AutoPartsStore.getCompare();
        const compareProducts = compareIds.map(id => window.AutoPartsData.products.find(p => p.id === id)).filter(Boolean);

        if (compareProducts.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fa-solid fa-code-compare text-4xl text-slate-300 dark:text-slate-600 mb-3"></i>
                    <h4 class="font-bold text-slate-800 dark:text-slate-200">No items selected for comparison</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Click the compare icon on product cards to compare specifications side-by-side.</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="overflow-x-auto">
                    <table class="w-full text-start text-xs border-collapse">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-700">
                                <th class="p-4 text-start bg-slate-50 dark:bg-slate-800/80 font-bold text-slate-700 dark:text-slate-300 w-44">Feature</th>
                                ${compareProducts.map(p => `
                                    <th class="p-4 text-center min-w-[200px] align-top">
                                        <button type="button" onclick="AutoPartsStore.toggleCompare('${p.id}'); AutoPartsUI.openCompareModal()" class="text-red-500 hover:text-red-700 text-xs font-bold mb-2 inline-flex items-center gap-1">
                                            <i class="fa-solid fa-xmark"></i> Remove
                                        </button>
                                        <img src="${p.image}" class="w-24 h-24 object-cover rounded-xl mx-auto mb-2 border border-slate-200 dark:border-slate-700">
                                        <div class="font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">${p.name}</div>
                                        <div class="text-base font-extrabold text-red-600 dark:text-red-400 mb-2">$${p.price.toFixed(2)}</div>
                                        <button type="button" onclick="AutoPartsStore.addToCart('${p.id}', 1)" class="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[11px]">Add to Cart</button>
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr>
                                <td class="p-4 font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">Brand</td>
                                ${compareProducts.map(p => `<td class="p-4 text-center font-semibold text-slate-900 dark:text-white">${p.brand}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="p-4 font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">SKU Number</td>
                                ${compareProducts.map(p => `<td class="p-4 text-center font-mono text-slate-600 dark:text-slate-400">${p.sku}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="p-4 font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">OEM Cross Ref</td>
                                ${compareProducts.map(p => `<td class="p-4 text-center font-mono text-slate-600 dark:text-slate-400 text-[10px]">${p.oem}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="p-4 font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">Category</td>
                                ${compareProducts.map(p => `<td class="p-4 text-center text-slate-800 dark:text-slate-200">${p.category}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="p-4 font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">Stock Availability</td>
                                ${compareProducts.map(p => `<td class="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">${p.stockStatus} (${p.stockCount})</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="p-4 font-bold bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">Rating</td>
                                ${compareProducts.map(p => `<td class="p-4 text-center font-bold text-amber-500"><i class="fa-solid fa-star me-1"></i>${p.rating} / 5.0</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    },

    closeCompareModal() {
        const modal = document.getElementById('compare-modal');
        if (!modal) return;
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    },

    // DYNAMIC TICKING CLEARANCE SALE COUNTDOWN TIMER
    initClearanceCountdown() {
        const daysEl = document.getElementById('clearance-days');
        const hoursEl = document.getElementById('clearance-hours');
        const minsEl = document.getElementById('clearance-mins');
        const secsEl = document.getElementById('clearance-secs');
        
        if (!daysEl && !hoursEl && !minsEl && !secsEl) return;

        const STORAGE_KEY = 'autoparts_clearance_end';
        let targetTime = localStorage.getItem(STORAGE_KEY);
        const now = Date.now();

        if (!targetTime || parseInt(targetTime, 10) <= now) {
            // Set countdown: 2 days, 14 hours, 45 minutes, 30 seconds from now
            targetTime = now + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (45 * 60 * 1000) + (30 * 1000);
            localStorage.setItem(STORAGE_KEY, targetTime.toString());
        } else {
            targetTime = parseInt(targetTime, 10);
        }

        const updateTimer = () => {
            const current = Date.now();
            let distance = targetTime - current;

            if (distance <= 0) {
                // Rolling reset
                targetTime = current + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);
                localStorage.setItem(STORAGE_KEY, targetTime.toString());
                distance = targetTime - current;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
            if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    },

    // DYNAMIC WISHLIST BUTTON SYNCHRONIZATION
    updateWishlistButtons() {
        const wishlist = window.AutoPartsStore.getWishlist();
        document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
            const id = btn.getAttribute('data-wishlist-id');
            const isWish = wishlist.includes(id);
            const icon = btn.querySelector('.fa-heart');
            if (icon) {
                if (isWish) {
                    icon.className = 'fa-solid fa-heart text-red-600 text-sm transition-all duration-300 transform scale-110';
                    btn.title = 'Remove from Wishlist';
                } else {
                    icon.className = 'fa-regular fa-heart text-slate-400 dark:text-slate-400 text-sm transition-all duration-300 transform scale-100';
                    btn.title = 'Add to Wishlist';
                }
            }
        });
    },

    // RENDER HELPER FUNCTIONS
    renderProductCardHtml(p) {
        const isWish = window.AutoPartsStore.isInWishlist(p.id);
        const vehicle = window.AutoPartsStore.getSavedVehicle();
        const fitment = window.AutoPartsCompatibility.checkProductFitment(p, vehicle);

        return `
            <div class="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 flex flex-col justify-between w-full max-w-[320px] sm:max-w-none mx-auto">
                <div>
                    <!-- Image & Badges -->
                    <div class="relative bg-slate-100 dark:bg-slate-700/50 p-4 h-48 sm:h-52 w-full overflow-hidden flex items-center justify-center">
                        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        
                        <!-- Badges -->
                        <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                            ${p.badge ? `<span class="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">${p.badge}</span>` : ''}
                            ${p.isDeal ? `<span class="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider"><i class="fa-solid fa-bolt me-1"></i>Sale</span>` : ''}
                        </div>

                        <!-- Action Buttons overlay -->
                        <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button" onclick="AutoPartsStore.toggleWishlist('${p.id}')" data-wishlist-id="${p.id}" class="w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-500 shadow-md flex items-center justify-center transition-all" title="${isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                                <i class="${isWish ? 'fa-solid fa-heart text-red-600' : 'fa-regular fa-heart text-slate-400 dark:text-slate-400'} text-sm transition-all duration-300"></i>
                            </button>
                            <button type="button" onclick="AutoPartsUI.openQuickView('${p.id}')" class="w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 shadow-md flex items-center justify-center transition-colors" title="Quick View">
                                <i class="fa-solid fa-eye text-sm"></i>
                            </button>
                            <button type="button" onclick="AutoPartsStore.toggleCompare('${p.id}')" class="w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-md flex items-center justify-center transition-colors" title="Compare">
                                <i class="fa-solid fa-code-compare text-sm"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-4 sm:p-5">
                        <div class="flex items-center justify-between text-xs mb-1.5">
                            <span class="font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">${p.brand}</span>
                            <span class="font-mono text-slate-400 text-[11px]">${p.sku}</span>
                        </div>

                        <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2 line-clamp-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <a href="product-detail.html?id=${p.id}">${p.name}</a>
                        </h4>

                        <!-- Fitment indicator -->
                        ${fitment.fits !== null ? `
                            <div class="mb-3 flex items-center gap-1.5 text-[11px] font-semibold ${fitment.fits ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}">
                                <i class="fa-solid ${fitment.fits ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                                <span class="truncate">${fitment.text}</span>
                            </div>
                        ` : ''}

                        <div class="flex items-center gap-2 mb-3 text-xs text-amber-400">
                            <div class="flex"><i class="fa-solid fa-star"></i></div>
                            <span class="font-bold text-slate-800 dark:text-slate-200 text-[11px]">${p.rating}</span>
                            <span class="text-slate-400 text-[10px]">(${p.reviewsCount})</span>
                        </div>
                    </div>
                </div>

                <!-- Footer Price & Add to Cart -->
                <div class="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                    <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-3">
                        <div>
                            <div class="text-xs text-slate-400 line-through leading-none mb-0.5">${p.oldPrice ? '$' + p.oldPrice.toFixed(2) : ''}</div>
                            <div class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-none">$${p.price.toFixed(2)}</div>
                        </div>
                        <button type="button" onclick="AutoPartsStore.addToCart('${p.id}', 1); AutoPartsUI.toggleCartDrawer(true)" class="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all hover:scale-105">
                            <i class="fa-solid fa-cart-plus"></i>
                            <span>Add</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    renderProductListRowHtml(p) {
        const isWish = window.AutoPartsStore.isInWishlist(p.id);
        return `
            <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all w-full max-w-4xl mx-auto">
                <img src="${p.image}" class="w-full md:w-36 h-36 object-cover rounded-xl bg-slate-100 dark:bg-slate-700">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-1">
                        <span class="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">${p.brand}</span>
                        <span class="text-xs font-mono text-slate-400">SKU: ${p.sku}</span>
                        <span class="text-xs font-semibold px-2 py-0.5 rounded ${p.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 text-emerald-400' : 'bg-amber-100 text-amber-800'}">${p.stockStatus}</span>
                    </div>
                    <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2"><a href="product-detail.html?id=${p.id}" class="hover:text-red-600 transition-colors">${p.name}</a></h4>
                    <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">${p.shortDesc}</p>
                    <div class="text-xs text-slate-500 font-mono">OEM Reference: ${p.oem}</div>
                </div>
                <div class="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-slate-100 dark:border-slate-700 pt-3 md:pt-0">
                    <div class="text-start md:text-end mb-0 md:mb-3">
                        <div class="text-2xl font-extrabold text-slate-900 dark:text-white">$${p.price.toFixed(2)}</div>
                        <div class="text-[11px] font-semibold text-emerald-600">Workshop Tier: $${p.workshopPrice.toFixed(2)}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="AutoPartsStore.toggleWishlist('${p.id}')" data-wishlist-id="${p.id}" class="w-10 h-10 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-600 transition-all" title="${isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                            <i class="${isWish ? 'fa-solid fa-heart text-red-600' : 'fa-regular fa-heart text-slate-400 dark:text-slate-400'} text-base transition-all duration-300"></i>
                        </button>
                        <button type="button" onclick="AutoPartsStore.addToCart('${p.id}', 1); AutoPartsUI.toggleCartDrawer(true)" class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-2">
                            <i class="fa-solid fa-cart-plus"></i>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    scrollCarousel(direction) {
        const track = document.getElementById('home-carousel-track');
        if (!track) return;
        const scrollAmount = track.clientWidth * 0.75;
        if (direction === 'left') {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    },

    handleNewsletterSubmit(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('newsletter-email-input');
        const feedback = document.getElementById('newsletter-feedback-msg');
        if (!input || !input.value || !input.value.includes('@')) {
            if (this.showToast) this.showToast('Please enter a valid email address.', 'info');
            return;
        }
        const email = input.value;
        input.value = '';
        if (feedback) {
            feedback.innerHTML = `
                <div class="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <i class="fa-solid fa-circle-check text-emerald-400"></i>
                    <span>Thank you for subscribing! Your 10% trade welcome code: <strong>PRO10FIT</strong> has been sent to ${email}.</span>
                </div>
            `;
        }
        if (this.showToast) {
            this.showToast('Subscribed successfully! Check your email for your 10% coupon.', 'success');
        }
    },

    bindGlobalEvents() {
        // Subscribe to store events
        window.addEventListener('cartUpdated', () => {
            this.updateHeaderCounts();
            this.renderCartDrawer();
        });

        window.addEventListener('wishlistUpdated', () => {
            this.updateHeaderCounts();
            this.updateWishlistButtons();
        });

        window.addEventListener('compareUpdated', () => {
            this.updateHeaderCounts();
        });

        window.addEventListener('vehicleSaved', () => {
            this.updateMobileDrawerState();
        });

        // Search Autocomplete Header
        const headerSearchInputs = document.querySelectorAll('.js-header-search-input');
        headerSearchInputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target.value) {
                    e.preventDefault();
                    window.location.href = `products.html?search=${encodeURIComponent(e.target.value)}`;
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                AutoPartsUI.toggleCartDrawer(false);
                AutoPartsUI.toggleMobileMenu(false);
                AutoPartsUI.closeQuickView();
                AutoPartsUI.closeCompareModal();
                if (window.AutoPartsTrade) window.AutoPartsTrade.closeTradeModal();
            }
        });
    }
};

/**
 * AutoParts Pro - Trade & B2B Portal Engine
 * Powers Quick Order multi-SKU entry, Fleet Compatibility matrix, and Wholesale Tier Calculations
 */
window.AutoPartsTrade = {
    init() {
        this.initQuickOrder();
        this.initFleetSearch();
        this.initSavingsCalculator();
    },

    // 1. QUICK ORDER MULTI-ROW WIDGET
    initQuickOrder() {
        const tableBody = document.getElementById('quick-order-tbody');
        if (!tableBody) return;
        
        // Populate initial default 4 rows with sample popular SKUs
        const initialSkus = ['BRK-BM-5012', 'IGN-NGK-9412', 'ELC-BSH-0120', 'FLT-MHL-OX356'];
        tableBody.innerHTML = '';
        initialSkus.forEach((sku, idx) => {
            this.addQuickOrderRow(sku, (idx + 1) * 2);
        });
        this.calculateQuickOrderTotals();
    },

    addQuickOrderRow(defaultSku = '', defaultQty = 1) {
        const tableBody = document.getElementById('quick-order-tbody');
        if (!tableBody) return;

        const rowId = 'qo-row-' + Math.random().toString(36).substring(2, 9);
        const row = document.createElement('tr');
        row.id = rowId;
        row.className = 'trade-quick-order-row border-b border-slate-200 dark:border-slate-700/80 transition-colors';
        
        row.innerHTML = `
            <td class="p-3">
                <div class="relative">
                    <input type="text" value="${defaultSku}" placeholder="Enter SKU or OEM (e.g. BRK-BM-5012)..." 
                        class="js-qo-sku w-full bg-slate-50 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white uppercase focus:ring-2 focus:ring-red-600 focus:outline-none"
                        oninput="AutoPartsTrade.onQuickOrderInput('${rowId}')">
                    <div class="js-qo-match-status text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <span class="js-qo-status-text">Checking SKU...</span>
                    </div>
                </div>
            </td>
            <td class="p-3">
                <div class="js-qo-part-info text-xs font-medium text-slate-800 dark:text-slate-200">
                    <span class="text-slate-400 italic">No part selected</span>
                </div>
            </td>
            <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-1.5">
                    <button type="button" onclick="AutoPartsTrade.changeQty('${rowId}', -1)" class="w-7 h-7 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center">-</button>
                    <input type="number" min="1" max="999" value="${defaultQty}" 
                        class="js-qo-qty w-14 text-center bg-slate-50 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg py-1.5 text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        oninput="AutoPartsTrade.calculateQuickOrderTotals()">
                    <button type="button" onclick="AutoPartsTrade.changeQty('${rowId}', 1)" class="w-7 h-7 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center">+</button>
                </div>
            </td>
            <td class="p-3 text-end">
                <div class="js-qo-unit-price font-mono font-bold text-xs text-slate-700 dark:text-slate-300">$0.00</div>
                <div class="js-qo-retail-strike text-[10px] text-slate-400 line-through"></div>
            </td>
            <td class="p-3 text-end font-mono font-black text-xs text-red-600 dark:text-red-400">
                <span class="js-qo-line-total">$0.00</span>
            </td>
            <td class="p-3 text-center">
                <button type="button" onclick="AutoPartsTrade.removeQuickOrderRow('${rowId}')" class="p-1.5 text-slate-400 hover:text-red-600 transition-colors" title="Remove line">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
            </td>
        `;

        tableBody.appendChild(row);
        this.onQuickOrderInput(rowId);
    },

    removeQuickOrderRow(rowId) {
        const row = document.getElementById(rowId);
        if (row) {
            row.remove();
            this.calculateQuickOrderTotals();
        }
    },

    changeQty(rowId, delta) {
        const row = document.getElementById(rowId);
        if (!row) return;
        const qtyInput = row.querySelector('.js-qo-qty');
        if (qtyInput) {
            let current = parseInt(qtyInput.value, 10) || 1;
            current = Math.max(1, current + delta);
            qtyInput.value = current;
            this.calculateQuickOrderTotals();
        }
    },

    findProductBySkuOrOem(query) {
        if (!query || !window.AutoPartsData || !window.AutoPartsData.products) return null;
        const clean = query.trim().toUpperCase().replace(/[\s\-\/\.]/g, '');
        return window.AutoPartsData.products.find(p => {
            const pSku = p.sku.toUpperCase().replace(/[\s\-\/\.]/g, '');
            const pOem = (p.oem || '').toUpperCase().replace(/[\s\-\/\.]/g, '');
            return pSku.includes(clean) || clean.includes(pSku) || pOem.includes(clean);
        });
    },

    onQuickOrderInput(rowId) {
        const row = document.getElementById(rowId);
        if (!row) return;

        const skuInput = row.querySelector('.js-qo-sku');
        const matchStatus = row.querySelector('.js-qo-match-status');
        const partInfo = row.querySelector('.js-qo-part-info');
        const unitPriceEl = row.querySelector('.js-qo-unit-price');
        const retailStrikeEl = row.querySelector('.js-qo-retail-strike');

        const val = (skuInput ? skuInput.value : '').trim();
        if (!val) {
            if (partInfo) partInfo.innerHTML = '<span class="text-slate-400 italic">Enter SKU to preview</span>';
            if (matchStatus) matchStatus.innerHTML = '<span class="text-slate-400">Waiting for part SKU...</span>';
            if (unitPriceEl) unitPriceEl.textContent = '$0.00';
            if (retailStrikeEl) retailStrikeEl.textContent = '';
            row.dataset.matchedId = '';
            row.dataset.unitPrice = '0';
            this.calculateQuickOrderTotals();
            return;
        }

        const product = this.findProductBySkuOrOem(val);
        if (product) {
            row.dataset.matchedId = product.id;
            row.dataset.unitPrice = product.workshopPrice || product.price;
            if (matchStatus) matchStatus.innerHTML = `<span class="text-emerald-500 font-semibold"><i class="fa-solid fa-circle-check"></i> Verified OE Match</span>`;
            if (partInfo) {
                partInfo.innerHTML = `
                    <div class="font-bold text-slate-900 dark:text-white truncate max-w-xs">${product.name}</div>
                    <div class="text-[10px] text-slate-400 font-mono">${product.brand} | In Stock: ${product.stockCount} units</div>
                `;
            }
            if (unitPriceEl) unitPriceEl.textContent = `$${(product.workshopPrice || product.price).toFixed(2)}`;
            if (retailStrikeEl) retailStrikeEl.textContent = `$${product.price.toFixed(2)} MSRP`;
        } else {
            row.dataset.matchedId = '';
            row.dataset.unitPrice = '0';
            if (matchStatus) matchStatus.innerHTML = `<span class="text-amber-500 font-semibold"><i class="fa-solid fa-triangle-exclamation"></i> SKU Not Found</span>`;
            if (partInfo) partInfo.innerHTML = `<span class="text-red-500 text-xs">Unknown part number. Please verify SKU.</span>`;
            if (unitPriceEl) unitPriceEl.textContent = '$0.00';
            if (retailStrikeEl) retailStrikeEl.textContent = '';
        }

        this.calculateQuickOrderTotals();
    },

    calculateQuickOrderTotals() {
        const rows = document.querySelectorAll('.trade-quick-order-row');
        let totalItems = 0;
        let grandTotal = 0;
        let retailTotal = 0;

        rows.forEach(row => {
            const unitPrice = parseFloat(row.dataset.unitPrice) || 0;
            const qtyInput = row.querySelector('.js-qo-qty');
            const qty = parseInt(qtyInput ? qtyInput.value : '0', 10) || 0;
            const lineTotal = unitPrice * qty;
            
            const lineTotalEl = row.querySelector('.js-qo-line-total');
            if (lineTotalEl) {
                lineTotalEl.textContent = `$${lineTotal.toFixed(2)}`;
            }

            if (row.dataset.matchedId) {
                totalItems += qty;
                grandTotal += lineTotal;
                const product = window.AutoPartsData.products.find(p => p.id === row.dataset.matchedId);
                if (product) {
                    retailTotal += product.price * qty;
                }
            }
        });

        const totalItemsEl = document.getElementById('qo-total-units');
        const grandTotalEl = document.getElementById('qo-grand-total');
        const savingsEl = document.getElementById('qo-total-savings');

        if (totalItemsEl) totalItemsEl.textContent = totalItems.toString();
        if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
        if (savingsEl) {
            const savings = Math.max(0, retailTotal - grandTotal);
            savingsEl.textContent = `$${savings.toFixed(2)} (${retailTotal > 0 ? Math.round((savings / retailTotal) * 100) : 0}% Off MSRP)`;
        }
    },

    addAllQuickOrderToCart() {
        const rows = document.querySelectorAll('.trade-quick-order-row');
        let addedCount = 0;
        let totalUnitsAdded = 0;

        rows.forEach(row => {
            const productId = row.dataset.matchedId;
            const qtyInput = row.querySelector('.js-qo-qty');
            const qty = parseInt(qtyInput ? qtyInput.value : '0', 10) || 0;

            if (productId && qty > 0 && window.AutoPartsStore) {
                window.AutoPartsStore.addToCart(productId, qty);
                addedCount++;
                totalUnitsAdded += qty;
            }
        });

        if (addedCount > 0) {
            if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
                window.AutoPartsUI.showToast(`Batch added ${totalUnitsAdded} trade items to your workshop cart!`, 'success');
                window.AutoPartsUI.toggleCartDrawer(true);
            }
        } else {
            if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
                window.AutoPartsUI.showToast('Please enter at least one valid matched part SKU before adding to cart.', 'info');
            }
        }
    },

    // 2. SHOP BY VEHICLE FLEET ENGINE
    initFleetSearch() {
        const fleetList = document.getElementById('fleet-vehicles-list');
        if (!fleetList) return;
        this.renderFleetVehicles();
    },

    fleetVehicles: [
        { id: 'f-1', name: 'Fleet Van A', make: 'Ford', model: 'F-150', year: 2022, count: 6 },
        { id: 'f-2', name: 'Service Car B', make: 'Toyota', model: 'Camry', year: 2021, count: 4 },
        { id: 'f-3', name: 'Transport C', make: 'BMW', model: '3 Series (F30/G20)', year: 2020, count: 2 }
    ],

    renderFleetVehicles() {
        const container = document.getElementById('fleet-vehicles-list');
        if (!container) return;

        container.innerHTML = this.fleetVehicles.map((v, i) => `
            <div class="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center shadow">
                        #${i + 1}
                    </div>
                    <div>
                        <div class="font-bold text-xs text-slate-900 dark:text-white">${v.year} ${v.make} ${v.model}</div>
                        <div class="text-[10px] text-slate-400">${v.name} &bull; ${v.count} fleet units in service</div>
                    </div>
                </div>
                <button type="button" onclick="AutoPartsTrade.removeFleetVehicle('${v.id}')" class="text-slate-400 hover:text-red-600 p-1.5 transition-colors" title="Remove vehicle">
                    <i class="fa-solid fa-xmark text-xs"></i>
                </button>
            </div>
        `).join('');

        this.updateFleetCompatibilityMatrix();
    },

    addFleetVehicle() {
        const makeSel = document.getElementById('fleet-add-make');
        const modelSel = document.getElementById('fleet-add-model');
        const yearSel = document.getElementById('fleet-add-year');
        const countInput = document.getElementById('fleet-add-count');

        if (!makeSel || !makeSel.value || !modelSel || !modelSel.value) {
            if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
                window.AutoPartsUI.showToast('Please select vehicle Make and Model first.', 'info');
            }
            return;
        }

        this.fleetVehicles.push({
            id: 'f-' + Date.now(),
            name: `Fleet Unit #${this.fleetVehicles.length + 1}`,
            make: makeSel.value,
            model: modelSel.value,
            year: parseInt(yearSel.value, 10) || 2022,
            count: parseInt(countInput ? countInput.value : '1', 10) || 1
        });

        this.renderFleetVehicles();
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast('Fleet vehicle added to compatibility matrix!', 'success');
        }
    },

    removeFleetVehicle(id) {
        this.fleetVehicles = this.fleetVehicles.filter(v => v.id !== id);
        this.renderFleetVehicles();
    },

    updateFleetCompatibilityMatrix() {
        const matrixContainer = document.getElementById('fleet-matrix-results');
        if (!matrixContainer || !window.AutoPartsData) return;

        // Find products matching across ANY of the fleet vehicles
        const matched = window.AutoPartsData.products.filter(p => {
            return this.fleetVehicles.some(v => {
                return (p.compatibility && p.compatibility.make === v.make) ||
                       (p.compatibility && p.compatibility.make === 'Universal') ||
                       (p.brand && ['Bosch', 'NGK', 'Brembo', 'Mahle', 'Volta'].includes(p.brand));
            });
        }).slice(0, 5);

        matrixContainer.innerHTML = matched.map(p => `
            <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-500 transition-all gap-4">
                <div class="flex items-center gap-3 w-full sm:w-auto">
                    <img src="${p.image}" class="w-14 h-14 object-cover rounded-lg bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded">${p.category}</span>
                            <span class="text-[10px] font-mono text-slate-400">SKU: ${p.sku}</span>
                        </div>
                        <h4 class="font-bold text-xs text-slate-900 dark:text-white mt-1">${p.name}</h4>
                        <div class="text-[10px] text-emerald-500 font-semibold mt-0.5"><i class="fa-solid fa-check-double"></i> Fits all ${this.fleetVehicles.length} vehicles in selected fleet</div>
                    </div>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
                    <div class="text-end">
                        <div class="text-xs font-mono font-black text-red-600 dark:text-red-400">$${(p.workshopPrice || p.price).toFixed(2)}</div>
                        <div class="text-[10px] text-slate-400">Workshop Tier 2</div>
                    </div>
                    <button type="button" onclick="AutoPartsStore.addToCart('${p.id}', 10); AutoPartsUI.toggleCartDrawer(true)" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0">
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <span>Order Fleet Pack (10x)</span>
                    </button>
                </div>
            </div>
        `).join('');
    },

    // 3. WORKSHOP SAVINGS CALCULATOR
    initSavingsCalculator() {
        const slider = document.getElementById('trade-savings-slider');
        if (slider) {
            this.updateSavingsCalculator(slider.value);
        }
    },

    updateSavingsCalculator(spend) {
        const val = parseFloat(spend) || 5000;
        const spendDisplay = document.getElementById('trade-calc-spend-display');
        const annualSavingsDisplay = document.getElementById('trade-calc-annual-savings');
        const marginBoostDisplay = document.getElementById('trade-calc-margin-boost');
        const net30Display = document.getElementById('trade-calc-net30-credit');

        if (spendDisplay) spendDisplay.textContent = `$${val.toLocaleString()}/mo`;
        
        // 28% avg discount on parts spend = annual savings
        const annualSpend = val * 12;
        const annualSavings = Math.round(annualSpend * 0.28);
        const creditLine = Math.min(50000, Math.round(val * 2.5));

        if (annualSavingsDisplay) annualSavingsDisplay.textContent = `$${annualSavings.toLocaleString()}`;
        if (marginBoostDisplay) marginBoostDisplay.textContent = `+18.4%`;
        if (net30Display) net30Display.textContent = `$${creditLine.toLocaleString()}`;
    },

    // 4. TRADE ACCOUNT MODAL & FORM
    openTradeModal() {
        const modal = document.getElementById('trade-account-modal');
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.remove('opacity-0'), 10);
            document.body.classList.add('overflow-hidden');
        }
    },

    closeTradeModal() {
        const modal = document.getElementById('trade-account-modal');
        if (modal) {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        }
    },

    submitTradeApplication(e) {
        if (e) e.preventDefault();
        const form = document.getElementById('trade-account-form');
        const shopName = form ? form.querySelector('[name="shop_name"]')?.value : 'Your Workshop';
        
        this.closeTradeModal();
        if (window.AutoPartsUI && window.AutoPartsUI.showToast) {
            window.AutoPartsUI.showToast(`Application submitted for ${shopName || 'your workshop'}! Our B2B onboarding team will contact you within 2 business hours.`, 'success');
        }
    }
};

// Initialize UI engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.AutoPartsUI.init();
    if (window.AutoPartsTrade) {
        window.AutoPartsTrade.init();
    }
});

