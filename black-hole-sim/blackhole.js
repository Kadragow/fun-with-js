class Blackhole {
    constructor(x, y, m){
        this.pos = createVector(x,y);
        this.mass = m;
        this.r = (2*G*this.mass)/(c*c);
        console.log(this.r);
    }

    attract(photon){
        const force = p5.Vector.sub(this.pos, photon.pos);
        const theta = force.heading();
        const r = force.mag();
        const fg = G * this.mass / (r*r);
        // let deltaTheta = -fg * (dt/c) * Math.sin(photon.theta - theta);
        // deltaTheta = deltaTheta/Math.abs(1.0 - 2.0 * G * this.mass / (r * c * c));
        // photon.theta += deltaTheta;
        // photon.velocity = p5.Vector.fromAngle(photon.theta);
        // photon.velocity.setMag(c);
        force.setMag(fg);
        photon.velocity.add(force);
        photon.velocity.limit(c);
    }

    show(){
        fill(0);
        noStroke();
        circle(this.pos.x, this.pos.y, this.r);

        noFill();
        stroke(100,100);
        strokeWeight(100);
        circle(this.pos.x, this.pos.y, this.r*8+10);

        stroke(150,100);
        strokeWeight(150);
        circle(this.pos.x, this.pos.y, this.r*5);


    }

}