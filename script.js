let mic, fft, samples, heightMult;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('white');

    heightMult = createSlider(0.1, 1.3, 1, 0);
    heightMult.position(width / 32, 30 * (height / 32));
    heightMult.size(width / 4);

    mic = new p5.AudioIn();
    fft = new p5.FFT(0, 256);

    userStartAudio().then(() => {
        mic.start();
        fft.setInput(mic);
        console.log("Audio context started.");
    }).catch(err => console.error("Failed to start audio context:", err));
}

function draw() {
    background(255, 10);

    if (!mic || !mic.enabled) {
        fill('red');
        textSize(20);
        text("Click to enable microphone", 10, 30);
        return;
    }

    samples = fft.analyze();
    for (let i = 0; i < samples.length - 1; i++) {
        if (i % 2 == 1) samples[i] *= -1;
        fill('black');
        circle(map(i, 0, samples.length - 1, 0, width), (height / 2 + (samples[i] * heightMult.value())), width / (samples.length - 1));
    }
}


const messages = [
    "Do you think your social media presence is a reflection of your true self?",
    "Do you have a vision of who you want to be?"
  
];

// Function to pick a random message
function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// Display the random message in the "message" div
document.getElementById("message").textContent = getRandomMessage();