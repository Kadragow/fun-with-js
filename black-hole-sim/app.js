const c = 30;
const G = 6;
const dt = 0.1;

let blackhole;

const particles = [];
let start, end;

function setup(){
    createCanvas(800, 800);
    ellipseMode(RADIUS);
    blackhole = new Blackhole(200, 600, 3000);

    start = height/2;
    end = height/2 - blackhole.r*2.6;
    for(let y = 0; y < height/2; y+=10){
        particles.push(new Photon(width-20,y));
    }

}

function draw(){
    background(255);
    blackhole.show();

    for(let p of particles){
        blackhole.attract(p);

        p.update();
        p.show();
    }
}