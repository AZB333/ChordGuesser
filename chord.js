/////////////majors////////////////////
Cmaj = document.getElementById('Cmaj');
Csmaj = document.getElementById('Csmaj');
Dmaj = document.getElementById('Dmaj');
Dsmaj = document.getElementById('Dsmaj');
Emaj = document.getElementById('Emaj');
Fmaj = document.getElementById('Fmaj');
Fsmaj = document.getElementById('Fsmaj');
Gsmaj = document.getElementById('Gmaj');
Gssmaj = document.getElementById('Gsmaj');
Asmaj = document.getElementById('Amaj');
Assmaj = document.getElementById('Asmaj');
Bmaj = document.getElementById('Bmaj');

majors = [Cmaj, Csmaj, Dmaj, Dsmaj, Emaj, Fmaj, Fsmaj, Gmaj, Gsmaj, Amaj, Asmaj, Bmaj];


//////////////minors///////////////////
Cmin = document.getElementById('Cmin');
Csmin = document.getElementById('Csmin');
Dmin = document.getElementById('Dmin');
Dsmin = document.getElementById('Dsmin');
Emin = document.getElementById('Emin');
Fmin = document.getElementById('Fmin');
Fsmin = document.getElementById('Fsmin');
Gmin = document.getElementById('Gmin');
Gsmin = document.getElementById('Gsmin');
Amin = document.getElementById('Amin');
Asmin = document.getElementById('Asmin');
Bmin = document.getElementById('Bmin');

minors = [Cmin, Csmin, Dmin, Dsmin, Emin, Fmin, Fsmin, Gmin, Gsmin, Amin, Asmin, Bmin];

function playRandomMajor(){
    majors[Math.floor(Math.random() * 11)].play();
}

function playRandomMinor(){
    minors[Math.floor(Math.random() * 11)].play();
}

chords=[playRandomMajor, playRandomMinor];

function playRandomChord(){
    chords[Math.floor(Math.random()* 2)]();
}