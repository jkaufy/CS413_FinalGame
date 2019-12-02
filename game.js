/***************** Sams Code Start *****************/

var GAME_WIDTH = 750; 
var GAME_HEIGHT = 750;

var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: GAME_WIDTH, height: GAME_HEIGHT, backgroundColor: 0x3D0034});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var beginWave = true;

var bgMusicPlaying = false;

/*
    Create game scene variables 
*/
var openingScene, gameScene_1, gameScene_2, gameScene_3, current_game_scene, 
    gameScene_4, instructionScene, gameOverScene, creditScene;

/*
    Inventory Variables
*/

var inventory = {}, inventoryScene, heal_button, armor_potion_button, weapon_potion_button, 
    speed_potion_button, upgrade_weapon, upgrade_health, upgrade_armor, description_box, 
    inventory_box, inventory_box_names, inventory_box_amount;

var coal, copper, iron, gold, copper_bar, iron_bar, gold_bar, health_potion, 
    strength_potion, armor_potion, speed_potion, leaves_of_healing;

var heal_text, armor_text, upgrade_text, health_text, weapon_text;

/*
    Menu button variables 
*/
var start_button, instruction_button, credits_button, 
    quit_game_button, credits, gameover, quit_credits_button, 
    quit_game_over_button, quit_instructions_button;

var title_text, male, female, female_character, male_character, character_r, character_l, 
    heart_1, heart_2, heart_3, heart_4, heart_5, heart_6, heart_count, max_hearts;

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

gameScene_2 = new PIXI.Container();
gameScene_2.visible = false;

gameScene_3 = new PIXI.Container();
gameScene_3.visible = false;

gameScene_4 = new PIXI.Container();
gameScene_4.visible = false;

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

var bgMusic = PIXI.sound.Sound.from({
    url: 'sound/bgMusic.wav',
    loop: true
    });


// This will initialize all our sprites and start our gameloop
function setup()
{
    /***********************************************************************************
                                    OPENING SCENE SET UP
     ***********************************************************************************/
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

    /**********************************************************************************
                                    INSTRUCTION SCENE SETUP
    ***********************************************************************************/
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
    
    /***********************************************************************************
                                    INVENTORY SET UP
    ***********************************************************************************/

    inventory = {"coal" : 0, "copper" : 0, "iron" : 0, "gold" : 0, "healing potion" : 0, 
                "armor potion" : 0, "weapon potion" : 0, "sterngth potion" : 0, 
                "leaf of health" : 0};

    let inventory_title = new PIXI.Text(
        'INVENTORY',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 30,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    inventory_title.x = GAME_WIDTH/4;
    inventory_title.y = 50;
    inventory_title.anchor.x = .5;
    inventory_title.anchor.y = 0;
    inventoryScene.addChild(inventory_title);
    
    inventory_box = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Inventory_Box.png"));
    inventoryScene.addChild(inventory_box);
    inventory_box.anchor.x = .5;
    inventory_box.anchor.y = 0;
    inventory_box.position.x = inventory_title.x;
    inventory_box.position.y = inventory_title.y + 30;

    let description = new PIXI.Text(
        'DESCRIPTION',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 30,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    description.x = GAME_WIDTH/2 + GAME_WIDTH/4;
    description.y = 50;
    description.anchor.x = .5;
    description.anchor.y = 0;
    inventoryScene.addChild(description);
 
    description_box = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Description_Box.png"));
    inventoryScene.addChild(description_box);
    description_box.anchor.x = .5;
    description_box.anchor.y = 0;
    description_box.position.x = description.x;
    description_box.position.y = description.y + 30;

    
    /*********** ADD HEALING BUTTON **********/

    heal_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Heal_Button.png")); 
    heal_button.position.x = description_box.position.x;
    heal_button.position.y = description_box.position.y + 300;
    heal_button.anchor.x = .5;
    heal_button.anchor.y = .5;
    inventoryScene.addChild(heal_button);

    // when moused over 'healing button', this will display in the description box
    heal_text = new PIXI.Text(
        'use a healing potion \nto regain a heart',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    heal_text.x = description_box.position.x;
    heal_text.y = description_box.position.y + 20;
    heal_text.anchor.x = .5;
    heal_text.anchor.y = 0;
    heal_text.visible = false;
    inventoryScene.addChild(heal_text);


    /*********** ADD WEAPON POTION BUTTON **********/

    weapon_potion_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Weapon_Potion.png"));
    weapon_potion_button.position.x = heal_button.position.x;
    weapon_potion_button.position.y = heal_button.position.y + 50;
    weapon_potion_button.anchor.x = .5;
    weapon_potion_button.anchor.y = .5;
    inventoryScene.addChild(weapon_potion_button);

    // when moused over 'healing button', this will display in the description box
    weapon_potion_text = new PIXI.Text(
        'use to increase weapon strenght\n for 10 seconds',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    weapon_potion_text.x = description_box.position.x;
    weapon_potion_text.y = description_box.position.y + 20;
    weapon_potion_text.anchor.x = .5;
    weapon_potion_text.anchor.y = 0;
    weapon_potion_text.visible = false;
    inventoryScene.addChild(weapon_potion_text);

    /*********** ADD SPEED POTION BUTTON **********/

    speed_potion_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Speed_Potion.png"));
    speed_potion_button.position.x = weapon_potion_button.position.x;
    speed_potion_button.position.y = weapon_potion_button.position.y + 50;
    speed_potion_button.anchor.x = .5;
    speed_potion_button.anchor.y = .5;
    inventoryScene.addChild(speed_potion_button);

    // when moused over 'healing button', this will display in the description box
    speed_potion_text = new PIXI.Text(
        'use to increase speed for\n10 seconds',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    speed_potion_text.x = description_box.position.x;
    speed_potion_text.y = description_box.position.y + 20;
    speed_potion_text.anchor.x = .5;
    speed_potion_text.anchor.y = 0;
    speed_potion_text.visible = false;
    inventoryScene.addChild(speed_potion_text);

    /*********** ADD ARMOR POTION BUTTON **********/

    armor_potion_button = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Armor_Potion.png"));
    armor_potion_button.position.x = speed_potion_button.position.x;
    armor_potion_button.position.y = speed_potion_button.position.y + 50;
    armor_potion_button.anchor.x = .5;
    armor_potion_button.anchor.y = .5;
    inventoryScene.addChild(armor_potion_button);

    // when moused over 'healing button', this will display in the description box
    armor_potion_text = new PIXI.Text(
        'use to increase armor strenght\n for 10 seconds',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    armor_potion_text.x = description_box.position.x;
    armor_potion_text.y = description_box.position.y + 20;
    armor_potion_text.anchor.x = .5;
    armor_potion_text.anchor.y = 0;
    armor_potion_text.visible = false;
    inventoryScene.addChild(armor_potion_text);

    
    /*********** ADD HEALTH BUTTON **********/

    upgrade_health = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Health.png"));
    upgrade_health.position.x = armor_potion_button.position.x;
    upgrade_health.position.y = armor_potion_button.position.y + 50;
    upgrade_health.anchor.x = .5;
    upgrade_health.anchor.y = .5;
    inventoryScene.addChild(upgrade_health);

    // when moused over 'healing button', this will display in the description box
    health_text = new PIXI.Text(
        'use to upgrade health\nrequires 4 leaves',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    health_text.x = description_box.position.x;
    health_text.y = description_box.position.y + 20;
    health_text.anchor.x = .5;
    health_text.anchor.y = 0;
    health_text.visible = false;
    inventoryScene.addChild(health_text);

    
    /*********** ADD WEAPON BUTTON **********/

    upgrade_weapon = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Weapon.png"));
    upgrade_weapon.position.x = upgrade_health.position.x;
    upgrade_weapon.position.y = upgrade_health.position.y + 50;
    upgrade_weapon.anchor.x = .5;
    upgrade_weapon.anchor.y = .5;
    inventoryScene.addChild(upgrade_weapon);

    // when moused over 'healing button', this will display in the description box
    weapon_text = new PIXI.Text(
        'use to upgrade weapon\nrequires 10 bars',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    weapon_text.x = description_box.position.x;
    weapon_text.y = description_box.position.y + 20;
    weapon_text.anchor.x = .5;
    weapon_text.anchor.y = 0;
    weapon_text.visible = false;
    inventoryScene.addChild(weapon_text);

    /*********** ADD ARMOR BUTTON **********/

    upgrade_armor = new PIXI.Sprite(PIXI.Texture.from("Sprites/Instruction_Buttons/Armor.png"));
    upgrade_armor.position.x = upgrade_weapon.position.x;
    upgrade_armor.position.y = upgrade_weapon.position.y + 50;
    upgrade_armor.anchor.x = .5;
    upgrade_armor.anchor.y = .5;
    inventoryScene.addChild(upgrade_armor);

    // when moused over 'healing button', this will display in the description box
    armor_text = new PIXI.Text(
        'use a upgrade armor\nrequires 10 ore',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    armor_text.x = description_box.position.x;
    armor_text.y = description_box.position.y + 20;
    armor_text.anchor.x = .5;
    armor_text.anchor.y = 0;
    armor_text.visible = false;
    inventoryScene.addChild(armor_text);



    quit_game_inventory = new PIXI.Sprite(PIXI.Texture.from("Sprites/Menu_Buttons/Sprite_Quit.png"));
    inventoryScene.addChild(quit_game_inventory);
    quit_game_inventory.anchor.x = .5;
    quit_game_inventory.anchor.y = .5;
    quit_game_inventory.position.x = GAME_WIDTH - 50;
    quit_game_inventory.position.y = 30;
    
    quit_game_inventory.interactive = false;

    inventoryScene.visible = false;
    inventoryScene.interactive = false;


    /***********************************************************************************
                                    END GAME SCENE SET UP  
    ***********************************************************************************/

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

    /***********************************************************************************
                                    CREDITS SET UP
    ***********************************************************************************/

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
        'Samantha Muellner -- Art/Level Design and Coding\n\nJacob Kaufman -- Coding\n\nKyle Watson -- Editing',
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
    quit_game_button.anchor.x = .5;
    quit_game_button.anchor.y = .5;
    quit_game_button.position.x = GAME_WIDTH - 50;
    quit_game_button.position.y = 20;

    quit_game_button.interactive = false;
    quit_game_button.visible = false;
    
    animate();
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

function instructionHandler(e)
{
    instructionScene.visible = true;
    instructionScene.interactive = true;
    openingScene.visible = false;
    openingScene.interactive = false;

    renderer.render(instructionScene);
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

// set up game in order to play as a female character
function setUpSceneOne_Female()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level1_1.png"));
    gameScene_1.addChild(bg);

    // adding hearts to game
    heart_count = 3;
    max_hearts = 3;
    setUpHearts(gameScene_1);

    heart_1.visible = true;
    heart_2.visible = true;
    heart_3.visible = true;
    heart_4.visible = false;
    heart_5.visible = false;
    heart_6.visible = false;

    coal = 0;
    copper = 0; 
    iron = 0;
    gold = 0;
    copper_bar = 0;
    iron_bar = 0; 
    gold_bar = 0; 
    health_potion = 0; 
    strength_potion = 0;
    armor_potion = 0; 
    speed_potion = 0; 
    leaves_of_healing = 0;

    // set up character animations
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
    character_l.play();
    character_l.animationSpeed = 0.25;
    gameScene_1.addChild(character_l);

    character_r = new PIXI.AnimatedSprite(female_character_frames_r)
    character_r.scale.set(1, 1);
    character_r.anchor.x = .5;
    character_r.anchor.y = 5;
    character_r.play();
    character_r.animationSpeed = 0.25;
    gameScene_1.addChild(character_r);

    // creating player
    player = character_r;
    player.position.x = 30;
    player.position.y = 80;
    player.anchor.x = .5;
    player.anchor.y = .5;


    // setting visibility and interativeness for gamescene
    openingScene.interactive = false;
    openingScene.visible = false;
    gameScene_1.visible = true;
    gameScene_1.interactive = true;
    quit_game_button.interative = true;
    quit_game_button.visible = true;
    inventoryScene.visible = false;
    inventoryScene.interative = false;

    player.visible = true;
    player.interactive = true;

    heart_1.visible = true;
    heart_2.visible = true;
    heart_3.visible = true;

}

// set up game in order to play as a male character
function setUpSceneOne_Male()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level1_1.png"));
    gameScene_1.addChild(bg);

    // adding hearts to game
    heart_count = 3;
    max_hearts = 3;
    setUpHearts(gameScene_1);

    heart_1.visible = true;
    heart_2.visible = true;
    heart_3.visible = true;
    heart_4.visible = false;
    heart_5.visible = false;
    heart_6.visible = false;

    coal = 0;
    copper = 0; 
    iron = 0;
    gold = 0;
    copper_bar = 0;
    iron_bar = 0; 
    gold_bar = 0; 
    health_potion = 0; 
    strength_potion = 0;
    armor_potion = 0; 
    speed_potion = 0; 
    leaves_of_healing = 0;

    // setting up character animations
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
    character_r.play();
    character_r.animationSpeed = 0.25;
    gameScene_1.addChild(character_r);


    // creating player
    player = character_r;
    player.position.x = 30;
    player.position.y = 80;
    player.anchor.x = .5;
    player.anchor.y = .5;


    // setting visibility and interativeness for gamescene
    openingScene.interactive = false;
    openingScene.visible = false;
    gameScene_1.visible = true;
    gameScene_1.interactive = true;
    quit_game_button.interative = true;
    quit_game_button.visible = true;
    inventoryScene.visible = false;
    inventoryScene.interative = false;

    player.visible = true;
    player.interactive = true;

    heart_1.visible = true;
    heart_2.visible = true;
    heart_3.visible = true;
}

// set up scene two
function setUpSceneTwo()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level2_1.png"));
    gameScene_2.addChild(bg);

    setUpHearts(gameScene_2);

    heart_2.visible = false;
    heart_3.visible = false;
    heart_4.visible = false;
    heart_5.visible = false;
    heart_6.visible = false;

    switch(heart_max){
        case 6:
            heart_6.visible = true;
        
        case 5:
            heart_5.visible = true;
        
        case 4: 
            heart_4.visible = true;
        
        case 3:
            heart_3.visible = true;

        case 2:
            heart_2.visible = true;

        default:
            heart_1.visible = true;
    }

    player = character_r;
    player.x = 50;
    player.y = 50;
    gameScene_2.addChild(player);

    gameScene_2.addChild(quit_game_button);
    quit_game_button.interative = true;
    quit_game_button.visible = true;

    gameScene_1.visible = false;
    gameScene_1.interactive = false;
    gameScene_2.visible = true;
    gameScene_2.interactive = true;
    inventoryScene.visible = false;
    inventoryScene.interative = false;
}

// set up scene three
function setUpSceneThree()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level3_1.png"));
    gameScene_3.addChild(bg);

    setUpHearts(gameScene_3);

    heart_2.visible = false;
    heart_3.visible = false;
    heart_4.visible = false;
    heart_5.visible = false;
    heart_6.visible = false;

    switch(heart_max){
        case 6:
            heart_6.visible = true;
        
        case 5:
            heart_5.visible = true;
        
        case 4: 
            heart_4.visible = true;
        
        case 3:
            heart_3.visible = true;

        case 2:
            heart_2.visible = true;

        default:
            heart_1.visible = true;
    }

    player = character_r;
    player.x = 50;
    player.y = 50;
    gameScene_3.addChild(player);

    gameScene_3.addChild(quit_game_button);
    quit_game_button.interative = true;
    quit_game_button.visible = true;

    gameScene_2.visible = false;
    gameScene_2.interactive = false;
    gameScene_3.visible = true;
    gameScene_3.interactive = true;
    inventoryScene.visible = false;
    inventoryScene.interative = false;
}

// set up scene four
function setUpSceneFour()
{
    bg = new PIXI.Sprite(PIXI.Texture.from("Sprites/Backgrounds/Background_Level4_1.png"));
    gameScene_4.addChild(bg);

    setUpHearts(gameScene_4);

    heart_2.visible = false;
    heart_3.visible = false;
    heart_4.visible = false;
    heart_5.visible = false;
    heart_6.visible = false;

    switch(heart_max){
        case 6:
            heart_6.visible = true;
        
        case 5:
            heart_5.visible = true;
        
        case 4: 
            heart_4.visible = true;
        
        case 3:
            heart_3.visible = true;

        case 2:
            heart_2.visible = true;

        default:
            heart_1.visible = true;
    }

    player = character_r;
    player.x = 50;
    player.y = 50;
    gameScene_4.addChild(player);

    gameScene_4.addChild(quit_game_button);
    quit_game_button.interative = true;
    quit_game_button.visible = true;

    gameScene_3.visible = false;
    gameScene_3.interactive = false;
    gameScene_4.visible = true;
    gameScene_4.interactive = true;
    inventoryScene.visible = false;
    inventoryScene.interative = false;
}

// add the appropriate amount of hearts to the game
function setUpHearts(currentScene)
{
    /***************** HEART 1 ********************/

    heart_1 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));
    heart_1.position.x = 20;
    heart_1.position.y = 20;
    heart_1.anchor.x = .5;
    heart_1.anchor.y = .5;


    currentScene.addChild(heart_1);


    /***************** HEART 2 ********************/

    // check whether or not to make the heart black
    if(max_hearts > 1)
    {
        heart_2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));

    }
    else
    {
        heart_2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"))
    }

    heart_2.position.x = heart_1.position.x + 30;
    heart_2.position.y = 20;
    heart_2.anchor.x = .5;
    heart_2.anchor.y = .5;

    currentScene.addChild(heart_2);


    /***************** HEART 3 ********************/

    // check whether or not to make the heart black
    if(max_hearts > 2)
    {
        heart_3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));

    }
    else
    {
        heart_3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"))
    }

    heart_3.position.x = heart_2.position.x + 30;
    heart_3.position.y = 20;
    heart_3.anchor.x = .5;
    heart_3.anchor.y = .5;


    currentScene.addChild(heart_3);


    /***************** HEART 4 ********************/

    // check whether or not to make the heart black
    if(max_hearts > 3)
    {
        heart_4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));

    }
    else
    {
        heart_4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"))
    }

    heart_4.position.x = heart_3.position.x + 30;
    heart_4.position.y = 20;
    heart_4.anchor.x = .5;
    heart_4.anchor.y = .5;


    currentScene.addChild(heart_4);


    /***************** HEART 5 ********************/

    // check whether or not to make the heart black
    if(max_hearts > 4)
    {
        heart_5 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));

    }
    else
    {
        heart_5 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"))
    }

    heart_5.position.x = heart_4.position.x + 30;
    heart_5.position.y = 20;
    heart_5.anchor.x = .5;
    heart_5.anchor.y = .5;

    currentScene.addChild(heart_5);


    /***************** HEART 6 ********************/

    if(max_hearts > 5)
    {
        heart_6 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));

    }
    else
    {
        heart_6 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"))
    }

    heart_6.position.x = heart_5.position.x + 30;
    heart_6.position.y = 20;
    heart_6.anchor.x = .5;
    heart_6.anchor.y = .5;

    if(max_hearts > 5)
    {
        heart_6.visible = true;
    }

    currentScene.addChild(heart_6);
}

// will add a heart to the total count when the player chooses to upgrade their health
function addHeart()
{
    heart_count ++;
    max_hearts ++;

    // if there is a 5th heart, add a 6th one
    switch(heart_count){
        case 6:
            heart_6.visible = true;

        case 5:
            heart_5.visible = true;

        case 4:
            heart_4.visible = true;

        case 3:
            heart_3.visible = true;

        default: // there was only one heart left, and so now there will be 2
            heart_2.visible = true;
    }
}

// function that will change a black heart to a red one
function heal()
{
    heart_count ++;

    switch(heart_count){
        case 6:
            heart_6 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));
            current_game_scene.heart_6 = heart_6;

        case 5:
            heart_5 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));
            current_game_scene.heart_5 = heart_5;

        case 4:
            heart_4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));
            current_game_scene.heart_4 = heart_4;

        case 3:
            heart_3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));
            current_game_scene.heart_3 = heart_3;

        default:
            heart_2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Heart.png"));
            current_game_scene.heart_2 = heart_2;
    }
}

// function that will change a red heart to a black one
function takeDamage()
{
    heart_count --;
    
    switch(heart_count){
        case 5:
            heart_6 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"));
            current_game_scene.heart_6 = heart_6;

        case 4:
            heart_5 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"));
            current_game_scene.heart_5 = heart_5;

        case 3:
            heart_4 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"));
            current_game_scene.heart_4 = heart_4;

        case 2:
            heart_3 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"));
            current_game_scene.heart_3 = heart_3;

        case 1:
            heart_2 = new PIXI.Sprite(PIXI.Texture.from("Sprites/Items/Black_Heart.png"));
            current_game_scene.heart_2 = heart_2;

        default: // lost last heart
            end();
    }
}

// all the code that will run at the end of the game
function end()
{
    bgMusic.stop();
    bgMusicPlaying = false;

    gameScene_1.interactive = false;
    gameScene_2.interactive = false;
    gameScene_3.interactive = false;
    gameScene_4.interactive = false;
    
    gameOverScene.visible = true;
    gameOverScene.interactive = true;
}

// activated when most quit buttons are pressed, save for quit_to_hom and quit_gameover
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

/***************** Sams Code End *****************/





/***************** Jacobs Code Start *****************/

var zombies = [];
var inventoryPage = false;
var amount_of_zombies  = 1;

var currentDate = new Date();
var startTime = currentDate.getSeconds();
var currentTime;

var number_of_zombies = 0;

var zombieSpeed = .2;

function spawnZombies()
{

    currentDate = new Date();

    if (currentDate.getSeconds() != currentTime)
    {

        currentTime = currentDate.getSeconds();

        if((startTime-currentTime) % 10 == 0)
        {
            beginWave = true;
            
            number_of_zombies += amount_of_zombies;
        
        }
    }
    
    
}



function startWave ()
{

    if(!bgMusicPlaying) {
        bgMusic.play();
        bgMusicPlaying = true;
    }

    for (index  = 0; index < amount_of_zombies; index++)
    {
        zombie = new PIXI.Sprite(PIXI.Texture.from("Sprites/Monsters/Golems/Gold_Golum_Sword1.png"));

        zombie.x = (Math.random() * 400);
        zombie.y = (Math.random()* 400);
        zombies.push(zombie);
        gameScene_1.addChild(zombie);
    }

    beginWave = false;

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

/***************** Jacobs Code End *****************/





/***************** Sams and Jacobs Code Start *****************/

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
        current_game_scene = gameScene_1;

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

            if(hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight)
            {
                takeDamage();
            }

            spawnZombies();
    
            renderer.render(gameScene_1);

            
        }

    }

    else if(gameScene_2.interactive)
    {
        current_game_scene = gameScene_2;

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

            if(hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight)
            {
                takeDamage();
            }
            spawnZombies();
    
            renderer.render(gameScene_2);
        }

    }

    else if(gameScene_3.interactive)
    {
        current_game_scene = gameScene_3;

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

            if(hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight)
            {
                takeDamage();
            }

            spawnZombies();
    
            renderer.render(gameScene_3);
        }

    }

    else if(gameScene_4.interactive)
    {
        current_game_scene = gameScene_4;

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

            if(hitFromAbove || hitFromBelow || hitFromLeft || hitFromRight)
            {
                takeDamage();
            }

            spawnZombies();
    
            renderer.render(gameScene_4);
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
    heal_button.interactive = true;
    upgrade_armor.interative = true;
   // upgrade_button.interative = true;
    upgrade_weapon.interative = true;
    upgrade_health.interative = true;
    quit_game_inventory.interative = true;

    // visually create the names and set them into the inventory box
    inventory_box_names = new PIXI.Text(
        'Coal:\n\n Copper:\n\n Iron:\n\n Gold:\n\n Health Potion:\n\n Armor Potion:\n\n Speed Potion:\n\n Strength Potion:\n\n',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fontWeight: "bold",
            fill : ["black"],
            align : 'left'});
    
    inventory_box_names.x = inventory_box.position.x;
    inventory_box_names.y = inventory_box.position.y + 20;
    inventory_box_names.anchor.x = .5;
    inventory_box_names.anchor.y = 0;
    inventoryScene.addChild(inventory_box_names);

    // visually create amounts and put them next to the names
    inventory_box_amount = new PIXI.Text(
        toString(coal) + "\n\n" + toString(copper) + "\n\n" + toString(iron) + "\n\n" + toString(gold) 
        + "\n\n" + toString(health_potion) + "\n\n" + toString(armor_potion) + "\n\n" + toString(speed_potion) 
        + "\n\n" + toString(strength_potion),
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 20,
            fill : ["black"],
            align : 'left'});

    inventory_box_amount.x = inventory_box_names.position.x + 50;
    inventory_box_amount.y = inventory_box.position.y + 20;
    inventory_box_amount.anchor.x = .5;
    inventory_box_amount.anchor.y = 0;
    inventoryScene.addChild(inventory_box_amount);



    /******** HANDLE HEAL BUTTON *******/

    //heal_button.on("mouseover", console.log("here"))

    heal_button.on("mousedown", () => {
        if(leaf_of_healing > 3)
        {
            addHeart();
        }

        else // display a message that you need to have 4 leaves of healing
        {

        }
        
    });


    /******** HANDLE ARMOR BUTTON *******/

    upgrade_armor.on("mouseover", () =>{
        heal_text.visible = false;
        armor_text.visible = true;
        upgrade_text.visible = false;
        health_text.visible = false;
        weapon_text.visible = false;
    })

    upgrade_armor.on("mousedown", () => {

    })


    /******** HANDLE ARMOR BUTTON *******/


    /******** HANDLE ARMOR BUTTON *******/


    /******** HANDLE ARMOR BUTTON *******/


    /******** HANDLE ARMOR BUTTON *******/


    if (e.keyCode == 73) //i button
    {
        inventoryPage = false;

        //inventoryScene.visible = false;
        inventoryScene.interactive = false;

        heal_button.interactive = false;
        upgrade_armor.interative = false;
        upgrade_button.interative = false;
        upgrade_weapon.interative = false;
        upgrade_health.interative = false;

        renderer.render(current_game_scene);

        document.removeEventListener('keydown', inventoryPageHandler);
    }
}

animate();

/***************** Sams and Jacobs Code End *****************/
