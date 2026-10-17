const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {createCanvas,loadImage,GlobalFonts}=require('./.qa/node_modules/@napi-rs/canvas');
GlobalFonts.registerFromPath('C:/Windows/Fonts/arial.ttf','Be Vietnam Pro');
(async()=>{
  const mobile=process.argv.includes('--mobile'),W=mobile?390:1000,H=mobile?520:650,cache={};
  for(const file of ['vy-chibi.png','saigon-cartoon.png','avatar.jpg','vy-rowing-family.png','saigon-weather.png','late-office.png','street-traffic.png','vy-combat-red-cheeks.png','saigon-facades.png','chase-team.png','saigon-neighborhood.png','vy-caught.png','vy-homecoming.png']){const webp=file.replace('.png','.webp'),actual=fs.existsSync(path.join(__dirname,'dist/assets',webp))?webp:file;cache['assets/'+file]=await loadImage(path.join(__dirname,'dist/assets',actual));cache['assets/'+webp]=cache['assets/'+file]}
  const canvas=createCanvas(W,H),raw=canvas.getContext('2d'),ctx=new Proxy(raw,{get:(o,k)=>k==='drawImage'?(im,...args)=>o.drawImage(im._image||im,...args):typeof o[k]==='function'?o[k].bind(o):o[k],set:(o,k,v)=>{o[k]=v;return true}});
  class Img{set src(p){this._image=cache[p];if(this._image){this.width=this._image.width;this.height=this._image.height;this.onload?.()}}}class Aud{play(){return Promise.resolve()}pause(){}}
  function element(){return{hidden:true,style:{},clientWidth:W,clientHeight:H,parentElement:{append(){}},append(){},querySelector:()=>({}),prepend(){},getContext:()=>ctx,getBoundingClientRect:()=>({width:W,height:H}),addEventListener(){},setAttribute(){},scrollIntoView(){},replaceChildren(){},animate:()=>({}),remove(){}}}
  const els=new Map(),el=id=>{if(!els.has(id))els.set(id,element());return els.get(id)};
  const sb={Image:Img,Audio:Aud,fetch:()=>Promise.resolve({arrayBuffer:()=>Promise.resolve(new ArrayBuffer(0))}),document:{getElementById:el,body:{append(){}},createElement:element},window:{scrollTo(){}},location:{search:''},URLSearchParams,devicePixelRatio:1,addEventListener(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},console,Math};
  vm.createContext(sb);for(const f of ['runner','boss','personalize','cinema','living-world','combat-fix','world-mobile','district-score','homecoming'])vm.runInContext(fs.readFileSync(`${__dirname}/dist/${f}.js`,'utf8'),sb);
  const run=s=>vm.runInContext(s,sb);run('sound=false;start()');fs.mkdirSync(__dirname+'/.qa/renders',{recursive:true});
  for(const [name,code] of [['home-tired','beginHomecoming();homeTime=1.5;draw()'],['home-phone','homeTime=5;draw()'],['home-open','homeTime=8;draw()'],['home-cake','homeTime=12;draw()'],['home-dress','homeTime=23.5;draw()'],['home-street','homeTime=-1;worldDistance=25;draw()'],['home-caught','lateEnding=0;captureTime=2;draw()']]){run(code);fs.writeFileSync(__dirname+'/.qa/renders/'+name+(mobile?'-mobile':'-desktop')+'.png',canvas.toBuffer('image/png'))}
  console.log('Rendered homecoming, street and capture at '+W+'×'+H);
})();
