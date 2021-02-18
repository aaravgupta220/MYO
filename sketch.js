var revan, ahsoka, anakin, kenobi, rex, droid, grievous;
var revan_image, ahsoka_image, anakin_image, kenobi_image, rex_image, droid_image, grievous_image;
var bgimg;
var saber, saber_image;
var explosion_image, explosion;
var gun, gun_image;
var hp = 20000;

function preload(){
  revan_image = loadImage("revan.png");
  ahsoka_image = loadImage("ahsoka.png");
  anakin_image = loadImage("anakin.png");
  kenobi_image = loadImage("kenobi.png");
  rex_image = loadImage("rex.png");
  droid_image = loadImage("droid.png");
  grievous_image = loadImage("grievous.png");
  bgimg = loadImage("coruscant.jpg");
  saber_image = loadImage("saber.png");
  explosion_image = loadImage("explosion.png");
  gun_image = loadImage("gunship.png");
}

function setup() {

  createCanvas(800,800);

  ground1 = createSprite(400, 790, 800, 20);
  ground2 = createSprite(400, 390, 800, 20);
  ground2.shapeColor = "black";

  revan = createSprite(50, 770, 30, 15);
  revan.addImage(revan_image);
  revan.scale = 0.4;

  anakin = createSprite(50, 370, 30, 15);
  anakin.addImage(anakin_image);
  anakin.scale = 0.4;

  saberGroup = new Group();
  droidGroup = new Group();
  gunGroup = new Group();
  cloneGroup = new Group();

}

function draw() {

  background(bgimg);  

  revan.collide(ground1);
  anakin.collide(ground2);

  spawnDroid();

  if(keyDown("UP_ARROW")){
    revan.velocityY = -10;
  }

  revan.velocityY = revan.velocityY + 0.8;

  if(keyDown("LEFT_ARROW")){
    revan.x = revan.x - 5;
  }

  if(keyDown("RIGHT_ARROW")){
    revan.x = revan.x + 5;
  }

  if(keyWentDown("SPACE")){
    saber = createSprite(revan.x, revan.y, 30, 10);
    saber.addImage(saber_image);
    saber.scale = 0.3;
    saber.velocityX = 20;
    saberGroup.add(saber);
  }

  if(saberGroup.isTouching(droidGroup) || gunGroup.isTouching(droidGroup) || cloneGroup.isTouching(droidGroup)){
    droidGroup.destroyEach();
    explosion = createSprite(droid.x, droid.y, 40, 40);
    explosion.addImage(explosion_image);
    explosion.lifetime = 20;
    hp += 50;
  }

  if(keyWentDown(71)){
    gun = createSprite(50, 50, 50, 50);
    gun.addImage(gun_image);
    gun.velocityX = 5;
    gun.velocityY = 5;
    gun.scale = 0.3;
    gun.lifetime = 160;
    gunGroup.add(gun);
  }

  if(keyWentDown(67)){
    rex = createSprite(revan.x, revan.y, 15, 30);
    rex.addImage(rex_image);
    rex.velocityX = 5;
    rex.collide(ground1);
    rex.scale = 0.5;
    rex.lifetime = 160;
    rex.velocityY = rex.velocityY + 1.2;
    cloneGroup.add(rex);
  }

  if(revan.isTouching(droidGroup)){
    hp = hp - 50;
  }

  if(hp === 0){
    console.log("Game Over!");
  }

  drawSprites();

  textSize(30);
  stroke("white");
  fill("black");
  text("HP: " + hp, revan.x - 50, revan.y - 100);

}

function spawnDroid(){

  if(frameCount%120 === 0){
    droid = createSprite(790, 775, 15, 30);
    droid.addImage(droid_image);
    droid.velocityX = -2;
    droid.scale = 0.4;
    droid.collide(ground1);
    droidGroup.add(droid);
    droid.lifetime = 400;
  }

}