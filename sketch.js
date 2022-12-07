var bg;
var bird, birdImg;
var pillar1, pillar1Img;
var pillar2, pillar2Img;
var ground, groundImg;
var edges;
var pillarsGroup;
var gamestate = "play";
var score=0;
var gameOver, gameOverImg, restart, restartImg;

function preload(){;
  bg = loadImage("bg.png");
  birdImg = loadImage("bird.png");
  pillar1Img = loadImage("bottom pillar.png");
  pillar2Img = loadImage("top pillar.png");
  groundImg = loadImage("ground2.jpg");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 //bird sprite 
  bird = createSprite(250, 200, 50, 50);
  bird.addImage(birdImg);
  bird.scale = 0.4;
  bird.debug = false;
  bird.setCollider("circle", 0, -50, bird.width/3)

  //ground sprite
  ground = createSprite(width/2, height - 30, width, 30);
  ground.addImage(groundImg);

  gameOver = createSprite(width/2,height/2-60);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  //edges sprite
  //edges = createEdgeSprites();


  //pillar group
  pillarsGroup = new Group();
  
  score = 0;  
}

function draw() {
  background(bg);
  textSize(30);
  fill("white")
  text("Score: "+ score,30,50)

  if(gamestate === "play"){
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -(6 + 3*score/100);
    score = score + Math.round(getFrameRate()/60);
    if(keyDown("SPACE")){
      bird.velocityY = -10;
    }
  
    //gravity
    bird.velocityY += 0.3;
  
    //this is for the bird to not go out of screen
    //bird.bounceOff(edges[3]);
  
    //infinite ground
    if (ground.x < 200){
      ground.x = ground.width/2;
    }

    spawnPillarTop();
    spawnPillarBottom();
  
    if(bird.isTouching(pillarsGroup)|| bird.isTouching(ground)){
      gamestate = "end";
    }
  }

  else if(gamestate === "end"){
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    bird.velocityX = 0;
    bird.velocityY = 0;
    pillarsGroup.setVelocityXEach(0);
    pillarsGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)){
      reset();  
      //touches = []
    }
  }

  drawSprites();
}

function spawnPillarTop(){
  if (frameCount % 120 === 0) {
    var pillar = createSprite(width, 0, 50, random(200, (height - 150)));

    pillar.shapeColor = "green";
    pillar.velocityX = -5;
    //pillar.x = Math.round(random(120,400));
    //pillar.addImage(pillar1Img);
    pillar.lifetime = 500;
    pillarsGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
    restart.depth = pillar.depth + 1;
  }
}

function spawnPillarBottom(){
  if (frameCount % 120 === 0) {
    var pillarH = random(200, (height - 300));
    var pillar = createSprite(width-300, windowHeight - pillarH/2 - 110, 50, pillarH);
  
    pillar.shapeColor = "green";
    pillar.velocityX = -5;
    //pillar.x = Math.round(random(120,400));
    //pillar.addImage(pillar1Img);
    pillar.lifetime = 500;
    pillarsGroup.add(pillar);
  }
}
 
function reset(){
  gamestate = "play";
  gameOver.visible = false;
  restart.visible = false;
  bird.x = 250;
  bird.y = 200;

  pillarsGroup.destroyEach();

  score = 0;
}