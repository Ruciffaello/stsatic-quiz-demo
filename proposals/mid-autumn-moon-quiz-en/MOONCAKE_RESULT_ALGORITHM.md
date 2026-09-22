# Moon Rabbit Pounding Mochi | Complete Result Algorithm Report (3-Ingredient Edition)

## 1. Updated Game Rules

Each session requires choosing ingredients 3 times, categorized as follows:

1. 1st Flavor: **Core Ingredient**, determining the mooncake title, core persona, and primary blessing.
2. 2nd & 3rd Flavors: **Accent Ingredients**, which can be duplicates of each other or identical to the core ingredient; their blessings are appended as supplementary clauses following the primary blessing.
3. The selection order of the accent ingredients does not affect the formula or the outcome.

## 2. Total Formula Combinations

There are 10 core ingredients. Two accent ingredients are chosen from the 10 options with replacement and order independence:

```text
Accent Combinations = C(10 + 2 - 1, 2) = C(11, 2) = 55 combinations
Full Formulas       = 10 Core Ingredients × 55 Accent Combinations = 550 formulas
```

| Formula Category | Formulas per Core | Total Formulas | Result Type |
| --- | ---: | ---: | --- |
| Both accents differ from the core | 45 | 450 | Standard Mixed Result |
| At least one accent matches the core | 10 | 100 | Pure Core Result |
| Among which: Core + Core + Core | 1 | 10 | Complete Pure Result |
| **Total** | **55** | **550** | |

## 3. Resolution Priority Logic

```text
Complete 3rd Ingredient Selection
        │
        ▼
Roll 1% Rare Probability
        ├─ Success → Moon Rabbit's Chosen: Mochi of Perfect Blessings
        │
        └─ Failed (99%)
                │
                ▼
       Does any accent match the core ingredient?
        ├─ Yes → Apply Core's Pure Flavor Name, Core Blessing & Meaning
        └─ No  → Apply Core's Mixed Flavor Name, Core Blessing & Meaning
                │
                ▼
       Append blessings of accents differing from the core
```

### Accent Blessing Rules

| Accent Condition | Output Format |
| --- | --- |
| Both B and C differ from Core A, and B ≠ C | Primary Blessing + B Clause + C Clause |
| Both B and B differ from Core A | Primary Blessing + B Enhanced Clause |
| A and B | Pure Core Blessing + B Clause; A is not duplicated as an accent |
| A and A | Complete Pure Core Blessing without additional accent clauses |

Repeating the core flavor does not discard distinct accents. For instance, `Red Bean (Core) + Red Bean + Sesame` yields the pure core "Single-Minded Red Bean Mochi," with Sesame appended as "steadily rising upward."

## 4. Ingredients & Accent Clauses

| Ingredient | Hex Color | Supplementary Clause as Accent |
| --- | --- | --- |
| Red Bean | `#a8443d` | May your sincere intentions be tenderly embraced |
| Peanut | `#d2a64b` | And catch good fortune arriving right on cue |
| Osmanthus | `#f4ac2d` | And may your efforts be truly recognized |
| Sesame | `#352e31` | And may you steadily rise higher and higher |
| Chestnut | `#935634` | And reap a bountiful, grounded harvest |
| Taro | `#a483b2` | And discover fresh directions at life's turning points |
| Jujube Paste | `#813c32` | And see your wishes materialize without delay |
| Pomelo | `#d6d96b` | And be accompanied by reunion and lasting peace |
| Mugwort | `#6d9a70` | And advance at peace within your own natural pace |
| Salted Egg Yolk | `#f6bd31` | And savor a sense of completeness that feels just right |

When two distinct accents occur together, the clauses are linked with "and also" (也願). When identical accents repeat, an enhanced single-sentence version is used instead of repeating the same phrasing.

## 5. Mixed-Flavor Core Results (10 Types)

Trigger condition: Rare result not rolled, and both accents differ from the core ingredient.

| Core Ingredient | Result Name | Core Blessing | Core Meaning |
| --- | --- | --- | --- |
| Red Bean | Whispering Red Bean Mochi | Intentions resonate · Drawing near with courage | May you receive romantic sparks, warm connections, and the courage to express affection. |
| Peanut | Good Fortune Peanut Mochi | Fortunate happenings · Opportunities arrive | May you seize the little opportunities before you, letting them steadily grow into dependable luck. |
| Osmanthus | Laureled Osmanthus Mochi | Shining brightly · Meeting benefactors | May your diligence be acknowledged, meeting mentors who appreciate your worth at pivotal moments. |
| Sesame | Ascending Sesame Mochi | Rising step by step · Steady refinement | May every small daily endeavor quietly build into your own towering summit. |
| Chestnut | Abundant Chestnut Mochi | Harvest collected · Grounded abundance | May the energy you invest bloom at the right time, yielding reassuring rewards. |
| Taro | Turning-Tide Taro Mochi | Turning points appear · New chapters unfold | May every transition open up fresh avenues and lead you toward brighter beginnings. |
| Jujube Paste | Swift-Fulfillment Jujube Mochi | Wishes fulfilled early · Immediate action | May the quiet dreams held in your heart turn into the first steps you can take today. |
| Pomelo | Fragrant Reunion Pomelo Mochi | Guarding reunion · Accompanied by peace | May the ones you cherish stay safe and sound, and may you be shielded with warmth. |
| Mugwort | Tranquil Mugwort Mochi | Soothing inner calm · Healing at your pace | May you release unnecessary worry and let things improve gently in your own stride. |
| Salted Egg Yolk | Full Moon Egg Yolk Mochi | Contentment & wholeness · Perfect bliss | May you discover a comfortable, just-right fulfillment across your life and relationships. |

## 6. Pure-Flavor Core Results (10 Types)

Trigger condition: Rare result not rolled, and at least one accent ingredient matches the core ingredient. A complete triple match and a "Core + 1 Matching Accent + 1 Distinct Accent" share the same pure-flavor core; the latter still appends the remaining accent clause.

| Core Ingredient | Result Name | Pure Flavor Core Blessing | Core Meaning |
| --- | --- | --- | --- |
| Red Bean | Single-Minded Red Bean Mochi | Sincere intentions resonate · Exclusive devotion | May your heartfelt intentions be tenderly embraced. |
| Peanut | Lucky Sprout Peanut Mochi | Fortunate moments · Luck gathers | May every small blessing arrive at just the right moment. |
| Osmanthus | Moon-Palace Osmanthus Mochi | Laureled brilliance · Truly acknowledged | May you radiate on life's center stage, receiving well-deserved recognition. |
| Sesame | Step-by-Step Sesame Mochi | Rising steadily · Reaching greater heights | May every ounce of hard work become your steadfast foundation down the road. |
| Chestnut | Full-Granary Chestnut Mochi | Granaries full · Harvest in hand | May past dedication echo back with rewards, filling life with grounded richness. |
| Taro | Fortuitous Taro Mochi | Auspicious beginnings · A turn of fortune arrives | May you stumble upon unexpected new directions right around the bend. |
| Jujube Paste | Fast-Track Jujube Mochi | Dreams fulfilled swiftly · Action bears fruit | May the moment you step forward bring you closer to where you wish to be. |
| Pomelo | Moon-Watching Pomelo Mochi | Safe reunion · Tender protection | May you share the moonlight, tranquility, and peace with those who matter most. |
| Mugwort | Serene Mugwort Mochi | Mindful space · Peace in the everyday | May you reserve quiet space for yourself, letting your mind settle back into calm. |
| Salted Egg Yolk | Harmonious Moon Egg Yolk Mochi | Wholeness together · Enduring happiness | May this Mid-Autumn's warmth and togetherness linger just a little longer. |

## 7. Rare Result (1 Type)

| Trigger Condition | Result Name | Blessing Phrase | Symbolic Meaning |
| --- | --- | --- | --- |
| Evaluated after each session: `Math.random() < 0.01` | Moon Rabbit's Chosen: Mochi of Perfect Blessings | Myriad blessings unite · A consummate Mid-Autumn | The Moon Rabbit sprinkles golden dust of fortune, bringing ten kinds of celestial luck straight into your mortar. May wealth, love, benefactors, reunion, and peace all find their way to you this Mid-Autumn. |

The rare outcome bypasses all standard 3-ingredient formula combinations and triggers unconditionally at a fixed 1% rate prior to other evaluation rules.

## 8. Sample Copywriting Scenarios

| Selection Sequence | Condition | Sample Output |
| --- | --- | --- |
| Red Bean (Core) + Sesame + Osmanthus | Mixed Red Bean | **Whispering Red Bean Mochi**: Sincere intentions resonate, drawing near with courage; and may you steadily rise higher, and may your efforts be truly recognized. |
| Red Bean (Core) + Red Bean + Sesame | Pure Red Bean + Sesame Accent | **Single-Minded Red Bean Mochi**: Sincere intentions resonate, exclusive devotion; and may you steadily rise higher. |
| Mugwort (Core) + Pomelo + Pomelo | Mixed Mugwort + Doubled Pomelo Accent | **Tranquil Mugwort Mochi**: Soothing inner calm, healing at your pace; double blessings of reunion and peace accompany you. |
| Salted Egg Yolk (Core) + Egg Yolk + Egg Yolk | Full Pure Egg Yolk | **Harmonious Moon Egg Yolk Mochi**: Wholeness together, enduring happiness. |

## 9. Mooncake Visual Compositing

When compositing with `gg yolk pastry dessert illustration_7125802.png`:

| Visual Element | Rule |
| --- | --- |
| Pastry Crust, Black Sesame, Egg Yolk | Preserved from original illustration to retain the hand-drawn aesthetic |
| Front Cut Cross-Section Filling | Apply the averaged RGB value of the core and two accent ingredients onto the designated mask |
| Three Formula Color Swatches | Display representative swatches in selection order (Core, Accent 1, Accent 2); core flavor may include an accent border |
| Result Copy | Rendered per Sections 3 through 7; accent blessings appended directly after the primary blessing |