var trex, trex_running, edges;
var groundImage;
var invisibleGround
var cloudImage
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score=0
var cloudsGroup,obsGroups
var PLAY=1
var END=0
var gameState=PLAY
var trexCollided
var gameOver,gameOverImage,restart,restartImage
var dieSound,jumpSound,checkPointSound




function preload(){
    trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
    groundImage=loadImage("ground2.png")
   cloudImage=loadImage("cloud.png")
   obstacle1=loadImage("obstacle1.png")
   obstacle2=loadImage("obstacle2.png")
   obstacle3=loadImage("obstacle3.png")
   obstacle4=loadImage("obstacle4.png")
   obstacle5=loadImage("obstacle5.png")
   obstacle6=loadImage("obstacle6.png")
  trexCollided=loadImage("trex_collided.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  dieSound=loadSound("die.mp3")
  jumpSound=loadSound("jump.mp3")
  checkPointSound=loadSound("checkPoint.mp3")
}


function setup(){
    createCanvas(windowWidth,windowHeight);
  
      // creating trex
    trex=createSprite(60,height-30,10,10)
    trex.addAnimation("running",trex_running) 
    trex.addAnimation("collided",trexCollided) 
    trex.scale=0.5
//creating ground

ground=createSprite(width/2,height-30,width,10)
ground.addImage(groundImage)


    //creating invisible ground
    invisibleGround=createSprite(width/2,height-20,width,5)
    invisibleGround.visible=false
    edges=createEdgeSprites() // it creates edges

    

    // creating clouds and obstacles group
    cloudsGroup=new Group()
    obsGroups=new Group()
    trex.setCollider("rectangle",0,0,50,50)
    trex.debug=true
//creating gameover and restart images
    gameOver=createSprite(width/2,height/2,10,5)
        gameOver.addImage(gameOverImage)
        gameOver.scale=1

      restart=createSprite(width/2,height/2+40,10,5)
      restart.addImage(restartImage)
      restart.scale=0.5
      

      gameOver.visible=false
      restart.visible=false
    
}






function draw(){
  //set background color 
    background(180);
    textSize(20)
      text ("score:"+score,width/2+50,20)

      //categorizing the gamestate
    if (gameState==PLAY){
      ground.velocityX=-10
      score=score+Math.round(getFrameRate()/60)

      if((touches.length>0 || keyDown("space"))&&trex.y>=height/2+20){
        trex.velocityY=-10
        jumpSound.play()
        touches=[]
      }
      //gravity to the trex
      trex.velocityY=trex.velocityY+0.8
      if (ground.x<0) {
        ground.x=width/2
      }
      spawnCloud()
      spawnObstacle()
      if (score%100==0 &&score>0) {
        //checkPointSound.play()
      }

      if (trex.isTouching(obsGroups)){
         gameState=END
          dieSound.play()
         //trex.velocityY=-10
        //jumpSound.play()
      }


      

    }
     else if(gameState==END){
        ground.velocityX=0
        cloudsGroup.setVelocityXEach(0)
        obsGroups.setVelocityXEach(0)
        cloudsGroup.setLifetimeEach(-1)
        obsGroups.setLifetimeEach(-1)
        trex.changeAnimation("collided",trexCollided)
        trex.velocityY=0
        
        restart.visible=true
        gameOver.visible=true
        if (mousePressedOver(restart)) {
          reset()
        }
    }
  
  trex.collide(invisibleGround)
  
  
    drawSprites();
}

// creating the function spawn cloud for making the clouds appear randomly
function spawnCloud(){
  if(frameCount%60==0){
    var cloud=createSprite(width,height/2-20,20,5)
    cloud.velocityX=-4
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(height/2-20,height/2+20))
    trex.depth=cloud.depth
    trex.depth=trex.depth+1
   // console.log("trex"+trex.depth)
    //console.log("cloud"+cloud.depth)
    cloud.lifetime=width/4
    cloudsGroup.add(cloud)


   } 
  
}
// creating the function spawn obstacles 
function spawnObstacle(){
  if (frameCount%60==0) {
    var obstacle=createSprite(width,height-30,10,15)
   // obstacle.velocityX=-(10+3*score/100)
   obstacle.velocityX=-10
    var rn=Math.round(random(1,6))

    switch(rn){
      case 1:obstacle.addImage(obstacle1)
      break ;
      case 2:obstacle.addImage(obstacle2)
      break
      case 3:obstacle.addImage(obstacle3)
      break 
      case 4:obstacle.addImage(obstacle4)
      break
      case 5:obstacle.addImage(obstacle5)
      break
      case 6:obstacle.addImage(obstacle6)
      break
      default : break 



    }
    obstacle.scale=0.6
    obstacle.lifetime=width/10

    obsGroups.add(obstacle)
  }
    


}

function reset(){
  gameState=PLAY 
  obsGroups.destroyEach()
  cloudsGroup.destroyEach()
  score=0
  trex.changeAnimation("running",trex_running)
  restart.visible=false
  gameOver.visible=false
}






























