/**
 * CelestialAudioEngine
 * Procedural Web Audio API soundscape generator for deep space cosmic ambiance.
 * Zero external audio files required — 100% synthesized in real time.
 */

class CelestialAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private isPlaying = false;

  // Active nodes & timers
  private activeNodes: (AudioNode | AudioScheduledSourceNode)[] = [];
  private chimeTimerId: number | null = null;
  private windTimerId: number | null = null;

  private initContext() {
    if (this.ctx && this.ctx.state !== 'closed') return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    this.isInitialized = true;
  }

  /**
   * Generates a stereo delay network with feedback for deep cosmic space reverb
   */
  private createSpaceReverb(ctx: AudioContext): { input: GainNode; output: GainNode } {
    const input = ctx.createGain();
    const output = ctx.createGain();

    const delayL = ctx.createDelay();
    const delayR = ctx.createDelay();
    delayL.delayTime.value = 0.42;
    delayR.delayTime.value = 0.58;

    const feedbackL = ctx.createGain();
    const feedbackR = ctx.createGain();
    feedbackL.gain.value = 0.55;
    feedbackR.gain.value = 0.55;

    const filterL = ctx.createBiquadFilter();
    const filterR = ctx.createBiquadFilter();
    filterL.type = 'lowpass';
    filterL.frequency.value = 1400;
    filterR.type = 'lowpass';
    filterR.frequency.value = 1200;

    // Cross feedback
    input.connect(delayL);
    input.connect(delayR);

    delayL.connect(filterL);
    filterL.connect(feedbackL);
    feedbackL.connect(delayR);
    filterL.connect(output);

    delayR.connect(filterR);
    filterR.connect(feedbackR);
    feedbackR.connect(delayL);
    filterR.connect(output);

    // Dry feed
    input.connect(output);

    return { input, output };
  }

  /**
   * Starts the procedural celestial ambient soundscape
   */
  public async play(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return false;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.stopNodes();

      const ctx = this.ctx;
      const now = ctx.currentTime;
      const reverb = this.createSpaceReverb(ctx);
      reverb.output.connect(this.masterGain);

      // =================================================================
      // 1. COSMIC DEEP DRONE (Sub-bass void resonance: 55Hz & 110Hz A1/A2)
      // =================================================================
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.18, now);

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(240, now);
      droneFilter.Q.setValueAtTime(3.0, now);

      // Low LFO to gently breathe the drone filter
      const droneLfo = ctx.createOscillator();
      const droneLfoGain = ctx.createGain();
      droneLfo.frequency.setValueAtTime(0.045, now);
      droneLfoGain.gain.setValueAtTime(80, now);
      droneLfo.connect(droneLfoGain);
      droneLfoGain.connect(droneFilter.frequency);
      droneLfo.start(now);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now); // A1

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.3, now); // A2 + slight detune for cosmic beat

      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(164.8, now); // E3 perfect fifth

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      osc3.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(reverb.input);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      // =================================================================
      // 2. ETHEREAL SHIMMER PADS (Cosmic Pentatonic Harmonics)
      // =================================================================
      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.09, now);

      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'bandpass';
      padFilter.frequency.setValueAtTime(680, now);
      padFilter.Q.setValueAtTime(1.8, now);

      // Slow drifting filter LFO
      const padLfo = ctx.createOscillator();
      const padLfoGain = ctx.createGain();
      padLfo.frequency.setValueAtTime(0.08, now);
      padLfoGain.gain.setValueAtTime(350, now);
      padLfo.connect(padLfoGain);
      padLfoGain.connect(padFilter.frequency);
      padLfo.start(now);

      // Chords: A3 (220), C#4 (277.2), E4 (329.6), G#4 (415.3), B4 (493.9)
      const padFreqs = [220, 277.2, 329.6, 415.3, 493.9];
      padFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (idx % 2 === 0 ? 0.3 : -0.3), now);

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) {
          panner.pan.setValueAtTime((idx / (padFreqs.length - 1)) * 1.4 - 0.7, now);
          osc.connect(panner);
          panner.connect(padFilter);
        } else {
          osc.connect(padFilter);
        }
        osc.start(now);
        this.activeNodes.push(osc);
      });

      padFilter.connect(padGain);
      padGain.connect(reverb.input);

      // =================================================================
      // 3. SOLAR WIND (Filtered Pink Noise Atmosphere)
      // =================================================================
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(380, now);
      windFilter.Q.setValueAtTime(4.2, now);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.065, now);

      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(reverb.input);
      noiseSource.start(now);

      // Slow wind sweep
      const windLfo = ctx.createOscillator();
      const windLfoGain = ctx.createGain();
      windLfo.frequency.setValueAtTime(0.03, now);
      windLfoGain.gain.setValueAtTime(220, now);
      windLfo.connect(windLfoGain);
      windLfoGain.connect(windFilter.frequency);
      windLfo.start(now);

      // =================================================================
      // 4. PERIODIC STELLAR CHIMES (Twinkling Cosmic Pulses)
      // =================================================================
      const chimeFreqs = [880, 1108.7, 1318.5, 1661.2, 1760, 2217.5];

      const triggerChime = () => {
        if (!this.isPlaying || !this.ctx || this.ctx.state !== 'running') return;
        const cNow = this.ctx.currentTime;
        const chimeOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();

        const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, cNow);

        cGain.gain.setValueAtTime(0.0001, cNow);
        cGain.gain.exponentialRampToValueAtTime(0.04, cNow + 0.04);
        cGain.gain.exponentialRampToValueAtTime(0.00001, cNow + 3.8);

        const cPanner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        if (cPanner) {
          cPanner.pan.setValueAtTime((Math.random() - 0.5) * 1.5, cNow);
          chimeOsc.connect(cPanner);
          cPanner.connect(cGain);
        } else {
          chimeOsc.connect(cGain);
        }

        cGain.connect(reverb.input);
        chimeOsc.start(cNow);
        chimeOsc.stop(cNow + 4.0);

        // Schedule next chime randomly between 3.5s and 7.5s
        const nextTime = 3500 + Math.random() * 4000;
        this.chimeTimerId = window.setTimeout(triggerChime, nextTime);
      };

      this.chimeTimerId = window.setTimeout(triggerChime, 2500);

      // Store node references for disposal
      this.activeNodes.push(
        osc1, osc2, osc3, droneLfo, padLfo, noiseSource, windLfo,
        droneGain, padGain, windGain, reverb.input, reverb.output
      );

      // Smooth master fade in over 1.6s
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(0.85, now + 1.6);

      this.isPlaying = true;
      return true;
    } catch (err) {
      console.warn('Failed to start CelestialAudioEngine:', err);
      return false;
    }
  }

  /**
   * Smoothly fades out and pauses the soundscape
   */
  public pause(): void {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.9);

    setTimeout(() => {
      if (!this.isPlaying) {
        this.stopNodes();
        if (this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend().catch(() => {});
        }
      }
    }, 1000);

    this.isPlaying = false;
  }

  private stopNodes(): void {
    if (this.chimeTimerId !== null) {
      clearTimeout(this.chimeTimerId);
      this.chimeTimerId = null;
    }
    if (this.windTimerId !== null) {
      clearTimeout(this.windTimerId);
      this.windTimerId = null;
    }

    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignored
      }
    });
    this.activeNodes = [];
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const celestialAudio = new CelestialAudioEngine();
