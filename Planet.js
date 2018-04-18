const MULT = 100000000 * 1000

const G = 0.0000000000667 * MULT;

function Planet(radius, mass, initX, initY) {
    this.radius = radius;
    this.mass = mass;
    this.position = {
        'x': initX,
        'y': initY
    };
    this.velocity = {
        'x': 0,
        'y': 0
    };
    this.force = {
        'x': 0,
        'y': 0
    };
}

Planet.prototype.addForceFromPlanet = function(that) {
    if (this == that) return;

    let deltaX = this.position.x - that.position.x;
    let deltaY = this.position.y - that.position.y;
    let rSquared = deltaX*deltaX + deltaY*deltaY;
    let r = Math.sqrt(rSquared);

    let F = G*this.mass*that.mass / rSquared;

    let Fx = F*(deltaX/r);
    let Fy = F*(deltaY/r);

    this.force.x -= Fx;
    this.force.y -= Fy;
}

Planet.prototype.update = function(timeStep) {
    let ax = this.force.x / this.mass * 0.2;
    let ay = this.force.y / this.mass * 0.2;

    this.velocity.x += ax*timeStep;
    this.velocity.y += ay*timeStep;

    this.position.x += this.velocity.x*timeStep;
    this.position.y += this.velocity.y*timeStep;

    this.force.x = 0;
    this.force.y = 0;
}

Planet.prototype.getPosition = function() {
    return this.position;
}

Planet.prototype.getRadius = function() {
    return this.radius;
}
