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



const majors = [Cmaj, Csmaj, Dmaj, Dsmaj, Emaj, Fmaj, Fsmaj, Gmaj, Gsmaj, Amaj, Asmaj, Bmaj];


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

const minors = [Cmin, Csmin, Dmin, Dsmin, Emin, Fmin, Fsmin, Gmin, Gsmin, Amin, Asmin, Bmin];


/////////////major sevenths////////////////////
const Cmaj7 = new Chord("Cmaj7", document.getElementById('Cmaj7'));
const Csmaj7 = new Chord("C#maj7", document.getElementById('Csmaj7'));
const Dmaj7 = new Chord("Dmaj7", document.getElementById('Dmaj7'));
const Dsmaj7 = new Chord("D#maj7", document.getElementById('Dsmaj7'));
const Emaj7 = new Chord("Emaj7", document.getElementById('Emaj7'));
const Fmaj7 = new Chord("Fmaj7", document.getElementById('Fmaj7'));
const Fsmaj7 = new Chord("F#maj7", document.getElementById('Fsmaj7'));
const Gmaj7 = new Chord("Gmaj7", document.getElementById('Gmaj7'));
const Gsmaj7 = new Chord("G#maj7", document.getElementById('Gsmaj7'));
const Amaj7 = new Chord("Amaj7", document.getElementById('Amaj7'));
const Asmaj7 = new Chord("A#maj7", document.getElementById('Asmaj7'));
const Bmaj7 = new Chord("Bmaj7", document.getElementById('Bmaj7'));


const majorSevenths = [Cmaj7, Csmaj7, Dmaj7, Dsmaj7, Emaj7, Fmaj7, Fsmaj7, Gmaj7, Gsmaj7, Amaj7, Asmaj7, Bmaj7];


function playRandomMajor(){
    majors[Math.floor(Math.random() * 11)].audio.play();
}

function playRandomMinor(){
    minors[Math.floor(Math.random() * 11)].audio.play();
}

function playRandomMajorSeventh(){
    majorSevenths[Math.floor(Math.random() * 11)].audio.play();
}

const chords=[majors, minors, majorSevenths];
let allchords = [];
for(i = 0; i < chords.length; i++){
    allchords = allchords.concat(chords[i]);
}

function playRandomChord(){
    chords[Math.floor(Math.random()* chords.length)][Math.floor(Math.random() * 11)].audio.play();
}


userInput = document.getElementById("search-input");
output = document.getElementById("output");
resultList = document.getElementById("result-list");

userInput.addEventListener("input", () => {

    output.textContent = '';
    resultList.innerHTML = '';

    for(i = 0; i < allchords.length; i++){
        lowerAllChords = allchords[i].name.toLowerCase();
        lowerInput = userInput.value.toLowerCase();
        if(lowerAllChords.includes(lowerInput)){
            output.textContent += allchords[i].name;
            let result = document.createElement("li");
            result.textContent = allchords[i].name;
            result.classList.add("result")
            resultList.appendChild(result);
        }
    }

    if(userInput.value == ''){
        output.textContent = '';
        resultList.innerHTML = '';
    }
})