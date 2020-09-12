var player,scene;
var obstacleGroup;
var start = 0;
var play = 1;
var end = 2;
var gameState = start
var bullet;
var bulletGroup;
var score = 0;
var medal1
var superiorWin = "";
var obstacle2Group;
var youLost = "";
var instruction = ""
var instruction1 = ""
var instruction2 = "";

function preload(){
  sceneImg = loadImage("images/scene.jpg");

  playerImg = loadImage("images/bird.png");


  medalImg = loadImage("images/medal1.jpg");

}



function setup() {
  createCanvas(displayWidth,displayHeight);
  
  
  scene = createSprite(400,300,800,600);
  scene.addImage("scene",sceneImg);
  scene.y = scene.height/2
  scene.scale = 3;
  
  

  player = createSprite(200,200,10,10);
  player.addImage("player",playerImg);
  
  


  
  medal1 = createSprite(5,5,10,10);
  medal1.addImage("medal",medalImg);
  medal1.visible = false;
  medal1.scale = 0.05;

  medal2 = createSprite(50,5,10,10);
  medal2.addImage("medal",medalImg);
  medal2.visible = false;
  medal2.scale = 0.05;

  medal3 = createSprite(100,5,10,10);
  medal3.addImage("medal",medalImg);
  medal3.visible = false;
  medal3.scale = 0.05;

  obstacleGroup = new Group;

  bulletGroup = new Group;

  obstacle2Group = new Group

  fill("white");
  textFont("georgia")

}

function draw() {
  background(0);  

  if(gameState === start){
    instruction = "USE W-S-A-D TO MOVE UP,DOWN,LEFT,RIGHT";
    instruction1 = "USE THE ARROW KEYS TO SHOOT IN DIFFERENT DIRECTIONS";
    instruction2 = "PRESS R TO START";

  }

  if(gameState === play){

    camera.position.y = player.y+100;
   camera.position.x = player.x + 100

   instruction = "";
   instruction1 = "";
   instruction2 = "";

  if(keyDown("w")){
    player.y = player.y -10;

  }

  if(keyDown("s")){
    player.y = player.y +10;

  }

  if(keyDown("a")){
    player.x = player.x -10;

  }

  if(keyDown("d")){
    player.x = player.x + 10;

  }


  createBullet();

  scene.velocityY = -3;

  if(scene.y < 0){
   scene.y = scene.height/2;
  }

  
  if(bullet.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
  }

  if(bulletGroup.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score + 1;
  }

  if(score === 10){
    medal1.visible = true;
  }

  if(score === 20){
    medal2.visible = true;
  }

  if(score === 30){
    medal3.visible = true;
    superiorWin = "YOU HAVE UNLOCKED 3 BATCHES !!! , YOU ARE SUPERIOR ,KEEP GOING"
  }

 
  

  createObstacle();

  createObstacle2();
 }

 if(bulletGroup.isTouching(obstacle2Group)){
   gameState = end;

 }

 if(keyDown("r")){
   gameState = play;
 }

 if(gameState === end){
   scene.velocityX = 0;
   scene.velocityY = 0;
   player.velocityX = 0
   player.velocityY = 0
   youLost = "YOU LOST , PRESS SPACE TO TRY AGAIN";
   
 }

 if(keyDown("space")){
   gameState = start;
   youLost = "";
   score = 0;
   medal1.visible = false;
   medal2.visible = false;
   medal3.visible = false;
   superiorWin = "";
 }

  drawSprites(); 

  text("SCORE : " + score,player.x-20,player.y-50);
  text(youLost ,200,200)
  text(instruction,400,200)
  text(instruction1,350,270)
  text(instruction2,450,340);


 
  

  }


function createObstacle(){
  if(frameCount%40 === 0 ){
    obstacle = createSprite(random(-20,750),0,20,20);
    obstacle.shapeColor = "white"
    obstacle.velocityY = 4;
    obstacleGroup.add(obstacle);
    
  }
  
}

function createObstacle2(){
  if(frameCount%80 === 0 ){
    obstacle = createSprite(random(0,750),0,20,20);
    obstacle.shapeColor = "yellow"
    obstacle.velocityY = 4;
    obstacle2Group.add(obstacle)
  }
  
}

function createBullet(){
  bullet = createSprite(0,0 , 5,5);
  bullet.visible = false;
  if(keyDown(UP_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = -10;
    bullet.velocityX = 0;
    bullet.visible = true
  }
  if(keyDown(DOWN_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = 10;
    bullet.velocityX = 0;
    bullet.visible = true;
  }
  if(keyDown(LEFT_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = 0;
    bullet.velocityX = -10;
    bullet.visible = true;
  }
  if(keyDown(RIGHT_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = 0;
    bullet.velocityX = 10;
    bullet.visible = true;
  }

  bulletGroup.add(bullet);
}


