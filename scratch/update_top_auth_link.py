import os
import glob
import re

workspace = r'c:\Users\elixir\Desktop\auto-parts-store'
html_files = glob.glob(os.path.join(workspace, '*.html'))

old_pattern = re.compile(
    r'<a\s+href="account\.html"\s+class="hover:text-white\s+flex\s+items-center\s+gap-1\.5\s+transition-colors\s+flex-shrink-0">\s*<i\s+class="fa-solid\s+fa-user-gear">\s*</i>\s*<span>My\s+Account</span>\s*</a>',
    re.MULTILINE
)

new_link_html = '''<a href="login.html" class="js-auth-top-link hover:text-white flex items-center gap-1.5 transition-colors flex-shrink-0" title="Log In to your Account">
                    <i class="fa-solid fa-right-to-bracket"></i>
                    <span>Log In</span>
                </a>'''

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_pattern.search(content):
        new_content = old_pattern.sub(new_link_html, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

print(f"Updated top auth link in {len(html_files)} HTML files.")
