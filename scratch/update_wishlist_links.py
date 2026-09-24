import os

workspace_dir = r"c:\Users\91701\OneDrive\Documents\innovalq_workspace\auo_parts-main"

for file in os.listdir(workspace_dir):
    if file.endswith(".html"):
        filepath = os.path.join(workspace_dir, file)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        new_content = content.replace('href="account.html#wishlist"', 'href="products.html"')
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated wishlist link in {file}")
