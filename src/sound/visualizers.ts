// References:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
// https://github.com/AppGeo/web-audio-examples

abstract class BaseVisualizer<ArrayType> {
    protected connectedNode: MediaStreamAudioSourceNode;
    protected analyserNode: AnalyserNode;
    protected fftData: ArrayType;

    protected graphicWidth: number;
    protected graphicHeight: number;
    protected graphicContext: CanvasRenderingContext2D;

    protected animationHandle: number;
    protected stopping: boolean;

    constructor(
        audioContext: AudioContext,
        canvasElement: HTMLCanvasElement,
        arrayConstructor: { new(length: number): ArrayType },
        fftSize: number = 2048,
    ) {
        this.analyserNode = audioContext.createAnalyser();
        this.analyserNode.fftSize = fftSize;
        this.fftData = new arrayConstructor(this.analyserNode.frequencyBinCount);

        this.graphicWidth = parseInt(getComputedStyle(canvasElement).width, 10);
        this.graphicHeight = parseInt(getComputedStyle(canvasElement).height, 10);

        this.graphicContext = canvasElement.getContext('2d');
        this.graphicContext.fillStyle = '#000000';
        this.graphicContext.strokeStyle = '#c0c0c0';

        this.stopping = false;
    }

    public start(connectedNode: MediaStreamAudioSourceNode) {
        this.acceptConnection(connectedNode);
        this.stopping = false;
        this.draw();
    }

    public stop() {
        this.stopping = true;
        cancelAnimationFrame(this.animationHandle);
        this.releaseConnection();
    }

    protected abstract innerDraw(): void;

    private acceptConnection(connectedNode: MediaStreamAudioSourceNode) {
        connectedNode.connect(this.analyserNode);
        this.connectedNode = connectedNode;
    }

    private releaseConnection() {
        this.connectedNode.disconnect(this.analyserNode);
        delete this.connectedNode;
    }

    private draw() {
        if (this.stopping) {
            // done!
            return;
        }

        this.innerDraw();

        this.animationHandle = requestAnimationFrame(() => this.draw());
    }
}

export class FrequencyVisualizer extends BaseVisualizer<Float32Array> {
    constructor(audioContext: AudioContext, canvasElement: HTMLCanvasElement) {
        super(audioContext, canvasElement, Float32Array);
    }

    public innerDraw() {
        this.graphicContext.fillRect(0, 0, this.graphicWidth, this.graphicHeight);

        if (this.connectedNode) {
            const scale = this.graphicHeight / 80;

            this.analyserNode.getFloatFrequencyData(this.fftData);

            for (let i = 0; i < this.graphicWidth; ++i) {
                const y = -(this.fftData[i] + 15) * scale;

                this.graphicContext.beginPath();
                this.graphicContext.moveTo(i + 0.5, this.graphicHeight);
                this.graphicContext.lineTo(i + 0.5, y);
                this.graphicContext.stroke();
            }
        }
    }
}

export class SpectrogramVisualizer extends BaseVisualizer<Float32Array> {
    private pixel: ImageData;

    constructor(audioContext: AudioContext, canvasElement: HTMLCanvasElement) {
        super(audioContext, canvasElement, Float32Array, 8192);

        this.pixel = this.graphicContext.createImageData(1, 1);
        this.pixel.data[3] = 255;

        this.graphicContext.fillRect(0, 0, this.graphicWidth, this.graphicHeight);
    }

    public innerDraw() {
        if (!this.connectedNode) {
            this.graphicContext.fillRect(0, 0, this.graphicWidth, this.graphicHeight);
        } else {
            const slideImage = this.graphicContext.getImageData(0, 0, this.graphicWidth - 1, this.graphicHeight);
            this.graphicContext.putImageData(slideImage, 1, 0);

            this.analyserNode.getFloatFrequencyData(this.fftData);

            for (let i = 0; i < this.graphicHeight; ++i) {
                const n = Math.min(Math.max((this.fftData[i] + 80) * 4, 0), 255);
                this.pixel.data[0] = n;
                this.pixel.data[1] = n;
                this.pixel.data[2] = n;
                this.graphicContext.putImageData(this.pixel, 0, this.graphicHeight - i);
            }
        }
    }
}

export class SineVisualizer extends BaseVisualizer<Uint8Array> {
    constructor(audioContext: AudioContext, canvasElement: HTMLCanvasElement) {
        super(audioContext, canvasElement, Uint8Array);

        this.graphicContext.clearRect(0, 0, this.graphicWidth, this.graphicHeight);
        this.graphicContext.lineWidth = 2;
    }

    public innerDraw() {
        const sliceWidth = this.graphicWidth * 1.0 / this.fftData.length;
        this.analyserNode.getByteTimeDomainData(this.fftData);

        this.graphicContext.fillRect(0, 0, this.graphicWidth, this.graphicHeight);
        this.graphicContext.beginPath();

        let x = 0;
        for (let i = 0; i < this.fftData.length; i++) {
            const v = this.fftData[i] / 128.0;
            const y = v * this.graphicHeight / 2;

            if (i === 0) {
                this.graphicContext.moveTo(x, y);
            } else {
                this.graphicContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.graphicContext.lineTo(this.graphicWidth, this.graphicHeight / 2);
        this.graphicContext.stroke();
    }
}
