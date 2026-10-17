Current edition: CHIBI CARTOON. Generated with built-in ImageGen.

Combat repair: dist/assets/vy-combat-cheeks.png. Built-in ImageGen using vy-chibi.png as the style reference. Prompt: transparent 4x2 chibi atlas, top row four right-facing guard poses with normal/mild/medium/maximum comic cheek puffiness; bottom row corresponding punch poses; same ivory top and dark leggings, no blood or injury detail, consistent scale and margins.

Combat rules: normal attacks deal 10 damage at the contact frame; attacks landing in the opening deal 25. Boss strikes cost Vy 25 HP when neither guarded nor dodged. Four unblocked strikes open a rescue story with family/cake/music; retry skips the road and restarts only the boss. Rendered normal, contact, swollen and rescue states are in ignored .qa/renders. Verify with node verify-combat.cjs.

Living-world update: dist/assets/saigon-weather.png (three equal panels: sunny day, dark rain, flooded street); dist/assets/vy-rowing-family.png (four seated rowing phases; tired seated Vy; cake-carrying mother; singing father; singing friends); dist/assets/late-office.png (empty cartoon Saigon office at night, desk and right-hand doorway); dist/assets/street-traffic.png (parcel van, loaded handcart, road barrier, scooter rider).

Prompts: consistent rounded chibi cel shading, no photography. Weather panels share the same street and camera. Rowing is seated with paddle positions, not a running pose. Family/cake assets have open singing expressions. Traffic props are rear-view sprites with transparent background.

Game rule: fifth road/water collision starts an alternate noninteractive ending: overtime, meeting until 23:45, family arriving with cake, animated singing poses and synthesized Happy Birthday melody. This uses fictional cartoon family members, not portraits or recordings of Vy's actual relatives. The original boss/epilogue path remains available below five collisions.

Verification: node verify-living.cjs covers both branches, collision grace, pause and replay. node render-scenes.cjs renders Canvas snapshots into ignored .qa/renders for image inspection; it is not a browser/device test.

Current assets: dist/assets/vy-chibi.png and dist/assets/saigon-cartoon.png. Previous art is retained but no longer used by gameplay.

Current sprite prompt: exactly 4x2 transparent atlas, cute animated chibi heroine with oversized expressive head, tiny rounded body, long wavy black hair, cream sports top, charcoal leggings and ivory shoes. Eight poses: two back-view runs, side guard, punch, block, kneel, hopeful reach, birthday dress. Consistent proportions; no realistic human rendering, no text.

Current background prompt: vertical 2:3 stylized cartoon Saigon-inspired street, rounded colorful townhouses, scooters, cafe awnings, tropical trees, utility wires, stylized Bitexco skyline, blue-hour sky and warm streetlights. Empty three-lane perspective road for gameplay. No photography or realistic rendering.

Earlier edition reference notes:

Assets: dist/assets/vy-sprites.png; dist/assets/saigon-street.png.

Sprite prompt: 4x2 transparent atlas of a polished semi-realistic adult woman inspired by the reference photos, long black softly wavy hair, ivory athletic top, charcoal leggings, ivory sneakers. Back-view running poses, side-view guard/punch/block, kneeling, reaching toward light, ivory dress. Consistent size and cells, no text.

Street prompt: cinematic realistic illustration of a Saigon neighborhood at blue hour after rain, centered perspective road, wet asphalt, parked scooters, townhouses, cafe awnings, utility wires, tropical trees, warm lights, distant Bitexco-inspired skyline. Clear central road for gameplay. A fictional environment, not a photograph or geographic reconstruction.

Flow: run → rain and boat → separate side-view fight → 24-second noninteractive epilogue (run through thorns, kneel, guiding light, rise, arrive and glow-up) → birthday photographs and letter.
