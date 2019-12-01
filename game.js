var GAME_WIDTH = 500; 
var GAME_HEIGHT = 500;

var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: GAME_WIDTH, height: GAME_HEIGHT, backgroundColor: 0x055D07});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var beginWave = true;

/*
    Create game scene variables 
*/
var openingScene, gameScene_1, gameScene_2, gameScene_3, 
    gameScene_4, instructionScene, gameOverScene, creditScene, inventoryScene;

/*
    Menu button variables 
*/
var start_button, instruction_button, credits_button, 
    quit_game_button, credits, gameover, quit_credits_button, 
    quit_game_over_button, quit_instructions_button;

/*
    Create end variables 
*/
var goodJob, youWin, next, quit_game_button_2, quit_game_button_3, quit_game_button_4;

/*
    Create Player 1 variables 
*/
var sprite1_bottom, sprite1_left_side, sprite1_right_side, sprite1_top;

/*
    Create Player 2 variables 
*/
var sprite2_bottom, sprite2_left_side, sprite2_right_side, sprite2_top;

/*
    Create collision variables  
*/
var hitFromAbove, hitFromBelow, hitFromLeft, hitFromRight;


// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
openingScene = new PIXI.Container();
openingScene.visible = true;

gameScene_1 = new PIXI.Container();
gameScene_1.visible = false;

iventoryScene = new PIXI.Container();
iventoryScene = false;

gameScene_3 = new PIXI.Container();
gameScene_1.visible = false;

gameScene_4 = new PIXI.Container();
gameScene_1.visible = false;

instructionScene = new PIXI.Container();
instructionScene.visible = false;

gameOverScene = new PIXI.Container();
gameOverScene.visible = false;

creditScene = new PIXI.Container();
creditScene.visible = false;

inventoryScene = new PIXI.Container();
inventoryScene.visible = false;

PIXI.loader
    .load(setup);


// This will initialize all our sprites and start our gameloop
function setup()
{
    openingScene.interactive = true;
    openingScene.visible = true;

    start_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Start_Button.png"));
    instruction_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_How_To_Play.png"));
    credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Credits_Button.png"));

    openingScene.addChild(start_button);
    openingScene.addChild(instruction_button);
    openingScene.addChild(credits_button);

    start_button.anchor.x = .5;
    start_button.anchor.y = .5;
    start_button.position.x = 250;
    start_button.position.y = 150;

    instruction_button.anchor.x = .5;
    instruction_button.anchor.y = .5;
    instruction_button.position.x = 250;
    instruction_button.position.y = 250;

    credits_button.anchor.x = .5;
    credits_button.anchor.y = .5;
    credits_button.position.x = 250;
    credits_button.position.y = 350;

    start_button.interactive = false;
    instruction_button.interactive = false;
    credits_button.interactive = false;

    /*
            INSTRUCTION SCENE SETUP
    */
    instructionScene.interactive = false;
    instructionScene.visible = false;

    quit_instructions_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));

    instructionScene.addChild(quit_instructions_button);
    quit_instructions_button.anchor.x = .5;
    quit_instructions_button.anchor.y = .5;
    quit_instructions_button.position.x = 450;
    quit_instructions_button.position.y = 20;
    
    quit_instructions_button.interactive = false;

    instructions = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Instructions.png"));

    // instructionScene.addChild(instructions);
    // instructions.anchor.x = .5;
    // instructions.anchor.y = .5;
    // instructions.position.x = 250;
    // instructions.position.y = 250;

    /*
            END GAME SCENE SET UP  
    */
    gameOverScene.interactive = false;
    gameOverScene.visible = false;

    gameover = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Game_Over.png"));
    gameOverScene.addChild(gameover);

    gameover.anchor.x = .5;
    gameover.anchor.y = .5;
    gameover.position.x = 250;
    gameover.position.y = 250;

    quit_game_over_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));

    gameOverScene.addChild(quit_game_over_button);
    quit_game_over_button.anchor.x = .5;
    quit_game_over_button.anchor.y = .5;
    quit_game_over_button.position.x = 450;
    quit_game_over_button.position.y = 20;
    
    quit_game_over_button.interactive = false;

    /*
            CREDITS
    */

    creditScene.interactive = false;
    creditScene.visible = false;

    let credits_text = new PIXI.Text(
        'CREDITS\n\n Samantha Muellner, Kyle Watson, \nJacob Kaufman, and Steven Enriquez',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 22,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    credits_text.x = GAME_WIDTH/2;
    credits_text.y = 200;
    credits_text.anchor.x = .5;
    credits_text.anchor.y = .5;
    creditScene.addChild(credits_text);

    quit_credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    

    creditScene.addChild(quit_credits_button);
    quit_credits_button.anchor.x = .5;
    quit_credits_button.anchor.y = .5;
    quit_credits_button.position.x = 450;
    quit_credits_button.position.y = 20;
    
    quit_credits_button.interactive = false;

    quit_game_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    gameScene_1.addChild(quit_game_button);
     
    player = new PIXI.Sprite(PIXI.Texture.from("Sprites/Male_Player/Male_Player1.png"));
    gameScene_1.addChild(player);
    
    quit_game_inventory = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    inventoryScene.addChild(quit_game_inventory);

    animate();
}

function setUpSceneOne()
{
    // do something
}

function setUpSceneTwo()
{
    // do something
}

function setUpSceneThree()
{
    // do something
}

function setUpSceneFour()
{
    // do something
}

// all the code that will run at the end of the game
function end()
{
    gameScene_1.interactive = false;
    gameScene_2.interactive = false;
    gameScene_3.interactive = false;
    gameScene_4.interactive = false;
    
    gameOverScene.visible = true;
    gameOverScene.interactive = true;
}

function start()
{
    openingScene.interactive = false;
    start_button.interactive = false;
    instruction_button.interactive = false;
    credits_button.interactive = false;
    openingScene.visible = false;

    gameScene_1.visible = true;
    gameScene_1.interactive = true;
}

function quit()
{
    // if quit, show game over scene and get ride of game scene
    gameOverScene.interactive = true;
    gameOverScene.visible = true;

    gameScene_1.visible = false;
    gameScene_1.interactive = false;
    gameScene_2.visible = false;
    gameScene_2.interactive = false;
    gameScene_3.visible = false;
    gameScene_3.interactive = false;
    gameScene_4.visible = false;
    gameScene_4.interactive = false;

    renderer.render(gameOverScene);
}

// used for quit_credits and quit_instructions to take you back to the home screen
function quit_to_home()
{
    instructionScene.interactive = false;
    instructionScene.visible = false;
    openingScene.interactive = true;
    openingScene.visible = true;

    renderer.render(openingScene);
}

function quit_gameover()
{
    gameOverScene.interactive = false;
    gameOverScene.visible = false;
    openingScene.interactive = true;
    openingScene.visible = true;
    inve

    renderer.render(openingScene);
}

function playCredits()
{
    gameScene_4.interactive = false;
    gameScene_4.visible = false;
    creditScene.visible = true;
    creditScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    renderer.render(creditScene);
}

function instructionHandler(e)
{
    instructionScene.visible = true;
    instructionScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    renderer.render(instructionScene);
}

function collisionBetween(sprite1, sprite2)
{
    sprite1_bottom = sprite1.y + sprite1.height/4;
    sprite1_top = sprite1.y - sprite1.height/4;
    sprite1_right_side = sprite1.x + sprite1.width/2;
    sprite1_left_side = sprite1.x - sprite1.width/2;

    sprite2_bottom = sprite2.y + sprite2.height/4;
    sprite2_top = sprite2.y - sprite2.height/4;
    sprite2_right_side = sprite2.x + sprite2.width;
    sprite2_left_side = sprite2.x - sprite2.width/6;


    hitFromAbove = (sprite1_bottom >= sprite2_top) 
                        && (sprite1_top <= sprite2_top)
                        && (sprite1.x > sprite2_left_side) 
                        && (sprite1.x < sprite2_right_side);

    hitFromBelow = (sprite1_top <= sprite2_bottom) 
                        && (sprite1_bottom >= sprite2_bottom) 
                        && (sprite1.x > sprite2_left_side) 
                        && (sprite1.x < sprite2_right_side);

    hitFromLeft = (sprite1_right_side >= sprite2_left_side) 
                        && (sprite1_left_side <= sprite2_left_side)
                        && (sprite1.y > sprite2_top) 
                        && (sprite1.y < sprite2_bottom);

    hitFromRight = (sprite1_left_side <= sprite2_right_side) 
                        && (sprite1_right_side >= sprite2_right_side)
                        && (sprite1.y > sprite2_top) 
                        && (sprite1.y < sprite2_bottom);

    return hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight;
}

function finished()
{
    playCredits();
}

var zombies = [];
var inventoryPage = false;
var amount_of_zombies  = 10;

var bullet_speed = 5;
var bullets = [];

var golds = [];
var silvers = [];
var bronzes = [];

var amount_of_items = 10;

var zombieSpeed = .2;


function startWave ()
{
    for (index  = 0; index < amount_of_zombies; index++)
    {
        zombie = new PIXI.Sprite(PIXI.Texture.from("Sprites/Monsters/Golems/Gold_Golum_Sword1.png"));
        zombies.push(zombie);

        zombie.x = (Math.random() * 400);
        zombie.y = (Math.random()* 400);
        gameScene_1.addChild(zombie);
    }

    var item;

    /*for (index = 0; index < amount_of_items; index++)
    {
        item = (Math.random() * 3) | 0;

        if(item == 0)
        {
            gold = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Gold_Bar.png"));
        }
    }*/


    beginWave = false;
    amount_of_zombies += 2;
}

function moveZombies( zombie )
{
    if(zombie.position.x < player.position.x) {
        zombie.position.x = zombie.position.x + 1 * zombieSpeed;
      }
      // move the enemy left
      else if(zombie.position.x > player.position.x) {
        zombie.position.x = zombie.position.x - 1 * zombieSpeed;
      }
      // move the enemy down
      if(zombie.position.y < player.position.y) {
        zombie.position.y = zombie.position.y + 1 * zombieSpeed;
      }
      // move the enemy up
      else if(zombie.position.y > player.position.y) {
        zombie.position.y = zombie.position.y - 1 * zombieSpeed;
      }
}

function animate()
{
    requestAnimationFrame(animate);

    if(openingScene.interactive)
    {
        start_button.interactive = true;
        instruction_button.interactive = true;
        credits_button.interactive = true;
        
        start_button.on('mousedown', start);
        instruction_button.on('mousedown', instructionHandler);
        credits_button.on('mousedown', playCredits);

        renderer.render(openingScene);
    }
    
    // HANLDING SCENE 1
    else if(gameScene_1.interactive)
    {
        // create if-statement that will end game by calling quit()

        // do something

        if (inventoryPage)
        {
            quit_game_inventory.interactive = true;
            quit_game_inventory.on('mousedown', quit);
            
            document.addEventListener('keydown', inventoryPageHandler);

            renderer.render(inventoryScene);
        }
        else
        {
            quit_game_button.interactive = true;
            quit_game_button.on('mousedown', quit);
    
            if (beginWave == true)
            {
            
                // count down the wave
    
                // begin wave
                startWave();
    
            }
    
            document.addEventListener('keydown', keydownHandler);

            for (index = 0; index < zombies.length; index++)
            {
                 // move the enemy right
                 moveZombies(zombies[index]);
            }
    
            renderer.render(gameScene_1);
        }

    }
    else if(instructionScene.interactive)
    { 
        quit_instructions_button.interactive = true;
        quit_instructions_button.on('mousedown', quit_to_home);

        renderer.render(instructionScene);
    }

    else if(gameOverScene.interactive)
    {
        quit_game_over_button.interactive = true;
        quit_game_over_button.on('mousedown', quit_gameover);

        renderer.render(gameOverScene);
    }

    else if(creditScene.interactive)
    {
        quit_credits_button.interactive = true;
        quit_credits_button.on('mousedown', quit_to_home);
        //createjs.Tween.get(credits).to({y: -100}, 10000);

        renderer.render(creditScene);
    }
}

// function mouseHandler(e)
// {
//     console.log("here")
// }

//CREATE HANDLER FUNCTIONS
function keydownHandler(e)
{
    if (e.keyCode == 65) //A //LEFT
    {
        player.x -= 10;
    }
    else if (e.keyCode == 68) //D //RIGHT
    {
        player.x += 10;
    }
    else if (e.keyCode == 83) //S //DOWN
    {
        player.y += 10;
    }
    else if (e.keyCode == 87) //W //UP
    {
        player.y -= 10;
    }
    else if (e.keyCode == 73)
    {
        inventoryPage = true;

        inventoryScene.visible = true;
        inventoryScene.interactive = true;

        renderer.render(inventoryScene);

        document.removeEventListener('keydown', keydownHandler);
    }
}

function inventoryPageHandler(e)
{
    if (e.keyCode == 73)
    {
        inventoryPage = false;
        console.log("world");

        inventoryScene.visible = false;
        inventoryScene.interactive = false;

        renderer.render(gameScene_1);

        document.removeEventListener('keydown', inventoryPageHandler);
    }
}

animate();