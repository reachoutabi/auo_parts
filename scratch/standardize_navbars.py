import os
import re

def get_header_html(active_page):
    def link_class(page_id):
        if page_id == active_page:
            return 'text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-2 py-0.5 rounded-t'
        return 'text-slate-200 hover:text-red-400 hover:bg-slate-800/60 px-2 py-0.5 rounded transition-all'

    return f'''    <!-- Top Announcement Bar -->
    <div class="bg-slate-950 text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800 w-full overflow-hidden">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div class="hidden lg:flex items-center gap-4">
                <span class="flex items-center gap-1.5 text-emerald-400 font-medium truncate">
                    <i class="fa-solid fa-shield-check text-xs"></i> 100% Guaranteed Fitment & Genuine OEM Quality
                </span>
                <span class="text-slate-600">|</span>
                <span class="text-slate-300"><i class="fa-solid fa-truck-fast text-red-500 me-1"></i> Free Express Shipping Over $150</span>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-2 text-xs font-semibold w-full sm:w-auto">
                <!-- Theme Switcher Button (Icon Only) -->
                <button type="button" onclick="AutoPartsUI.toggleTheme()" class="w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-colors flex-shrink-0" title="Toggle Dark/Light Theme" aria-label="Toggle Dark/Light Theme">
                    <i class="fa-solid fa-moon dark:hidden text-amber-400 text-sm"></i>
                    <i class="fa-solid fa-sun hidden dark:inline text-amber-400 text-sm"></i>
                </button>
                <!-- RTL/LTR Switcher (Icon Only) -->
                <button type="button" onclick="AutoPartsUI.toggleRTL()" class="w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-blue-400 flex items-center justify-center transition-colors flex-shrink-0" title="Toggle LTR/RTL Layout" aria-label="Toggle LTR/RTL Layout">
                    <i class="fa-solid fa-right-left text-blue-400 text-xs"></i>
                </button>
                <span class="text-slate-700">|</span>
                <!-- Account / Login Link -->
                <a href="account.html" class="hover:text-white flex items-center gap-1.5 transition-colors flex-shrink-0">
                    <i class="fa-solid fa-user-gear"></i>
                    <span>My Account</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 transition-colors w-full">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <div class="flex items-center justify-between gap-3 sm:gap-4">
                
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-2 group flex-shrink-0">
                    <div class="w-9 sm:w-10 h-9 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black group-hover:scale-105 transition-transform shadow-md shadow-red-600/30">
                        <i class="fa-solid fa-gears"></i>
                    </div>
                    <div>
                        <div class="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1 leading-tight">
                            AUTO<span class="text-red-600">PARTS</span>
                        </div>
                        <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">PRO STOREFRONT</div>
                    </div>
                </a>

                <!-- Header Vehicle Selector Badge -->
                <div class="hidden xl:block js-header-vehicle-badge flex-shrink-0">
                    <!-- Populated dynamically via JS -->
                </div>

                <!-- Main Header Search Bar (Desktop) -->
                <div class="flex-1 max-w-lg hidden lg:block mx-3">
                    <div class="relative">
                        <input type="text" placeholder="Search by Part Name, SKU, or OEM Number (e.g. Brembo, 34116792223)..." class="js-header-search-input w-full bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-xl py-2 ps-10 pe-20 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                        <div class="absolute inset-y-0 left-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                            <i class="fa-solid fa-magnifying-glass text-xs"></i>
                        </div>
                        <button type="button" onclick="const q = this.parentElement.querySelector('input')?.value; if(q) window.location.href='products.html?search='+encodeURIComponent(q);" class="absolute inset-y-1 right-1 px-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Header Actions (Wishlist, Compare, Cart, Mobile Menu) -->
                <div class="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
                    <!-- Compare Modal Button -->
                    <button type="button" onclick="AutoPartsUI.openCompareModal()" class="relative p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0" title="Compare Products">
                        <i class="fa-solid fa-code-compare text-base sm:text-lg"></i>
                        <span class="js-compare-count-badge hidden absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>

                    <!-- Wishlist Button -->
                    <a href="account.html#wishlist" class="relative p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0" title="Wishlist">
                        <i class="fa-solid fa-heart text-base sm:text-lg"></i>
                        <span class="js-wishlist-count-badge hidden absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </a>

                    <!-- Cart Drawer Trigger Button -->
                    <button type="button" onclick="AutoPartsUI.toggleCartDrawer(true)" class="flex items-center gap-1.5 sm:gap-2 bg-slate-100 dark:bg-slate-700/80 hover:bg-red-600 hover:text-white text-slate-800 dark:text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all font-semibold text-xs border border-slate-200 dark:border-slate-600 flex-shrink-0">
                        <div class="relative">
                            <i class="fa-solid fa-cart-shopping text-sm sm:text-base"></i>
                            <span class="js-cart-count-badge hidden absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">0</span>
                        </div>
                        <div class="hidden sm:block text-start">
                            <div class="text-[9px] uppercase tracking-wider text-slate-400 leading-none">My Cart</div>
                            <div class="js-cart-subtotal-display font-extrabold text-xs">$0.00</div>
                        </div>
                    </button>

                    <!-- Mobile Menu Hamburger Button (Visible below lg) -->
                    <button type="button" onclick="AutoPartsUI.toggleMobileMenu(true)" class="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-red-600 rounded-xl transition-colors flex-shrink-0" aria-label="Open Navigation Menu">
                        <i class="fa-solid fa-bars-staggered text-lg sm:text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile & Tablet Search Bar (Visible on screens below lg) -->
            <div class="mt-2.5 lg:hidden">
                <div class="relative">
                    <input type="text" placeholder="Search by Part, SKU, OEM..." class="js-header-search-input w-full bg-slate-100 dark:bg-slate-700/70 border border-slate-200 dark:border-slate-600 rounded-xl py-2 ps-9 pe-16 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600">
                    <div class="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none text-slate-400">
                        <i class="fa-solid fa-magnifying-glass text-xs"></i>
                    </div>
                    <button type="button" onclick="const mq = this.parentElement.querySelector('input')?.value; if(mq) window.location.href='products.html?search='+encodeURIComponent(mq);" class="absolute inset-y-1 right-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors">
                        Search
                    </button>
                </div>
            </div>
        </div>

        <!-- Secondary Navigation Bar & Mega Menu (Visible on lg and above) -->
        <div class="hidden lg:block bg-slate-900 text-white border-t border-slate-800">
            <div class="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between text-xs font-semibold">
                
                <!-- Mega Menu Parent -->
                <div class="relative mega-menu-parent py-2.5 px-3 lg:px-4 bg-red-600 font-bold flex items-center gap-2 cursor-pointer select-none flex-shrink-0 rounded-t-lg">
                    <i class="fa-solid fa-bars"></i>
                    <span>All Spare Part Categories</span>
                    <i class="fa-solid fa-chevron-down text-[10px] ms-1"></i>

                    <!-- Mega Dropdown Content -->
                    <div class="mega-menu-content absolute top-full left-0 w-[740px] bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl rounded-b-2xl border border-slate-200 dark:border-slate-700 p-5 z-50 grid grid-cols-3 gap-5">
                        <div>
                            <div class="font-bold text-red-600 dark:text-red-400 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                <i class="fa-solid fa-circle-dot"></i> Brakes & Suspension
                            </div>
                            <ul class="space-y-2 text-xs">
                                <li><a href="products.html?category=brakes" class="hover:text-red-600 transition-colors">Brake Discs & Rotors</a></li>
                                <li><a href="products.html?category=brakes" class="hover:text-red-600 transition-colors">Ceramic Brake Pads</a></li>
                                <li><a href="products.html?category=suspension" class="hover:text-red-600 transition-colors">Shock Absorbers & Struts</a></li>
                                <li><a href="products.html?category=suspension" class="hover:text-red-600 transition-colors">Control Arms & Ball Joints</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="font-bold text-red-600 dark:text-red-400 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                <i class="fa-solid fa-gears"></i> Engine & Electrical
                            </div>
                            <ul class="space-y-2 text-xs">
                                <li><a href="products.html?category=engine" class="hover:text-red-600 transition-colors">Spark Plugs & Ignition Coils</a></li>
                                <li><a href="products.html?category=electrical" class="hover:text-red-600 transition-colors">Alternators & Starters</a></li>
                                <li><a href="products.html?category=engine" class="hover:text-red-600 transition-colors">Turbochargers & Actuators</a></li>
                                <li><a href="products.html?category=electrical" class="hover:text-red-600 transition-colors">Matrix LED Headlights</a></li>
                            </ul>
                        </div>
                        <div>
                            <div class="font-bold text-red-600 dark:text-red-400 border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                <i class="fa-solid fa-filter"></i> Filters & Lubricants
                            </div>
                            <ul class="space-y-2 text-xs">
                                <li><a href="products.html?category=filters" class="hover:text-red-600 transition-colors">Oil, Air & Cabin Filters</a></li>
                                <li><a href="products.html?category=fluids" class="hover:text-red-600 transition-colors">Full Synthetic Motor Oils</a></li>
                                <li><a href="products.html?category=cooling" class="hover:text-red-600 transition-colors">Cooling Radiators & Pumps</a></li>
                                <li><a href="products.html?category=transmission" class="hover:text-red-600 transition-colors">Clutch Kits & Flywheels</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Nav Links with Balanced Spacing (Icons removed from nav links) -->
                <nav class="flex items-center gap-2.5 sm:gap-3 lg:gap-4 xl:gap-5 py-2.5">
                    <!-- Home Dropdown Menu -->
                    <div class="relative nav-dropdown-parent group py-1 cursor-pointer select-none">
                        <button type="button" class="flex items-center gap-1.5 font-bold {link_class('home')} focus:outline-none">
                            <span>Home</span>
                            <i class="fa-solid fa-chevron-down text-[9px] group-hover:rotate-180 transition-transform duration-200"></i>
                        </button>

                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 space-y-2">
                            <!-- Home Page 1 -->
                            <a href="index.html" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-red-500/30 group/item">
                                <div class="w-9 h-9 rounded-xl bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 flex items-center justify-center text-base font-bold flex-shrink-0 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                    <i class="fa-solid fa-store"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-red-600 transition-colors">Home Page 1</span>
                                        <span class="text-[9px] bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-extrabold px-1.5 py-0.5 rounded">Retail</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">General Retail Landing</div>
                                    <p class="text-[10px] text-slate-400 line-clamp-2 mt-0.5">Vehicle selector, top-selling carousel, 8 categories & clearance</p>
                                </div>
                            </a>

                            <!-- Home Page 2 -->
                            <a href="trade.html" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-amber-500/30 group/item">
                                <div class="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center text-base font-bold flex-shrink-0 group-hover/item:bg-amber-500 group-hover/item:text-slate-950 transition-colors">
                                    <i class="fa-solid fa-toolbox"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-amber-500 transition-colors">Home Page 2</span>
                                        <span class="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-extrabold px-1.5 py-0.5 rounded">B2B Trade</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">Trade / Workshop Portal</div>
                                    <p class="text-[10px] text-slate-400 line-clamp-2 mt-0.5">Multi-SKU quick order, fleet search, live stock & Net-30 credit</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <a href="products.html" class="{link_class('products')}">Products</a>
                    <a href="compatibility-finder.html" class="{link_class('compatibility')} flex items-center gap-1.5">
                        <span>Finder</span>
                        <span class="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-extrabold">NEW</span>
                    </a>
                    <a href="brands.html" class="{link_class('brands')}">Brands</a>
                    <a href="bulk-pricing.html" class="{link_class('bulk')}">Bulk Pricing</a>
                    <a href="about.html" class="{link_class('about')}">About Us</a>
                    <a href="blog.html" class="{link_class('blog')}">Tech Blog</a>
                    <a href="contact.html" class="{link_class('contact')}">Contact</a>
                </nav>

                <!-- Phone Hotline Badge -->
                <div class="hidden xl:flex items-center gap-2 text-slate-300 py-2 flex-shrink-0">
                    <i class="fa-solid fa-headset text-red-500 text-base"></i>
                    <div>
                        <div class="text-[9px] uppercase text-slate-400 leading-none">Parts Hotline</div>
                        <div class="font-bold text-white text-xs leading-tight">+1 (800) 555-AUTO</div>
                    </div>
                </div>
            </div>
        </div>
    </header>'''

page_map = {
    'index.html': 'home',
    'trade.html': 'home',
    'products.html': 'products',
    'product-detail.html': 'products',
    'compatibility-finder.html': 'compatibility',
    'brands.html': 'brands',
    'bulk-pricing.html': 'bulk',
    'pricing.html': 'bulk',
    'about.html': 'about',
    'blog.html': 'blog',
    'blog-detail.html': 'blog',
    'contact.html': 'contact',
    'cart.html': 'cart',
    'checkout.html': 'checkout',
    'order-confirmation.html': 'orders',
    'account.html': 'account'
}

for filename, active_tag in page_map.items():
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_header = get_header_html(active_tag)
    
    pattern = re.compile(r'(?:<!--\s*(?:Top Announcement Bar|B2B Top Announcement & Priority Hotline Bar)\s*-->\s*<div[\s\S]*?</div>\s*</div>\s*)?(?:<!--\s*(?:Main Navigation Header|Header Navigation|B2B Main Navigation Header)\s*-->\s*)?<header[\s\S]*?</header>', re.MULTILINE)
    if pattern.search(content):
        content = pattern.sub(new_header, content, count=1)
    else:
        header_pattern = re.compile(r'<header[\s\S]*?</header>', re.MULTILINE)
        content = header_pattern.sub(new_header, content, count=1)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated standardized header in all main pages.')
