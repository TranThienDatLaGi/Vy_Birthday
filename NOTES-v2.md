## Version 2

- Following-camera perspective with three lanes, swipe/arrows and jump/Space.
- Illustrated character and depth-projected street drawn with Canvas, without a 3D engine dependency.
- Deadline/project/meeting pursuers close the gap after a collision; no game over.
- Rain cue at 390 m, rain gradually begins after 1.5 seconds, flood after 490 m, boat at 620 m, return to running at 1170 m.
- Audio excerpt from the user's chosen YouTube clip, converted to mono MP3. Web Audio decoded playback uses the AudioContext unlocked by the Start click.
- Rain, flood and boat transitions never pause the game. Audio mute and pause supported.
- `node verify.cjs` checks lanes, collisions, jump, pause, transitions, finish and replay.
- Browser visual/device QA unavailable in this environment; actual mobile sound playback still needs device verification.
