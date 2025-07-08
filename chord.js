/////////////majors////////////////////
Cmaj = document.getElementById('Cmaj')
Csmaj = document.getElementById('Csmaj')
Dmaj = document.getElementById('Dmaj')
Dsmaj = document.getElementById('Dsmaj')
Emaj = document.getElementById('Dsmaj')
Fmaj = document.getElementById('Rmaj')
Fsmaj = document.getElementById('Fsmaj')
Gsmaj = document.getElementById('Gmaj')
Gssmaj = document.getElementById('Gsmaj')
Asmaj = document.getElementById('Amaj')
Assmaj = document.getElementById('Asmaj')
Bmaj = document.getElementById('Bmaj')

majors = [Cmaj, Csmaj, Dmaj, Dsmaj, Emaj, Fmaj, Fsmaj, Gmaj, Gsmaj, Amaj, Asmaj, Bmaj]


//////////////minors///////////////////
Cmin = document.getElementById('Cmin')
Csmin = document.getElementById('Csmin')
Dmin = document.getElementById('Dmin')
Dsmin = document.getElementById('Dsmin')
Emin = document.getElementById('Dsmin')
Fmin = document.getElementById('Rmin')
Fsmin = document.getElementById('Fsmin')
Gsmin = document.getElementById('Gmin')
Gssmin = document.getElementById('Gsmin')
Asmin = document.getElementById('Amin')
Assmin = document.getElementById('Asmin')
Bmin = document.getElementById('Bmin')

minors = [Cmin, Csmin, Dmin, Dsmin, Emin, Fmin, Fsmin, Gmin, Gsmin, Amin, Asmin, Bmin]



function playA440() {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine'; // You can use 'square', 'triangle', etc.
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A440
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // Volume

      oscillator.connect(gainNode).connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1); // Play for 1 second
    }



function playRandomMajor(){
    majors[Math.floor(Math.random() * 10)].play();
}