import os
import glob
import re

workspace = r'c:\Users\elixir\Desktop\auto-parts-store'
html_files = [f for f in glob.glob(os.path.join(workspace, '*.html')) if os.path.basename(f) not in ['login.html', 'register.html', 'coming-soon.html', '404.html']]

header_regex = re.compile(r'<!-- Main Navigation Header.*?</header>', re.DOTALL)

def get_header_html(active_file):
    is_home = active_file in ['index.html', 'trade.html']
    is_products = active_file in ['products.html', 'product-detail.html']
    is_finder = active_file == 'compatibility-finder.html'
    is_brands = active_file == 'brands.html'
    is_bulk = active_file == 'bulk-pricing.html'
    is_about = active_file == 'about.html'
    is_blog = active_file in ['blog.html', 'blog-detail.html']
    is_contact = active_file == 'contact.html'

    home_btn_cls = "flex items-center gap-1 font-bold text-red-500 border-b-2 border-red-500 pb-0.5 px-1.5 focus:outline-none whitespace-nowrap" if is_home else "flex items-center gap-1 text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap focus:outline-none"
    products_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_products else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"
    finder_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_finder else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"
    brands_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_brands else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"
    bulk_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_bulk else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"
    about_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_about else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"
    blog_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_blog else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"
    contact_cls = "text-red-500 font-bold border-b-2 border-red-500 pb-0.5 px-1.5 rounded transition-colors whitespace-nowrap" if is_contact else "text-slate-200 hover:text-red-400 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap"

    return f'''    <!-- Main Navigation Header (Sticky) -->
    <header class="bg-slate-900/95 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-slate-800 transition-all w-full">
        <div class="max-w-[1440px] mx-auto px-3 sm:px-4 py-2.5">
            <div class="flex items-center justify-between gap-3 sm:gap-4">
                
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-2 group flex-shrink-0">
                    <div class="w-9 sm:w-10 h-9 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black group-hover:scale-105 transition-transform shadow-md shadow-red-600/30">
                        <i class="fa-solid fa-gears"></i>
                    </div>
                    <div>
                        <div class="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1 leading-tight">
                            AUTO<span class="text-red-600">PARTS</span>
                        </div>
                        <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">PRO STOREFRONT</div>
                    </div>
                </a>

                <!-- Nav Links (Single Line - Active link highlighted per page) -->
                <nav class="hidden lg:flex items-center gap-2 xl:gap-4 text-xs font-semibold whitespace-nowrap flex-shrink-0">
                    <!-- Home Dropdown Menu -->
                    <div class="relative nav-dropdown-parent group py-1 cursor-pointer select-none whitespace-nowrap">
                        <button type="button" class="{home_btn_cls}">
                            <span>Home</span>
                            <i class="fa-solid fa-chevron-down text-[9px] group-hover:rotate-180 transition-transform duration-200"></i>
                        </button>

                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 space-y-2 whitespace-normal">
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
                                </div>
                            </a>
                        </div>
                    </div>

                    <a href="products.html" class="{products_cls}">Products</a>
                    <a href="compatibility-finder.html" class="{finder_cls}">Finder</a>
                    <a href="brands.html" class="{brands_cls}">Brands</a>
                    <a href="bulk-pricing.html" class="{bulk_cls}">Bulk Pricing</a>
                    <a href="about.html" class="{about_cls}">About Us</a>
                    <a href="blog.html" class="{blog_cls}">Tech Blog</a>
                    <a href="contact.html" class="{contact_cls}">Contact</a>
                </nav>

                <!-- Header Actions (Compare, Wishlist, Cart) -->
                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <!-- Compare Button -->
                    <button type="button" onclick="AutoPartsUI.openCompareModal()" class="relative p-2 text-slate-300 hover:text-red-400 transition-colors flex-shrink-0" title="Compare Products">
                        <i class="fa-solid fa-code-compare text-base sm:text-lg"></i>
                        <span class="js-compare-count-badge hidden absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>

                    <!-- Wishlist Button -->
                    <a href="account.html#wishlist" class="relative p-2 text-slate-300 hover:text-red-400 transition-colors flex-shrink-0" title="Wishlist">
                        <i class="fa-solid fa-heart text-base sm:text-lg"></i>
                        <span class="js-wishlist-count-badge hidden absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </a>

                    <!-- Cart Drawer Trigger Button (My Cart) -->
                    <button type="button" onclick="AutoPartsUI.toggleCartDrawer(true)" class="flex items-center gap-1.5 sm:gap-2 bg-slate-800 hover:bg-red-600 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all font-semibold text-xs border border-slate-700 flex-shrink-0">
                        <div class="relative">
                            <i class="fa-solid fa-cart-shopping text-sm sm:text-base"></i>
                            <span class="js-cart-count-badge hidden absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">0</span>
                        </div>
                        <div class="hidden sm:block text-start">
                            <div class="text-[9px] uppercase tracking-wider text-slate-400 leading-none">My Cart</div>
                            <div class="js-cart-subtotal-display font-extrabold text-xs text-white">$0.00</div>
                        </div>
                    </button>

                    <!-- Mobile Menu Hamburger Button (Visible below lg) -->
                    <button type="button" onclick="AutoPartsUI.toggleMobileMenu(true)" class="lg:hidden p-2 text-slate-200 hover:text-red-400 rounded-xl transition-colors flex-shrink-0" aria-label="Open Navigation Menu">
                        <i class="fa-solid fa-bars-staggered text-lg sm:text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>'''

for filepath in html_files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if header_regex.search(content):
        header_html = get_header_html(filename)
        new_content = header_regex.sub(header_html, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

print(f"Updated per-page active tab highlighting in {len(html_files)} HTML files.")
