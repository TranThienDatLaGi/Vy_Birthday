const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/dist/index.html','utf8');for(const id of ['left','right','threat','pauseOverlay'])assert.ok(html.includes(`id="${id}"`));assert.ok(html.includes('src="runner.js"'));
const elements=new Map();const context=new Proxy({}, {get:(target,key)=>key in target?target[key]:()=>{}});
function element(id){if(!elements.has(id))elements.set(id,{hidden:true,style:{},textContent:'',clientWidth:390,clientHeight:360,getContext:()=>context,getBoundingClientRect:()=>({width:390,height:360}),addEventListener(){},scrollIntoView(){},replaceChildren(){}});return elements.get(id)}
context.createLinearGradient=()=>({addColorStop(){}});
class MockAudio{constructor(){this.ended=false;this.plays=0}play(){this.plays++;return Promise.resolve()}pause(){}}
const sandbox={fetch:()=>Promise.resolve({arrayBuffer:()=>Promise.resolve(new ArrayBuffer(0))}),Audio:MockAudio,document:{getElementById:element,body:{append(){}},createElement:()=>({style:{},animate:()=>({}),remove(){}})},window:{scrollTo(){}},location:{search:''},URLSearchParams,devicePixelRatio:1,addEventListener(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,Math};
vm.createContext(sandbox);vm.runInContext(fs.readFileSync(__dirname+'/dist/runner.js','utf8'),sandbox);
vm.runInContext(fs.readFileSync(__dirname+'/dist/boss.js','utf8'),sandbox);
const run=s=>vm.runInContext(s,sandbox);
run('sound=false;start()');assert.equal(run('playing'),true);
run('move(-1);move(-1);move(-1)');assert.equal(run('lane'),0);
run('move(1);move(1);move(1)');assert.equal(run('lane'),2);run('move(-1)');
run('act()');assert.ok(run('vy')>0);
run('jump=0;vy=0;objects=[{z:.106,lane:0,type:0,hit:false}];last=1;frame(41)');assert.equal(run('invincible'),0);
run('objects=[{z:.106,lane:1,type:0,hit:false}];frame(81)');assert.ok(run('invincible')>0);
run('invincible=0;act();jump=75;objects=[{z:.106,lane:1,type:0,hit:false}];frame(121)');assert.equal(run('invincible'),0);
run("$('pause').onclick()");assert.equal(run('paused'),true);run("$('pause').onclick()");
let t=0,sawRain=false,sawBoat=false,sawBoss=false;for(let i=0;i<4000&&run('playing');i++){t+=40;run(`frame(${t})`);assert.equal(run('paused'),false);if(run('rain')>0)sawRain=true;if(run('mode')===1)sawBoat=true;if(run('bossActive')){sawBoss=true;if(run('bossPhase')==='exposed')run('act()');}}
assert.equal(sawBoss,true);assert.equal(run('bossHP'),0);assert.equal(run('bossWon'),true);
assert.equal(sawRain,true);assert.equal(sawBoat,true);assert.equal(run('rainCue'),true);
assert.equal(run('distance'),1710);assert.equal(element('finish').hidden,false);
run("$('openGift').onclick()");assert.equal(element('gift').hidden,false);
run("$('plan').onclick()");assert.equal(element('checklist').hidden,false);
run("$('replay').onclick()");assert.equal(element('openGift').hidden,false);assert.equal(run('distance'),0);
run('distance=389;rainCue=false;elapsed=10;triggerRain()');assert.equal(run('rainStart'),11.5);
console.log('PASS: 3-lane bounds, jump, pause, seamless rain and boat, finish, gift, checklist, replay');
run('mode=2;bossWon=false;bossActive=true;bossHP=100;bossPhase="warning";attackCooldown=0;act()');assert.equal(run('bossHP'),100);
run('bossPhase="exposed";attackCooldown=0;act();act()');assert.equal(run('bossHP'),80);
run("$('replay').onclick()");assert.equal(run('bossHP'),100);assert.equal(run('bossActive'),false);
console.log('PASS: boss shield, counterattack window, cooldown, defeat gate, replay reset');
