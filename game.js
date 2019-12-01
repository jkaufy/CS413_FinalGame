var GAME_WIDTH = 750; 
var GAME_HEIGHT = 750;

var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: GAME_WIDTH, height: GAME_HEIGHT, backgroundColor: 0x3D0034});
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

var title_text, male, female, female_character, male_character, character_r, character_l;

var inventory = {};
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

var bg;

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
    female_character = new PIXI.Sprite(PIXI.Texture.from("Sprites/Female_Player/Female_Player_L1.png"));
    male_character = new PIXI.Sprite(PIXI.Texture.from("Sprites/Male_Player/Male_Player_R1.png"));

    openingScene.addChild(start_button);
    openingScene.addChild(instruction_button);
    openingScene.addChild(credits_button);
    openingScene.addChild(female_character);
    openingScene.addChild(male_character);

    start_button.anchor.x = .5;
    start_button.anchor.y = .5;
    start_button.position.x = GAME_WIDTH/2;
    start_button.position.y = GAME_HEIGHT/4;
    start_button.scale.set(1.5,1.5);

    instruction_button.anchor.x = .5;
    instruction_button.anchor.y = .5;
    instruction_button.position.x = GAME_WIDTH/2;
    instruction_button.position.y = GAME_HEIGHT/2;
    instruction_button.scale.set(1.5, 1.5);

    credits_button.anchor.x = .5;
    credits_button.anchor.y = .5;
    credits_button.position.x = GAME_WIDTH/2;
    credits_button.position.y = GAME_HEIGHT/4 + GAME_HEIGHT/2;
    credits_button.scale.set(1.5, 1.5);

    female_character.anchor.x = .5;
    female_character.anchor.y = .5;
    female_character.position.x = GAME_WIDTH/2 - 70;
    female_character.position.y = GAME_HEIGHT/2;
    female_character.scale.set(1.5, 1.5);

    male_character.anchor.x = .5;
    male_character.anchor.y = .5;
    male_character.position.x = GAME_WIDTH/2 + 70;
    male_character.position.y = GAME_HEIGHT/2;
    male_character.scale.set(1.5, 1.5);

    start_button.interactive = false;
    instruction_button.interactive = false;
    credits_button.interactive = false;

    female_character.interactive = false;
    male_character.interactive = false;
    female_character.visible = false;
    male_character.visible = false;

    title_text = new PIXI.Text(
        'Choose your \ncharacter:',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 40,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});
    title_text.x = GAME_WIDTH/2;
    title_text.y = 100;
    title_text.anchor.x = .5;
    title_text.anchor.y = .5;
    openingScene.addChild(title_text);
    title_text.visible = false;

    male = new PIXI.Text(
        'Male',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});
    male.x = male_character.position.x;
    male.y = male_character.position.y + 70;
    male.anchor.x = .5;
    male.anchor.y = .5;
    openingScene.addChild(male);
    male.visible = false;

    female = new PIXI.Text(
        'Female',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});
    female.x = female_character.position.x;
    female.y = female_character.position.y + 70;
    female.anchor.x = .5;
    female.anchor.y = .5;
    openingScene.addChild(female);
    female.visible = false;

    /*
            INSTRUCTION SCENE SETUP
    */
    instructionScene.interactive = false;
    instructionScene.visible = false;

    let instructions = new PIXI.Text(
        'INSTRUCTIONS',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 50,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});
    
    instructions.x = GAME_WIDTH/2;
    instructions.y = GAME_HEIGHT/4;
    instructions.anchor.x = .5;
    instructions.anchor.y = .5;
    instructionScene.addChild(instructions);

    let instructions_text = new PIXI.Text(
        'Move your character by using a, s, d, and w \nto avoid the oncoming wave of enemies\n\n' +
        'If you touch an oncoming enemy, you will lose a life\n\n' +
        'After 3 lost lives, you will die\n\n' +
        'Occasionally items will drop. \nPress i to view your inventory to use these items\n\n' +
        'Make it through the wave and you will progress to the \nnext level. Make it through all four levels\nto win',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 22,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    instructions_text.x = GAME_WIDTH/2;
    instructions_text.y = instructions.y + 50;
    instructions_text.anchor.x = .5;
    instructions_text.anchor.y = 0;
    instructionScene.addChild(instructions_text);

    quit_instructions_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));

    instructionScene.addChild(quit_instructions_button);
    quit_instructions_button.anchor.x = .5;
    quit_instructions_button.anchor.y = .5;
    quit_instructions_button.position.x = GAME_WIDTH - 50;
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
    gameover.position.x = GAME_WIDTH/2;
    gameover.position.y = GAME_HEIGHT/2;

    quit_game_over_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));

    gameOverScene.addChild(quit_game_over_button);
    quit_game_over_button.anchor.x = .5;
    quit_game_over_button.anchor.y = .5;
    quit_game_over_button.position.x = GAME_WIDTH - 50;
    quit_game_over_button.position.y = 20;
    
    quit_game_over_button.interactive = false;

    /*
            CREDITS
    */

    creditScene.interactive = false;
    creditScene.visible = false;

    let credits = new PIXI.Text(
        'CREDITS',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 50,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});
    
    credits.x = GAME_WIDTH/2;
    credits.y = GAME_HEIGHT/4;
    credits.anchor.x = .5;
    credits.anchor.y = .5;
    creditScene.addChild(credits);

    let credits_text = new PIXI.Text(
        'Samantha Muellner -- Art/Level Design and Coding\n\nKyle Watson -- Coding\n\nJacob Kaufman -- Coding\n\nSteven Enriquez',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 22,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    credits_text.x = GAME_WIDTH/2;
    credits_text.y = credits.y + 50;
    credits_text.anchor.x = .5;
    credits_text.anchor.y = 0;
    creditScene.addChild(credits_text);

    quit_credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    
    creditScene.addChild(quit_credits_button);
    quit_credits_button.anchor.x = .5;
    quit_credits_button.anchor.y = .5;
    quit_credits_button.position.x = GAME_WIDTH - 50;
    quit_credits_button.position.y = 20;
    
    quit_credits_button.interactive = false;

    quit_game_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    gameScene_1.addChild(quit_game_button);
    
    quit_game_inventory = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    inventoryScene.addChild(quit_game_inventory);

    animate();
}

function setUpSceneOne_Female()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level1_1.png"));

    gameScene_1.addChild(bg);

    inventory = {'coal': 0, 'copper': 0, 'silver': 0, 'gold': 0, 'healing potion': 0, 'armor potion': 0, 'speed potion': 0, 'strength potion': 0}

    var female_character_frames_r = [];
    var female_character_frames_l = [];

    for(var i = 1; i <= 11; i ++)
    {
        female_character_frames_r.push(PIXI.Texture.fromFrame('Sprites/Female_Player/Female_Player_R' + i + '.png'))
    }

    for(var j = 1; j <= 11; j ++)
    {
        female_character_frames_l.push(PIXI.Texture.fromFrame('Sprites/Female_Player/Female_Player_L' + j + '.png'))
    }

    character_l = new PIXI.AnimatedSprite(female_character_frames_l)
    character_l.scale.set(1, 1);
    character_l.anchor.x = .5;
    character_l.anchor.y = 5;
    character_l.animationSpeed = 0.25;
    character_l.play();
    
    character_r = new PIXI.AnimatedSprite(female_character_frames_r)
    character_r.scale.set(1, 1);
    character_r.anchor.x = .5;
    character_r.anchor.y = 5;
    character_r.animationSpeed = 0.25;
    character_r.play();

    player = character_r;
    player.visible = true;
    player.interactive = true;

    player.position.x = 30;
    player.position.y = 30;
    player.anchor.x = .5;
    player.anchor.y = .5;

    openingScene.interactive = false;
    openingScene.visible = false;
    gameScene_1.visible = true;
    gameScene_1.interactive = true;

}

function setUpSceneOne_Male()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level1_1.png"));

    gameScene_1.addChild(bg);

    var male_character_frames_r = [];
    var male_character_frames_l = [];

    for(var i = 1; i <= 11; i ++)
    {
        male_character_frames_r.push(PIXI.Texture.fromFrame('Sprites/Male_Player/Male_Player_R' + i + '.png'))
    }

    for(var j = 1; j <= 11; j ++)
    {
        male_character_frames_l.push(PIXI.Texture.fromFrame('Sprites/Male_Player/Male_Player_L' + j + '.png'))
    }

    character_l = new PIXI.AnimatedSprite(male_character_frames_l)
    character_l.scale.set(1, 1);
    character_l.anchor.x = .5;
    character_l.anchor.y = 5;
    character_l.play();
    character_l.animationSpeed = 0.25;
    gameScene_1.addChild(character_l);

    character_r = new PIXI.AnimatedSprite(male_character_frames_r)
    character_r.scale.set(1, 1);
    character_r.anchor.x = .5;
    character_r.anchor.y = 5;
    character_r.position.x = 30;
    character_r.position.y = 30;
    character_r.play();
    character_r.animationSpeed = 0.25;
    gameScene_1.addChild(character_r);

    player = character_r;
    player.visible = true;
    player.interactive = true;

    player.position.x = 30;
    player.position.y = 30;
    player.anchor.x = .5;
    player.anchor.y = .5;

    openingScene.interactive = false;
    openingScene.visible = false;
    gameScene_1.visible = true;
    gameScene_1.interactive = true;
}

function setUpSceneTwo()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level2_1.png"));
    gameScene_2.addChild(bg);

    player = character_r;
    player.x = 50;
    player.y = 50;
    gameScene_2.addChild(player);

    gameScene_1.visible = false;
    gameScene_1.interactive = false;
    gameScene_2.visible = true;
    gameScene_2.interactive = true;
}

function setUpSceneThree()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level3_1.png"));
    gameScene_3.addChild(bg);

    player = character_r;
    player.x = 50;
    player.y = 50;
    gameScene_3.addChild(player);

    gameScene_2.visible = false;
    gameScene_2.interactive = false;
    gameScene_3.visible = true;
    gameScene_3.interactive = true;
}

function setUpSceneFour()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level4_1.png"));
    gameScene_4.addChild(bg);

    player = character_r;
    player.x = 50;
    player.y = 50;
    gameScene_4.addChild(player);

    gameScene_3.visible = false;
    gameScene_3.interactive = false;
    gameScene_4.visible = true;
    gameScene_4.interactive = true;
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
    start_button.interactive = false;
    start_button.visible = false;
    instruction_button.interactive = false;
    instruction_button.visible = false;
    credits_button.interactive = false;
    credits_button.visible = false;
    

    title_text.visible = true;
    male.visible = true;
    female.visible = true;
    female_character.visible = true;
    female_character.interactive = true;
    male_character.visible = true;
    male_character.interactive = true;
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
    female_character.visible = false;
    female_character.interactive = false;
    male_character.visible = false;
    male_character.interactive = false;
    title_text.visible = false;
    male.visible = false;
    female.visible = false;
    
    start_button.visible = true;
    start_button.interactive = true;
    credits_button.visible = true;
    credits_button.interactive = true;
    instruction_button.visible = true;
    instruction_button.interactive = true;

    gameOverScene.interactive = false;
    gameOverScene.visible = false;
    openingScene.interactive = true;
    openingScene.visible = true;
    

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
        if(!female_character.visible)
        {
            start_button.interactive = true;
            instruction_button.interactive = true;
            credits_button.interactive = true;
            
            start_button.on('mousedown', start);
            instruction_button.on('mousedown', instructionHandler);
            credits_button.on('mousedown', playCredits);
        }

        else(female_character.visible)
        {
            female_character.on('mousedown', setUpSceneOne_Female);
            male_character.on('mousedown', setUpSceneOne_Male);
        }

        renderer.render(openingScene);
    }
    
    // HANLDING SCENE 1
    else if(gameScene_1.interactive)
    {

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


//CREATE HANDLER FUNCTIONS
function keydownHandler(e)
{
    if (e.keyCode == 65) //A //LEFT
    {
        character_l.x = player.x;
        character_l.y = player.y;
        player = character_l;
        
        player.x -= 10;
    }
    else if (e.keyCode == 68) //D //RIGHT
    {
        character_r.x = player.x;
        character_r.y = player.y;
        player = character_r;
        
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

        inventoryScene.visible = false;
        inventoryScene.interactive = false;

        renderer.render(gameScene_1);

        document.removeEventListener('keydown', inventoryPageHandler);
    }
}

animate();