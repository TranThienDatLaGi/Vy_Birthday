let renderCode=require('fs').readFileSync(__dirname+'/render-scenes.cjs','utf8');
renderCode=renderCode.replace("'street-traffic.png']","'street-traffic.png','vy-combat-red-cheeks.png','saigon-facades.png','chase-team.png','saigon-neighborhood.png','vy-caught.png']");
renderCode=renderCode.replace("'cinema','living-world']","'cinema','living-world','combat-fix','world-mobile','district-score']");
renderCode=renderCode.replace('parentElement:{append(){}},querySelector','parentElement:{append(){}},append(){},querySelector');
renderCode=renderCode.replace("['day','mode=0;rain=flood=0;lateEnding=-1;draw()']","['district-day','mode=0;rain=flood=0;lateEnding=-1;worldDistance=20;draw()'],['district-park','worldDistance=65;draw()'],['district-caught','lateEnding=0;captureTime=2;draw()'],['day','captureTime=-1;mode=0;rain=flood=0;lateEnding=-1;draw()']");
if(process.argv.includes('--mobile'))renderCode=renderCode.replaceAll('1000','390').replaceAll('650','520');
eval(renderCode);
