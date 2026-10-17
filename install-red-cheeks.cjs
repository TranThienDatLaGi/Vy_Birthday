const fs=require('fs'),p='dist/combat-fix.js';let s=fs.readFileSync(p,'utf8').replace('assets/vy-combat-cheeks.png','assets/vy-combat-red-cheeks.png');fs.writeFileSync(p,s);
for(const p of ['render-combat.cjs','verify-combat.cjs']){s=fs.readFileSync(p,'utf8').replaceAll('vy-combat-cheeks.png','vy-combat-red-cheeks.png');fs.writeFileSync(p,s)}
