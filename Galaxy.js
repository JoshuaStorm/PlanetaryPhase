
let centerX = screen.width/2;
let centerY = screen.height/2;

function Galaxy(sunRadius, sunMass) {
    this.sun = new Planet(sunRadius, sunMass, centerX, centerY)
    this.planets = [];
}


Galaxy.prototype.addPlanet = function(radius, mass, initX, initY) {
    this.planets.push(new Planet(radius, mass, initX, initY));
}

Galaxy.prototype.update = function(timeStep) {
    for (let i = 0; i < this.planets.length; i++) {
        for (let j = 0; j < this.planets.length; j++) {
            this.planets[i].addForceFromPlanet(this.planets[j]);
            this.planets[j].addForceFromPlanet(this.planets[i]);
        }
    }

    for (let i = 0; i < this.planets.length; i++) {
        this.sun.addForceFromPlanet(this.planets[i]);
        this.planets[i].addForceFromPlanet(this.sun);
    }

    for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].update(timeStep);
    }
    this.sun.update(timeStep);
}

Galaxy.prototype.getPlanets = function() {
    return this.planets;
}

Galaxy.prototype.getSun = function() {
    return this.sun;
}
