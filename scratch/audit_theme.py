import glob
import re

files = sorted(glob.glob('*.html'))
print(f"Total HTML files: {len(files)}")
print("=" * 80)

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    
    has_tw = 'cdn.tailwindcss.com' in c
    has_tw_dark_cfg = 'darkMode' in c and ('class' in c or 'darkMode: "class"' in c or "darkMode: 'class'" in c)
    
    html_tag_match = re.search(r'<html([^>]*)>', c, re.IGNORECASE)
    html_attrs = html_tag_match.group(1) if html_tag_match else "NONE"
    
    body_tag_match = re.search(r'<body([^>]*)>', c, re.IGNORECASE)
    body_attrs = body_tag_match.group(1) if body_tag_match else "NONE"
    
    # Count dark: occurrences
    dark_classes_count = len(re.findall(r'dark:', c))
    
    # Check if main.js is included
    has_main_js = 'assets/js/main.js' in c
    
    print(f"File: {f}")
    print(f"  - Tailwind CDN: {has_tw}")
    print(f"  - Tailwind darkMode config: {has_tw_dark_cfg}")
    print(f"  - html tag: <html{html_attrs}>")
    print(f"  - body tag: <body{body_attrs}>")
    print(f"  - 'dark:' class occurrences: {dark_classes_count}")
    print(f"  - main.js included: {has_main_js}")
    print("-" * 80)
