// The score: one piece in D major at 120 bpm (half-time feel). Pad, felt-piano arpeggio and a soft bass,
// with the sound effects in the same key and the same room (one shared reverb). Writes work/audio.wav
// (48 kHz, 16-bit stereo, 21 s).
const fs = require('fs'), path = require('path');
const SR = 48000, DUR = 21, N = SR * DUR;
const music = [new Float32Array(N), new Float32Array(N)], fx = [new Float32Array(N), new Float32Array(N)];
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const add = (bus, i, l, r) => { if (i >= 0 && i < N) { bus[0][i] += l; bus[1][i] += r; } };

// chords: [start, end, midi notes]
const chords = [
  [0, 4, [50, 57, 61, 64, 66]],    // Dmaj9
  [4, 8, [47, 54, 57, 61, 62]],    // Bm9
  [8, 12, [43, 50, 54, 57, 59]],   // Gmaj9
  [12, 14, [52, 55, 59, 62, 66]],  // Em9
  [14, 16, [45, 55, 59, 62, 66]],  // A13sus
  [16, 21, [50, 57, 64, 66, 69]],  // Dmaj9, open
];

// pad: each chord tone as two slightly detuned soft voices, one per side, slow attack and release
for (const [a, b, notes] of chords) {
  const att = 1.1, rel = 1.8, i0 = Math.floor(a * SR), i1 = Math.min(N, Math.floor((b + rel) * SR));
  const level = a < 4 ? 0.034 : 0.046;
  notes.forEach((m, v) => {
    const f = mtof(m + 12 * (m < 48 ? 1 : 0));
    for (let i = i0; i < i1; i++) {
      const t = (i - i0) / SR, T = i / SR;
      let env = Math.min(1, t / att); if (T > b) env *= Math.max(0, 1 - (T - b) / rel); env = env * env * (3 - 2 * env);
      if (T > 19.6) env *= Math.max(0, 1 - (T - 19.6) / 1.4);
      const wob = 1 + 0.0009 * Math.sin(2 * Math.PI * (0.21 + v * 0.07) * T);
      const sL = Math.sin(2 * Math.PI * f * 0.9988 * wob * T), sR = Math.sin(2 * Math.PI * f * 1.0012 * wob * T + v);
      const hL = 0.26 * Math.sin(4 * Math.PI * f * 0.9988 * T), hR = 0.26 * Math.sin(4 * Math.PI * f * 1.0012 * T + v);
      add(music, i, (sL + hL) * level * env, (sR + hR) * level * env);
    }
  });
}

// felt piano: a few partials with their own decays, a soft attack
function piano(bus, t0, m, vel, pan = 0, tau = 1.5) {
  const f = mtof(m), i0 = Math.floor(t0 * SR), len = Math.floor(SR * Math.min(4, tau * 4));
  const amps = [1, 0.42, 0.18, 0.08, 0.035];
  for (let i = 0; i < len; i++) {
    const t = i / SR; let s = 0;
    for (let k = 0; k < amps.length; k++) { const fk = f * (k + 1) * (1 + 0.0004 * k * k); if (fk > 16000) break; s += amps[k] * Math.exp(-t * (1 + 0.7 * k) / tau) * Math.sin(2 * Math.PI * fk * t); }
    const a = Math.min(1, t / 0.005), g = s * a * vel;
    add(bus, i0 + i, g * (1 - pan) * 0.5, g * (1 + pan) * 0.5);
  }
}
const pattern = [0, 2, 3, 4, 3, 2, 1, 2];
for (let beat = 0; beat < 40; beat++) {
  const t = 0.25 + beat * 0.5; if (t > 19.4) break;
  const ch = chords.find(c => t >= c[0] && t < c[1]); const notes = ch[2];
  if (t < 4 && beat % 2 === 1) continue; // the hook: half as many notes, so the words lead
  const m = notes[pattern[beat % 8]] + 12;
  const vel = (t < 4 ? 0.05 : 0.068) * (0.85 + 0.3 * rnd());
  piano(music, t, m, vel, beat % 2 ? 0.25 : -0.25);
}
// the last chord, rolled, as the button is tapped
[50, 57, 62, 66, 69].forEach((m, k) => piano(music, 19.6 + k * 0.05, m + 12, 0.06, -0.3 + k * 0.15, 2.2));

// bass: the chord's root, round and low, from the reveal on
for (const [a, b, notes] of chords) {
  if (a < 4) continue;
  const root = notes[0] - 12 * (notes[0] >= 48 ? 2 : 1), f = mtof(root), i0 = Math.floor(a * SR), i1 = Math.min(N, Math.floor((b + 0.6) * SR));
  for (let i = i0; i < i1; i++) {
    const t = (i - i0) / SR, T = i / SR;
    let env = Math.min(1, t / 0.08) * (0.75 + 0.25 * Math.exp(-t * 2)); if (T > b) env *= Math.max(0, 1 - (T - b) / 0.6);
    if (T > 19.6) env *= Math.max(0, 1 - (T - 19.6) / 1.2);
    const s = Math.sin(2 * Math.PI * f * t) + 0.16 * Math.sin(4 * Math.PI * f * t);
    add(music, i, s * 0.11 * env, s * 0.11 * env);
  }
}
// a low soft thump on the two big cuts
function thump(t0, g) {
  const i0 = Math.floor(t0 * SR); let ph = 0;
  for (let i = 0; i < SR * 0.6; i++) { const t = i / SR, f = 42 + 30 * Math.exp(-t * 18); ph += 2 * Math.PI * f / SR; const s = Math.sin(ph) * Math.exp(-t * 6) * Math.min(1, t / 0.004) * g; add(music, i0 + i, s, s); }
}
thump(4.0, 0.2); thump(16.95, 0.2);
// a quiet shaker on the off-beats through the middle, way back
let lp = 0;
for (let k = 0; k < 32; k++) {
  const t0 = 8.75 + k * 0.5; if (t0 > 16.6) break;
  const i0 = Math.floor(t0 * SR), g = 0.011 * (k % 2 ? 0.7 : 1);
  let prev = 0;
  for (let i = 0; i < SR * 0.09; i++) { const n = rnd() * 2 - 1, hp = n - prev; prev = n; const t = i / SR; const s = hp * Math.exp(-t * 55) * Math.min(1, t / 0.003) * g; add(music, i0 + i, s * 0.8, s); }
}

// effects
function whoosh(tc, g) { // filtered air rising into the cut, then settling
  const a = tc - 0.7, b = tc + 0.45, i0 = Math.floor(a * SR), i1 = Math.floor(b * SR);
  let low = 0, band = 0;
  for (let i = i0; i < i1; i++) {
    const T = i / SR, k = Math.max(0, (T - a) / (tc - a));
    const fc = T < tc ? 260 + 2300 * k * k : 2560 - 1600 * ((T - tc) / (b - tc));
    const f = 2 * Math.sin(Math.PI * fc / SR), q = 0.55;
    const n = rnd() * 2 - 1; low += f * band; const high = n - low - q * band; band += f * high;
    const env = T < tc ? Math.pow(k, 2.2) : Math.exp(-(T - tc) * 7);
    const pan = -0.6 + 1.2 * Math.min(1, (T - a) / (b - a));
    const s = band * env * g;
    add(fx, i, s * (1 - pan) * 0.5, s * (1 + pan) * 0.5);
  }
}
[4.0, 8.4, 13.4, 16.95].forEach(t => whoosh(t, 0.09));
function bell(t0, m, g, tau = 2.2, pan = 0) {
  const f = mtof(m), i0 = Math.floor(t0 * SR), amps = [1, 0.3, 0.1, 0.04], mul = [1, 2, 3, 4.01];
  for (let i = 0; i < SR * Math.min(5, tau * 3); i++) {
    const t = i / SR; let s = 0; for (let k = 0; k < 4; k++) s += amps[k] * Math.exp(-t * (1 + k) / tau) * Math.sin(2 * Math.PI * f * mul[k] * t);
    s *= Math.min(1, t / 0.002) * g; add(fx, i0 + i, s * (1 - pan) * 0.5, s * (1 + pan) * 0.5);
  }
}
function click(t0, g) {
  const i0 = Math.floor(t0 * SR); let y = 0;
  for (let i = 0; i < SR * 0.02; i++) { const t = i / SR; y += 0.35 * ((rnd() * 2 - 1) - y); const s = y * Math.exp(-t * 400) * g; add(fx, i0 + i, s, s); }
}
bell(1.55, 81, 0.05, 2.4, -0.2); bell(1.62, 86, 0.035, 2.4, 0.2);      // the manifesto lands
bell(10.25, 90, 0.022, 0.5, 0.3); bell(11.4, 93, 0.02, 0.5, 0.35);       // the photograph swaps
click(14.72, 0.05); bell(14.75, 86, 0.024, 0.6, 0.4);                    // the tap on Menu
click(19.58, 0.06); bell(19.62, 86, 0.04, 2.6, 0); bell(19.68, 90, 0.03, 2.6, 0.15); // the booking tap

// one room for everything: a small Schroeder reverb, music sent lightly, effects a little more
function reverb(inL, inR) {
  const combs = [1557, 1617, 1491, 1422, 1277, 1356], aps = [225, 556, 441];
  const run = (x, spread) => {
    const out = new Float32Array(N);
    for (const d0 of combs) { const d = d0 + spread, buf = new Float32Array(d); let p = 0, lpf = 0;
      for (let i = 0; i < N; i++) { const y = buf[p]; lpf = y * 0.72 + lpf * 0.28; buf[p] = x[i] + lpf * 0.8; out[i] += y; p = (p + 1) % d; } }
    for (const d0 of aps) { const d = d0 + spread, buf = new Float32Array(d); let p = 0;
      for (let i = 0; i < N; i++) { const b = buf[p], y = -out[i] + b; buf[p] = out[i] + b * 0.5; out[i] = y; p = (p + 1) % d; } }
    for (let i = 0; i < N; i++) out[i] *= 0.11;
    return out;
  };
  return [run(inL, 0), run(inR, 23)];
}
const send = [new Float32Array(N), new Float32Array(N)];
for (let c = 0; c < 2; c++) for (let i = 0; i < N; i++) send[c][i] = music[c][i] * 0.28 + fx[c][i] * 0.5;
const wet = reverb(send[0], send[1]);

// master: sum, soft saturation, a fade at the end, peak at -1 dBFS
const out = [new Float32Array(N), new Float32Array(N)];
let peak = 0, sq = 0;
for (let c = 0; c < 2; c++) for (let i = 0; i < N; i++) {
  const T = i / SR; let x = music[c][i] + fx[c][i] * 0.8 + wet[c][i];
  x = Math.tanh(x * 1.1) / 1.1;
  if (T > 19.9) x *= Math.cos(Math.min(1, (T - 19.9) / 1.1) * Math.PI / 2);
  if (T < 0.03) x *= T / 0.03;
  out[c][i] = x; peak = Math.max(peak, Math.abs(x)); sq += x * x;
}
const gain = 0.89 / peak;
const rms = Math.sqrt(sq / (2 * N)) * gain;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) for (let c = 0; c < 2; c++) buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, out[c][i] * gain)) * 32767), 44 + i * 4 + c * 2);
fs.writeFileSync(path.join(__dirname, 'audio.wav'), buf);
console.log('audio.wav written; rms dBFS', (20 * Math.log10(rms)).toFixed(1));
