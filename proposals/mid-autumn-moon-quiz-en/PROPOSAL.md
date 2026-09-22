# Moon Rabbit Pounding Mochi | Project Proposal

## Project Overview

- Project ID: `mid-autumn-moon-quiz`
- Theme: Mid-Autumn Moon Rabbit pounding personalized blessing mooncakes/mochi.
- Format: Mobile-first interactive web experience; features intuitive ingredient selection rather than question-and-answer quizzes.
- Core Experience: A 3-flavor formula of "One Core, Two Accents," synthesizing a primary wish and two supporting blessings into a shareable, screenshot-ready result card.

## Gameplay Flow

1. Landing Screen: Moon hero graphic with central title, original hand-drawn rabbit, and an action button reading "啟封月宮食譜" (*"Unseal the Moon Palace Recipe"*).
2. 1st Flavor: Select the Core Ingredient, which determines the title and primary blessing.
3. 2nd & 3rd Flavors: Select Accent Ingredients; accents can repeat or match the core ingredient.
4. After confirming each pick, transition into the Moon Rabbit pounding animation; mochi in the mortar updates according to the running average RGB color of selected ingredients.
5. Upon completing the 3rd flavor, present the Result Card; file export is omitted, prompting users to take a screenshot instead.

## Ingredients & Symbolic Meanings

| Ingredient | Theme & Meaning |
| --- | --- |
| Red Bean | Heartfelt intentions resonate |
| Peanut | Fortunate things will unfold |
| Osmanthus | To seize the laurel and be recognized |
| Sesame | Steadily advancing upward |
| Chestnut | A rich harvest gathered |
| Taro | Encountering new turning points |
| Jujube Paste | Aspirations fulfilled early |
| Pomelo | Reunions safeguarded |
| Mugwort | Finding peace and taking it slow |
| Salted Egg Yolk | Perfect wholeness and contentment |

## Result Logic Summary

- Core Ingredients: 10 types, determining whether the result branches into standard mixed or pure flavor cores.
- Two Accent Ingredients: Selected from 10 types with replacement; pick order does not alter the result.
- Total Formulas: `10 × C(11, 2) = 550` combinations.
- If either accent matches the core, trigger the Pure Flavor core result for that ingredient; any remaining distinct accent is preserved as a supplementary blessing.
- If both accents differ from the core, trigger the Mixed Flavor core result, appending two accent clauses.
- Prior to final tallying, a 1% probability check is rolled for the rare outcome "Moon Rabbit's Chosen: Mochi of Perfect Blessings."
- For comprehensive trigger logic, all 21 core variants, and full copy variations, refer to [MOONCAKE_RESULT_ALGORITHM.md](MOONCAKE_RESULT_ALGORITHM.md).

## Result Card Copy Structure

```text
[Result Title]
Core Formula: Core · [Ingredient]  Accent · [Ingredient]  Accent · [Ingredient]

Mochi Meaning
[Core Blessing]; [Accent Blessing 1], and also [Accent Blessing 2].

Accent Effects
Accent Ingredient A: [Supplementary Blessing]
Accent Ingredient B: [Supplementary Blessing]
```

## Release & Distribution

- Deployment Path: `release/q/mid-autumn-moon-quiz/index.html`
- **Release Strategy: This quiz does not require encryption or access passcodes.** Users visiting the URL must be able to start immediately without a passcode prompt.
- The existing `tools/build-and-encrypt.js` script currently encrypts all registered quizzes; prior to launch, update the build workflow to output an unencrypted standalone HTML bundle or configure an alternative public release pipeline.
- The save action will not generate a downloadable image file; instead, display the message: *"Due to technical limitations, please take a screenshot to save your result~"*