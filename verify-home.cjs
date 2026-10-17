const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const els=new Map(),listeners={},bodyClasses=new Set(),ctx=new Proxy({measureText:s=>({width:s.length*7}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{}});
function element(){return{hidden:true,disabled:false,style:{setProperty(){}},classList:{add:k=>bodyClasses.add(k),remove:k=>bodyClasses.delete(k),contains:k=>bodyClasses.has(k)},clientWidth:390,clientHeight:520,textContent:'',append(){},prepend(){},parentElement:{append(){}},querySelector(s){return this.children??=element()},getContext:()=>ctx,getBoundingClientRect:()=>({width:390,height:520,top:170,height:70}),setAttribute(){},addEventListener(){},scrollIntoView(){},replaceChildren(){},animate:()=>({}),remove(){}}}
function el(id){if(!els.has(id))els.set(id,element());return els.get(id)}
class Aud{play(){return Promise.resolve()}pause(){}}class Img{constructor(){this.width=1774;this.height=887}}
const doc={getElementById:el,body:element(),createElement:element,addEventListener:(n,f)=>listeners[n]=f,hidden:false};
const sb={Image:Img,Audio:Aud,fetch:()=>Promise.resolve({arrayBuffer:()=>Promise.resolve(new ArrayBuffer(0))}),document:doc,window:{scrollTo(){}},location:{search:''},URLSearchParams,devicePixelRatio:1,addEventListener(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,Math};vm.createContext(sb);
for(const f of ['runner','boss','personalize','cinema','living-world','combat-fix','world-mobile','district-score','homecoming'])vm.runInContext(fs.readFileSync(`${__dirname}/dist/${f}.js`,'utf8'),sb);
const run=s=>vm.runInContext(s,sb);run('sound=false;start()');let t=0;const tick=(n=1)=>{for(let i=0;i<n;i++){t+=40;run(`frame(${t})`)}};
// Fifth collision still shows the captured group, but never starts overtime.
for(let i=0;i<5;i++)run('invincible=0;registerRoadHit()');assert.equal(run('captureTime'),0);tick(126);assert.equal(run('homeRoute'),'caught');assert.ok(run('homeTime')>=0);assert.equal(run('lateEnding'),-1);
run('homeTime=4;draw()');assert.match(run('storyStatus.textContent'),/không cần bảo vệ kế hoạch/);assert.equal(run('scoreIntent()'),'emotion');
run("$('pause').onclick()");const old=run('homeTime');tick(25);assert.equal(run('homeTime'),old);run("$('pause').onclick()");tick(2);assert.ok(run('homeTime')>old);
run('homeTime=10;draw()');assert.match(run('storyStatus.textContent'),/chỉ cần nhận lời chúc/);assert.equal(run('scoreIntent()'),'birthday');tick(410);assert.equal(run('playing'),false);assert.equal(el('finish').hidden,false);assert.equal(run('homeSeen'),true);
// Replay clears all ending state. Winning route still has its light-guided epilogue.
run('start();mode=2;combatResult="win";epilogue=18;draw()');assert.equal(run('homeTime'),-1);run('epilogue=19');tick();assert.equal(run('homeRoute'),'escape');assert.ok(run('homeTime')<=.04);
// Losing the boss reaches the same door after a brief rest, with boss retry available later.
run('start();mode=2;combatResult="lost";rescueTime=3');tick();assert.equal(run('homeRoute'),'boss');run('homeTime=26');tick();assert.equal(run('retryBossButton.hidden'),false);run('retryBoss()');assert.equal(run('homeTime'),-1);assert.equal(run('homeSeen'),false);assert.equal(run('playerHP'),100);
// Skip also works while paused; switching apps pauses the story rather than advancing it.
run('paused=true;storySkip.onclick()');assert.equal(run('paused'),false);assert.equal(run('homeTime'),0);doc.hidden=true;listeners.visibilitychange();assert.equal(run('paused'),true);tick(10);assert.equal(run('homeTime'),0);doc.hidden=false;
run('start();distance=146');tick();assert.equal(run('meetingSeen'),true);run('elapsed=meetingAt+3.2');tick();assert.match(el('bubble').textContent,/bắt buộc/);
assert.ok(run('storyLines("Hôm nay không cần bảo vệ kế hoạch nữa đâu.",160,14).length')>=2);
const html=fs.readFileSync(__dirname+'/dist/index.html','utf8');assert.ok(html.includes('homecoming.css')&&html.includes('homecoming.js'));assert.ok(html.includes('Tớ ở quê nên chưa có mặt trong bức hình hôm nay.'));assert.ok(html.includes('những buổi tối thật sự thuộc về mình.'));
for(const [,file] of html.matchAll(/(?:src|href)="([^" ]+\.(?:js|css))"/g)){assert.ok(fs.existsSync(__dirname+'/dist/'+file),file);if(file.endsWith('.js'))for(const [,asset] of fs.readFileSync(__dirname+'/dist/'+file,'utf8').matchAll(/assets\/([a-zA-Z0-9_.-]+)/g))assert.ok(fs.existsSync(__dirname+'/dist/assets/'+asset),asset)}
console.log('PASS: captured, boss loss, victory and skip reach home; phone→door→cake→photos; pause, visibility, birthday cue, replay, retry, office joke, mobile caption wrapping and exact letter');
