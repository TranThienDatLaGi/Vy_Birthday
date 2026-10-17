"""Original instrumental game cues; no downloaded music or vocal imitation."""
import math, wave, subprocess, sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent/'.qa/py'))
import numpy as np
SR=24000
OUT=Path(__file__).parent/'dist/assets'
TMP=Path(__file__).parent/'.qa/music';TMP.mkdir(parents=True,exist_ok=True)
FF='C:/Users/trant/AppData/Local/Programs/Python/Python312/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
def note(buf,f,start,dur,amp=.2,kind='piano'):
    t=np.arange(int(SR*dur))/SR
    if kind=='pad':
        sig=(np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*f*2*t)+.15*np.sin(2*np.pi*f*1.004*t))
        env=np.minimum(t/.25,1)*np.minimum((dur-t)/.5,1)*.5
    else:
        sig=np.sin(2*np.pi*f*t)+.32*np.sin(2*np.pi*f*2*t)*np.exp(-t*3)+.14*np.sin(2*np.pi*f*3*t)*np.exp(-t*6)
        env=(1-np.exp(-t*180))*np.exp(-t*(2.5 if kind=='piano' else 4))*np.minimum((dur-t)/.08,1)
    s=int(start*SR);n=min(len(t),len(buf)-s)
    if n>0:buf[s:s+n]+=amp*sig[:n]*env[:n]
def hz(m):return 440*2**((m-69)/12)
def save(name,buf):
    # Short stereo echoes give the piano a small-room sound without drowning the melody.
    left=buf.copy();right=buf.copy()
    for delay,gain in [(0.14,.12),(.29,.08),(.47,.04)]:
        n=int(SR*delay);left[n:]+=buf[:-n]*gain;right[n+57:]+=buf[:-(n+57)]*gain
    stereo=np.stack([left,right],1);stereo*=.83/max(.83,np.max(np.abs(stereo)))
    wav=TMP/(name+'.wav')
    with wave.open(str(wav),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((stereo*32767).astype('<i2').tobytes())
    subprocess.run([FF,'-loglevel','error','-y','-i',str(wav),'-codec:a','libmp3lame','-q:a','4',str(OUT/(name+'.mp3'))],check=True)
def score(name,uplift=False):
    dur=12;buf=np.zeros(SR*dur);chords=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]] if not uplift else [[60,64,67],[55,59,62],[57,60,64],[53,57,60]]
    for c,chord in enumerate(chords):
        for m in chord:note(buf,hz(m),c*3,3.8,.055,'pad')
        note(buf,hz(chord[0]-12),c*3,2.6,.11)
        for j in range(6):note(buf,hz(chord[j%3]+12),c*3+j*.5,1.4,.11 if not uplift else .14)
    melody=[76,72,71,69,72,74,76,72,71,67,69,71] if not uplift else [72,76,79,84,83,79,81,79,77,76,79,84]
    for j,m in enumerate(melody):note(buf,hz(m),j*.9+.12,1.7,.12 if not uplift else .15)
    if uplift:
        for beat in np.arange(0,11.8,.5):note(buf,90,beat,.18,.045,'bell')
    fade=np.minimum(np.arange(len(buf))/(SR*.18),1)*np.minimum((len(buf)-np.arange(len(buf)))/(SR*.5),1);save(name,buf*fade)
score('score-emotion');score('score-courage',True)
notes=[(0,392,.22),(.3,392,.16),(.55,440,.45),(1.1,392,.45),(1.65,523,.45),(2.2,494,.8),(3.3,392,.22),(3.6,392,.16),(3.85,440,.45),(4.4,392,.45),(4.95,587,.45),(5.5,523,.8),(6.6,392,.22),(6.9,392,.16),(7.15,784,.45),(7.7,659,.45),(8.25,523,.45),(8.8,494,.45),(9.35,440,.7),(10.4,698,.22),(10.7,698,.16),(10.95,659,.45),(11.5,523,.45),(12.05,587,.45),(12.6,523,1)]
buf=np.zeros(SR*15)
for t,f,d in notes:note(buf,f,t,d+1,.27,'bell');note(buf,f/2,t,d+.5,.045)
for t,chord in [(0,[48,52,55]),(2.2,[43,47,50]),(3.3,[48,52,55]),(5.5,[48,52,55]),(6.6,[53,57,60]),(8.8,[48,52,55]),(10.4,[53,57,60]),(11.5,[43,47,50]),(12.6,[48,52,55])]:
    for m in chord:note(buf,hz(m),t,2.5,.075,'pad')
save('score-birthday',buf)
print('Created emotion, encouragement and birthday instrumental MP3 cues.')
