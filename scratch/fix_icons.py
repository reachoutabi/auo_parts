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

    # 1. Add Favicon to head if missing
    if 'rel="icon"' not in content and 'rel="shortcut icon"' not in content:
        content = re.sub(r'(<title>.*?</title>)', r'\1\n' + favicon_tags, content, count=1, flags=re.DOTALL)

    # 2. Fix broken FontAwesome Pro icon `fa-shield-check` -> `fa-shield-halved` (so container 1 icon renders properly)
    content = content.replace('fa-shield-check', 'fa-shield-halved')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully updated HTML files.")
