// Visual details referenced from avatar.jpg and photo1–4.jpg.
const portraitImage=new Image();portraitImage.alt='Chân dung Thanh Vy';portraitImage.onload=()=>$('portrait').replaceChildren(portraitImage);portraitImage.src='assets/avatar.jpg';
const film=document.createElement('section');film.className='memory-film';film.setAttribute('aria-label','Bốn khung hình của Thanh Vy');
film.innerHTML='<div class="eyebrow">FOUR FRAMES / ONE LEADING LADY</div><h2>Những khung hình dành riêng cho Vy.</h2><div class="film-frames">'+[
['photo1.jpg','01 / THE EVERYDAY SCENE','Một ngày bình thường, một khung hình đáng giữ.'],
['photo2.jpg','02 / THE CITY WALK','Ra phố. Đổi gió. Không mang theo deadline.'],
['photo3.jpg','03 / THE INTERMISSION','Đến giờ nghỉ giữa phim rồi.'],
['photo4.jpg','04 / THE GOLDEN NIGHT','Và tối nay, ánh đèn dành cho nhân vật chính.']
].map(([src,title,caption])=>`<figure><img src="assets/${src}" alt="Thanh Vy — ${caption}" loading="lazy"><figcaption><small>${title}</small><p>${caption}</p></figcaption></figure>`).join('')+'</div>';
$('gift').prepend(film);
const cameo=document.createElement('div');cameo.className='swollen-cameo';cameo.hidden=true;cameo.innerHTML='<img src="assets/dog_swollen.png" alt="Ảnh meme phản ứng sưng má"><span>Mình ổn.<br>Má mình có ý kiến riêng.</span>';$('canvas').parentElement.append(cameo);
let cameoUntil=0,lastBossHits=0;const personalFrame=frame;
frame=function(t){personalFrame(t);if(bossHits>lastBossHits){cameo.hidden=false;cameoUntil=elapsed+2.2}lastBossHits=bossHits;if(elapsed>cameoUntil||mode!==2||!playing)cameo.hidden=true};
const originalCharacter=runner;
runner=function(x,y,s=1,chaser=false){if(chaser){originalCharacter(x,y,s,true);return}ctx.save();ctx.translate(x,y);ctx.scale(s*1.16,s*1.16);const runCycle=mode===2&&!bossWon?0:Math.sin(elapsed*13),sway=runCycle*3;
ctx.lineCap='round';ctx.lineJoin='round';
// Dark fitted running leggings and cream trainers.
for(const side of [-1,1]){const foot=side*10+runCycle*side*11;ctx.strokeStyle='#25303b';ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(side*7,-26);ctx.quadraticCurveTo(side*11,-7,foot,10);ctx.stroke();ctx.strokeStyle='#e9e1d2';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(foot,10);ctx.lineTo(foot+side*8,12);ctx.stroke();ctx.strokeStyle='#b4a18a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(foot-3,12);ctx.lineTo(foot+side*9,14);ctx.stroke()}
// Relaxed athletic ivory top, influenced by the white/cream outfits in the photos.
const shirt=ctx.createLinearGradient(-18,-45,18,-45);shirt.addColorStop(0,'#c6bcae');shirt.addColorStop(.45,'#faf3e7');shirt.addColorStop(1,'#d3c9b9');ctx.fillStyle=shirt;ctx.beginPath();ctx.moveTo(-11,-66);ctx.quadraticCurveTo(0,-71,11,-66);ctx.lineTo(22,-54);ctx.lineTo(16,-43);ctx.lineTo(13,-26);ctx.quadraticCurveTo(0,-23,-13,-26);ctx.lineTo(-16,-43);ctx.lineTo(-22,-54);ctx.closePath();ctx.fill();
for(const side of [-1,1]){ctx.strokeStyle='#e1b79d';ctx.lineWidth=6.5;ctx.beginPath();ctx.moveTo(side*19,-49);ctx.quadraticCurveTo(side*22,-37+runCycle*side*8,side*15,-27+runCycle*side*9);ctx.stroke()}
ctx.fillStyle='#d9ad93';ctx.fillRect(-5,-75,10,10);ctx.beginPath();ctx.ellipse(0,-82,12,15,0,0,7);ctx.fill();
// Long dark, softly wavy hair; a low loose tie keeps the running silhouette readable.
const hair=ctx.createLinearGradient(-16,-80,19,-50);hair.addColorStop(0,'#181c24');hair.addColorStop(.45,'#393039');hair.addColorStop(1,'#151923');ctx.fillStyle=hair;ctx.beginPath();ctx.moveTo(-13,-78);ctx.bezierCurveTo(-19,-109,18,-110,15,-79);ctx.bezierCurveTo(19,-65,10+sway,-57,17+sway,-43);ctx.bezierCurveTo(9+sway,-35,-1,-48,-6,-45);ctx.bezierCurveTo(-20,-42,-10-sway,-65,-13,-78);ctx.fill();ctx.strokeStyle='#67545b66';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(-5,-97);ctx.bezierCurveTo(-12,-78,2,-65,-5,-49);ctx.moveTo(5,-96);ctx.bezierCurveTo(15,-76,3,-62,11+sway,-47);ctx.stroke();ctx.strokeStyle='#c8ab80';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,-62);ctx.lineTo(8,-62);ctx.stroke();
ctx.fillStyle='#8e816e';ctx.fillRect(-6,-31,12,2);ctx.restore()};
