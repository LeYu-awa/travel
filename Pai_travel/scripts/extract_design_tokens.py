"""提取 PSD 首页的设计 Token（颜色、字体、尺寸）"""
import json
from psd_tools import PSDImage

psd_path = r'd:\traverl\app\APP调整6月\首页.psd'
output_path = r'd:\traverl\Pai_travel\src\assets\design_tokens.json'

psd = PSDImage.open(psd_path)

def extract_color_from_shape(layer):
    """尝试从形状图层提取颜色"""
    colors = []
    try:
        # 尝试从 vector_mask 获取
        if hasattr(layer, 'vector_mask') and layer.vector_mask:
            pass
        # 从 fill setting 获取颜色
        if hasattr(layer, 'fill_settings') and layer.fill_settings:
            for f in layer.fill_settings:
                colors.append(str(f))
        # 从 tagged_blocks 获取
        if hasattr(layer, 'tagged_blocks'):
            for block in layer.tagged_blocks:
                if 'color' in str(block).lower() or 'fill' in str(block).lower():
                    colors.append(f"{block.key}: {str(block)[:100]}")
    except:
        pass
    return colors

def extract_layer_colors(layer, depth=0):
    """递归提取图层颜色"""
    results = []
    prefix = "  " * depth
    
    layer_type = type(layer).__name__
    
    # 提取颜色信息
    try:
        if hasattr(layer, 'color') and layer.color is not None:
            results.append({
                'name': layer.name,
                'type': layer_type,
                'color': str(layer.color),
                'bbox': [layer.bbox[0], layer.bbox[1], layer.bbox[2], layer.bbox[3]],
                'visible': layer.visible
            })
    except:
        pass
    
    # 文本图层 - 字体信息
    if layer_type == 'TypeLayer' or (hasattr(layer, 'text') and layer.text is not None):
        text_info = {
            'name': layer.name,
            'type': 'TypeLayer',
            'bbox': [layer.bbox[0], layer.bbox[1], layer.bbox[2], layer.bbox[3]],
            'visible': layer.visible,
        }
        try:
            text_info['text'] = str(layer.text)[:100]
        except:
            text_info['text'] = ''
        
        # 尝试获取字体引擎数据
        try:
            if hasattr(layer, 'engine_dict') and layer.engine_dict:
                ed = layer.engine_dict
                style = ed.get('style', {})
                if style:
                    font_info = {}
                    for key in ['fontName', 'fontSize', 'fontColor', 'lineHeight', 'tracking', 'alignment']:
                        if key in style:
                            font_info[key] = style[key]
                    if 'fontColor' in style:
                        fc = style['fontColor']
                        if isinstance(fc, dict):
                            font_info['color_values'] = {
                                'r': fc.get('red'), 
                                'g': fc.get('green'), 
                                'b': fc.get('blue'), 
                                'a': fc.get('alpha')
                            }
                    text_info['font_style'] = font_info
        except:
            pass
        results.append(text_info)
    
    # 形状图层
    if layer_type == 'ShapeLayer':
        shape_info = {
            'name': layer.name,
            'type': 'ShapeLayer',
            'bbox': [layer.bbox[0], layer.bbox[1], layer.bbox[2], layer.bbox[3]],
            'visible': layer.visible,
        }
        colors = extract_color_from_shape(layer)
        if colors:
            shape_info['colors'] = colors
        results.append(shape_info)
    
    # 递归子图层
    if hasattr(layer, '_layers') and layer._layers:
        for child in layer._layers:
            results.extend(extract_layer_colors(child, depth + 1))
    
    return results

# 提取所有设计 Token
all_tokens = extract_layer_colors(psd)

# 按类型分类整理
design_tokens = {
    'psd_size': {'width': psd.width, 'height': psd.height},
    'total_layers': len(list(psd.descendants())),
    'color_tokens': [t for t in all_tokens if t['type'] == 'ShapeLayer' and 'color' in t],
    'font_tokens': [t for t in all_tokens if t['type'] == 'TypeLayer' and t.get('font_style')],
    'all_text_layers': [t for t in all_tokens if t['type'] == 'TypeLayer'],
}

# 提取关键颜色（红色、橙色等主色调）
key_colors = {}
for t in design_tokens['color_tokens']:
    color_str = t.get('color', '')
    if color_str not in key_colors:
        key_colors[color_str] = []
    key_colors[color_str].append(t['name'])

design_tokens['unique_colors'] = {k: v for k, v in key_colors.items() if len(v) > 0}

# 保存
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(design_tokens, f, ensure_ascii=False, indent=2)

print(f"设计Token已保存到: {output_path}")
print(f"形状图层（含颜色）: {len(design_tokens['color_tokens'])}")
print(f"文字图层（含字体）: {len(design_tokens['font_tokens'])}")
print(f"所有文字图层: {len(design_tokens['all_text_layers'])}")
print(f"\n--- 关键颜色 ---")
for color, names in key_colors.items():
    if color:
        print(f"  {color}: {names[:3]}...")
