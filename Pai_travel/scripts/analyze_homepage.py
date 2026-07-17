import json

with open('src/assets/design_system.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=== 首页文字图层 ===')
for i, t in enumerate(data.get('homepage_text_layers', [])):
    text = t.get('text', '')[:60]
    style = t.get('engine_dict', {}).get('style', {})
    size = style.get('fontSize', '?')
    font = style.get('fontName', '?')
    fc = style.get('fontColor', {})
    if isinstance(fc, dict):
        r = fc.get('red', 0) * 255
        g = fc.get('green', 0) * 255
        b = fc.get('blue', 0) * 255
        a = fc.get('alpha', 1)
        color = f'rgba({r:.0f},{g:.0f},{b:.0f},{a})'
    else:
        color = str(fc)
    bbox = t.get('bbox', [])
    if len(bbox) >= 7:
        x, y, w, h = bbox[4], bbox[5], bbox[6], bbox[7]
    else:
        x, y, w, h = 0, 0, 0, 0
    print(f'{i+1}. x={x:.0f} y={y:.0f} w={w:.0f} h={h:.0f} font={font} size={size} color={color} text="{text}"')
