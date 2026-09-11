import os
import glob
import re

workspace = r'c:\Users\91701\Downloads\auo_parts-main'
html_files = [f for f in glob.glob(os.path.join(workspace, '*.html')) if os.path.basename(f) not in ['login.html', 'register.html', 'coming-soon.html', '404.html']]

new_header_actions = '''                <!-- Header Actions (Compare, Wishlist, Theme, RTL, Auth, Cart) -->
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

                    <!-- Theme Switcher Button -->
                    <button type="button" onclick="AutoPartsUI.toggleTheme()" class="p-2 text-slate-300 hover:text-amber-400 transition-colors flex-shrink-0" title="Toggle Dark/Light Theme" aria-label="Toggle Dark/Light Theme">
                        <i class="fa-solid fa-moon dark:hidden text-base sm:text-lg text-amber-400"></i>
                        <i class="fa-solid fa-sun hidden dark:inline text-base sm:text-lg text-amber-400"></i>
                    </button>

                    <!-- RTL Switcher Button -->
                    <button type="button" onclick="AutoPartsUI.toggleRTL()" class="p-2 text-slate-300 hover:text-blue-400 transition-colors flex-shrink-0" title="Toggle LTR/RTL Layout" aria-label="Toggle LTR/RTL Layout">
                        <i class="fa-solid fa-right-left text-base sm:text-lg text-blue-400"></i>
                    </button>

                    <!-- Login / Account Link -->
                    <a href="login.html" class="js-auth-top-link p-2 text-slate-300 hover:text-red-400 transition-colors flex-shrink-0" title="Log In to your Account">
                        <i class="fa-solid fa-right-to-bracket text-base sm:text-lg"></i>
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
                </div>'''

pattern = re.compile(r'<!-- Header Actions.*?</header>', re.DOTALL)

updated_count = 0
for filepath in html_files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub(new_header_actions + '\n            </div>\n        </div>\n    </header>', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_count += 1
        print(f"Updated {filename}")
    else:
        print(f"Pattern not found in {filename}")

print(f"Total files updated: {updated_count}")
