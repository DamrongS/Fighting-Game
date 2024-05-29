//Physics constants
let g = 0.982;

//UI arrays
let menuButtons = [];
let menuDivs = [];

let charactersButton = [];
let charactersButtonOther = [];

let charactersButtonMultiplayer = [];

//Control variables
let menuInitialized = false;
let characterSelectionMenuInitialized = false;
let gameStarted = false;

//music playlists
let menuPlaylist = [];

//in game display arrays
let PlayableCharacters = [
  "WhiteCharacter",
  "chibi gojo",
  "huh3",
];

let characterClasses;

//string variables
let states;
let state = "Menu";

let gameModes;
let gameMode = "";

let LocalPlayer1;
let LocalPlayer2;

let MultiplayerPlayer1;
let MultiplayerPlayer2;

function statesSetup()
{
  states = {
    Menu,
    Game,
  }

}

function gameModesSetup()
{
  gameModes = {
    Campaign,
    LocalPlay,
    Multiplayer,
    Settings,
    Credits,
  }

}

function characterClassesSetup()
{
  characterClasses = {
    WhiteCharacter: WhiteCharacter,
    chibi_gojo: WhiteCharacter,
    huh3: WhiteCharacter,
  };

}

//fonts
let streetFighterFont;

//images
let characterImages = [];

//sounds

function preload() {
  streetFighterFont = loadFont('assets/Martyric_PersonalUse.ttf');
}

async function setup() 
{
  createCanvas(1200, 800);
  statesSetup();
  gameModesSetup();
  characterClassesSetup();
  tester = new WhiteCharacter("chibi gojo", 200, 200)
}

async function draw() 
{
  background(220);

  states[state]();

}

function showMenuHTML(show=true)
{
  if(show)
  {
    for(let button of menuButtons)
      {
        button.show();
      }
  
    for(let divs of menuDivs)
      {
        divs.show();
      }
  }
  else
  {
    for(let button of menuButtons)
      {
        button.hide();
      }
  
    for(let divs of menuDivs)
      {
        divs.hide();
      }
  }
}

async function Menu()
{
  background(120);
  if(!menuInitialized)
    {
      menuDivs[0] = createP("Menu Title");
      menuDivs[0].position(width/15, height/1.4);
      menuDivs[0].style('font-size', '64px');
      menuDivs[0].style('font-family', 'StreetFigtherFont');
      menuDivs[0].style('display', 'flex');
      menuDivs[0].style('justify-content', 'center');
      menuDivs[0].style('color', 'orange');

      menuButtons[0] = createButton("Campaign (W.I.P)");
      menuButtons[0].position(width/3, height/3)
      menuButtons[0].style('font-size', '28px');
      menuButtons[0].style('font-family', 'StreetFigtherFont');
      menuButtons[0].style('display', 'flex');
      menuButtons[0].style('justify-content', 'center');
      menuButtons[0].mousePressed(() => {
        buttonNo(0);
      });

      menuButtons[1] = createButton("Play Locally");
      menuButtons[1].position((width/3) - (width/3)/20, height/2.2)
      menuButtons[1].style('font-size', '28px');
      menuButtons[1].style('font-family', 'StreetFigtherFont');
      menuButtons[1].mousePressed(() => {
        gameMode = "LocalPlay";
        state = "Game";
        gameStarted = false;
        console.log(state, gameMode, gameStarted);
      });

      menuButtons[2] = createButton("Multiplayer (W.I.P)");
      menuButtons[2].position((width/3) - (width/3)/6.5, height/1.74)
      menuButtons[2].style('font-size', '28px');
      menuButtons[2].style('font-family', 'StreetFigtherFont');
      menuButtons[2].mousePressed(() => {
        buttonNo(2);
      });

      menuButtons[3] = createButton("Settings");
      menuButtons[3].position((width/3) - (width/3)/6, height/1.44)
      menuButtons[3].style('font-size', '28px');
      menuButtons[3].style('font-family', 'StreetFigtherFont');
      menuButtons[3].mousePressed(() => {
        buttonNo(3);
      });

      menuButtons[4] = createButton("Credits");
      menuButtons[4].position((width/2.1) - (width/3)/6, height/1.44)
      menuButtons[4].style('font-size', '28px');
      menuButtons[4].style('font-family', 'StreetFigtherFont');
      menuButtons[4].mousePressed(() => {
        buttonNo(4);
      });

      for(let button of menuButtons)
        {
          button.class("standardButton");
        }

      menuInitialized = true;
    }

  showMenuHTML(true);

}

async function buttonNo(value)
{
  menuButtons[value].html("Not completed");
  await wait(2)
  menuButtons[0].html("Campaign (W.I.P)");
  menuButtons[1].html("Play Locally");
  menuButtons[2].html("Multiplayer (W.I.P)");
  menuButtons[3].html("Settings");
  menuButtons[4].html("Credits");
}

async function Campaign()
{
  console.log("Sorry no");
}

async function LocalPlay()
{
  if(gameStarted)
  {
    tester.draw();
    tester.update();
  }
  else if(!gameStarted)
  {
    if(!characterSelectionMenuInitialized)
      {
        for(let i = 0; i < PlayableCharacters.length; i++)
          {
            charactersButton[i] = createButton("");
            charactersButton[i].size(50, 50)
            charactersButton[i].position(50 + i*50, 250);
            charactersButton[i].style('background', `url(assets/${PlayableCharacters[i]}.png) no-repeat center center`);
            charactersButton[i].style('background-size', 'cover');
            charactersButton[i].mousePressed(() => {
              console.log(PlayableCharacters[i]);
              let charClass = characterClasses[PlayableCharacters[i]];
              LocalPlayer1 = new charClass(50 + i * 50, 250);
            })
          }

        for(let i = 0; i < PlayableCharacters.length; i++)
          {
            charactersButtonOther[i] = createButton("");
            charactersButtonOther[i].size(50, 50)
            charactersButtonOther[i].position((width-100) - i*50, 250);
            charactersButtonOther[i].style('background', `url(assets/${PlayableCharacters[i]}.png) no-repeat center center`);
            charactersButtonOther[i].style('background-size', 'cover');
            charactersButtonOther[i].mousePressed(() => {
              console.log(PlayableCharacters[i]);
              let charClass = characterClasses[PlayableCharacters[i]];
              LocalPlayer2 = new charClass((width - 100) - i * 50, 250);
            })
          }

          characterSelectionMenuInitialized = true
      }
    else
    {

    }
  }
}

async function Multiplayer()
{
  console.log("Sorry no");
}

async function Settings()
{
  console.log("Sorry no");
}

async function Credits()
{
  console.log("Sorry no");
}

function Game() {
  showMenuHTML(false);
  if (gameMode !== undefined && gameMode !== "")
  {
    if (typeof gameModes[gameMode] === 'function')
    {
      gameModes[gameMode]();
    } 
    else
    {
      console.error(`No function found for game mode: ${gameMode}`);
    }
  }
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