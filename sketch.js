var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var  bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyStop=loadImage("sprite_2.png")
  
bananaImage= loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 200);

 
  
  monkey = createSprite(50,150,20,50);
  monkey.addAnimation("running", monkey_running);
  

  monkey.scale = 0.1;
  
  ground = createSprite(300,190,2000,20);
   ground.x = ground.width /2;
  ground.velocityX=-4
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = true;
  
  //create Obstacle and Cloud Groups
  obstacleGroup= createGroup();
  foodGroup = createGroup();

  
 monkey.setCollider("rectangle",0,0,100,600);
   
  
  score = 0;
  
  
}


function draw() {
   background(180);
  //displaying score
  text("Score: "+ score, 500,50);
console.log(gameState)
  
  gameState = PLAY
  if(gameState === PLAY){

  
    ground.velocityX = -(4 +  score/100)
    //scoring
    score = score + Math.round(getFrameRate()/360);
    
    
    
    if (ground.x < 0){
      ground.x =400;
    }
    console.log(monkey.y )
    //jump when the space key is pressed
   if(keyDown("space") ) {
        monkey.velocityY = -12;
                 
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana  
    spawnbananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
       
        gameState = END;
       monkey.changeAnimation("collided", monkeyStop);
       
      
    }
  }
   if (gameState === END) {
     
     
    
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
    
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  

  drawSprites();

  
}

function spawnObstacles(){
 if (frameCount % 180 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.addImage(obstaceImage)
   obstacle.velocityX=-4 
   obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }


 
}
function     spawnbananas() {
 if (frameCount % 120  === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
banana.addImage(bananaImage);
   banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana = monkey.depth;
   banana = monkey.depth + 1;
  
    
    //add each cloud to the group
   
 }
}


