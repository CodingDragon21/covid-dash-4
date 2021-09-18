var playerRunner, player
var edges;
var ground, movingGround;
var ground2;
var cloud, movingCloud;
var cloud2, movingCloud2;
var negative, negativeImg, positive
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var negativeGroup;
var cloudGroup;
var playerCollide;
var gameOver, gameOverText;
var restartButton, button;
var jumpSound;
var collideSound;
var checkPointSound;
var maskImg, mask
var bgImg
var bg
var change = true, time = 20
var gameState = "positive";
var protected
var tp, tpImg


//var highScore = 0
localStorage['HighScore'] = 0
function preload() {
  playerRunner = loadAnimation(
    "./assets/costume1.svg",
    "./assets/costume2 (1).svg",
    "./assets/costume3.svg",
    "./assets/costume4.svg",
    "./assets/costume5.svg",
    "./assets/costume6.svg"
  );

  movingGround = loadImage("./assets/ground2.png");
  movingCloud = loadImage("./assets/cloud1.png");
  movingCloud2 = loadImage("./assets/cloud2.png");
  negativeImg = loadAnimation("./assets/negative1.svg",
  "./assets/negative2.svg",
  "./assets/negative3.svg",
  "./assets/negative4.svg",
  "./assets/negative5.svg",
  "./assets/negative6.svg");
  // gameOver = loadImage("./assets/gameover.svg");
  restartButton = loadImage("./assets/restart.svg");
  collideSound = loadSound("collided.wav");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.wav");
  maskImg = loadImage("./assets/mask.svg")
  bgImg = loadImage("./assets/bg2.png")
  positive = loadAnimation(    "./assets/costume1.svg",
  "./assets/costume2 (1).svg",
  "./assets/costume3.svg",
  "./assets/costume4.svg",
  "./assets/costume5.svg",
  "./assets/costume6.svg")

  protected = loadAnimation(    "./assets/protected1.svg",
  "./assets/protected2.svg",
  "./assets/protected3.svg",
  "./assets/protected4.svg",
  "./assets/protected5.svg",
  "./assets/protected6.svg")

  tpImg = loadImage("./assets/toilet paper.svg")
}

function setup() {
  createCanvas(4500, windowHeight - 30);

  bg = createSprite(width / 2, height / 2, 4500, height)
  bg.addImage("background", bgImg)
  bg.scale = 0.86

  //create a trex sprite
  player = createSprite(50, height - 200, 20, 50);
 
  player.addAnimation("running", playerRunner);
  player.addAnimation("masked", protected);
  player.changeAnimation("running")

  player.scale = .89;
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 30, 100);


  ground2 = createSprite(width / 2, height, width, 125);
  ground2.visible = false;





  /*gameOverText = createSprite(width/2, height/2);
  gameOverText.addImage("gameOver", gameOver);
  gameOverText.visible = false;
  
  button = createSprite(width/2, height/2 + 60);
  button.addImage("restart", restartButton);
  button.visible = false;
  
  var anynumber = Math.round(random(20, 100));
  console.log(anynumber);*/

  negativeGroup = createGroup();
  cloudGroup = createGroup();
  maskGroup = createGroup()

}

function draw() {
  background("white");
  console.log(bg.x)
  if (keyIsDown(UP_ARROW) && player.y >= 520) {
    player.velocityY = -9;
    
  }
  player.changeAnimation("running")

  player.velocityY = player.velocityY + 0.3;

  player.x = camera.position.x - 2100
  bg.setVelocity(-50, 0)
  if (gameState === "positive") {
 
    for (var i = 0; i < negativeGroup.length; i++) {
      if (negativeGroup.get(i).isTouching(player)) {
        // change = true
  
        negativeGroup.get(i).changeAnimation("red")
        score = score + 1;
      }
    }
    for (var i = 0; i < maskGroup.length; i++) {
      if (maskGroup.get(i).isTouching(player)) {
  
        gameState = "protected"
        maskGroup.get(i).destroy()
      
        
      }
      
    }
    if(bg.x <-11000){
      gameState = "end"
      
    }
  
  }

  if(gameState === "protected"){
    negative.changeAnimation("blue")
    player.changeAnimation("masked")
    setTimeout(function(){ gameState = "positive", player.changeAnimation("running")}, 6000);
    console.log(gameState)
  }
  if(gameState === "end"){
    bg.setVelocity(0,0)
    maskGroup.destroyEach()
    negativeGroup.destroyEach();    
    
    GameOver()
    
  }
 
  
  spawnNegative();
  spawnMask();

  console.log(player.x)
  //spawnClouds();
  player.collide(ground2);
  drawSprites();

}

/*function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width + 20, height - 300, 40, 10);
    cloud.y = Math.round(random(10, 100));
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        cloud.addImage("movingCloud", movingCloud);
        break;
      case 2:
        cloud.addImage("movingCloud2", movingCloud2);
        break;
      default:
        break;
    }

    cloud.scale = 0.25;
    cloud.velocityX = -(4 + (3 * score) / 100);
    cloud.lifetime = width / (4 + (3 * score) / 100);
    cloudGroup.add(cloud);
  }
}*/

function spawnNegative() {
  if (frameCount % 60 === 0) {

    var rand = Math.round(random(1,2))

    if(rand === 1){
      negative = createSprite(width - 3100, height - 100);
    }
    if(rand === 2){
      negative = createSprite(width - 3100, height - 100);
      negative = createSprite(width - 2800, height - 90);
    }
  
  //  negative = createSprite(width - 3100, height - 100);
    console.log(negative)
    negative.velocityX = -4

    negative.addAnimation("blue", negativeImg)
    negative.addAnimation("red", positive)
    negative.changeAnimation("blue")

    negative.depth = bg.depth
    negative.depth += 1
    negative.scale = 0.89;
   // negative.debug = true
    negative.lifetime = width / 5
    negativeGroup.add(negative);
  }
}

function spawnMask() {
  if (frameCount % 100 === 0) {

    mask = createSprite(width - 3100, height - 250);
    mask.velocityX = -4
    mask.addImage("mask2", maskImg)

    mask.depth = negative.depth
    mask.depth -= 1
    mask.scale = 0.3;
    mask.lifetime = width / 5
    maskGroup.add(mask);
  }
  


}


function reset() {
  //score to 0
  gameState = PLAY


  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()

  trex.changeAnimation("running", trex_running);
  if (score > localStorage['HighScore']) {
    localStorage['HighScore'] = score
  }
  score = 0
  //obstacles and clouds has to go back

  //gameState has to be play


}

function GameOver(){
swal(
  {
    title: " You infected " + score + " people",
    text: " Be Careful and Protect Yourself with these items!!",
    imageURL: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Play Again"
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }

);

}