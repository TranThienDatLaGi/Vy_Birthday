const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map(),ctx=new Proxy({createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{}});
function el(id){if(!elements.has(id))elements.set(id,{hidden:true,disabled:false,style:{},textContent:'',clientWidth:390,clientHeight:550,parentElement:{append(){}},prepend(){},getContext:()=>ctx,getBoundingClientRect:()=>({width:390,height:550}),addEventListener(){},scrollIntoView(){},replaceChildren(){}});return elements.get(id)}
class AudioMock{play(){return Promise.resolve()}pause(){}}
class ImageMock{constructor(){this.width=1774;this.height=887}}
const sandbox={Image:ImageMock,Audio:AudioMock,fetch:()=>Promise.resolve({arrayBuffer:()=>Promise.resolve(new ArrayBuffer(0))}),document:{getElementById:el,body:{append(){}},createElement:()=>({style:{},setAttribute(){},animate:()=>({}),remove(){}})},window:{scrollTo(){}},location:{search:''},URLSearchParams,devicePixelRatio:1,addEventListener(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,Math};vm.createContext(sandbox);
for(const file of ['runner','boss','personalize','cinema'])vm.runInContext(fs.readFileSync(`${__dirname}/dist/${file}.js`,'utf8'),sandbox);
const run=s=>vm.runInContext(s,sandbox);run('sound=false;sheetReady=streetReady=true;start()');
let t=0;const tick=()=>{t+=40;run(`frame(${t})`)};
let boat=false,rain=false;while(run('mode')!==2&&t<100000){tick();boat ||=run('mode')===1;rain ||=run('rain')>0}tick();assert.ok(boat&&rain);assert.ok(run('duelStarted'));
const stopped=run('distance');for(let i=0;i<100;i++)tick();assert.equal(run('distance'),stopped);assert.equal(run('duelHP'),100);
run('duelPhase="windup";duelCooldown=0;act()');assert.equal(run('duelHP'),100);
run('duelPhase="windup";duelTimer=.01;move(1)');tick();assert.ok(run('guardCount')>0);
for(let i=0;i<2000&&run('epilogue')<0;i++){tick();if(run('duelPhase')==='windup')run('move(-1)');if(run('duelPhase')==='open')run('act()')}
assert.equal(run('duelHP'),0);assert.ok(run('epilogue')>=0);assert.equal(el('controls').hidden,true);
const hp=run('duelHP');run('act();move(1)');assert.equal(run('duelHP'),hp);
run("$('pause').onclick()");const before=run('epilogue');for(let i=0;i<10;i++)tick();assert.equal(run('epilogue'),before);run("$('pause').onclick()");
let sawFall=false,sawLight=false;for(let i=0;i<1000&&run('playing');i++){tick();sawFall ||=run('epilogue')>4;sawLight ||=run('epilogue')>8}assert.ok(sawFall&&sawLight);assert.equal(run('distance'),1710);assert.equal(el('finish').hidden,false);
run("$('replay').onclick()");assert.equal(run('epilogue'),-1);assert.equal(run('duelHP'),100);assert.equal(el('controls').hidden,false);
const html=fs.readFileSync(__dirname+'/dist/index.html','utf8');assert.ok(html.includes('src="cinema.js"'));for(const file of ['vy-chibi.png','saigon-cartoon.png'])assert.ok(fs.statSync(`${__dirname}/dist/assets/${file}`).size>1000);
console.log('PASS: rain/boat, separate duel, shield, dodge/block, counters, victory, noninteractive fall/light epilogue, pause, replay, sprite/street assets');
