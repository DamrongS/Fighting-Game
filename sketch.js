let g = 0.982;

let tester;

let menuButtons = [];
let menuDivs = [];

let menuInitialized = false;
let characterSelectionMenuInitialized = false;

let PlayableCharacters = [
  "WhiteCharacter",
];

let states;
let state = "Menu";

function statesSetup()
{
  states = {
    Menu,
    Game,
  }
}

async function setup() 
{
  createCanvas(1200, 800);
  statesSetup();
  tester = new WhiteCharacter("chibi gojo", 200, 200)
}

async function draw() 
{
  background(220);

  states[state]();

}

function Menu()
{
  background(120);
  if(!menuInitialized)
    {
      menuDivs[0] = createP("Menu Title");
      menuDivs[0].position(width/15, height/1.4);
      menuDivs[0].style('font-size', '64px');

      menuButtons[0] = createButton("Play Locally");
      menuButtons[0].position(width/3, height/2)

      for(let button of menuButtons)
        {
          button.class("button-48");
        }

      menuInitialized = true;
    }
}

function Game()
{
  tester.draw();
  tester.update();
}

function keyPressed()
{
  if(key == " ")
  {
    tester.Combat();
  }
  if(keyCode == LEFT_ARROW)
  {
    tester.WalkLeft();
  }
  if(keyCode == RIGHT_ARROW)
  {
    tester.WalkRight();
  }
  if(keyCode == UP_ARROW)
    {
      tester.Jump();
    }
  if(key == "f")
    {
      state = "Game";
    }
}

function keyReleased()
{
  if(keyCode == LEFT_ARROW)
  {
    tester.WalkLeft(0);
  }
  if(keyCode == RIGHT_ARROW)
  {
    tester.WalkRight(0);
  }
}