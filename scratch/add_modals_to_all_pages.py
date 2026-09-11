import os
import glob
import re

modals_markup = '''    <!-- SLIDE-IN CART DRAWER CONTAINER -->
    <div id="cart-drawer-backdrop" onclick="AutoPartsUI.toggleCartDrawer(false)" class="hidden opacity-0 fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"></div>
    <aside id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col justify-between border-s border-slate-200 dark:border-slate-800">
        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
                <i class="fa-solid fa-basket-shopping text-red-600"></i>
                <span>Your Shopping Cart</span>
                <span class="js-cart-count-badge bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">0</span>
            </div>
            <button type="button" onclick="AutoPartsUI.toggleCartDrawer(false)" class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div id="cart-drawer-items" class="flex-1 overflow-y-auto p-5 space-y-4"></div>
        <div class="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div class="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Subtotal:</span>
                <span class="js-cart-subtotal-display font-bold text-slate-900 dark:text-white">$0.00</span>
            </div>
            <div class="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Estimated Shipping:</span>
                <span class="text-emerald-600 font-semibold">Calculated at checkout</span>
            </div>
            <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                <span>Total Amount:</span>
                <span class="js-cart-subtotal-display text-red-600 dark:text-red-400">$0.00</span>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-2">
                <a href="cart.html" onclick="AutoPartsUI.toggleCartDrawer(false)" class="py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white text-center font-bold text-xs rounded-xl transition-colors">
                    View Cart
                </a>
                <a href="checkout.html" onclick="AutoPartsUI.toggleCartDrawer(false)" class="py-3 bg-red-600 hover:bg-red-700 text-white text-center font-bold text-xs rounded-xl transition-colors shadow-lg shadow-red-600/30">
                    Checkout Now
                </a>
            </div>
        </div>
    </aside>

    <!-- QUICK VIEW MODAL CONTAINER -->
    <div id="quick-view-modal" class="hidden opacity-0 fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <button type="button" onclick="AutoPartsUI.closeQuickView()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div id="quick-view-content"></div>
        </div>
    </div>

    <!-- COMPARE MODAL CONTAINER -->
    <div id="compare-modal" class="hidden opacity-0 fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div class="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                    <i class="fa-solid fa-code-compare text-red-600"></i>
                    <span>Product Specification Comparison</span>
                </div>
                <button type="button" onclick="AutoPartsUI.closeCompareModal()" class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
            <div id="compare-modal-content"></div>
        </div>
    </div>'''

workspace = r'c:\Users\elixir\Desktop\auto-parts-store'
html_files = [f for f in glob.glob(os.path.join(workspace, '*.html')) if os.path.basename(f) not in ['login.html', 'register.html', 'coming-soon.html', '404.html']]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'id="compare-modal"' not in content:
        # Insert modals right before </body>
        content = re.sub(r'(\s*</body>)', '\n' + modals_markup + r'\1', content, count=1)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Added missing cart drawer and compare modals to HTML files.")
