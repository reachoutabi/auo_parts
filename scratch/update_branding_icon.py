import os
import glob
import re

workspace = r'c:\Users\elixir\Desktop\auto-parts-store'
html_files = glob.glob(os.path.join(workspace, '*.html'))

favicon_tags = '''    <!-- Favicon / Website Icon -->
    <link rel="icon" type="image/png" href="assets/images/favicon.png">
    <link rel="shortcut icon" type="image/png" href="assets/images/favicon.png">
    <link rel="apple-touch-icon" href="assets/images/favicon.png">'''

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add Favicon if missing
    if 'rel="icon"' not in content and 'rel="shortcut icon"' not in content:
        content = re.sub(r'(<title>.*?</title>)', r'\1\n' + favicon_tags, content, count=1, flags=re.DOTALL)

    # 2. Update Header Logo Icon
    # Look for red background logo containers next to AUTOPARTS PRO
    header_logo_pattern_1 = re.compile(
        r'(<a\s+href="index\.html"\s+class="[^"]*group[^"]*">\s*<div\s+class="[^"]*bg-red-600[^"]*">)\s*<i\s+class="fa-solid\s+fa-gears">\s*</i>\s*(</div>)',
        re.MULTILINE
    )
    
    # Replacement image tag inside div
    content = header_logo_pattern_1.sub(
        r'\1\n                        <img src="assets/images/favicon.png" alt="AutoParts Pro" class="w-full h-full object-contain p-1">\n                    \2',
        content
    )

    # Secondary logo patterns (e.g. footer logo or standalone login/register logo)
    generic_logo_div_pattern = re.compile(
        r'(<div\s+class="w-(?:9|10|12)\s+h-(?:9|10|12)\s+bg-red-600[^"]*">\s*)<i\s+class="fa-solid\s+fa-gears">\s*</i>(\s*</div>\s*<div[^>]*>\s*AUTO<span)',
        re.MULTILINE
    )

    content = generic_logo_div_pattern.sub(
        r'\1<img src="assets/images/favicon.png" alt="AutoParts Pro" class="w-full h-full object-contain p-1">\2',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(html_files)} HTML files.")
