import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/assets/all_pages_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for name in sorted(data.keys()):
    page = data[name]
    print(f'【{name}】 {page["size"]["w"]}x{page["size"]["h"]} ({page["text_count"]}个文字图层)')
    texts = page['text_layers']
    # 按Y坐标排序（从上到下）
    texts.sort(key=lambda t: t['bbox'][1])
    for t in texts[:8]:
        print(f"  y={t['bbox'][1]:>4} {t['text'][:60]}")
    if len(texts) > 8:
        print(f"  ... 还有{len(texts)-8}个图层")
    print()
