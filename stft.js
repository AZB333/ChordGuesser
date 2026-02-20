const pitchText = document.getElementById("pitch");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

let audioContext;
let analyser;
let timeDomainData;
let animationId = null;


startButton.addEventListener("click", () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    pitchText.textContent = "Initializing...";

    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    timeDomainData = new Float32Array(analyser.fftSize);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            processAudio(); // begin loop
        })
        .catch(err => {
            console.error('Mic error:', err);
            pitchText.textContent = "Mic access failed.";
        });
});

stopButton.addEventListener("click", () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
    audioContext = null;
    }

    startButton.disabled = false;
    stopButton.disabled = true;
    pitchText.textContent = "Click play to start!";
});

function applyHannWindow(data) {
    const N = data.length;
    for (let i = 0; i < N; i++) {
        let multiplier = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (N - 1)));
        data[i] *= multiplier;
    }
}

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


function processAudio() {
    animationId = requestAnimationFrame(processAudio);
    analyser.getFloatTimeDomainData(timeDomainData);
    applyHannWindow(timeDomainData);

    let freqData = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(freqData);
    let magnitudes = Array.from(freqData, val => Math.pow(10, val / 20));

    const noiseFloor = 0.0008; // higher values means a more strict noise tolerance

    let filteredMagnitudes = magnitudes.map((mag, i) => {
        return mag < noiseFloor ? 0 : mag;
    });

    let peakIndex = filteredMagnitudes.indexOf(Math.max(...filteredMagnitudes));

    let frequency = peakIndex * (audioContext.sampleRate / analyser.fftSize);

    const note = getNoteName(frequency);
    if (note) {
        pitchText.textContent = `Frequency: ${frequency.toFixed(2)} Hz (${note.fullName} ${note.centsOff} cents)`;
    } else {
        pitchText.textContent = `Listening...`;
    }
}
