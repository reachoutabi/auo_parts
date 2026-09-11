import glob
import re

for filepath in sorted(glob.glob('*.html')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    body_idx = content.find('<body')
    header_idx = content.find('<header')
    
    if body_idx != -1 and header_idx != -1:
        top_section = content[body_idx:header_idx]
        announcement_bars = re.findall(r'<!--\s*(?:Top\s*)?Announcement Bar\s*-->', top_section)
        bg_divs = len(re.findall(r'<div class="bg-slate-9', top_section))
        print(f"{filepath}: {len(announcement_bars)} bar comment(s), {bg_divs} top bg-slate div(s)")
    else:
        print(f"{filepath}: No header found (likely login/register/404)")
