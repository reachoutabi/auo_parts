import os
import re

files_to_update = [
    'assets/js/products-data.js',
    'assets/js/main.js',
    'assets/js/catalog.js',
    'index.html',
    'products.html',
    'product-detail.html',
    'cart.html',
    'checkout.html',
    'order-confirmation.html',
    'pricing.html',
    'bulk-pricing.html',
    'account.html',
    'about.html',
    'brands.html',
    'blog.html',
    'blog-detail.html',
    'contact.html',
    '404.html',
    'login.html',
    'register.html',
    'compatibility-finder.html'
]

# 1. Update products-data.js
with open('assets/js/products-data.js', 'r', encoding='utf-8') as f:
    data = f.read()

# Replace bulk tiers price: "$..." with price: "₹..."
data = re.sub(r'price:\s*"\$', 'price: "₹', data)
with open('assets/js/products-data.js', 'w', encoding='utf-8') as f:
    f.write(data)

# 2. Update main.js
with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

# Replace JS template literals and strings with dollar signs for prices
main_js = main_js.replace("s.textContent = `$${cartTotals.subtotal.toFixed(2)}`;", "s.textContent = `₹${cartTotals.subtotal.toFixed(2)}`;")
main_js = main_js.replace("$${(p.price * item.quantity).toFixed(2)}", "₹${(p.price * item.quantity).toFixed(2)}")
main_js = main_js.replace("Trade: $${product.workshopPrice.toFixed(2)}", "Trade: ₹${product.workshopPrice.toFixed(2)}")
main_js = main_js.replace("Trade: $${p.workshopPrice.toFixed(2)}", "Trade: ₹${p.workshopPrice.toFixed(2)}")
main_js = main_js.replace("Workshop Tier: $${p.workshopPrice.toFixed(2)}", "Workshop Tier: ₹${p.workshopPrice.toFixed(2)}")
main_js = main_js.replace("$${product.price.toFixed(2)}", "₹${product.price.toFixed(2)}")
main_js = main_js.replace("$${product.oldPrice.toFixed(2)}", "₹${product.oldPrice.toFixed(2)}")
main_js = main_js.replace("$${p.price.toFixed(2)}", "₹${p.price.toFixed(2)}")
main_js = main_js.replace("'$' + p.oldPrice.toFixed(2)", "'₹' + p.oldPrice.toFixed(2)")
main_js = main_js.replace("`$${p.oldPrice.toFixed(2)}`", "`₹${p.oldPrice.toFixed(2)}`")

with open('assets/js/main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)

# 3. Update catalog.js
with open('assets/js/catalog.js', 'r', encoding='utf-8') as f:
    cat_js = f.read()

cat_js = cat_js.replace("priceDisplay.textContent = `$${this.filters.maxPrice}`;", "priceDisplay.textContent = `₹${this.filters.maxPrice}`;")
with open('assets/js/catalog.js', 'w', encoding='utf-8') as f:
    f.write(cat_js)

print("JS files updated successfully.")
