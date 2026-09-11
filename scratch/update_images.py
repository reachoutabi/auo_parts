import re

part_images = {
    "part-101": "assets/images/parts/brake-rotors.jpg",
    "part-102": "assets/images/parts/alternator.jpg",
    "part-103": "assets/images/parts/spark-plugs.jpg",
    "part-104": "assets/images/parts/filters.jpg",
    "part-105": "assets/images/parts/suspension.jpg",
    "part-106": "assets/images/parts/radiator.jpg",
    "part-107": "assets/images/parts/headlight.jpg",
    "part-108": "assets/images/parts/motor-oil.jpg",
    "part-109": "assets/images/parts/brake-pads.jpg",
    "part-110": "assets/images/parts/ignition-coil.jpg",
    "part-111": "assets/images/parts/turbocharger.jpg",
    "part-112": "assets/images/parts/clutch-kit.jpg"
}

with open("assets/js/products-data.js", "r", encoding="utf-8") as f:
    code = f.read()

# Update products
for pid, img in part_images.items():
    # Find the object block for this product
    pattern = rf'(id:\s*"{pid}",[\s\S]*?image:\s*")[^"]+("[\s\S]*?gallery:\s*\[)([\s\S]*?)(\])'
    def repl(m):
        prefix = m.group(1) + img + m.group(2)
        # gallery
        g_content = f'\n                "{img}"\n            '
        return prefix + g_content + m.group(4)
    code = re.sub(pattern, repl, code)

# Update articles
code = re.sub(r'id:\s*"blog-1"[\s\S]*?image:\s*"[^"]+"', lambda m: re.sub(r'image:\s*"[^"]+"', 'image: "assets/images/parts/spark-plugs.jpg"', m.group(0)), code)
code = re.sub(r'id:\s*"blog-2"[\s\S]*?image:\s*"[^"]+"', lambda m: re.sub(r'image:\s*"[^"]+"', 'image: "assets/images/parts/brake-rotors.jpg"', m.group(0)), code)
code = re.sub(r'id:\s*"blog-3"[\s\S]*?image:\s*"[^"]+"', lambda m: re.sub(r'image:\s*"[^"]+"', 'image: "assets/images/parts/clutch-kit.jpg"', m.group(0)), code)

with open("assets/js/products-data.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Successfully updated products-data.js with real spare parts photos!")
