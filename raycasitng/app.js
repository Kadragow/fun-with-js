
let obs = [];
let ray;
let particle;

function setup(){
    createCanvas(600, 600);
    for(let i = 0; i < 5; i++){
        const x1 = random(width);
        const x2 = random(width);
        const y1 = random(height);
        const y2 = random(height);
        obs.push(new Obstacle(x1, y1, x2, y2));
    }
    obs.push(new Obstacle(0, 0, width, 0));
    obs.push(new Obstacle(width, 0, width, height));
    obs.push(new Obstacle(width, height, 0, height));
    obs.push(new Obstacle(0, height, 0, 0));
    particle = new Particle();
}

function draw(){
    background(0);
    for(let ob of obs){

        ob.show();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(obs);


}