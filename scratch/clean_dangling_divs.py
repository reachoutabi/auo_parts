import glob
import re

for filepath in sorted(glob.glob('*.html')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean any whitespace or dangling </div> between <body ...> and <!-- Top Announcement Bar -->
    cleaned = re.sub(r'(<body[^>]*>)\s*(?:</div>\s*)*(?=\s*<!--\s*Top Announcement Bar\s*-->)', r'\1\n\n', content)
    
    if cleaned != content:
        print(f"Cleaned dangling tags in {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(cleaned)

print("Tag cleanup completed.")
