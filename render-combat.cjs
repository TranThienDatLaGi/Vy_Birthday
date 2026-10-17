// Reuse the exact Canvas renderer, with combat assets and states added.
let renderCode=require('fs').readFileSync(__dirname+'/render-scenes.cjs','utf8');
renderCode=renderCode.replace("'street-traffic.png']","'street-traffic.png','vy-combat-red-cheeks.png']");
renderCode=renderCode.replace("'cinema','living-world']","'cinema','living-world','combat-fix']");
renderCode=renderCode.replace('parentElement:{append(){}},querySelector','parentElement:{append(){}},append(){},querySelector');
renderCode=renderCode.replace("['day','mode=0;rain=flood=0;lateEnding=-1;draw()']","['combat-normal','mode=2;lateEnding=-1;resetCombat();combatInit=true;duelPhase=\"windup\";duelClock=2;draw()'],['combat-hit','cheekLevel=2;playerHP=50;duelHP=65;punchAge=.18;bossHurt=.3;duelPhase=\"open\";damageTexts=[{side:\"boss\",text:\"−25\",age:.15,color:\"#ffe29f\"}];draw()'],['combat-swollen','cheekLevel=3;playerHP=25;punchAge=99;bossHurt=0;duelPhase=\"windup\";draw()'],['combat-rescue','combatResult=\"lost\";rescueTime=12;draw()'],['day','mode=0;rain=flood=0;lateEnding=-1;draw()']");
eval(renderCode);
