class Particle{
    constructor(){
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for(let i = 0; i < 360; i+=1){
            this.rays.push(new Ray(this.pos, radians(i))); 
        }
    }

    show(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, 16);
        for(let ray of this.rays){
            ray.show();
        }
    }

    look(obs){
        for(let ray of this.rays){
            let closest = null;
            let best = Infinity;
            for(let ob of obs){
                const pt = ray.cast(ob);
                if(pt){
                    const d = p5.Vector.dist(this.pos, pt);
                    if(d < best){
                        best = d;
                        closest = pt;
                    }
                    best = min(d, best);
                }
            }
            if(closest){
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            
        }
    }

    update(x, y){
        this.pos.set(x,y);
    }
}