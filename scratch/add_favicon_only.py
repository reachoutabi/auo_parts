import os
import glob
import re

workspace = r'c:\Users\elixir\Desktop\auto-parts-store'
html_files = glob.glob(os.path.join(workspace, '*.html'))

favicon_tags = '''    <!-- Favicon / Browser Tab Save Icon -->
    <link rel="icon" type="image/png" href="assets/images/favicon.png">
    <link rel="shortcut icon" type="image/png" href="assets/images/favicon.png">
    <link rel="apple-touch-icon" href="assets/images/favicon.png">'''

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add favicon tags after <title>...</title> if not present
    if 'rel="icon"' not in content and 'rel="shortcut icon"' not in content:
        content = re.sub(r'(<title>.*?</title>)', r'\1\n' + favicon_tags, content, count=1, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Added browser tab favicon to {len(html_files)} HTML files.")
