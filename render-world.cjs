let renderCode=require('fs').readFileSync(__dirname+'/render-scenes.cjs','utf8');
renderCode=renderCode.replace("'street-traffic.png']","'street-traffic.png','vy-combat-red-cheeks.png','saigon-facades.png','chase-team.png']");
renderCode=renderCode.replace("'cinema','living-world']","'cinema','living-world','combat-fix','world-mobile']");
renderCode=renderCode.replace('parentElement:{append(){}},querySelector','parentElement:{append(){}},append(){},querySelector');
renderCode=renderCode.replace("['day','mode=0;rain=flood=0;lateEnding=-1;draw()']","['world-day','mode=0;rain=flood=0;lateEnding=-1;worldDistance=35;draw()'],['world-forward','worldDistance=55;draw()'],['world-chase','roadHits=3;chaseLastHit=elapsed;draw()'],['world-near-van','objects=[{z:.12,lane:0,type:1}];roadHits=0;chaseLastHit=-100;draw()'],['day','mode=0;rain=flood=0;lateEnding=-1;draw()']");
if(process.argv.includes('--mobile'))renderCode=renderCode.replaceAll('1000','390').replaceAll('650','520');
if(process.argv.includes('--small'))renderCode=renderCode.replaceAll('1000','360').replaceAll('650','420');
eval(renderCode);
