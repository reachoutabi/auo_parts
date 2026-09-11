import os
import glob
import re

# 1. Update products-data.js back to $
with open('assets/js/products-data.js', 'r', encoding='utf-8') as f:
    data = f.read()

data = re.sub(r'price:\s*"₹', 'price: "$', data)
with open('assets/js/products-data.js', 'w', encoding='utf-8') as f:
    f.write(data)

# 2. Update main.js back to $
with open('assets/js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

main_js = main_js.replace("s.textContent = `₹${cartTotals.subtotal.toFixed(2)}`;", "s.textContent = `$${cartTotals.subtotal.toFixed(2)}`;")
main_js = main_js.replace("₹${(p.price * item.quantity).toFixed(2)}", "$${(p.price * item.quantity).toFixed(2)}")
main_js = main_js.replace("Trade: ₹${product.workshopPrice.toFixed(2)}", "Trade: $${product.workshopPrice.toFixed(2)}")
main_js = main_js.replace("Trade: ₹${p.workshopPrice.toFixed(2)}", "Trade: $${p.workshopPrice.toFixed(2)}")
main_js = main_js.replace("Workshop Tier: ₹${p.workshopPrice.toFixed(2)}", "Workshop Tier: $${p.workshopPrice.toFixed(2)}")
main_js = main_js.replace("₹${product.price.toFixed(2)}", "$${product.price.toFixed(2)}")
main_js = main_js.replace("₹${product.oldPrice.toFixed(2)}", "$${product.oldPrice.toFixed(2)}")
main_js = main_js.replace("₹${p.price.toFixed(2)}", "$${p.price.toFixed(2)}")
main_js = main_js.replace("'₹' + p.oldPrice.toFixed(2)", "'$' + p.oldPrice.toFixed(2)")
main_js = main_js.replace("`₹${p.oldPrice.toFixed(2)}`", "`$${p.oldPrice.toFixed(2)}`")

with open('assets/js/main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)

# 3. Update catalog.js back to $
with open('assets/js/catalog.js', 'r', encoding='utf-8') as f:
    cat_js = f.read()

cat_js = cat_js.replace("priceDisplay.textContent = `₹${this.filters.maxPrice}`;", "priceDisplay.textContent = `$${this.filters.maxPrice}`;")
cat_js = cat_js.replace("priceDisplay.textContent = '₹1000';", "priceDisplay.textContent = '$1000';")
with open('assets/js/catalog.js', 'w', encoding='utf-8') as f:
    f.write(cat_js)

# 4. Update all HTML files back to $
html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('₹0.00', '$0.00')
    content = content.replace('₹1000', '$1000')
    content = content.replace('₹1,500', '$150')
    content = content.replace('₹5,000', '$500')
    content = content.replace('₹2,500', '$250')
    content = content.replace('₹1,000', '$100')
    content = content.replace('₹500', '$50')
    content = content.replace('₹200', '$20')
    content = content.replace('₹150', '$15')
    content = content.replace('₹100', '$10')
    content = content.replace('₹50', '$5')
    
    content = content.replace('₹${', '$${')
    content = content.replace('Workshop Tier: ₹', 'Workshop Tier: $')
    content = content.replace('Trade: ₹', 'Trade: $')
    content = content.replace('MSRP: ₹', 'MSRP: $')
    content = content.replace('from ₹', 'from $')
    content = content.replace('Over ₹', 'Over $')
    content = content.replace('under ₹', 'under $')
    content = content.replace('Under ₹', 'Under $')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Reverted all currency to Dollar ($) successfully.")
