"""提取所有 PSD 文件的设计系统数据，输出汇总 JSON"""

import json
import os
import glob
from datetime import datetime
from collections import defaultdict
from json import JSONEncoder

from psd_tools import PSDImage


class SafeEncoder(JSONEncoder):
    """安全的 JSON 编码器，能处理 psd-tools 的非标准类型"""
    def default(self, obj):
        try:
            return make_serializable(obj)
        except Exception:
            return str(obj)

PSD_DIR = r'd:\traverl\app\APP调整6月'
OUTPUT_PATH = r'd:\traverl\Pai_travel\src\assets\design_system.json'


def make_serializable(obj):
    """递归将 psd-tools 内部对象转换为 JSON 可序列化的 Python 原生类型"""
    if obj is None:
        return None
    if isinstance(obj, (str, int, float, bool)):
        return obj
    if isinstance(obj, (list, tuple)):
        return [make_serializable(item) for item in obj]
    if isinstance(obj, dict):
        return {str(k): make_serializable(v) for k, v in obj.items()}
    # psd-tools 的 Dict 类型（类似 dict 但非标准 dict）
    if hasattr(obj, 'keys') and hasattr(obj, 'items'):
        try:
            return {str(k): make_serializable(v) for k, v in obj.items()}
        except Exception:
            pass
    # 其他对象尝试转字符串
    try:
        return str(obj)
    except Exception:
        return None


def extract_font_data(layer):
    """从文字图层提取详细字体信息"""
    font_data = {}
    try:
        if hasattr(layer, 'engine_dict') and layer.engine_dict:
            ed = layer.engine_dict
            style = ed.get('style', {})
            if style:
                for key in ['fontName', 'fontSize', 'fontColor', 'lineHeight',
                            'tracking', 'alignment', 'fillColor']:
                    if key in style:
                        font_data[key] = style[key]

                # 展开颜色值
                fc = style.get('fontColor') or style.get('fillColor')
                if isinstance(fc, dict):
                    font_data['color_rgba'] = {
                        'r': fc.get('red'),
                        'g': fc.get('green'),
                        'b': fc.get('blue'),
                        'a': fc.get('alpha'),
                    }

        # 从 resource_dict 补充字体集
        if hasattr(layer, 'resource_dict') and layer.resource_dict:
            rd = layer.resource_dict
            if 'FontSet' in rd:
                fonts = []
                for f in rd['FontSet']:
                    fonts.append({
                        'name': f.name if hasattr(f, 'name') else str(f),
                        'type': str(f.type) if hasattr(f, 'type') else '',
                    })
                if fonts:
                    font_data['font_set'] = fonts
    except Exception:
        pass
    return font_data


def extract_color_from_layer(layer):
    """尝试从图层提取颜色信息"""
    colors = []
    try:
        if hasattr(layer, 'color') and layer.color is not None:
            colors.append({'source': 'color', 'value': str(layer.color)})
    except Exception:
        pass
    try:
        if hasattr(layer, 'fill_settings') and layer.fill_settings:
            for f in layer.fill_settings:
                colors.append({'source': 'fill_settings', 'value': str(f)})
    except Exception:
        pass
    return colors


def extract_layer(layer, depth=0, parent_name=''):
    """递归提取单个图层的完整信息"""
    layer_type = type(layer).__name__

    # bbox: (x1, y1, x2, y2) 转为对象
    try:
        bbox = layer.bbox
        bbox_obj = {
            'x': int(bbox[0]),
            'y': int(bbox[1]),
            'width': int(bbox[2] - bbox[0]),
            'height': int(bbox[3] - bbox[1]),
            'x1': int(bbox[0]),
            'y1': int(bbox[1]),
            'x2': int(bbox[2]),
            'y2': int(bbox[3]),
        }
    except Exception:
        bbox_obj = None

    info = {
        'name': layer.name or '',
        'type': layer_type,
        'visible': bool(layer.visible) if hasattr(layer, 'visible') else True,
        'depth': depth,
        'bbox': bbox_obj,
    }

    # 文字图层
    if layer_type == 'TypeLayer' or (hasattr(layer, 'text') and layer.text is not None):
        text_str = ''
        try:
            text_str = str(layer.text)
        except Exception:
            text_str = ''
        info['text'] = text_str

        font_data = extract_font_data(layer)
        if font_data:
            info['font_data'] = font_data

    # 形状图层颜色
    colors = extract_color_from_layer(layer)
    if colors:
        info['colors'] = colors

    # 子图层（使用 _layers 属性）
    if hasattr(layer, '_layers') and layer._layers:
        children = []
        for child in layer._layers:
            child_info = extract_layer(child, depth + 1, layer.name)
            children.append(child_info)
        info['children'] = children

    return info


def process_psd(filepath):
    """处理单个 PSD 文件，返回结构化数据"""
    psd = PSDImage.open(filepath)
    basename = os.path.splitext(os.path.basename(filepath))[0]

    # 提取所有顶层图层
    top_layers = []
    for child in psd._layers:
        top_layers.append(extract_layer(child))

    # 统计（使用 descendants 获取所有后代）
    all_descendants = list(psd.descendants())
    total_layers = len(all_descendants)
    visible_count = sum(1 for d in all_descendants if hasattr(d, 'visible') and d.visible)
    text_layers = [d for d in all_descendants
                   if (type(d).__name__ == 'TypeLayer' or
                       (hasattr(d, 'text') and d.text is not None))]
    shape_layers = [d for d in all_descendants if type(d).__name__ == 'ShapeLayer']
    group_layers = [d for d in all_descendants if type(d).__name__ == 'GroupLayer']

    result = {
        'file_name': basename,
        'file_path': filepath,
        'psd_size': {'width': psd.width, 'height': psd.height},
        'statistics': {
            'total_layers': total_layers,
            'visible_layers': visible_count,
            'hidden_layers': total_layers - visible_count,
            'text_layers': len(text_layers),
            'shape_layers': len(shape_layers),
            'group_layers': len(group_layers),
        },
        'layers': top_layers,
    }

    return result, psd, text_layers, shape_layers


def extract_homepage_detail(psd, text_layers, shape_layers):
    """对首页进行详细的额外提取"""
    detail = {
        'sections': [],
        'color_palette': [],
        'detailed_text_info': [],
    }

    # 详细文字信息（含 engine_dict）
    for tl in text_layers:
        entry = {
            'name': tl.name,
            'bbox': list(tl.bbox) if hasattr(tl, 'bbox') else None,
            'visible': bool(tl.visible) if hasattr(tl, 'visible') else True,
        }
        try:
            entry['text'] = str(tl.text)
        except Exception:
            entry['text'] = ''
        try:
            if hasattr(tl, 'engine_dict') and tl.engine_dict:
                entry['engine_dict'] = make_serializable(tl.engine_dict)
        except Exception:
            pass
        detail['detailed_text_info'].append(entry)

    # 收集所有颜色
    color_set = set()
    for sl in shape_layers:
        try:
            if hasattr(sl, 'color') and sl.color is not None:
                color_set.add(str(sl.color))
        except Exception:
            pass
    for tl in text_layers:
        try:
            if hasattr(tl, 'engine_dict') and tl.engine_dict:
                style = tl.engine_dict.get('style', {})
                fc = style.get('fontColor') or style.get('fillColor')
                if isinstance(fc, dict):
                    c = (fc.get('red'), fc.get('green'), fc.get('blue'), fc.get('alpha'))
                    color_set.add(f'rgba({c[0]},{c[1]},{c[2]},{c[3]})')
        except Exception:
            pass
    detail['color_palette'] = sorted(color_set)

    return detail


def build_aggregated_design_system(all_psd_results, homepage_detail):
    """跨所有 PSD 汇总设计系统 token"""
    all_texts = []
    all_fonts = set()
    all_sizes = []
    all_layer_names = defaultdict(list)

    for psd_name, data in all_psd_results.items():
        all_sizes.append({
            'file': psd_name,
            'width': data['psd_size']['width'],
            'height': data['psd_size']['height'],
        })

        # 扁平化提取所有文字图层
        def collect_texts(layers, prefix=''):
            for layer in layers:
                if layer.get('text'):
                    entry = {
                        'file': psd_name,
                        'name': layer['name'],
                        'text': layer['text'][:200],
                        'bbox': layer.get('bbox'),
                    }
                    if 'font_data' in layer:
                        entry['font_data'] = layer['font_data']
                    all_texts.append(entry)
                if 'children' in layer:
                    collect_texts(layer['children'], prefix + layer['name'] + '/')

        collect_texts(data['layers'])

        # 收集字体名称
        def collect_fonts(layers):
            for layer in layers:
                if 'font_data' in layer:
                    fd = layer['font_data']
                    if 'fontName' in fd:
                        all_fonts.add(fd['fontName'])
                    if 'font_set' in fd:
                        for f in fd['font_set']:
                            all_fonts.add(f['name'])
                if 'children' in layer:
                    collect_fonts(layer['children'])

        collect_fonts(data['layers'])

        # 收集图层名称
        def collect_names(layers):
            for layer in layers:
                all_layer_names[layer['name']].append(psd_name)
                if layer.get('text'):
                    key = f"[文字] {layer['text'][:50]}"
                    all_layer_names[key].append(psd_name)
                if 'children' in layer:
                    collect_names(layer['children'])

        collect_names(data['layers'])

    # 按出现频率排序图层名称
    sorted_names = sorted(all_layer_names.items(), key=lambda x: -len(x[1]))
    common_names = [{'name': n, 'count': len(files), 'files': list(set(files))}
                    for n, files in sorted_names[:100]]

    return {
        'total_psd_files': len(all_psd_results),
        'psd_files': list(all_psd_results.keys()),
        'psd_sizes': all_sizes,
        'total_text_layers_found': len(all_texts),
        'total_unique_fonts': len(all_fonts),
        'font_list': sorted(all_fonts),
        'common_layer_names': common_names,
        'all_text_layers': all_texts,
    }


def main():
    psd_files = glob.glob(os.path.join(PSD_DIR, '*.psd'))
    psd_files.sort()

    if not psd_files:
        print(f"错误: 在 {PSD_DIR} 下未找到 PSD 文件")
        return

    print(f"找到 {len(psd_files)} 个 PSD 文件")
    print()

    all_psd_results = {}
    homepage_result = None
    homepage_extra = None

    for i, psd_path in enumerate(psd_files, 1):
        basename = os.path.splitext(os.path.basename(psd_path))[0]
        print(f"[{i}/{len(psd_files)}] 处理: {basename}")

        try:
            result, psd_obj, text_layers, shape_layers = process_psd(psd_path)
            all_psd_results[basename] = result

            stats = result['statistics']
            print(f"      尺寸: {result['psd_size']['width']}x{result['psd_size']['height']}"
                  f"  图层: {stats['total_layers']} (可见 {stats['visible_layers']}"
                  f" / 隐藏 {stats['hidden_layers']})"
                  f"  文字: {stats['text_layers']}"
                  f"  形状: {stats['shape_layers']}"
                  f"  组: {stats['group_layers']}")

            # 首页特别处理
            if '首页' in basename:
                homepage_result = result
                homepage_extra = extract_homepage_detail(psd_obj, text_layers, shape_layers)
                print(f"      ★ 首页特殊提取完成: "
                      f"{len(homepage_extra['detailed_text_info'])} 个详细文字, "
                      f"{len(homepage_extra['color_palette'])} 种颜色")

        except Exception as e:
            print(f"      !! 处理失败: {e}")
            all_psd_results[basename] = {
                'file_name': basename,
                'error': str(e),
            }

    # 汇总设计系统
    print()
    print("正在构建跨 PSD 设计系统汇总...")
    aggregated = build_aggregated_design_system(all_psd_results, homepage_extra)

    # 组装最终 JSON
    design_system = {
        'meta': {
            'generated_at': datetime.now().isoformat(),
            'source_directory': PSD_DIR,
            'total_psd_files': len(psd_files),
            'description': '从 APP调整6月 目录下所有 PSD 文件提取的完整设计系统数据',
        },
        'per_psd_detail': all_psd_results,
        'aggregated': aggregated,
    }

    # 首页特别信息
    if homepage_extra:
        design_system['homepage_detail'] = {
            'color_palette': homepage_extra['color_palette'],
            'section_count': len(homepage_extra['detailed_text_info']),
        }
        # 首页详细文字信息单独放在顶层方便查阅
        design_system['homepage_text_layers'] = homepage_extra['detailed_text_info']

    # 确保输出目录存在
    output_dir = os.path.dirname(OUTPUT_PATH)
    os.makedirs(output_dir, exist_ok=True)

    # 写入 JSON
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(design_system, f, ensure_ascii=False, indent=2, cls=SafeEncoder)

    print()
    print(f"设计系统数据已保存至: {OUTPUT_PATH}")
    print(f"文件大小: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")
    print(f"包含 {len(psd_files)} 个 PSD 文件的完整图层结构和设计 Token")


if __name__ == '__main__':
    main()
