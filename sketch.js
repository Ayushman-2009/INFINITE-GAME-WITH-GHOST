var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  spookySound.loop();
  tower = createSprite(windowWidth/2,windowHeight/2);
  tower.addImage("tower",towerImg);
  tower.scale=2.5;
  //tower.velocityY = -(4+score/100);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(windowWidth/2,windowHeight/2);
  ghost.scale = 0.5;
  ghost.addImage("ghost", ghostImg);

  score = 0;
  
}


function draw() {
  background(255);
  fill('red')
  stroke(5);
  strokeWeight(5)
  text("Your score was: "+ score,windowWidth/2.25,windowHeight/2);
  if (gameState === "play") {
    score = score + Math.round(frameCount/60);

    if(keyDown("left")){
      ghost.x-=10
       // write a code to move left when left arrow is pressed
     }
     if(keyDown("right")){
       ghost.x+=10
     
       // write a code to move left when right arrow is pressed
       
     }  
    
     //write a condition for infinte scrolling tower
     if(tower.y>600){
     tower.y = width/2;
     }
     if(invisibleBlockGroup.isTouching(ghost)||ghost.x>1200){
       ghost.destroy();
       gameState = "end";
     }
     if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
     }
     

      spawnDoors();

    //write a code to make climbersGroup collide with ghost change the ghost velocity

//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
  
  drawSprites();
}
  if (gameState === "end"){
    
    fill("yellow");
    textSize(50);
    strokeWeight(15)
    text("Game Over",500,400)
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    door.x = Math.round(random(10,1200));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);
     
    door.velocityY = (2+score/300);
    climber.velocityY = (2+score/300);
    invisibleBlock.velocityY = (2+score/300);

    //change the depth of the ghost and door
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1

    score.depth=background.depth;
    score.depth=score.depth+1;
   
  //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
  invisibleBlock.lifetime = 3000;
  door.lifetime = 3000;
  climber.lifetime = 3000;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block;
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
  }
}
    

