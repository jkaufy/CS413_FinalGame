var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 500, height: 500, backgroundColor: 0x055D07});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// our menu that will offer the player to 'play', see 'instructions', or see 'credits'
var openingScene = new PIXI.Container();
openingScene.visible = true;

var gameScene_1 = new PIXI.Container();
gameScene_1.visible = false;

var gameScene_2 = new PIXI.Container();
gameScene_1.visible = false;

var gameScene_3 = new PIXI.Container();
gameScene_1.visible = false;

var gameScene_4 = new PIXI.Container();
gameScene_1.visible = false;

var instructionScene = new PIXI.Container();
instructionScene.visible = false;

var gameOverScene = new PIXI.Container();
gameOverScene.visible = false;

var creditScene = new PIXI.Container();
gameOverScene.visible = false;

PIXI.loader
    .load(setup);

var start_button, instruction_button, credits_button, 
    quit_game_button, credits, gameover, quit_credits_button, 
    quit_game_over_button, quit_instructions_button;

var goodJob, youWin, next, quit_game_button_2, quit_game_button_3, quit_game_button_4;

// This will initialize all our sprites and start our gameloop
function setup()
{
    openingScene.interactive = true;
    openingScene.visible = true;

    start_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Start_Button.png"));
    instruction_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_How_To_Play.png"));
    credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Credits_Button.png"));

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

    quit_instructions_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    instructionScene.addChild(quit_instructions_button);
    quit_instructions_button.anchor.x = .5;
    quit_instructions_button.anchor.y = .5;
    quit_instructions_button.position.x = 450;
    quit_instructions_button.position.y = 20;
    
    quit_instructions_button.interactive = false;

    instructions = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Instructions.png"));

    instructionScene.addChild(instructions);
    instructions.anchor.x = .5;
    instructions.anchor.y = .5;
    instructions.position.x = 250;
    instructions.position.y = 250;

    /*
            END GAME SCENE SET UP  
    */
    gameOverScene.interactive = false;
    gameOverScene.visible = false;

    gameover = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Game_Over.png"));
    gameOverScene.addChild(gameover);

    gameover.anchor.x = .5;
    gameover.anchor.y = .5;
    gameover.position.x = 250;
    gameover.position.y = 250;

    quit_game_over_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

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
        'CREDITS\n\n Samantha Muellner, Kyle Watson, Jacob, and Stephen',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 50,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    credits_text.x = GAME_WIDTH/2;
    credits_text.y = 200;
    credits_text.anchor.x = .5;
    credits_text.anchor.y = .5;
    creditScene.addChild(title_text);

    quit_credits_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Sprite_Quit.png"));

    creditScene.addChild(quit_credits_button);
    quit_credits_button.anchor.x = .5;
    quit_credits_button.anchor.y = .5;
    quit_credits_button.position.x = 450;
    quit_credits_button.position.y = 20;
    
    quit_credits_button.interactive = false;

    

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
    var sprite1_bottom = sprite1.y + sprite1.height/4,
        sprite1_top = sprite1.y - sprite1.height/4,
        sprite1_right_side = sprite1.x + sprite1.width/2,
        sprite1_left_side = sprite1.x - sprite1.width/2;

    var sprite2_bottom = sprite2.y + sprite2.height/4,
        sprite2_top = sprite2.y - sprite2.height/4,
        sprite2_right_side = sprite2.x + sprite2.width,
        sprite2_left_side = sprite2.x - sprite2.width/6;


    var hitFromAbove = (sprite1_bottom >= sprite2_top) 
                        && (sprite1_top <= sprite2_top)
                        && (sprite1.x > sprite2_left_side) 
                        && (sprite1.x < sprite2_right_side);

    var hitFromBelow = (sprite1_top <= sprite2_bottom) 
                        && (sprite1_bottom >= sprite2_bottom) 
                        && (sprite1.x > sprite2_left_side) 
                        && (sprite1.x < sprite2_right_side);

    var hitFromLeft = (sprite1_right_side >= sprite2_left_side) 
                        && (sprite1_left_side <= sprite2_left_side)
                        && (sprite1.y > sprite2_top) 
                        && (sprite1.y < sprite2_bottom);

    var hitFromRight = (sprite1_left_side <= sprite2_right_side) 
                        && (sprite1_right_side >= sprite2_right_side)
                        && (sprite1.y > sprite2_top) 
                        && (sprite1.y < sprite2_bottom);

    return hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight;
}

function finished()
{
    playCredits();
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

        next.on('mousedown', setUpSceneTwo);

        quit_game_button.interactive = true;
        quit_game_button.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_1);
    }

    // HANDLING SCENE 2
    else if(gameScene_2.interactive)
    {
        // create if-statement that will end game by calling quit()

        // do something

        next.on('mousedown', setUpSceneTwo);

        quit_game_button.interactive = true;
        quit_game_button.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_2);
    }

    //HANDLING SCENE 3
    else if(gameScene_3.interactive)
    {
        // create if-statement that will end game by calling quit()

        // do something

        next.on('mousedown', setUpSceneTwo);

        quit_game_button.interactive = true;
        quit_game_button.on('mousedown', quit);
        document.addEventListener('keydown', keydownHandler);

        renderer.render(gameScene_4);
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
        
    }

    else if (e.keyCode == 68) //D //RIGHT
    {
            
    }

    else if (e.keyCode == 83) //S //DOWN
    {
           
    }

    else if (e.keyCode == 87) //W //UP
    {
            
    }
}

animate();