import re

with open("eminence_main.js", "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Look for http get or urls or endpoints
patterns = [r'\.get\([^\)]+\)', r'\.post\([^\)]+\)', r'apiUrl', r'baseUrl', r'/api/[a-zA-Z0-9_/]+']
for p in patterns:
    matches = list(re.finditer(p, content))
    print(f"Pattern {p}: {len(matches)} matches")
    for m in matches[:5]:
        print("  ", m.group(0))
