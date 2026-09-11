import os
import glob

workspace = r"c:\Users\91701\Downloads\auo_parts-main"
html_files = glob.glob(os.path.join(workspace, '*.html'))

old_pattern = 'class="js-auth-top-link p-1.5 sm:p-2'
new_pattern = 'class="js-auth-top-link hidden lg:inline-flex p-1.5 sm:p-2'

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_pattern in content:
        new_content = content.replace(old_pattern, new_pattern)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file_path)}")
        count += 1
    else:
        print(f"Pattern not found in {os.path.basename(file_path)}")

print(f"Done. Updated {count} files.")
