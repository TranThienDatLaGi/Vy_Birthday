const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map();const context=new Proxy({}, {get:(target,key)=>key in target?target[key]:()=>{}});
function element(id){if(!elements.has(id))elements.set(id,{hidden:true,style:{},textContent:'',clientWidth:390,clientHeight:360,getContext:()=>context,getBoundingClientRect:()=>({width:390,height:360}),addEventListener(){},scrollIntoView(){},replaceChildren(){}});return elements.get(id)}
context.createLinearGradient=()=>({addColorStop(){}});
const sandbox={document:{getElementById:element,body:{append(){}},createElement:()=>({style:{},animate:()=>({}),remove(){}})},window:{scrollTo(){}},location:{search:''},URLSearchParams,devicePixelRatio:1,addEventListener(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,Math};
vm.createContext(sandbox);vm.runInContext(fs.readFileSync(__dirname+'/dist/game.js','utf8'),sandbox);
const run=s=>vm.runInContext(s,sandbox);
run('start()');assert.equal(run('playing'),true);
run('act()');assert.ok(run('vy')>0);
run("$('pause').onclick()");assert.equal(run('paused'),true);run("$('pause').onclick()");
let t=0;for(let i=0;i<2500&&run('playing');i++){t+=40;run(`frame(${t})`);if(run('paused'))run("$('continue').onclick()");}
assert.equal(run('distance'),1710);assert.equal(element('finish').hidden,false);
run("$('openGift').onclick()");assert.equal(element('gift').hidden,false);
run("$('plan').onclick()");assert.equal(element('checklist').hidden,false);
run("$('replay').onclick()");assert.equal(element('openGift').hidden,false);assert.equal(run('distance'),0);
console.log('PASS: mobile-sized canvas, jump, pause, both transitions, finish, gift, checklist, replay');
