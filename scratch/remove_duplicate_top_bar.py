import glob
import re

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for the old duplicate "Announcement Bar"
    old_bar_pattern = re.compile(r'<!--\s*Announcement Bar\s*-->\s*<div class="bg-slate-900[\s\S]*?</div>\s*</div>\s*', re.MULTILINE)
    
    if old_bar_pattern.search(content):
        print(f"Removing duplicate old top bar from {filepath}")
        content = old_bar_pattern.sub('', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Old duplicate top bars removed successfully.")
