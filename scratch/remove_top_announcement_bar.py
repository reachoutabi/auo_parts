import os
import glob
import re

workspace = r'c:\Users\91701\Downloads\auo_parts-main'
html_files = [f for f in glob.glob(os.path.join(workspace, '*.html')) if os.path.basename(f) not in ['login.html', 'register.html', 'coming-soon.html', '404.html']]

# Regex pattern matching from <!-- Top Announcement Bar --> up to the line right before <!-- Main Navigation Header
pattern = re.compile(r'\s*<!-- Top Announcement Bar -->.*?(?=\s*<!-- Main Navigation Header)', re.DOTALL)

updated_count = 0
for filepath in html_files:
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub('\n', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_count += 1
        print(f"Removed Top Announcement Bar from {filename}")
    else:
        print(f"Pattern not found in {filename}")

print(f"Total files updated: {updated_count}")
