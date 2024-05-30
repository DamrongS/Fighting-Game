//Physics constants
let g = 0.982;

//UI arrays
let menuButtons = [];
let menuDivs = [];

let charactersButton = [];
let charactersButtonOther = [];

let charactersButtonMultiplayer = [];

let settingsUI = [];

//Control variables
let menuInitialized = false;
let characterSelectionMenuInitialized = false;
let gameStarted = false;
let settingsInitialized = false;

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
    Settings,
    Credits,
  }

}

function gameModesSetup()
{
  gameModes = {
    Campaign,
    LocalPlay,
    Multiplayer,
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
let clouds = [];

//sounds

let playlistManager = {
  currentTrackIndex: 0,
  tracks: [],
  trackPaths: [],
  volume: 1.0,
  
  // Add a track to the playlist
  addTrack: function (trackPath) {
    let track = loadSound(trackPath, () => {
      track.onended(() => this.nextTrack());
      track.setVolume(this.volume);
    });
    this.tracks.push(track);
    this.trackPaths.push(trackPath);
  },
  
  // Play the current track
  play: function () {
    if (this.tracks.length > 0) {
      console.log("Playing " + this.getCurrentTrackPath().replace("sounds/", "") + " Next...");
      this.tracks[this.currentTrackIndex].play();
    }
  },
  
  // Stop the current track
  stop: function () {
    if (this.tracks.length > 0) {
      this.tracks[this.currentTrackIndex].stop();
    }
  },
  
  // Move to the next track and play it
  nextTrack: function () {
    this.stop();
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.play();
  },

  setVolume: function (vol) {
    this.volume = vol;
    for (let track of this.tracks) {
      track.setVolume(this.volume);
    }
  },

  shuffle: function () {
    //this.stop();
    this.tracks = this.shuffleArray(this.tracks);
    this.trackPaths = this.shuffleArray(this.trackPaths);
    this.currentTrackIndex = 0;
    //this.play();
  },

  // Helper function to shuffle an array
  shuffleArray: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  getCurrentTrackPath: function () {
    return this.trackPaths[this.currentTrackIndex];
  }
};

function preload() {
  streetFighterFont = loadFont('assets/Martyric_PersonalUse.ttf');

  playlistManager.addTrack("sounds/boss.wav");
  playlistManager.addTrack("sounds/brah.mp3");
  playlistManager.addTrack("sounds/Cart Rush.mp3");
  playlistManager.addTrack("sounds/dominants.wav");
  playlistManager.addTrack("sounds/emilyjazzstandard.wav");
  playlistManager.addTrack("sounds/funky trap beat.mp3");
  playlistManager.addTrack("sounds/jeg er stewie wonder.mp3");
  playlistManager.addTrack("sounds/Market Chaos.mp3");
  playlistManager.addTrack("sounds/morecookn.wav");
  playlistManager.addTrack("sounds/release cut pano.mp3");
  playlistManager.addTrack("sounds/remastered verson 3.mp3");
  playlistManager.addTrack("sounds/Run..mp3");
  playlistManager.addTrack("sounds/themonkeyman.mp3");
  playlistManager.addTrack("sounds/undertalesmthn.wav");
  playlistManager.addTrack("sounds/We cooked.mp3");
}

async function setup() 
{
  createCanvas(1200, 800);
  statesSetup();
  gameModesSetup();
  characterClassesSetup();

  for(let i = 0; i < 10; i++)
    {
      clouds[i] = new Cloud(random(0, width), random(0, height), 0)
    }

  tester = new WhiteCharacter("chibi gojo", 200, 200)

  playlistManager.shuffle();

  playlistManager.stop();
  playlistManager.play();
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

  for(let i = 0; i < clouds.length-1; i++)
    {
      clouds[i].draw();
      clouds[i].update();
    }

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
        state = "Settings";
        gameStarted = false;
        console.log(state, gameMode, gameStarted);
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
  background(120);
  showMenuHTML(false);
  if(!settingsInitialized)
  {
    settingsUI[0] = createButton("X")
    settingsUI[0].position(0, 0)
    settingsUI[0].size(50, 50)
    settingsUI[0].style('font-size', '28px');
    settingsUI[0].style('font-family', 'StreetFigtherFont');
    settingsUI[0].class("standardButton");
    settingsUI[0].mousePressed(() => {
      state = "Menu";
      for(let UI of settingsUI)
      {
        UI.hide();
      }
      settingsUI[0].hide();
    });

    settingsUI[1] = createP("Settings")
    settingsUI[1].position((width/2) - 140, height/15);
    settingsUI[1].style('font-size', '64px');
    settingsUI[1].style('font-family', 'StreetFigtherFont');
    settingsUI[1].style('display', 'flex');
    settingsUI[1].style('justify-content', 'center');
    settingsUI[1].style('color', 'orange');

    settingsUI[2] = createP("Music")
    settingsUI[2].position((width/2) - 140, height/4);
    settingsUI[2].style('font-size', '32px');
    settingsUI[2].style('font-family', 'StreetFigtherFont');
    settingsUI[2].style('display', 'flex');
    settingsUI[2].style('justify-content', 'center');
    settingsUI[2].style('color', 'orange');

    settingsUI[6] = createP("100%")
    settingsUI[6].position((width/2), height/4);
    settingsUI[6].style('font-size', '32px');
    settingsUI[6].style('display', 'flex');
    settingsUI[6].style('justify-content', 'center');
    settingsUI[6].style('color', 'black');

    settingsUI[3] = createSlider(0, 1, 1, 0.01);
    settingsUI[3].position((width/2) - 140, height/2.8);
    settingsUI[3].input(() => {
      playlistManager.setVolume(settingsUI[3].value());
      settingsUI[6].html(round(settingsUI[3].value() * 100)+"%", 0);
    });

    settingsUI[4] = createP("Sound Effects")
    settingsUI[4].position((width/2) - 140, height/2.6);
    settingsUI[4].style('font-size', '32px');
    settingsUI[4].style('font-family', 'StreetFigtherFont');
    settingsUI[4].style('display', 'flex');
    settingsUI[4].style('justify-content', 'center');
    settingsUI[4].style('color', 'orange');

    settingsUI[7] = createP("100%")
    settingsUI[7].position((width/2) + 60, height/2.6);
    settingsUI[7].style('font-size', '32px');
    settingsUI[7].style('display', 'flex');
    settingsUI[7].style('justify-content', 'center');
    settingsUI[7].style('color', 'black');

    settingsUI[5] = createSlider(0, 1, 1, 0.01);
    settingsUI[5].position((width/2) - 140, height/2);
    settingsUI[5].input(() => {
      settingsUI[7].html(round(settingsUI[5].value() * 100)+"%", 0);
    });

    settingsInitialized = true
  }

  for(let UI of settingsUI)
  {
    UI.show();
  }

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
      console.log(gameMode)
    } 
    else
    {
      console.error(`No function found for game mode: ${gameMode}`);
    }
  }
}

function Playlist()
{

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
  //console.log(keyCode);
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