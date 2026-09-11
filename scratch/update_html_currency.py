import os
import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace $0.00, $1000, $150, etc.
    content = content.replace('$0.00', '₹0.00')
    content = content.replace('$1000', '₹1000')
    content = content.replace('$150', '₹1,500')
    content = content.replace('$500', '₹5,000')
    content = content.replace('$250', '₹2,500')
    content = content.replace('$100', '₹1,000')
    content = content.replace('$50', '₹500')
    content = content.replace('$20', '₹200')
    content = content.replace('$15', '₹150')
    content = content.replace('$10', '₹100')
    content = content.replace('$5', '₹50')
    
    # Replace $${...} template expressions in inline scripts in HTML files
    content = content.replace('$${', '₹${')
    content = content.replace('$$', '₹')
    content = content.replace("Workshop Tier: $", "Workshop Tier: ₹")
    content = content.replace("Trade: $", "Trade: ₹")
    content = content.replace("MSRP: $", "MSRP: ₹")
    content = content.replace("from $", "from ₹")
    content = content.replace("Over $", "Over ₹")
    content = content.replace("under $", "under ₹")
    content = content.replace("Under $", "Under ₹")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files updated successfully.")
