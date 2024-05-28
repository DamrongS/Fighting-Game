let g = 0.982;

let tester;

async function setup() 
{
  createCanvas(1600, 800);
  tester = new WhiteCharacter("chibi gojo", 200, 200)
}

async function draw() 
{
  background(220);
  tester.draw();
}

function keyPressed()
{
  if(key == " ")
  {
    tester.Combat();
  }
}