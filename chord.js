class Chord{
    constructor(name, audioElement){
        this.name = name;
        this.audio = audioElement;
    }
}

/////////////majors////////////////////
const Cmaj = new Chord("Cmaj", document.getElementById('Cmaj'));
const Csmaj = new Chord("C#maj", document.getElementById('Csmaj'));
const Dmaj = new Chord("Dmaj", document.getElementById('Dmaj'));
const Dsmaj = new Chord("D#maj", document.getElementById('Dsmaj'));
const Emaj = new Chord("Emaj", document.getElementById('Emaj'));
const Fmaj = new Chord("Fmaj", document.getElementById('Fmaj'));
const Fsmaj = new Chord("F#maj", document.getElementById('Fsmaj'));
const Gmaj = new Chord("Gmaj", document.getElementById('Gmaj'));
const Gsmaj = new Chord("G#maj", document.getElementById('Gsmaj'));
const Amaj = new Chord("Amaj", document.getElementById('Amaj'));
const Asmaj = new Chord("A#maj", document.getElementById('Asmaj'));
const Bmaj = new Chord("Bmaj", document.getElementById('Bmaj'));



majors = [Cmaj, Csmaj, Dmaj, Dsmaj, Emaj, Fmaj, Fsmaj, Gmaj, Gsmaj, Amaj, Asmaj, Bmaj];


//////////////minors///////////////////
const Cmin = new Chord("Cmin", document.getElementById('Cmin'));
const Csmin = new Chord("C#min", document.getElementById('Csmin'));
const Dmin = new Chord("Dmin", document.getElementById('Dmin'));
const Dsmin = new Chord("D#min", document.getElementById('Dsmin'));
const Emin = new Chord("Emin", document.getElementById('Emin'));
const Fmin = new Chord("Fmin", document.getElementById('Fmin'));
const Fsmin = new Chord("F#min", document.getElementById('Fsmin'));
const Gmin = new Chord("Gmin", document.getElementById('Gmin'));
const Gsmin = new Chord("G#min", document.getElementById('Gsmin'));
const Amin = new Chord("Amin", document.getElementById('Amin'));
const Asmin = new Chord("A#min", document.getElementById('Asmin'));
const Bmin = new Chord("Bmin", document.getElementById('Bmin'));

minors = [Cmin, Csmin, Dmin, Dsmin, Emin, Fmin, Fsmin, Gmin, Gsmin, Amin, Asmin, Bmin];


function playRandomMajor(){
    majors[Math.floor(Math.random() * 11)].audio.play();
}

function playRandomMinor(){
    minors[Math.floor(Math.random() * 11)].audio.play();
}

chords=[majors, minors];

function playRandomChord(){
    chords[Math.floor(Math.random()* 2)][Math.floor(Math.random() * 11)].audio.play();
}


userInput = document.getElementById("search-input");
output = document.getElementById("output");

userInput.addEventListener("input", () => {
    // output.textContent = userInput.value;
    // output.textContent = allchords[1];
    allchords = [];
    for(i = 0; i < chords.length; i++){
        allchords = allchords.concat(chords[i]);
    }
    for(i = 0; i < allchords.length; i++){
        output.textContent += allchords[i].name;
    }
})