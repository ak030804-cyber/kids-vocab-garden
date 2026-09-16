#!/usr/bin/env python3
"""生成字樹花園 App 圖示 (192 / 512) — 純本機繪製，無外部素材。"""
from PIL import Image, ImageDraw

CREAM = (251, 247, 239)
LEAF_LIGHT = (220, 239, 220)
GREEN = (95, 158, 99)
GREEN_L = (116, 181, 120)
GREEN_D = (76, 138, 82)
TRUNK = (122, 90, 54)
SUN = (242, 193, 78)


def make(size):
    S = 6
    W = size * S
    img = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # 圓角背景
    pad = int(W * 0.02)
    d.rounded_rectangle([pad, pad, W - pad, W - pad], radius=int(W * 0.24), fill=CREAM)

    cx = W // 2

    # 太陽
    sr = W * 0.075
    scx, scy = W * 0.76, W * 0.26
    d.ellipse([scx - sr, scy - sr, scx + sr, scy + sr], fill=SUN)

    # 後面淺綠圓
    br = W * 0.30
    bcy = W * 0.52
    d.ellipse([cx - br, bcy - br, cx + br, bcy + br], fill=LEAF_LIGHT)

    # 樹幹
    tw = W * 0.055
    ty0 = bcy + W * 0.06
    ty1 = bcy + W * 0.30
    d.rounded_rectangle([cx - tw / 2, ty0, cx + tw / 2, ty1], radius=tw / 2, fill=TRUNK)
    # 分枝
    d.line([cx, ty0 + W * 0.02, cx - W * 0.09, ty0 - W * 0.05], fill=TRUNK, width=int(tw * 0.7))
    d.line([cx, ty0 + W * 0.04, cx + W * 0.09, ty0 - W * 0.03], fill=TRUNK, width=int(tw * 0.7))

    # 樹冠
    def circ(x, y, r, color):
        d.ellipse([x - r, y - r, x + r, y + r], fill=color)

    top = bcy - W * 0.16
    circ(cx, top, W * 0.135, GREEN)
    circ(cx - W * 0.11, top + W * 0.045, W * 0.095, GREEN_L)
    circ(cx + W * 0.11, top + W * 0.045, W * 0.095, GREEN_D)
    circ(cx - W * 0.06, top - W * 0.07, W * 0.085, GREEN_L)
    circ(cx + W * 0.06, top - W * 0.06, W * 0.08, GREEN)

    # 地面
    gy = ty1
    d.ellipse([cx - W * 0.20, gy - W * 0.02, cx + W * 0.20, gy + W * 0.05], fill=(207, 227, 191))

    return img.resize((size, size), Image.LANCZOS)


for s in (192, 512):
    out = f"assets/icon-{s}.png"
    make(s).save(out)
    print("wrote", out)
