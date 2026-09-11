import re

with open('trade.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update body class
content = content.replace(
    '<body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-red-600 selection:text-white">',
    '<body class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-red-600 selection:text-white transition-colors">'
)

# 2. Update Header
header_old = '''    <!-- B2B Main Navigation Header -->
    <header class="bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-800 transition-colors w-full shadow-xl">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <div class="flex items-center justify-between gap-2 sm:gap-4">
                
                <!-- Trade Logo -->
                <a href="trade.html" class="flex items-center gap-2 group flex-shrink-0">
                    <div class="w-9 sm:w-10 h-9 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black group-hover:scale-105 transition-transform shadow-lg shadow-red-600/40">
                        <i class="fa-solid fa-warehouse"></i>
                    </div>
                    <div>
                        <div class="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1 leading-tight">
                            AUTOPARTS <span class="text-red-500">PRO TRADE</span>
                        </div>
                        <div class="text-[9px] sm:text-[10px] uppercase font-black text-amber-400 tracking-widest leading-none flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> B2B WORKSHOP PORTAL
                        </div>
                    </div>
                </a>

                <!-- B2B Quick Navigation Links (Desktop) -->
                <nav class="hidden xl:flex items-center gap-4 text-xs font-bold text-slate-300">
                    <!-- Home Dropdown Menu -->
                    <div class="relative nav-dropdown-parent group py-1 cursor-pointer select-none">
                        <button type="button" class="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors focus:outline-none border-b-2 border-amber-500 pb-0.5">
                            <i class="fa-solid fa-house text-xs"></i>
                            <span>Home</span>
                            <i class="fa-solid fa-chevron-down text-[9px] group-hover:rotate-180 transition-transform duration-200"></i>
                        </button>

                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-80 bg-slate-900 text-slate-100 shadow-2xl rounded-2xl border border-slate-700 p-3 z-50 space-y-2">
                            <!-- Home Page 1 -->
                            <a href="index.html" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800 transition-all border border-transparent hover:border-red-500/40 group/item">
                                <div class="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center text-base font-bold flex-shrink-0 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                    <i class="fa-solid fa-store"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-white group-hover/item:text-red-400 transition-colors">Home Page 1</span>
                                        <span class="text-[9px] bg-red-950 text-red-400 font-extrabold px-1.5 py-0.5 rounded border border-red-800">Retail</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-200">General Retail Landing</div>
                                    <p class="text-[10px] text-slate-400 line-clamp-2 mt-0.5">Vehicle selector, top-selling carousel, 8 categories & clearance</p>
                                </div>
                            </a>

                            <!-- Home Page 2 -->
                            <a href="trade.html" class="flex items-start gap-3 p-3 rounded-xl bg-slate-800 transition-all border border-amber-500/50 group/item">
                                <div class="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-base font-bold flex-shrink-0 shadow-sm">
                                    <i class="fa-solid fa-toolbox"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-white group-hover/item:text-amber-400 transition-colors">Home Page 2</span>
                                        <span class="text-[9px] bg-amber-950 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-800">Current (B2B)</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-200">Trade / Workshop Portal</div>
                                    <p class="text-[10px] text-slate-400 line-clamp-2 mt-0.5">Multi-SKU quick order, fleet search, live stock & Net-30 credit</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <a href="#quick-order-section" class="hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-list-check text-red-500"></i> Quick Order
                    </a>
                    <a href="#fleet-search-section" class="hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-van-shuttle text-blue-400"></i> Fleet Lookup
                    </a>
                    <a href="bulk-pricing.html" class="hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-layer-group text-amber-400"></i> Wholesale Matrix
                    </a>
                    <a href="#inventory-snapshot-section" class="hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-boxes-stacked text-emerald-400"></i> Live Stock
                    </a>
                    <a href="#case-studies-section" class="hover:text-red-400 transition-colors py-1">Case Studies</a>
                </nav>

                <!-- Search SKU Bar (Desktop) -->
                <div class="flex-1 max-w-xs hidden lg:block mx-2">
                    <div class="relative">
                        <input type="text" placeholder="Lookup OEM / SKU number..." class="js-header-search-input w-full bg-slate-800 border border-slate-700 rounded-xl py-2 ps-9 pe-14 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                        <div class="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none text-slate-400">
                            <i class="fa-solid fa-barcode text-xs"></i>
                        </div>
                        <button type="button" onclick="const q = this.parentElement.querySelector('input')?.value; if(q) window.location.href='products.html?search='+encodeURIComponent(q);" class="absolute inset-y-1 right-1 px-2.5 bg-slate-700 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold transition-colors">
                            Find
                        </button>
                    </div>
                </div>

                <!-- B2B Actions (Hotline, Request Account, Cart Drawer) -->
                <div class="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
                    <!-- Trade Desk Hotline -->
                    <a href="tel:+18005559675" class="hidden 2xl:flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
                        <div class="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs">
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div class="text-start">
                            <div class="text-[9px] uppercase text-slate-400 leading-none">Trade Desk</div>
                            <div class="font-mono font-bold text-xs text-white leading-tight">1-800-555-WORK</div>
                        </div>
                    </a>

                    <!-- Request Trade Account Button -->
                    <button type="button" onclick="AutoPartsTrade.openTradeModal()" class="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5 flex-shrink-0">
                        <i class="fa-solid fa-file-signature"></i>
                        <span class="hidden sm:inline">Apply Trade Account</span>
                        <span class="sm:hidden">Apply</span>
                    </button>

                    <!-- Cart Drawer Trigger Button -->
                    <button type="button" onclick="AutoPartsUI.toggleCartDrawer(true)" class="flex items-center gap-1.5 sm:gap-2 bg-slate-800 hover:bg-slate-700 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all font-semibold text-xs border border-slate-700 flex-shrink-0">
                        <div class="relative">
                            <i class="fa-solid fa-dolly text-base text-amber-400"></i>
                            <span class="js-cart-count-badge hidden absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900">0</span>
                        </div>
                        <div class="hidden sm:block text-start">
                            <div class="text-[9px] uppercase tracking-wider text-slate-400 leading-none">Trade Cart</div>
                            <div class="js-cart-subtotal-display font-extrabold text-xs text-white">$0.00</div>
                        </div>
                    </button>

                    <!-- Mobile/Tablet Menu Hamburger Button (Visible below xl) -->
                    <button type="button" onclick="AutoPartsUI.toggleMobileMenu(true)" class="xl:hidden p-2 text-slate-200 hover:text-red-500 rounded-xl transition-colors flex-shrink-0" aria-label="Open Navigation Menu">
                        <i class="fa-solid fa-bars-staggered text-lg sm:text-xl"></i>
                    </button>
                </div>

            </div>

            <!-- Mobile & Tablet Search Bar (Visible below lg) -->
            <div class="mt-2.5 lg:hidden">
                <div class="relative">
                    <input type="text" placeholder="Lookup OEM / SKU number..." class="js-header-search-input w-full bg-slate-800 border border-slate-700 rounded-xl py-2 ps-9 pe-16 text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                    <div class="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none text-slate-400">
                        <i class="fa-solid fa-barcode text-xs"></i>
                    </div>
                    <button type="button" onclick="const mq = this.parentElement.querySelector('input')?.value; if(mq) window.location.href='products.html?search='+encodeURIComponent(mq);" class="absolute inset-y-1 right-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
                        Find
                    </button>
                </div>
            </div>
        </div>
    </header>'''

header_new = '''    <!-- B2B Main Navigation Header -->
    <header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 transition-colors w-full shadow-sm dark:shadow-xl">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <div class="flex items-center justify-between gap-2 sm:gap-4">
                
                <!-- Trade Logo -->
                <a href="trade.html" class="flex items-center gap-2 group flex-shrink-0">
                    <div class="w-9 sm:w-10 h-9 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black group-hover:scale-105 transition-transform shadow-lg shadow-red-600/40">
                        <i class="fa-solid fa-warehouse"></i>
                    </div>
                    <div>
                        <div class="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1 leading-tight">
                            AUTOPARTS <span class="text-red-600">PRO TRADE</span>
                        </div>
                        <div class="text-[9px] sm:text-[10px] uppercase font-black text-amber-600 dark:text-amber-400 tracking-widest leading-none flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> B2B WORKSHOP PORTAL
                        </div>
                    </div>
                </a>

                <!-- B2B Quick Navigation Links (Desktop) -->
                <nav class="hidden xl:flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <!-- Home Dropdown Menu -->
                    <div class="relative nav-dropdown-parent group py-1 cursor-pointer select-none">
                        <button type="button" class="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors focus:outline-none border-b-2 border-amber-500 pb-0.5">
                            <i class="fa-solid fa-house text-xs"></i>
                            <span>Home</span>
                            <i class="fa-solid fa-chevron-down text-[9px] group-hover:rotate-180 transition-transform duration-200"></i>
                        </button>

                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-80 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 space-y-2">
                            <!-- Home Page 1 -->
                            <a href="index.html" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-red-500/40 group/item">
                                <div class="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-400 flex items-center justify-center text-base font-bold flex-shrink-0 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                    <i class="fa-solid fa-store"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-red-600 dark:group-hover/item:text-red-400 transition-colors">Home Page 1</span>
                                        <span class="text-[9px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 font-extrabold px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800">Retail</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-800 dark:text-slate-200">General Retail Landing</div>
                                    <p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">Vehicle selector, top-selling carousel, 8 categories & clearance</p>
                                </div>
                            </a>

                            <!-- Home Page 2 -->
                            <a href="trade.html" class="flex items-start gap-3 p-3 rounded-xl bg-amber-50/80 dark:bg-slate-800 transition-all border border-amber-400 dark:border-amber-500/50 group/item">
                                <div class="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-base font-bold flex-shrink-0 shadow-sm">
                                    <i class="fa-solid fa-toolbox"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors">Home Page 2</span>
                                        <span class="text-[9px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800">Current (B2B)</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-800 dark:text-slate-200">Trade / Workshop Portal</div>
                                    <p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">Multi-SKU quick order, fleet search, live stock & Net-30 credit</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <a href="#quick-order-section" class="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-list-check text-red-600"></i> Quick Order
                    </a>
                    <a href="#fleet-search-section" class="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-van-shuttle text-blue-600 dark:text-blue-400"></i> Fleet Lookup
                    </a>
                    <a href="bulk-pricing.html" class="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-layer-group text-amber-600 dark:text-amber-400"></i> Wholesale Matrix
                    </a>
                    <a href="#inventory-snapshot-section" class="hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1.5 py-1">
                        <i class="fa-solid fa-boxes-stacked text-emerald-600 dark:text-emerald-400"></i> Live Stock
                    </a>
                    <a href="#case-studies-section" class="hover:text-red-600 dark:hover:text-red-400 transition-colors py-1">Case Studies</a>
                </nav>

                <!-- Search SKU Bar (Desktop) -->
                <div class="flex-1 max-w-xs hidden lg:block mx-2">
                    <div class="relative">
                        <input type="text" placeholder="Lookup OEM / SKU number..." class="js-header-search-input w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl py-2 ps-9 pe-14 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                        <div class="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none text-slate-400">
                            <i class="fa-solid fa-barcode text-xs"></i>
                        </div>
                        <button type="button" onclick="const q = this.parentElement.querySelector('input')?.value; if(q) window.location.href='products.html?search='+encodeURIComponent(q);" class="absolute inset-y-1 right-1 px-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-red-600 hover:text-white text-slate-700 dark:text-white rounded-lg text-[10px] font-bold transition-colors">
                            Find
                        </button>
                    </div>
                </div>

                <!-- B2B Actions (Hotline, Request Account, Cart Drawer) -->
                <div class="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
                    <!-- Trade Desk Hotline -->
                    <a href="tel:+18005559675" class="hidden 2xl:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700/90 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl transition-colors flex-shrink-0">
                        <div class="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 flex items-center justify-center text-xs">
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div class="text-start">
                            <div class="text-[9px] uppercase text-slate-500 dark:text-slate-400 leading-none">Trade Desk</div>
                            <div class="font-mono font-bold text-xs text-slate-900 dark:text-white leading-tight">1-800-555-WORK</div>
                        </div>
                    </a>

                    <!-- Request Trade Account Button -->
                    <button type="button" onclick="AutoPartsTrade.openTradeModal()" class="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/30 flex items-center gap-1.5 flex-shrink-0">
                        <i class="fa-solid fa-file-signature"></i>
                        <span class="hidden sm:inline">Apply Trade Account</span>
                        <span class="sm:hidden">Apply</span>
                    </button>

                    <!-- Cart Drawer Trigger Button -->
                    <button type="button" onclick="AutoPartsUI.toggleCartDrawer(true)" class="flex items-center gap-1.5 sm:gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all font-semibold text-xs border border-slate-200 dark:border-slate-700 flex-shrink-0">
                        <div class="relative">
                            <i class="fa-solid fa-dolly text-base text-amber-500 dark:text-amber-400"></i>
                            <span class="js-cart-count-badge hidden absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-slate-900">0</span>
                        </div>
                        <div class="hidden sm:block text-start">
                            <div class="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 leading-none">Trade Cart</div>
                            <div class="js-cart-subtotal-display font-extrabold text-xs text-slate-900 dark:text-white">$0.00</div>
                        </div>
                    </button>

                    <!-- Mobile/Tablet Menu Hamburger Button (Visible below xl) -->
                    <button type="button" onclick="AutoPartsUI.toggleMobileMenu(true)" class="xl:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-red-600 rounded-xl transition-colors flex-shrink-0" aria-label="Open Navigation Menu">
                        <i class="fa-solid fa-bars-staggered text-lg sm:text-xl"></i>
                    </button>
                </div>

            </div>

            <!-- Mobile & Tablet Search Bar (Visible below lg) -->
            <div class="mt-2.5 lg:hidden">
                <div class="relative">
                    <input type="text" placeholder="Lookup OEM / SKU number..." class="js-header-search-input w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl py-2 ps-9 pe-16 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                    <div class="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none text-slate-400">
                        <i class="fa-solid fa-barcode text-xs"></i>
                    </div>
                    <button type="button" onclick="const mq = this.parentElement.querySelector('input')?.value; if(mq) window.location.href='products.html?search='+encodeURIComponent(mq);" class="absolute inset-y-1 right-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
                        Find
                    </button>
                </div>
            </div>
        </div>
    </header>'''

content = content.replace(header_old, header_new)

# 3. Update Quick Order Section
content = content.replace(
    '<section id="quick-order-section" class="py-14 bg-slate-900 border-b border-slate-800">',
    '<section id="quick-order-section" class="py-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Workshop Quick Order Widget</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Workshop Quick Order Widget</h2>'
)
content = content.replace(
    '<p class="text-xs text-slate-400 mt-1">Enter multiple part numbers or OEM SKUs, set quantities, and push all items directly to your trade cart.</p>',
    '<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Enter multiple part numbers or OEM SKUs, set quantities, and push all items directly to your trade cart.</p>'
)
content = content.replace(
    '<button type="button" onclick="AutoPartsTrade.addQuickOrderRow()" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center gap-1.5">',
    '<button type="button" onclick="AutoPartsTrade.addQuickOrderRow()" class="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-colors border border-slate-300 dark:border-slate-700 flex items-center gap-1.5">'
)
content = content.replace(
    '<div class="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">',
    '<div class="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">'
)
content = content.replace(
    '<thead class="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">',
    '<thead class="bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-800">'
)
content = content.replace(
    '<tbody id="quick-order-tbody" class="divide-y divide-slate-800/80">',
    '<tbody id="quick-order-tbody" class="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-900/40">'
)
content = content.replace(
    '<div class="p-4 sm:p-6 bg-slate-900/80 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">',
    '<div class="p-4 sm:p-6 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">'
)
content = content.replace(
    '<span id="qo-total-units" class="font-mono font-black text-white ms-1 text-sm">0</span>',
    '<span id="qo-total-units" class="font-mono font-black text-slate-900 dark:text-white ms-1 text-sm">0</span>'
)
content = content.replace(
    '<span class="font-semibold text-white ms-1">Today &bull; Priority Hub</span>',
    '<span class="font-semibold text-slate-900 dark:text-white ms-1">Today &bull; Priority Hub</span>'
)
content = content.replace(
    '<div class="mt-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">',
    '<div class="mt-4 p-4 bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">'
)

# 4. Update Trade Account Benefits Section
content = content.replace(
    '<section class="py-16 bg-slate-950 border-b border-slate-800">',
    '<section class="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">Trade Account Commercial Benefits</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">Trade Account Commercial Benefits</h2>'
)
content = content.replace(
    '<p class="text-xs sm:text-sm text-slate-400 mt-2">Scale your shop profitability with customized parts fulfillment programs</p>',
    '<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">Scale your shop profitability with customized parts fulfillment programs</p>'
)
content = content.replace(
    '<div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-red-600/60 transition-all shadow-md">',
    '<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-red-600/60 transition-all shadow-sm dark:shadow-md">'
)
content = content.replace(
    '<div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-600/60 transition-all shadow-md">',
    '<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-600/60 transition-all shadow-sm dark:shadow-md">'
)
content = content.replace(
    '<div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-600/60 transition-all shadow-md">',
    '<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600/60 transition-all shadow-sm dark:shadow-md">'
)
content = content.replace(
    '<div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-600/60 transition-all shadow-md">',
    '<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-600/60 transition-all shadow-sm dark:shadow-md">'
)
content = content.replace(
    '<div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-purple-600/60 transition-all shadow-md">',
    '<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-600/60 transition-all shadow-sm dark:shadow-md">'
)
content = content.replace(
    '<div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-rose-600/60 transition-all shadow-md">',
    '<div class="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-600/60 transition-all shadow-sm dark:shadow-md">'
)

# Replace benefit card text colors
content = re.sub(r'<h3 class="font-bold text-base text-white mb-2">', '<h3 class="font-bold text-base text-slate-900 dark:text-white mb-2">', content)
content = re.sub(r'<p class="text-xs text-slate-400 leading-relaxed">', '<p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">', content)

# 5. Update Bulk Pricing Tier & Calculator Section
content = content.replace(
    '<section class="py-14 bg-slate-900 border-b border-slate-800">',
    '<section class="py-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">Bulk Volume Pricing Teaser</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">Bulk Volume Pricing Teaser</h2>'
)
content = content.replace(
    '<p class="text-xs text-slate-400 mt-1">Compare standard consumer retail prices against our certified workshop and fleet tiers.</p>',
    '<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Compare standard consumer retail prices against our certified workshop and fleet tiers.</p>'
)
content = content.replace(
    '<div class="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">',
    '<div class="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">'
)
content = content.replace(
    '<thead class="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">',
    '<thead class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">'
)
content = content.replace(
    '<tbody class="divide-y divide-slate-800 font-mono text-xs">',
    '<tbody class="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs bg-white dark:bg-slate-950">'
)
content = re.sub(
    r'<td class="p-3 font-sans font-bold text-slate-200">',
    '<td class="p-3 font-sans font-bold text-slate-900 dark:text-slate-200">',
    content
)
content = content.replace(
    '<div class="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5">',
    '<div class="lg:col-span-5 bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">'
)
content = content.replace(
    '<h3 class="font-black text-base text-white">Workshop Margin Calculator</h3>',
    '<h3 class="font-black text-base text-slate-900 dark:text-white">Workshop Margin Calculator</h3>'
)
content = content.replace(
    '<div class="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">',
    '<div class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">'
)
content = content.replace(
    '<span id="trade-calc-margin-boost" class="font-mono font-bold text-white">+18.4%</span>',
    '<span id="trade-calc-margin-boost" class="font-mono font-bold text-slate-900 dark:text-white">+18.4%</span>'
)

# 6. Update Fleet Search Section
content = content.replace(
    '<section id="fleet-search-section" class="py-14 bg-slate-950 border-b border-slate-800">',
    '<section id="fleet-search-section" class="py-14 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Shop by Vehicle Fleet</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Shop by Vehicle Fleet</h2>'
)
content = content.replace(
    '<div class="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">',
    '<div class="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-md">'
)
content = content.replace(
    '<h3 class="font-bold text-sm text-white flex items-center gap-2">',
    '<h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">'
)
content = content.replace(
    '<div class="text-xs font-bold text-slate-300 uppercase tracking-wider">+ Add Another Fleet Model</div>',
    '<div class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">+ Add Another Fleet Model</div>'
)
content = content.replace(
    '<select id="fleet-add-make" class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-600">',
    '<select id="fleet-add-make" class="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-600">'
)
content = content.replace(
    '<select id="fleet-add-model" class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-600">',
    '<select id="fleet-add-model" class="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-600">'
)
content = content.replace(
    '<select id="fleet-add-year" class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-600">',
    '<select id="fleet-add-year" class="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-600">'
)
content = content.replace(
    '<button type="button" onclick="AutoPartsTrade.addFleetVehicle()" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-1.5">',
    '<button type="button" onclick="AutoPartsTrade.addFleetVehicle()" class="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-xs font-bold transition-colors border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5">'
)
content = content.replace(
    '<h3 class="font-bold text-sm text-white">Cross-Fleet Fast Moving Maintenance Packs</h3>',
    '<h3 class="font-bold text-sm text-slate-900 dark:text-white">Cross-Fleet Fast Moving Maintenance Packs</h3>'
)

# 7. Update Inventory Snapshot Section
content = content.replace(
    '<section id="inventory-snapshot-section" class="py-14 bg-slate-900 border-b border-slate-800">',
    '<section id="inventory-snapshot-section" class="py-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Regional Hub Stock & Dispatch Snapshot</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Regional Hub Stock & Dispatch Snapshot</h2>'
)
content = content.replace(
    '<div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">',
    '<div class="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">'
)
content = content.replace(
    '<span class="font-bold text-xs text-white">Detroit Central Hub</span>',
    '<span class="font-bold text-xs text-slate-900 dark:text-white">Detroit Central Hub</span>'
)
content = content.replace(
    '<span class="font-bold text-xs text-white">Chicago Midwest Depot</span>',
    '<span class="font-bold text-xs text-slate-900 dark:text-white">Chicago Midwest Depot</span>'
)
content = content.replace(
    '<span class="font-bold text-xs text-white">Dallas Southern Logistics</span>',
    '<span class="font-bold text-xs text-slate-900 dark:text-white">Dallas Southern Logistics</span>'
)
content = content.replace(
    '<span class="font-bold text-xs text-white">Atlanta Gateway Hub</span>',
    '<span class="font-bold text-xs text-slate-900 dark:text-white">Atlanta Gateway Hub</span>'
)
content = content.replace(
    '<div class="text-2xl font-mono font-black text-white">42,850 <span class="text-xs text-slate-400 font-sans">SKUs</span></div>',
    '<div class="text-2xl font-mono font-black text-slate-900 dark:text-white">42,850 <span class="text-xs text-slate-500 dark:text-slate-400 font-sans">SKUs</span></div>'
)
content = content.replace(
    '<div class="text-2xl font-mono font-black text-white">28,100 <span class="text-xs text-slate-400 font-sans">SKUs</span></div>',
    '<div class="text-2xl font-mono font-black text-slate-900 dark:text-white">28,100 <span class="text-xs text-slate-500 dark:text-slate-400 font-sans">SKUs</span></div>'
)
content = content.replace(
    '<div class="text-2xl font-mono font-black text-white">19,450 <span class="text-xs text-slate-400 font-sans">SKUs</span></div>',
    '<div class="text-2xl font-mono font-black text-slate-900 dark:text-white">19,450 <span class="text-xs text-slate-500 dark:text-slate-400 font-sans">SKUs</span></div>'
)
content = content.replace(
    '<div class="text-2xl font-mono font-black text-white">22,300 <span class="text-xs text-slate-400 font-sans">SKUs</span></div>',
    '<div class="text-2xl font-mono font-black text-slate-900 dark:text-white">22,300 <span class="text-xs text-slate-500 dark:text-slate-400 font-sans">SKUs</span></div>'
)

# 8. Update Commercial Fast-Movers Section
content = content.replace(
    '<section class="py-14 bg-slate-950 border-b border-slate-800">',
    '<section class="py-14 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Commercial & Workshop Fast-Movers</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Commercial & Workshop Fast-Movers</h2>'
)
content = content.replace(
    '<div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between hover:border-red-500 transition-all group">',
    '<div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between hover:border-red-500 transition-all group shadow-sm">'
)
content = re.sub(
    r'<h4 class="font-bold text-xs text-white mb-2 line-clamp-2">',
    '<h4 class="font-bold text-xs text-slate-900 dark:text-white mb-2 line-clamp-2">',
    content
)
content = content.replace(
    '<div class="text-base font-mono font-black text-white">$145.00 <span class="text-[10px] text-slate-400 font-sans">/unit</span></div>',
    '<div class="text-base font-mono font-black text-slate-900 dark:text-white">$145.00 <span class="text-[10px] text-slate-400 font-sans">/unit</span></div>'
)
content = content.replace(
    '<div class="text-base font-mono font-black text-white">$9.20 <span class="text-[10px] text-slate-400 font-sans">/plug</span></div>',
    '<div class="text-base font-mono font-black text-slate-900 dark:text-white">$9.20 <span class="text-[10px] text-slate-400 font-sans">/plug</span></div>'
)
content = content.replace(
    '<div class="text-base font-mono font-black text-white">$8.50 <span class="text-[10px] text-slate-400 font-sans">/unit</span></div>',
    '<div class="text-base font-mono font-black text-slate-900 dark:text-white">$8.50 <span class="text-[10px] text-slate-400 font-sans">/unit</span></div>'
)
content = content.replace(
    '<div class="text-base font-mono font-black text-white">$275.00</div>',
    '<div class="text-base font-mono font-black text-slate-900 dark:text-white">$275.00</div>'
)

# 9. Update Case Studies Section
content = content.replace(
    '<section id="case-studies-section" class="py-16 bg-slate-900 border-b border-slate-800">',
    '<section id="case-studies-section" class="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">'
)
content = content.replace(
    '<h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">Independent Garage Case Studies</h2>',
    '<h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">Independent Garage Case Studies</h2>'
)
content = content.replace(
    '<div class="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">',
    '<div class="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm">'
)
content = content.replace(
    '<h3 class="font-bold text-base text-white mb-2">Apex Eurotech Autowerks</h3>',
    '<h3 class="font-bold text-base text-slate-900 dark:text-white mb-2">Apex Eurotech Autowerks</h3>'
)
content = content.replace(
    '<h3 class="font-bold text-base text-white mb-2">Metro Delivery Logistics</h3>',
    '<h3 class="font-bold text-base text-slate-900 dark:text-white mb-2">Metro Delivery Logistics</h3>'
)
content = content.replace(
    '<h3 class="font-bold text-base text-white mb-2">Precision Brake & Alignment</h3>',
    '<h3 class="font-bold text-base text-slate-900 dark:text-white mb-2">Precision Brake & Alignment</h3>'
)
content = content.replace(
    '<div class="font-bold text-xs text-white">Dominic Tyler</div>',
    '<div class="font-bold text-xs text-slate-900 dark:text-white">Dominic Tyler</div>'
)
content = content.replace(
    '<div class="font-bold text-xs text-white">Rachel Hernandez</div>',
    '<div class="font-bold text-xs text-slate-900 dark:text-white">Rachel Hernandez</div>'
)
content = content.replace(
    '<div class="font-bold text-xs text-white">Gary Sterling</div>',
    '<div class="font-bold text-xs text-slate-900 dark:text-white">Gary Sterling</div>'
)

# 10. Update Trade Support Strip
content = content.replace(
    '<section class="py-12 bg-slate-950 text-slate-300">',
    '<section class="py-12 bg-slate-900 dark:bg-slate-950 text-slate-300 border-b border-slate-800">'
)

# 11. Update Trade Modal
modal_old = '''    <!-- TRADE ACCOUNT APPLICATION MODAL -->
    <div id="trade-account-modal" class="hidden opacity-0 fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300">
        <div class="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-800 max-h-[90vh] overflow-y-auto">
            <button type="button" onclick="AutoPartsTrade.closeTradeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-red-600/40">
                    <i class="fa-solid fa-id-card-clip"></i>
                </div>
                <div>
                    <h3 class="font-black text-lg text-white leading-tight">Apply for a Trade Account</h3>
                    <p class="text-xs text-slate-400">Unlock wholesale discount tiers & Net-30 credit terms</p>
                </div>
            </div>

            <form id="trade-account-form" onsubmit="AutoPartsTrade.submitTradeApplication(event)" class="space-y-4 pt-2">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Company / Workshop Name</label>
                    <input type="text" name="shop_name" required placeholder="e.g. Apex Auto Services LLC" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Business Tax ID / EIN</label>
                        <input type="text" required placeholder="XX-XXXXXXX" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Facility Type</label>
                        <select class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                            <option value="garage">Independent Repair Garage (1-5 Bays)</option>
                            <option value="workshop">Commercial Service Center (6+ Bays)</option>
                            <option value="fleet">Fleet Operator / Transport Co.</option>
                            <option value="dealership">Specialty Euro / Import Specialist</option>
                            <option value="mobile">Mobile Certified Mechanic</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Contact Name & Title</label>
                        <input type="text" required placeholder="Dominic Tyler, Owner" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Direct Phone</label>
                        <input type="tel" required placeholder="(313) 555-0199" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Business Email (For Invoicing)</label>
                    <input type="email" required placeholder="parts@apexautoservices.com" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Estimated Monthly Parts Spend</label>
                    <select class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                        <option value="1-5k">$1,000 – $5,000 / month (Trade Tier 1 -15%)</option>
                        <option value="5-15k">$5,000 – $15,000 / month (Workshop Tier 2 -25%)</option>
                        <option value="15k+">$15,000+ / month (Commercial Fleet Tier 3 -35%)</option>
                    </select>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-paper-plane"></i>
                        <span>Submit Trade Application</span>
                    </button>
                    <div class="text-[11px] text-slate-400 text-center mt-2">
                        Applications are reviewed within 2 business hours. No credit check required for standard COD trade accounts.
                    </div>
                </div>
            </form>
        </div>
    </div>'''

modal_new = '''    <!-- TRADE ACCOUNT APPLICATION MODAL -->
    <div id="trade-account-modal" class="hidden opacity-0 fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300">
        <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <button type="button" onclick="AutoPartsTrade.closeTradeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-white flex items-center justify-center transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-red-600/40">
                    <i class="fa-solid fa-id-card-clip"></i>
                </div>
                <div>
                    <h3 class="font-black text-lg text-slate-900 dark:text-white leading-tight">Apply for a Trade Account</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Unlock wholesale discount tiers & Net-30 credit terms</p>
                </div>
            </div>

            <form id="trade-account-form" onsubmit="AutoPartsTrade.submitTradeApplication(event)" class="space-y-4 pt-2">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Company / Workshop Name</label>
                    <input type="text" name="shop_name" required placeholder="e.g. Apex Auto Services LLC" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Business Tax ID / EIN</label>
                        <input type="text" required placeholder="XX-XXXXXXX" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Facility Type</label>
                        <select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                            <option value="garage">Independent Repair Garage (1-5 Bays)</option>
                            <option value="workshop">Commercial Service Center (6+ Bays)</option>
                            <option value="fleet">Fleet Operator / Transport Co.</option>
                            <option value="dealership">Specialty Euro / Import Specialist</option>
                            <option value="mobile">Mobile Certified Mechanic</option>
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Contact Name & Title</label>
                        <input type="text" required placeholder="Dominic Tyler, Owner" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Direct Phone</label>
                        <input type="tel" required placeholder="(313) 555-0199" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Business Email (For Invoicing)</label>
                    <input type="email" required placeholder="parts@apexautoservices.com" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Estimated Monthly Parts Spend</label>
                    <select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                        <option value="1-5k">$1,000 – $5,000 / month (Trade Tier 1 -15%)</option>
                        <option value="5-15k">$5,000 – $15,000 / month (Workshop Tier 2 -25%)</option>
                        <option value="15k+">$15,000+ / month (Commercial Fleet Tier 3 -35%)</option>
                    </select>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-paper-plane"></i>
                        <span>Submit Trade Application</span>
                    </button>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
                        Applications are reviewed within 2 business hours. No credit check required for standard COD trade accounts.
                    </div>
                </div>
            </form>
        </div>
    </div>'''

content = content.replace(modal_old, modal_new)

with open('trade.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated trade.html with dark/light mode styles successfully!")
