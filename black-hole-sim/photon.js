class Photon {
    constructor(x,y){
        this.pos = createVector(x,y);
        this.velocity = createVector(-c, 0);
        this.theta = 0;
        this.trail = [];
    }

    update(){
        this.trail.push(this.pos.copy());
        const dV = this.velocity.copy();
        dV.mult(dt);
        this.pos.add(dV);

        if(this.trail.length>2000){
            this.trail.splice(0,1);
        }
    }

    show(){
        strokeWeight(4);
        stroke(150, 150, 0);
        point(this.pos.x, this.pos.y);

        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();

        for(let v of this.trail){
            vertex(v.x, v.y);
        }

        endShape();
    }

}
