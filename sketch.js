//variable declarations
var bg,bgImg;
var player, shooterImage, shooter_shooting;
var zombie, zombieImage;
var zombieGroup;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;


//loading the images
function preload(){
shooterImage = loadImage("assets/shooter_2.png");
shooter_shooting = loadImage("assets/shooter_3.png");
bgImg = loadImage("assets/bg.jpeg");
zombieImage = loadImage("assets/zombie.png");
heart1Img = loadImage("assets/heart_1.png");
heart2Img = loadImage("assets/heart_2.png");
heart3Img = loadImage("assets/heart_3.png");
}

function setup(){
//creating canvas, whilst adujusting windowWidth and windowHeight
createCanvas(windowWidth,windowHeight);

//npc(non player character), background, loading the background image
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
bg.scale = 1.1;

//pc(playing character), setting the hitbox, size,image and setting debug as true
player = createSprite(displayWidth-1150,displayHeight-300,50,50);
player.addImage(shooterImage);
player.scale = 0.3;
player.debug = true;
player.setCollider("rectangle", 0,0,300,300);

//represents 1st heart
heart1 = createSprite(displayWidth-150,40,20,20);
heart1.visible = false;
heart1.addImage("heart1", heart1Img);
heart1.scale = 0.4;

//represents 2nd heart
heart2 = createSprite(displayWidth-100,40,20,20);
heart2.visible = false;
heart2.addImage("heart2", heart2Img);
heart2.scale = 0.4;
//represents 3rd heart;
heart3 = createSprite(displayWidth-150,40,20,20);
heart3.addImage("heart3", heart3Img);
heart3.scale = 0.4;

//created new Zombie group;
zombieGroup = new Group();
}

function draw(){
//setting background as 0
background(0);

//setting the key functions to move the player (up and down arrow)
if(keyDown("UP_ARROW") || touches.lenght>0){
  player.y = player.y-30;
}

if(keyDown("DOWN_ARROW") || touches.lenght>0){
  player.y = player.y+30;
}

//setting it so that when "space" is held down, the gun will aim. Also add image of gun being aimed
if(keyWentDown("space")){ 
  player.addImage(shooter_shooting);
}
else if(keyWentUp("space")){
  player.addImage(shooterImage);
}

//destroying zombie if it touches player
if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }
  }

}
//calling the enemy function
enemy();
//letting the images be shown
drawSprites(); 
}

//creating and placing zombies in random postions, also set the speed, size and lifetime of zombie
function enemy(){
  //putting zombies in random positions and added framecount
  if(frameCount%50===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImage);

    //size of zombie 
    zombie.scale = 0.15;

    //speed of zombie
    zombie.velocityX = -3;

    //creating hitbox around the zombies
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,400,400);

    //lifetime defines the scope of the variable(zombies)
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}



