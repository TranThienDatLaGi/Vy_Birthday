const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map(),ctx=new Proxy({createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{}});
function el(id){if(!elements.has(id))elements.set(id,{hidden:true,disabled:false,style:{},textContent:'',clientWidth:390,clientHeight:550,parentElement:{append(){}},prepend(){},querySelector:()=>({}),getContext:()=>ctx,getBoundingClientRect:()=>({width:390,height:550}),addEventListener(){},scrollIntoView(){},replaceChildren(){}});return elements.get(id)}
class AudioMock{play(){return Promise.resolve()}pause(){}}class ImageMock{constructor(){this.width=1774;this.height=887}}
const sandbox={Image:ImageMock,Audio:AudioMock,fetch:()=>Promise.resolve({arrayBuffer:()=>Promise.resolve(new ArrayBuffer(0))}),document:{getElementById:el,body:{append(){}},createElement:()=>({style:{},setAttribute(){},animate:()=>({}),remove(){}})},window:{scrollTo(){}},location:{search:''},URLSearchParams,devicePixelRatio:1,addEventListener(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,Math};vm.createContext(sandbox);for(const f of ['runner','boss','personalize','cinema','living-world'])vm.runInContext(fs.readFileSync(`${__dirname}/dist/${f}.js`,'utf8'),sandbox);const run=s=>vm.runInContext(s,sandbox);
run('sound=false;sheetReady=streetReady=lifeReady=weatherReady=officeReady=true;start()');let t=0;const tick=()=>{t+=40;run(`frame(${t})`)};
assert.equal(run('rain'),0);assert.equal(run('flood'),0);
let sawRain=false,sawBoat=false;while(run('mode')<2&&t<100000){run('if(objects.length){const near=[...objects].sort((a,b)=>a.z-b.z)[0];if(near.z<.5&&lane===near.lane)move(lane===2?-1:1)}');tick();sawRain ||=run('rain')>.8;sawBoat ||=run('mode')===1}assert.ok(sawRain&&sawBoat);assert.equal(run('lateEnding'),-1);assert.ok(run('roadHits')<5);tick();assert.equal(run('duelStarted'),true);
for(let i=0;i<2000&&run('epilogue')<0;i++){tick();if(run('duelPhase')==='windup')run('move(1)');if(run('duelPhase')==='open')run('act()')}assert.equal(run('duelHP'),0);for(let i=0;i<1000&&run('playing');i++)tick();assert.equal(el('finish').hidden,false);
run("$('replay').onclick()");assert.equal(run('roadHits'),0);assert.equal(run('lateEnding'),-1);
run('invincible=0;registerRoadHit();registerRoadHit()');assert.equal(run('roadHits'),1);assert.equal(run('lateEnding'),-1);
for(let i=0;i<4;i++)run('invincible=0;registerRoadHit()');assert.equal(run('roadHits'),5);assert.equal(run('lateEnding'),0);assert.equal(run('endingKind'),'late');assert.equal(el('controls').hidden,true);
const d=run('distance');run('move(1);act()');for(let i=0;i<10;i++)tick();assert.equal(run('distance'),d);
run("$('pause').onclick()");const p=run('lateEnding');for(let i=0;i<10;i++)tick();assert.equal(run('lateEnding'),p);run("$('pause').onclick()");
let sawSong=false;for(let i=0;i<1000&&run('playing');i++){tick();sawSong ||=run('lateMusic')}assert.ok(sawSong);assert.equal(el('finish').hidden,false);assert.equal(run('roadHits'),5);
run("$('replay').onclick()");assert.equal(run('roadHits'),0);assert.equal(run('endingKind'),'escape');assert.equal(run('lateEnding'),-1);
for(const f of ['vy-rowing-family.png','saigon-weather.png','late-office.png','street-traffic.png'])assert.ok(fs.statSync(`${__dirname}/dist/assets/${f}`).size>1000);
console.log('PASS: sunny→storm→flood, moving world, safe route, duel and normal ending, exactly 5 hits, collision grace, overtime branch, pause, family/song/cake ending, replay reset');
