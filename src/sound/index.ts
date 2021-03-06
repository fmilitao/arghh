import './style.css';
import { FrequencyVisualizer, SineVisualizer, SpectrogramVisualizer } from './visualizers';

type MediaObjects = [MediaStreamAudioSourceNode, MediaStreamTrack[]];

function getMediaObjects(audioContext: AudioContext): Promise<MediaObjects> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return Promise.reject('Function navigator.getUserMedia not available.');
    }

    return navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(stream => {
            const audioTracks = stream.getAudioTracks();
            const audioSource = audioContext.createMediaStreamSource(stream);
            return [audioSource, audioTracks] as MediaObjects;
        }).catch(error => Promise.reject(`Failed to initializing user media stream: ${error}`));
}

function newCanvas(width: number, height: number, label: string) {
    const div = document.createElement('div');
    div.className = 'canvasWrapper';

    const canvas = document.createElement('canvas');
    canvas.className = 'canvasStyle';
    canvas.width = width;
    canvas.height = height;

    const text = document.createElement('div');
    text.className = 'canvasText';
    text.innerText = label;

    div.appendChild(canvas);
    div.appendChild(text);
    document.body.appendChild(div);
    return canvas;
}

function initAll() {
    // initialize resources
    const body = document.body;
    const title = document.createElement('div');
    title.innerHTML = '<b>Sound visualizations</b>. Press any key/click to stop/start.';
    title.className = 'title';
    body.appendChild(title);

    const buildInfo = document.createElement('div');
    const commitInfo = `Commit: <a href="https://github.com/fmilitao/arghh/commit/${__VERSION__}">${__VERSION__}</a>`;
    const buildDate = `Build date: ${__BUILD__}`;
    buildInfo.innerHTML = `${commitInfo}<br/>${buildDate}`;
    buildInfo.className = 'buildInfo';
    document.body.appendChild(buildInfo);

    // note that a large width/height value may reduce updates below 60fps.
    const width = 700;
    const height = 200;
    const frequencyCanvas = newCanvas(width, height, 'Frequency');
    const sineCanvas = newCanvas(width, height, 'Waveform');
    const spectrogramCanvas = newCanvas(width, height, 'Spectrogram');

    const audioContext = new AudioContext();

    const visualizers = [
        new FrequencyVisualizer(audioContext, frequencyCanvas),
        new SineVisualizer(audioContext, sineCanvas),
        new SpectrogramVisualizer(audioContext, spectrogramCanvas)
    ];

    // operation functions
    function startAudio() {
        getMediaObjects(audioContext)
            .then(startVisualizers)
            .catch(error => {
                audioContext.close();
                document.write(error);
            });
    }

    let stopVisualizers = () => { };
    function startVisualizers([audioSourceNode, mediaStreamsTracks]: MediaObjects) {
        visualizers.forEach(visualizer => visualizer.start(audioSourceNode));

        stopVisualizers = () => {
            visualizers.forEach(visualizer => visualizer.stop());
            mediaStreamsTracks.forEach(track => track.stop());
        };
    }

    startAudio();

    let stop = true;
    function toggleVisualization() {
        console.log(`Stop: ${stop}.`);
        if (stop) {
            stopVisualizers();
        } else {
            startAudio();
        }
        stop = !stop;
    }

    window.onkeyup = toggleVisualization;
    window.onclick = toggleVisualization;
}

// start everything
initAll();
