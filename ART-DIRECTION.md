Current edition: CHIBI CARTOON. Generated with built-in ImageGen.

World/mobile repair: dist/assets/saigon-facades.png (four front-on Saigon house textures) and dist/assets/chase-team.png (3x2 running poses for fictional boss, anthropomorphic calendar and blueprint). Built-in ImageGen prompts requested transparent chibi assets, consistent cell layout, no real people or logos. Facades are mapped onto moving roadside planes, at x=±1.5 relative to curb x=±1.0. Lamp roots are on the sidewalks at x=±1.22. Vehicle height shares the player scale and depth; a delivery van is 1.7 times the character height at equal depth.

Collision sound: user-selected https://www.youtube.com/watch?v=_oiaXzJgCb8 → dist/assets/chay-di.mp3. Each counted collision advances the chase team and starts this clip, with no audio overlap. Mute, pause and finish stop it. AudioContext decoding is prepared after user interaction for mobile playback.

Mobile: compact playing layout, at least 54px controls, safe-area bottom padding, dynamic canvas fit to visual viewport and device pixel ratio capped at 2. Verification at widths 360,390,430,1000 via node verify-world.cjs; Canvas frames via node render-world.cjs --mobile/--small. No browser was available for physical Safari/Android audio/gesture validation.

Cheek redness revision: dist/assets/vy-combat-red-cheeks.png, built-in ImageGen edit of the previous combat atlas. Keep all poses and layout; normal column unchanged; injured columns gain progressively larger saturated pink-red/coral cheek patches with swelling, clearly readable at game size. No blood/bruising. Added a brief local cheek-red pulse on each landed enemy hit. Prompt preserves clothing, hair, transparent background and guard/punch poses.

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
Neighborhood revision: dist/assets/saigon-neighborhood.png. Built-in ImageGen prompt: transparent 3-column by 2-row orthographic cartoon Saigon building atlas; four-floor apartment, tiled single-floor home, two-floor cafe with seated customers, open noodle eatery with cook and diners, modern five-floor apartment, ochre townhouse. Consistent chibi illustration, no labels or logos. Textures now cover projected solid lots with end walls, street-facing walls and roofs; parks interrupt the streetscape. The existing road projection is preserved.

Capture scene: dist/assets/vy-caught.png. Built-in ImageGen prompt: transparent chibi group, sad teary Vy seated beside papers, fictional suited boss, anthropomorphic red calendar and teal rolled blueprint surrounding her with documents; no restraints or violence. Appears for 4.8 seconds before the overtime branch.

Final music: dist/assets/score-emotion.mp3 and score-courage.mp3 are locally authored piano/pad instrumental cues generated by make-score.py; score-birthday.mp3 plays the traditional Happy Birthday melody. Emotion accompanies the fall, encouragement accompanies getting up, and birthday music starts on arrival. Audio follows mute/pause/replay. Logic verified by verify-district.cjs; Canvas scenes rendered at desktop and phone sizes, without a physical phone/browser audio test.

Homecoming update: all routes now lead to a front-door birthday surprise. No overtime punishment. A brief capture/rest scene leads to a phone notification, opening door, family carrying cake, birthday music, dress and real photographs, then the user's exact letter. Caption wrapping uses a 14px minimum on mobile; pause, background-tab pause, replay and skip share the same game clock.

New built-in ImageGen asset: dist/assets/vy-homecoming.png (runtime WebP sibling vy-homecoming.webp). Prompt: "Use case: illustration-story. Asset type: transparent 2-column by 1-row game sprite atlas, two equally sized cells, full-body upright standing poses, feet on same baseline with generous safe margins. Use the supplied chibi atlas ONLY as the character/style reference, not an edit target. Keep the exact same cute cartoon young adult heroine, large expressive brown eyes, long wavy dark hair, cream sports T-shirt, dark charcoal leggings, ivory sneakers. LEFT cell: standing fully upright on BOTH FEET, slightly tired shoulders, holding a smartphone at chest height with both hands, looking down to read it, gentle pensive expression, phone does NOT obscure her face. RIGHT cell: standing fully upright on BOTH FEET, relieved delighted soft smile, one hand over heart and the other holding phone lowered by her side, looking slightly right toward birthday family. Detailed polished chibi illustration matching reference, NOT realistic adult body proportions. No kneeling, no crouching, no fighting poses, no dress, no other people, no ground or environment, no drop shadows, no lettering, no borders, genuinely transparent background. Uniform character scale and identical clothing in both cells."

WebP runtime assets reduce mobile download weight; PNG originals remain as source art. A shadow overlay on near end walls and a roof cornice reinforce volume without changing the road. Canvas screenshots are in ignored .qa/renders; verify-home.cjs exercises final routes with pause and retry.

