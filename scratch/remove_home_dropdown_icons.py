import os
import glob

workspace = r"c:\Users\91701\Downloads\auo_parts-main"

# Target block to replace in HTML files
old_dropdown_block = """                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 space-y-2 whitespace-normal">
                            <!-- Home Page 1 -->
                            <a href="index.html" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-red-500/30 group/item">
                                <div class="w-9 h-9 rounded-xl bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 flex items-center justify-center text-base font-bold flex-shrink-0 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                    <i class="fa-solid fa-store"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-red-600 transition-colors">Home Page 1</span>
                                        <span class="text-[9px] bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-extrabold px-1.5 py-0.5 rounded">Retail</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">General Retail Landing</div>
                                </div>
                            </a>

                            <!-- Home Page 2 -->
                            <a href="trade.html" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-amber-500/30 group/item">
                                <div class="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center text-base font-bold flex-shrink-0 group-hover/item:bg-amber-500 group-hover/item:text-slate-950 transition-colors">
                                    <i class="fa-solid fa-toolbox"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-1 mb-0.5">
                                        <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-amber-500 transition-colors">Home Page 2</span>
                                        <span class="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-extrabold px-1.5 py-0.5 rounded">B2B Trade</span>
                                    </div>
                                    <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">Trade / Workshop Portal</div>
                                </div>
                            </a>
                        </div>"""

new_dropdown_block = """                        <!-- Dropdown Menu Content -->
                        <div class="nav-dropdown-menu absolute top-full left-0 w-72 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-2.5 z-50 space-y-1.5 whitespace-normal">
                            <!-- Home Page 1 -->
                            <a href="index.html" class="block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-red-500/30 group/item">
                                <div class="flex items-center justify-between gap-1 mb-0.5">
                                    <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-red-600 transition-colors">Home Page 1</span>
                                    <span class="text-[9px] bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-extrabold px-1.5 py-0.5 rounded">Retail</span>
                                </div>
                                <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">General Retail Landing</div>
                            </a>

                            <!-- Home Page 2 -->
                            <a href="trade.html" class="block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all border border-transparent hover:border-amber-500/30 group/item">
                                <div class="flex items-center justify-between gap-1 mb-0.5">
                                    <span class="font-black text-xs text-slate-900 dark:text-white group-hover/item:text-amber-500 transition-colors">Home Page 2</span>
                                    <span class="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-extrabold px-1.5 py-0.5 rounded">B2B Trade</span>
                                </div>
                                <div class="text-[11px] font-bold text-slate-700 dark:text-slate-200">Trade / Workshop Portal</div>
                            </a>
                        </div>"""

html_files = glob.glob(os.path.join(workspace, '*.html'))
count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_dropdown_block in content:
        new_content = content.replace(old_dropdown_block, new_dropdown_block)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated HTML: {os.path.basename(file_path)}")
        count += 1
    else:
        print(f"Dropdown block mismatch in: {os.path.basename(file_path)}")

print(f"Updated {count} HTML files.")
