var TIME_DELTA = 0.05;
var playing = false;

var count = 0;
var totalTime = 0;

function mouseClicked() {
    playing = !playing;
}

// const MULT = 1000000
// const EARTH_MASS = 5972198600000000000000000 / MULT;
// const SUN_MASS = 1989000000000000000000000000000 / MULT;

const EARTH_MASS = 10;
const SUN_MASS = 1000;
const NUMBER_PLANETS = 40;

let galaxy = new Galaxy(75, SUN_MASS);


function perTimer() {
    if (!playing) return;
    totalTime += TIME_DELTA;
    galaxy.update(TIME_DELTA);
}

let oscs = [];

function setup() {
    createCanvas(displayWidth, displayHeight);
    background(0);
    // The sun osc
    oscs.push(new p5.Oscillator());
    oscs[0].freq(displayWidth/2);

    for (let i = 0; i < NUMBER_PLANETS; i++) {
        let radMass = Math.random() * 50;
        let x = Math.random() * displayWidth;
        let y = Math.random() * displayHeight;
        galaxy.addPlanet(radMass, radMass, x, y);
        oscs.push(new p5.Oscillator());
        oscs[i+1].freq(x);
        oscs[i+1].start();
    }
    setInterval(perTimer, TIME_DELTA);
}

function draw() {
    // clear();
    let planets = galaxy.getPlanets();
    let sun = galaxy.getSun();
    oscs[0].freq(sun.getPosition().x + 40);
    stroke(20, 1);
    fill(255, 1);

    for (let i = 0; i < planets.length; i++) {
        ellipse(planets[i].getPosition().x, planets[i].getPosition().y, planets[i].getRadius(), planets[i].getRadius());
        if (planets[i].getPosition().x > displayWidth || planets[i].getPosition().x < 0 || planets[i].getPosition().y > displayHeight || planets[i].getPosition().y < 0) {
            oscs[i+1].amp(0);
        } else {
            oscs[i+1].amp(1);
        }
        oscs[i+1].freq(planets[i].getPosition().x + 40);
    }
    ellipse(sun.getPosition().x, sun.getPosition().y, sun.getRadius(), sun.getRadius());
}
