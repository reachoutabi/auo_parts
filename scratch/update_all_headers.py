import os
import re

html_files = [
    "index.html", "trade.html", "products.html", "product-detail.html", "pricing.html",
    "order-confirmation.html", "contact.html", "compatibility-finder.html", "checkout.html",
    "cart.html", "bulk-pricing.html", "brands.html", "blog.html", "blog-detail.html",
    "account.html", "about.html"
]

header_template = """    <header class="bg-slate-900/95 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-slate-800 transition-all w-full">
        <div class="max-w-[1440px] mx-auto px-2 sm:px-4 py-2">
            <div class="flex items-center justify-between gap-2 sm:gap-4">
                
                <!-- Left Side: Header Actions & Member Login Pill (Matching Reference Layout) -->
                <div class="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 flex-shrink-0">
                    <!-- Login / Account Pill Button -->
                    <a href="login.html" class="js-auth-top-link inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md shadow-red-600/20 transition-all active:scale-95 flex-shrink-0" title="Log In to your Account">
                        <i class="fa-solid fa-right-to-bracket text-xs"></i>
                        <span>Member Login</span>
                    </a>

                    <!-- RTL Switcher Button (Rounded circular pill badge) -->
                    <button type="button" onclick="AutoPartsUI.toggleRTL()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-blue-400 flex items-center justify-center transition-all flex-shrink-0" title="Toggle LTR/RTL Layout" aria-label="Toggle LTR/RTL Layout">
                        <i class="fa-solid fa-right-left text-xs"></i>
                    </button>

                    <!-- Theme Switcher Button -->
                    <button type="button" onclick="AutoPartsUI.toggleTheme()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-amber-400 flex items-center justify-center transition-all flex-shrink-0" title="Toggle Dark/Light Theme" aria-label="Toggle Dark/Light Theme">
                        <i class="fa-solid fa-moon dark:hidden text-xs text-amber-400"></i>
                        <i class="fa-solid fa-sun hidden dark:inline text-xs text-amber-400"></i>
                    </button>

                    <!-- Compare Button -->
                    <button type="button" onclick="AutoPartsUI.openCompareModal()" class="hidden sm:inline-flex relative p-1.5 text-slate-300 hover:text-red-400 transition-colors flex-shrink-0" title="Compare Products">
                        <i class="fa-solid fa-code-compare text-sm"></i>
                        <span class="js-compare-count-badge hidden absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>

                    <!-- Wishlist Button -->
                    <a href="account.html#wishlist" class="relative p-1.5 text-slate-300 hover:text-red-400 transition-colors flex-shrink-0" title="Wishlist">
                        <i class="fa-solid fa-heart text-sm"></i>
                        <span class="js-wishlist-count-badge hidden absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </a>

                    <!-- Cart Drawer Trigger Button (My Cart) -->
                    <button type="button" onclick="AutoPartsUI.toggleCartDrawer(true)" class="flex items-center gap-1.5 bg-slate-800 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-xl transition-all font-semibold text-xs border border-slate-700 flex-shrink-0">
                        <div class="relative">
                            <i class="fa-solid fa-cart-shopping text-xs"></i>
                            <span class="js-cart-count-badge hidden absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">0</span>
                        </div>
                        <div class="hidden xl:block text-start">
                            <div class="text-[9px] uppercase tracking-wider text-slate-400 leading-none">My Cart</div>
                            <div class="js-cart-subtotal-display font-extrabold text-xs text-white">$0.00</div>
                        </div>
                    </button>

                    <!-- Prominent Mobile Menu Hamburger Button -->
                    <button type="button" onclick="AutoPartsUI.toggleMobileMenu(true)" class="lg:hidden px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors flex-shrink-0 flex items-center gap-1 border border-red-500/50" aria-label="Open Navigation Menu" title="Open Navigation Menu">
                        <i class="fa-solid fa-bars text-sm"></i>
                        <span class="text-[10px] font-bold uppercase tracking-wider hidden xs:inline">Menu</span>
                    </button>
                </div>

                <!-- Center: Desktop Nav Links (Matching Order in Reference Image) -->
                <nav class="hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] xl:text-xs font-semibold whitespace-nowrap flex-shrink-0">
                    <!-- Home Dropdown Menu -->
                    <div class="relative nav-dropdown-parent group py-1 cursor-pointer select-none whitespace-nowrap">
                        <button type="button" class="flex items-center gap-1 text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap focus:outline-none">
                            <span>Home</span>
                            <i class="fa-solid fa-chevron-down text-[9px] group-hover:rotate-180 transition-transform duration-200"></i>
                        </button>

                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-72 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-2.5 z-50 space-y-1.5 whitespace-normal">
                            <!-- Home Page 1 -->
                            <a href="index.html" class="block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-red-500/30 group/item">
                                <div class="flex items-center justify-between gap-1 mb-0.5">
                                    <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-red-600 transition-colors">Home Page 1</span>
                                    <span class="text-[9px] bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-extrabold px-1.5 py-0.5 rounded">Retail</span>
                                </div>
                                <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">General Retail Landing</div>
                            </a>

                            <!-- Home Page 2 -->
                            <a href="trade.html" class="block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-amber-500/30 group/item">
                                <div class="flex items-center justify-between gap-1 mb-0.5">
                                    <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-amber-500 transition-colors">Home Page 2</span>
                                    <span class="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-extrabold px-1.5 py-0.5 rounded">B2B Trade</span>
                                </div>
                                <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">Trade / Workshop Portal</div>
                            </a>
                        </div>
                    </div>

                    <a href="about.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">About Us</a>
                    <a href="products.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">Products</a>
                    <a href="compatibility-finder.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">Finder</a>
                    <a href="brands.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">Brands</a>
                    <a href="bulk-pricing.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">Bulk Pricing</a>
                    <a href="blog.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">Tech Blog</a>
                    <a href="contact.html" class="text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap">Contact</a>
                </nav>

                <!-- Right Side: Brand Logo (Matching Reference Layout) -->
                <a href="index.html" class="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
                    <div>
                        <div class="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-1 leading-tight text-end">
                            AUTO<span class="text-red-600">PARTS</span>
                        </div>
                        <div class="text-[8px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none text-end">PRO STOREFRONT</div>
                    </div>
                    <div class="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-base sm:text-xl font-black group-hover:scale-105 transition-transform shadow-md shadow-red-600/30">
                        <i class="fa-solid fa-gears"></i>
                    </div>
                </a>

            </div>
        </div>
    </header>"""

base_dir = r"c:\Users\91701\Downloads\auo_parts-main"

for filename in html_files:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <header ...> ... </header>
    new_content = re.sub(r'<header[\s\S]*?</header>', header_template, content, flags=re.MULTILINE)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated header in {filename}")
