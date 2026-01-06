let song;
let amp;
let fileInput;
let smoothLevel = 0;
let beatFlash = 0;
let mic;
let useMic = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(5);
  strokeCap(SQUARE);

  //mikrofon
  mic = new p5.AudioIn();
  mic.start();

  //amplitude
  amp = new p5.Amplitude();
  amp.setInput(mic);

  // 🎵 tlačítko pro výběr hudby
  fileInput = createFileInput(handleFile);
  fileInput.position(20, 20);
  fileInput.style('z-index', '10');
}

//výběr hudby
function handleFile(file) {
  if (file.type === 'audio') {

    userStartAudio();

    // zastavit předchozí song
    if (song) {
      song.stop();
    }

    song = loadSound(file.data, () => {
      song.loop();
    });

  } else {
    alert('Prosím vyber audio soubor (mp3, wav, ogg)');
  }
}

function mousePressed() {
  userStartAudio();
  mic.start();
}

//zvětšování okna
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//klávesové funkce
function keyPressed() {
  // pauza / play
  if (key === ' ') {
    if (song.isPlaying()) song.pause();
    else song.loop();
  }

  // 🖥️ FULLSCREEN ZAPNOUT
  if (key === 'F' || key === 'f') {
    fullscreen(true);
  }  
}

//kresba v plátně - linie, barvy, neviditelný kruh v pozadí
function draw() {
  background(0, 0, 99, 90);

  let level = constrain(amp.getLevel() * 4, 0, 0.4);
  
  let lines = int(map(level, 0, 0.3, 1, 5000)); // počet čar

  let cx = width / 2;
  let cy = height / 2;
  
  let r = map(level, 0, 0.3, 50, 1000); //radius kruhu 

  for (let i = 0; i < lines; i++) {
    let horizontal = random() > 0.5;
    let length = random(2, map(level, 0, 0.3, 10, 100)); //délka čar

    let hue = random(360); 
    stroke(hue, 100, 100, 100);

    let x, y, x2, y2;

    if (horizontal) {
      x = random(cx - r, cx + r - length);
      y = random(cy - r, cy + r);
      x2 = x + length;
      y2 = y;
    } else {
      x = random(cx - r, cx + r);
      y = random(cy - r, cy + r - length);
      x2 = x;
      y2 = y + length;
    }

    if (
      dist(x, y, cx, cy) < r &&
      dist(x2, y2, cx, cy) < r
    ) {
      line(x, y, x2, y2);
    }
  }

  smoothLevel = lerp(smoothLevel, level, 0.15);

// detekce beatu
if (smoothLevel > 0.18) {
  beatFlash = 1;
}

beatFlash *= 0.9;

// základ + beat boost
let fps = 18 + beatFlash * 40;
frameRate(fps);
}