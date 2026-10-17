// Keep PNG originals for art references; browsers load the lighter WebP siblings.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const ffmpeg=process.env.BIRTHDAY_FFMPEG||'C:/Users/trant/AppData/Local/Programs/Python/Python312/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const files=['vy-chibi','saigon-cartoon','vy-rowing-family','saigon-weather','late-office','street-traffic','vy-combat-red-cheeks','saigon-facades','chase-team','saigon-neighborhood','vy-caught','vy-homecoming','dog_swollen'];let before=0,after=0;
for(const file of files){const input=path.join(__dirname,'dist/assets',file+'.png'),out=input.replace('.png','.webp');const r=spawnSync(ffmpeg,['-v','error','-y','-i',input,'-c:v','libwebp','-quality','85','-compression_level','6','-frames:v','1',out],{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr);before+=fs.statSync(input).size;after+=fs.statSync(out).size}
for(const file of fs.readdirSync(__dirname+'/dist').filter(f=>f.endsWith('.js')||f.endsWith('.css'))){const p=__dirname+'/dist/'+file;let s=fs.readFileSync(p,'utf8');for(const name of files)s=s.replaceAll(name+'.png',name+'.webp');fs.writeFileSync(p,s)}
console.log(JSON.stringify({originalBytes:before,webpBytes:after,savedPercent:Math.round(100*(1-after/before))}));
