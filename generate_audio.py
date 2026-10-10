import numpy as np
import lameenc

sample_rate = 44100
duration = 5
frames = int(sample_rate * duration)
t = np.linspace(0, duration, frames, endpoint=False)
left = np.sin(2 * np.pi * 220 * t) * 0.28 + np.sin(2 * np.pi * 330 * t) * 0.18
right = np.sin(2 * np.pi * 277 * t) * 0.26 + np.sin(2 * np.pi * 440 * t) * 0.14

pcm = np.empty((frames, 2), dtype=np.int16)
pcm[:, 0] = np.clip(left * 32767, -32768, 32767).astype(np.int16)
pcm[:, 1] = np.clip(right * 32767, -32768, 32767).astype(np.int16)

encoder = lameenc.Encoder()
encoder.set_bit_rate(128)
encoder.set_in_sample_rate(sample_rate)
encoder.set_channels(2)
encoder.set_quality(2)

mp3 = encoder.encode(pcm.tobytes()) + encoder.flush()
with open('assets/music/birthday-song.mp3', 'wb') as f:
    f.write(mp3)

print(f'created assets/music/birthday-song.mp3 ({len(mp3)} bytes)')
