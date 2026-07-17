"""从 PSD 文件提取首页设计数据"""
import json
from psd_tools import PSDImage

psd_path = r'd:\traverl\app\APP调整6月\首页.psd'
output_path = r'd:\traverl\Pai_travel\src\assets\homepage_design_data.json'

psd = PSDImage.open(psd_path)

print(f"PSD 尺寸: {psd.width} x {psd.height}")
print(f"图层总数: {len(list(psd.descendants()))}")
print()

def extract_layer(layer, depth=0):
    """提取图层信息"""
    info = {
        'name': layer.name,
        'visible': layer.visible,
        'type': str(type(layer).__name__),
    }
    try:
        info['bbox'] = {
            'x': layer.bbox[0],
            'y': layer.bbox[1],
            'width': layer.bbox[2] - layer.bbox[0],
            'height': layer.bbox[3] - layer.bbox[1],
        }
    except:
        info['bbox'] = {'x': 0, 'y': 0, 'width': 0, 'height': 0}
    
    # 文字图层
    if hasattr(layer, 'text') and layer.text is not None:
        try:
            text_data = {
                'text': layer.text,
                'font_set': []
            }
            # 尝试获取字体信息
            if hasattr(layer, 'resource_dict') and layer.resource_dict:
                rd = layer.resource_dict
                if 'FontSet' in rd:
                    text_data['font_set'] = [
                        {'name': f.name, 'font_type': str(f.type) if hasattr(f, 'type') else ''}
                        for f in rd['FontSet']
                    ]
            info['text_data'] = text_data
        except Exception as e:
            info['text_data'] = {'text': str(layer.text)[:200], 'error': str(e)}
    
    # 检查是否有填充颜色
    try:
        if hasattr(layer, 'color') and layer.color is not None:
            info['color'] = str(layer.color)
    except:
        pass
    
    # 子图层
    if hasattr(layer, '_layers') and layer._layers:
        info['children'] = [extract_layer(child, depth + 1) for child in layer._layers]
    
    return info

# 提取所有图层
design_data = {
    'psd_size': {'width': psd.width, 'height': psd.height},
    'layers': [extract_layer(child) for child in psd._layers],
}

# 输出为 JSON
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(design_data, f, ensure_ascii=False, indent=2)

print(f"设计数据已保存到: {output_path}")
print(f"共提取 {len(design_data['layers'])} 个顶层图层")
print()

# 打印汇总
def print_layer_summary(layers, depth=0):
    for layer in layers:
        prefix = '  ' * depth
        bbox = layer.get('bbox', {})
        size = f"{bbox.get('width','?')}x{bbox.get('height','?')} @({bbox.get('x','?')},{bbox.get('y','?')})"
        text_info = ""
        if 'text_data' in layer:
            txt = layer['text_data'].get('text', '')[:30]
            text_info = f" [文字: {txt}]"
        visible = "V" if layer.get('visible', True) else "X"
        if text_info:
            print(f"{prefix}{visible} {layer['type']} \"{layer['name']}\" {size}{text_info}")
        else:
            print(f"{prefix}{visible} {layer['type']} \"{layer['name']}\" {size}")
        if 'children' in layer:
            print_layer_summary(layer['children'], depth + 1)

print_layer_summary(design_data['layers'])
