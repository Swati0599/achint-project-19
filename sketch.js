var handsanitizer,handsanitizerImage;
var virus,virusImage,virusgroup;
var sanitizerdrop,sanitizerdropImage,sanitizerdropGroup;
var score = 0, 
virusdestroyed = 0;
var gameover,gameoverImage;
var PLAY = 1;
var END = 0;

var gameState = PLAY;
// console.log(gameState)

function preload(){
  handsanitizerImage=loadImage("hand-sanitizer.png");
  virusImage=loadImage("Virus.png")
  gameoverImage = loadImage("game over.png")
  sanitizerdropImage = loadImage("sanitizer drop.png");
}

function setup(){
  createCanvas(800,500);
  
  handsanitizer=createSprite(90,200);
  handsanitizer.addImage("hello",handsanitizerImage);
  handsanitizer.scale = 0.8;

  gameover = createSprite(400,250);
  gameover.addImage(gameoverImage);
  gameover.visible = false; 

  virusgroup=createGroup();
  sanitizerdropGroup = createGroup(); 
  
}

function draw() {
  background("pink");
  // console.log(gameState)

  if(gameState===PLAY){
    spawnvirus();
    handsanitizer.y=World.mouseY
  
if(keyDown("space")){
  spawndrop();
}

if(sanitizerdropGroup.isTouching(virusgroup)){
  virusgroup.destroyEach();
  sanitizerdropGroup.destroyEach();
  score = score +5;
  virusdestroyed = virusdestroyed + 1;
}

if(virusgroup.isTouching(handsanitizer)){
 gameState =END 
}
}

if(gameState === END){

  

  handsanitizer.destroy();
  sanitizerdropGroup.destroyEach();
  virusgroup.destroyEach();
  virusgroup.setVelocityXEach(0);
  sanitizerdropGroup.setVelocityXEach(0);
  gameover.visible = true;

  score =0
  
  virusdestroyed=0

 }
  drawSprites();
  textSize(18);
  fill("black");
  text("SCORE : " + score , 560,50);
  text("VIRUS DESTROYED : " + virusdestroyed , 560,70);

}
  
function spawndrop(){
    sanitizerdrop=createSprite(90,200);
    sanitizerdrop.addImage(sanitizerdropImage);
    sanitizerdrop.scale = 0.2;
    sanitizerdrop.y=handsanitizer.y
    sanitizerdrop.velocityX=5;
    sanitizerdrop.lifetime=800
    sanitizerdropGroup.add(sanitizerdrop);

    
  }

 function spawnvirus(){
    if(frameCount %100===0){
      virus=createSprite(800,Math.round(random(50,450)));
      virus.addImage("Moving" ,virusImage);
      virus.scale = 1.5;
      virus.velocityX=-4;
      virus.scale=0.5; 
      virusgroup.add (virus);
      virus.lifetime=800;
      
    }
  
  }
