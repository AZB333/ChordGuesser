// const mic_btn = document.querySelector("#mic");
// const playback = document.querySelector(".playback");

// mic_btn.addEventListener("click", ToggleMic);

// let can_record = false;
// let is_recording = false;

// let recorder = null;

// let chunks = [];

// function SetupAudio(){
//     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
//         navigator.mediaDevices
//         .getUserMedia({
//             audio: true
//         })
//         .then(SetupStream)
//         .catch(err =>{
//             console.error(err);
//         })
//     }
// }


// SetupAudio();


// function SetupStream(stream){
//     recorder = new MediaRecorder(stream);

//     recorder.ondataavailable = e =>{
//         chunks.push(e.data);
//     };

//     recorder.onstop = e =>{
//     const blob = new Blob(chunks, { type: "audio/ogg;"});
//     chunks = [];
//     const audioURL = window.URL.createObjectURL(blob);
//     playback.src = audioURL;
//     };

//     can_record = true;
// }

// function ToggleMic(){
//     if(!can_record){
//         console.log("can't record");
//         return;
//     }

//     is_recording = !is_recording;
//     if(is_recording){
//         recorder.start();
//         mic_btn.classList.add("is-recording");
//     }
//     else{
//         recorder.stop();
//         mic_btn.classList.remove("is-recording");
//     }
// }


const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const pitchDisplay = document.getElementById("pitch");

let audioContext;
let analyser;
let bufferLength;
let data;
let animationId = null;
let stream = null;


function getNoteName(frequency) {
    if (!frequency) return null;

    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    const noteNumber = 12 * (Math.log2(frequency / 440)) + 69;
    const roundedNote = Math.round(noteNumber);
    const noteIndex = (roundedNote % 12 + 12) % 12; // handles negative values
    const octave = Math.floor(roundedNote / 12) - 1; // MIDI starts at octave -1

    const cents = Math.floor((noteNumber - roundedNote) * 100);

    return {
    name: noteNames[noteIndex],
    octave: octave,
    fullName: `${noteNames[noteIndex]}${octave}`,
    centsOff: cents
    };
}


stopButton.addEventListener("click", () => {
    if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
    }
    if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
    }
    if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
    audioContext = null;
    }

    startButton.disabled = false;
    stopButton.disabled = true;
    pitchDisplay.textContent = "--";
});

startButton.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.fftSize;
    data = new Float32Array(bufferLength);

    source.connect(analyser);
    detectPitch();
});

function detectPitch() {
    analyser.getFloatTimeDomainData(data);
    let pitch = autoCorrelate(data, audioContext.sampleRate);
    if(pitch == null){
    pitchDisplay.textContent = `0`;
    }
    else{
        const note = getNoteName(pitch);
        pitchDisplay.textContent = `${pitch.toFixed(1)} Hz\n${note.fullName}, ${note.centsOff >= 0 ? '+' : ''}${note.centsOff} cents`;
    }
    console.log(pitch);
    animationId = requestAnimationFrame(detectPitch);
}


function autoCorrelate(buffer, sampleRate) {
    let SIZE = buffer.length;
    let maxSamples = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    let correlations = new Array(maxSamples);

    for (let i = 0; i < SIZE; i++) {
    let val = buffer[i];
    rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return null; // too quiet

    let lastCorrelation = 1;
    for (let offset = 0; offset < maxSamples; offset++) {
    let correlation = 0;

    for (let i = 0; i < maxSamples; i++) {
        correlation += Math.abs((buffer[i]) - (buffer[i + offset]));
    }
    correlation = 1 - (correlation / maxSamples);
    correlations[offset] = correlation;

    if ((correlation > 0.9) && (correlation > lastCorrelation)) {
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
        }
    } else if (foundGoodCorrelation) {
        let frequency = sampleRate / bestOffset;
        return frequency;
    }
    lastCorrelation = correlation;
    }

    if (bestCorrelation > 0.01) {
    return sampleRate / bestOffset;
    }

    return null;
}