// All routes end at the same welcoming door. Timers use game time, including pause.
let homeTime=-1,homeRoute='escape',homeSeen=false,meetingSeen=false,meetingAt=-1;
const homeSheet=new Image();let homeReady=false;homeSheet.onload=()=>homeReady=true;homeSheet.src='assets/vy-homecoming.webp';
const homeStart=start,homeRetry=retryBoss,homeFrame=frame,homeDraw=draw,homeFinish=finish,homeScoreIntent=scoreIntent;
const storySkip=document.createElement('button');
storySkip.id='storySkip';storySkip.className='secondary';storySkip.textContent='Xem tiếp câu chuyện →';
storySkip.setAttribute('aria-label','Bỏ qua thử thách và xem đoạn kết sinh nhật');
const gameSound=document.createElement('button');gameSound.id='gameSound';gameSound.setAttribute('aria-label','Bật hoặc tắt âm thanh');
const gameActions=document.createElement('div');gameActions.className='game-actions';
$('pause').parentElement.append(gameActions);gameActions.append($('pause'),gameSound,storySkip);
const storyStatus=document.createElement('span');storyStatus.id='storyStatus';storyStatus.className='sr-only';storyStatus.setAttribute('role','status');storyStatus.setAttribute('aria-live','polite');canvas.parentElement.append(storyStatus);
function updateGameSound(){gameSound.textContent=sound?'♫ Bật':'♫ Tắt';gameSound.setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'Tắt âm thanh':'Bật âm thanh')}
gameSound.onclick=()=>{$('sound').onclick();updateGameSound()};
const homeSoundClick=$('sound').onclick;$('sound').onclick=()=>{homeSoundClick();updateGameSound()};updateGameSound();
start=function(){homeTime=-1;homeSeen=false;homeRoute='escape';meetingSeen=false;meetingAt=-1;storySkip.hidden=false;homeStart();resize()};
retryBoss=function(){homeTime=-1;homeSeen=false;homeRoute='boss';meetingSeen=true;meetingAt=-1;storySkip.hidden=false;homeRetry()};
function beginHomecoming(route='escape',schedule=false){
  if(homeTime>=0||homeSeen)return;
  if(schedule)cancelAnimationFrame(raf);
  homeRoute=route;homeTime=0;captureTime=-1;lateEnding=-1;epilogue=-1;endingKind='home';
  playing=true;paused=false;objects=[];meetingAt=-1;stopClip();stopChase();stopScore(true);
  if(noiseGain)noiseGain.gain.value=0;
  $('bubble').hidden=true;$('pauseOverlay').hidden=true;$('pause').textContent='Tạm dừng Ⅱ';
  $('controls').hidden=true;storySkip.hidden=true;$('chapter').textContent='THE FINAL SCENE / CÓ NGƯỜI ĐANG CHỜ';
  $('chapterTitle').textContent='Về tới nơi rồi, Vy ơi.';
  $('distance').textContent='ĐÃ TỚI NƠI';$('progress').style.width='100%';
  $('threat').textContent='Chỉ cần nhận lời chúc thôi.';
  resize();draw();syncScore();
  if(schedule){last=0;raf=requestAnimationFrame(frame)}
}
storySkip.onclick=()=>{if(playing)beginHomecoming(combatResult==='lost'?'boss':'skip',true)};
finish=function(){
  if(!homeSeen){beginHomecoming(combatResult==='lost'?'boss':roadHits>=5?'caught':'escape',true);return}
  homeFinish();retryBossButton.hidden=homeRoute!=='boss';
  $('finish').querySelector('.eyebrow').textContent='HOME AT LAST / HÔM NAY LÀ NGÀY CỦA VY';
  $('finish').querySelector('.lead').innerHTML='Hôm nay không cần bảo vệ kế hoạch nữa đâu.<br>Hôm nay chỉ cần nhận lời chúc thôi.';
  storySkip.hidden=true;syncScore();
};
scoreIntent=function(){if(homeTime>=0)return homeTime>=8.5?'birthday':homeTime<3?'courage':'emotion';return homeScoreIntent()};
frame=function(t){
  if(!playing)return;
  if(homeTime<0&&!homeSeen&&!paused){
    if(lateEnding>=0&&captureTime<0)beginHomecoming('caught');
    else if(combatResult==='lost'&&rescueTime>=3)beginHomecoming('boss');
    else if(epilogue>=19)beginHomecoming('escape');
  }
  if(homeTime>=0){
    const dt=last?Math.min((t-last)/1000,.04):0;last=t;
    if(!paused){homeTime+=dt;elapsed+=dt}
    $('controls').hidden=true;draw();syncScore();
    if(homeTime>=26){homeSeen=true;homeTime=-1;finish();return}
    raf=requestAnimationFrame(frame);return;
  }
  homeFrame(t);
  // One short office joke, timed away from the first incoming obstacle.
  if(!paused&&lateEnding<0&&captureTime<0&&mode===0&&distance>=145&&!meetingSeen){meetingSeen=true;meetingAt=elapsed}
  if(meetingAt>=0&&elapsed-meetingAt<4.5&&mode===0&&lateEnding<0){
    const age=elapsed-meetingAt;
    toast(age<1.5?'Thông báo: “Mời Vy vào bảo vệ kế hoạch.”':age<3?'Vy: “Từ chối.”':'“Đây là lời mời mang tính bắt buộc.”\nVy: Vậy xin phép chạy!',.15);
  }else if(meetingAt>=0)meetingAt=-1;
};
draw=function(){if(homeTime>=0){drawHomecoming();return}homeDraw()};
function storyLines(message,maxWidth,size){
  ctx.font=`600 ${size}px "Be Vietnam Pro",sans-serif`;
  const lines=[];let line='';
  for(const word of message.split(' ')){const next=line?line+' '+word:word,width=ctx.measureText(next)?.width||next.length*size*.55;if(width>maxWidth&&line){lines.push(line);line=word}else line=next}
  if(line)lines.push(line);return lines;
}
function storyCaption(message,kicker='MỘT BUỔI TỐI DÀNH CHO VY'){
  const w=canvas.clientWidth,h=canvas.clientHeight,size=Math.max(14,Math.min(18,w*.035)),lines=storyLines(message,w*.88,size),lineHeight=size*1.5,bottom=46+lines.length*lineHeight;
  ctx.fillStyle='#0c1a2bed';ctx.fillRect(0,0,w,bottom+12);
  text(kicker,w/2,24,Math.max(9,Math.min(11,w*.025)),'#dfb77c');
  lines.forEach((line,i)=>text(line,w/2,49+i*lineHeight,size,'#f7ecd8'));
  if(storyStatus.textContent!==message)storyStatus.textContent=message;
}
function drawHomeDoor(w,h,open){
  const x=w*.46,y=h*.22,W=w*.49,H=h*.61;
  ctx.fillStyle='#d0b89a';ctx.fillRect(0,0,w,h*.84);
  const wall=ctx.createLinearGradient(0,0,w,h);wall.addColorStop(0,'#4c6b71');wall.addColorStop(1,'#263e4a');ctx.fillStyle=wall;ctx.fillRect(0,0,w,h*.84);
  ctx.strokeStyle='#c3aa7f33';ctx.lineWidth=1;for(let i=0;i<9;i++){const Y=h*.22+i*h*.07;ctx.beginPath();ctx.moveTo(0,Y);ctx.lineTo(w,Y);ctx.stroke()}
  // Window, trim and tiled porch give the door a room, rather than a floating panel.
  ctx.fillStyle='#d7bc8c';ctx.fillRect(w*.055,h*.30,w*.24,h*.30);ctx.fillStyle='#294651';ctx.fillRect(w*.07,h*.32,w*.21,h*.26);
  ctx.strokeStyle='#9db8ac';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(w*.175,h*.32);ctx.lineTo(w*.175,h*.58);ctx.moveTo(w*.07,h*.45);ctx.lineTo(w*.28,h*.45);ctx.stroke();
  ctx.fillStyle='#bfa679';ctx.fillRect(x-8,y-8,W+16,H+16);ctx.fillStyle='#2a2930';ctx.fillRect(x,y,W,H);
  const light=ctx.createLinearGradient(x,y,x+W,y+H);light.addColorStop(0,'#ffe9b5');light.addColorStop(1,'#bd8d63');ctx.fillStyle=light;ctx.fillRect(x+5,y+5,W-10,H-5);
  ctx.fillStyle='#9b7055';ctx.fillRect(x+W*.10,y+H*.2,W*.8,H*.04);ctx.fillStyle='#dfc5a0';ctx.fillRect(x+W*.12,y+H*.26,W*.76,H*.38);
  const ground=ctx.createLinearGradient(0,h*.82,0,h);ground.addColorStop(0,'#7d827c');ground.addColorStop(1,'#3a515a');ctx.fillStyle=ground;ctx.fillRect(0,h*.83,w,h*.17);
  ctx.strokeStyle='#bbc0aa44';for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(w*.5,h*.83);ctx.lineTo(w*(i/7),h);ctx.stroke()}
  ctx.fillStyle='#d8c19b';ctx.fillRect(x-12,y+H,W+24,9);ctx.fillStyle='#967d61';ctx.fillRect(x-20,y+H+9,W+40,7);
  if(open>0){ctx.save();ctx.globalAlpha=open*.55;poly([[x,y+H],[x+W,y+H],[w,h],[w*.18,h]],'#ffe1a0');ctx.restore()}
  // Hinged leaf narrows in perspective as it swings inwards.
  const leaf=W*(1-open*.96),offset=open*W*.13;poly([[x,y],[x+leaf,y+offset],[x+leaf,y+H-offset],[x,y+H]],'#745644');
  ctx.strokeStyle='#bd9469';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+leaf*.12,y+H*.10);ctx.lineTo(x+leaf*.88,y+offset+H*.08);ctx.lineTo(x+leaf*.88,y+H-offset-H*.08);ctx.lineTo(x+leaf*.12,y+H*.90);ctx.closePath();ctx.stroke();
  ctx.fillStyle='#e1c28b';ctx.beginPath();ctx.arc(x+leaf*.83,y+H*.56,Math.max(2,w*.005),0,7);ctx.fill();
  // A porch plant and warm overhead light stay outside the walking path.
  ctx.fillStyle='#9c785f';ctx.fillRect(w*.32,h*.71,w*.08,h*.12);ctx.fillStyle='#72967a';for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(w*.36+Math.sin(i*2)*w*.035,h*.70-i*h*.018,w*.035,h*.055,i*.6,0,7);ctx.fill()}
  ctx.fillStyle='#ffe8b2';ctx.beginPath();ctx.ellipse(x+W*.5,y-h*.04,w*.04,h*.012,0,0,7);ctx.fill();
}
function drawHomecoming(){
  const w=canvas.clientWidth,h=canvas.clientHeight,t=homeTime,open=Math.max(0,Math.min(1,(t-7)/1.5)),ground=h*.89,size=Math.min(220,h*.38,w*.43);
  ctx.clearRect(0,0,w,h);drawHomeDoor(w,h,open);
  if(t>=8.5){
    const p=Math.min(1,(t-8.5)/2),offset=(1-p)*w*.17;
    ctx.save();ctx.globalAlpha=p;
    lifeSprite(6,w*.67+offset,ground-8,Math.min(195,h*.33,w*.32));lifeSprite(7,w*.86+offset,ground-4,Math.min(200,h*.34,w*.33));lifeSprite(5,w*.49+offset,ground+6,Math.min(205,h*.35,w*.34));ctx.restore();
    for(let i=0;i<18;i++){const x=(i*53+w*.2)%w,y=h*.3+((i*37+t*18)%(h*.6));ctx.fillStyle=i%2?'#f3d492':'#b6d9cb';ctx.fillRect(x,y,3,5)}
    if(t>10&&t<23)for(let i=0;i<4;i++)text(i%2?'♪':'♫',w*(.50+i*.12),h*.48-((t*10+i*16)%40),17,'#ffe5a9');
  }
  const breathe=Math.sin(t*2)*2;
  if(t>=23)sprite(7,w*.24,ground+breathe,size);
  else if(homeReady){const cw=homeSheet.width/2,ch=homeSheet.height,width=size*cw/ch;ctx.drawImage(homeSheet,(t>=8.5?1:0)*cw,0,cw,ch,w*.24-width/2,ground-size+breathe,width,size)}
  else sprite(2,w*.24,ground+breathe,size);
  const message=t<3?(homeRoute==='caught'?'Bị bắt kịp một chút. Nhưng hôm nay, Vy được về nhà.':homeRoute==='boss'?'Không cần thắng mọi hiệp đấu. Vy về tới nơi rồi.':'Sau cả hành trình, cuối cùng Vy cũng về tới cửa.'):
    t<7?'Hôm nay không cần bảo vệ kế hoạch nữa đâu.':t<8.5?'Cửa mở… có người đang chờ Vy.':t<22?'Hôm nay chỉ cần nhận lời chúc thôi.':'Chúc mừng sinh nhật, Thanh Vy!';
  storyCaption(message,t>=8.5?'♪ CHÚC MỪNG SINH NHẬT ♪':t>=3&&t<7?'TIN NHẮN VỪA ĐẾN':'VỀ TỚI NƠI RỒI');
  if(t<.7){ctx.fillStyle=`rgba(12,26,43,${1-t/.7})`;ctx.fillRect(0,0,w,h)}
  if(t>24){ctx.fillStyle=`rgba(248,231,199,${Math.min(1,(t-24)/2)})`;ctx.fillRect(0,0,w,h)}
}
// Keep interruptions short; birthday never becomes a punishment for a missed obstacle.
const homeRoadHit=registerRoadHit;
registerRoadHit=function(){const before=roadHits;homeRoadHit();if(roadHits>before)meetingAt=-1;if(roadHits===4&&lateEnding<0)toast('Va chạm 4/5. Chậm một nhịp cũng không sao — vẫn có người chờ Vy.',2.5)};
const homeVisibility=()=>{if(document.hidden&&playing&&!paused)$('pause').onclick()};
document.addEventListener?.('visibilitychange',homeVisibility);
const homePauseClick=$('pause').onclick;
$('pause').onclick=()=>{homePauseClick();if(homeTime>=0)stopClip()};
const homeCaught=drawCaught;
drawCaught=function(){homeCaught();storyCaption('Bị bắt kịp mất rồi… Nhưng hôm nay, Vy được về nhà.','SẾP · DEADLINE · BẢN KẾ HOẠCH')};
// A shadowed end wall and cornice make the street-facing facade read as a volume.
const homeEndWall=endWallWindows;
endWallWindows=function(b,x0,x1){
  homeEndWall(b,x0,x1);if(b.rawNear<3.5)return;
  const corners=[streetPoint(x0,b.near),streetPoint(x1,b.near),streetPoint(x1,b.near,b.height),streetPoint(x0,b.near,b.height)];
  face(corners,'#17374038');
  ctx.strokeStyle='#e7d2ac99';ctx.lineWidth=Math.max(1,streetPoint(0,b.near).s*2);
  const a=streetPoint(x0,b.near,b.height),c=streetPoint(x1,b.near,b.height);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y);ctx.stroke();
};
