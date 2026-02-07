
export class AudioController {
    private ctx: AudioContext | null = null;
    private enabled: boolean = false;
    private initialized: boolean = false;

    constructor() {
        // Initialize on first user interaction to bypass autoplay policy
        const init = () => {
            if (this.initialized) return;
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.enabled = true;
            this.initialized = true;
            window.removeEventListener('click', init);
            window.removeEventListener('keydown', init);
        };

        window.addEventListener('click', init);
        window.addEventListener('keydown', init);
    }

    public playHover() {
        if (!this.enabled || !this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Low frequency hum
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    public playClick() {
        if (!this.enabled || !this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // High frequency blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }
}

export const audioController = new AudioController();

export function initAudioUI() {
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .tech-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => audioController.playHover());
        el.addEventListener('mousedown', () => audioController.playClick());
    });
}
