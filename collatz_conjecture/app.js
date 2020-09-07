
let n_max = 5000;
let steps = 1;
let length = 10;
let angle = Math.PI/16;


function setup(){
    createCanvas(1600, 1000);
    background(0);
}

function draw(){

    let sequence = [];

    let n = steps;
    do{
        sequence.push(n);
        n = collatz(n);
    }while( n!= 1);
    sequence.push(1);
    sequence.reverse();
    resetMatrix();
    translate(width/2,height);
    stroke(Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256), 50);

    for(let j = 0; j < sequence.length; j++){
        let val = sequence[j];
        if(val%2===0){
            rotate(angle);
        }else{
            rotate(-angle);
        }
        
        strokeWeight(8);
        line(0,0,0,-length);
        translate(0, -length);
    }
    steps++;

    console.log(n);
    if(steps === n_max) noLoop();

}

function collatz(n){
    if(n%2 === 0){
        return n / 2;
    }else{
        return (n*3 + 1)/2;
    }
}