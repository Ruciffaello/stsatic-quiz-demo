# Moon Rabbit Pounding Mochi | Design Specifications

## Visual Direction

Refined Traditional Chinese Moon Palace Aesthetic: Deep violet night sky, warm golden moonlight, deep vermilion action buttons, and soothing, hand-drawn rabbit illustrations. The overall layout maintains ample whitespace and depth without excessive decorative borders or linework.

## Colors & Typography

| Usage | Specification |
| --- | --- |
| Night Sky Background | `#0d0a14`, violet-black radial gradient |
| Moonlight & Golden Accents | `#ffd27d` |
| Vermilion Button | `#c53535` → `#8c1b20` |
| Result Title | Deep Vermilion `#7a2028` |
| Body Font | Noto Sans TC |
| Headings / Result Titles | Noto Serif TC |

## Landing Screen (Cover)

- A 250px circular moon centered on screen, featuring an off-white to warm golden radial gradient with a subtle breathing animation.
- Title: "玉杵輕落・萬願成糬" (*"The Jade Pestle Falls Lightly, Crafting Countless Wishes into Mochi"*) centered on the moon's surface, styled in a deep vermilion gradient Serif font.
- Three vertical star dots positioned to the right of the moon.
- Descriptive/instructional text placed beneath the moon.
- Original rabbit graphic `Rabbit holding moon cake_7223575.png` rendered at 160px height, positioned below the descriptive text.
- Vermilion primary action button at the bottom with the footnote: "一主二副 · 煉就一顆專屬月餅" (*"One Core, Two Accents · Crafting Your Exclusive Mooncake"*).

## Ingredient Selection Screen

- Displays 10 ingredients arranged in a 4 + 3 + 3 grid layout.
- Round 1 prompt: "選主食材" (*"Choose Core Ingredient"*); Rounds 2 & 3 prompt: "選副食材" (*"Choose Accent Ingredient"*).
- Ingredient cards display only an icon, name, and color swatch; selecting a card reveals its brief symbolic meaning.
- The upper screen illustrates the rabbit, stone mortar, and mochi reflecting the current mixed color; starts in white, then updates to the RGB average of chosen ingredients.

## Pounding Animation

- Rabbit, pestle, stone mortar, and mochi rendered with CSS shapes, cycling on a 1.35-second loop.
- The pestle is an expanded cylinder gripped directly by both hands, moving together as one unit.
- The rabbit exhibits a subtle bounce on the downward stroke; the mortar, mochi, and white particles are concentrated in the upper region in close proximity to the rabbit.
- The mochi uses a radial gradient from white to blended shadow color, with flattening and splash particle effects inside the mortar.

## Result Screen

- Moon hero visual positioned at the top; "中秋限定" (*"Mid-Autumn Exclusive"*) displayed across the moon's face, with the Result Name centered on the moon.
- Mooncake base image uses `gg yolk pastry dessert illustration_7125802.png`. Canvas applies the three-ingredient blended color strictly to the front-facing cut cross-section; pastry crust, sesame seeds, and yolk remain untouched.
- Balanced spacing between the result card and the mooncake. Content flows sequentially: Core Formula, Mochi Meaning Summary, Two-line Accent Effects, Mid-Autumn Blessing.
- The "麻糬寓意" (*Mochi Meaning*) label and the Main Conclusion are split onto separate lines; the Main Conclusion is centered. Accent effect labels are sized at 14px, result card labels at 15px.
- The Save button triggers a screenshot prompt only; image export is not implemented.

## Responsive Design Guidelines

- Mobile WebView with max width under 430px as the primary layout target.
- For screen widths under 390px, scale down illustrations and font sizes while preserving the original information hierarchy.
- Animations and result card content support natural vertical scrolling to prevent awkward vertical compression.