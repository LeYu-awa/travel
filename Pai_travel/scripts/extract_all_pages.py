"""从所有 PSD 提取每个页面的文字内容 + 关键布局信息"""
import json, os

PSD_DIR = r'd:\traverl\app\APP调整6月'
OUTPUT = r'd:\traverl\Pai_travel\src\assets\all_pages_data.json'
from psd_tools import PSDImage

psd_files = [f for f in sorted(os.listdir(PSD_DIR)) if f.endswith('.psd')]
result = {}

for pf in psd_files:
    path = os.path.join(PSD_DIR, pf)
    try:
        psd = PSDImage.open(path)
        page_name = pf.replace('.psd', '')
        
        texts = []
        # 提取所有文字图层
        for layer in psd.descendants():
            try:
                if hasattr(layer, 'text') and layer.text is not None:
                    text_str = str(layer.text or '')[:80]
                    if text_str.strip():
                        bbox = layer.bbox
                        texts.append({
                            'name': layer.name,
                            'text': text_str.strip(),
                            'bbox': [bbox[0], bbox[1], bbox[2], bbox[3]],
                            'visible': layer.visible
                        })
            except:
                pass
        
        result[page_name] = {
            'size': {'w': psd.width, 'h': psd.height},
            'text_layers': texts[:100],  # 最多取100个
            'text_count': len(texts)
        }
        print(f'  {pf}: {psd.width}x{psd.height}, {len(texts)} text layers')
    except Exception as e:
        print(f'  {pf}: ERROR - {e}')

with open(OUTPUT, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
print(f'\nDone! Saved to {OUTPUT}')
