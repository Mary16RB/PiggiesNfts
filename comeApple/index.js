var gravedad=1000;

var config = {
  type: Phaser.AUTO,
  width: 590,
  height: 404,
  parent: 'juego',
  scene:[{preload: preload,
         create: create,
         update: update,
        extend:{
          generarApple: generarApple,
          jugar:jugar,
          gameOver: gameOver,
          distancia: distancia
        }}],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: gravedad },
      debug: false
    }
  }
}
var game = new Phaser.Game(config);
 
var App=this.apple;
var fondo1;
var estado=true;
var obspeed=-300;
var speed=5;
var isPaused = false;
var score = 0;
var scoreText;
var vidas=3;
var vidasText;
var Paca;
var pacas= this.paca;
var vida=this.vida;
var nivel;
var salto;
var delay;
var estadoJuego ='inicio';
var Play=this.Play;
var fondoInicio= this.fondoInicio;
var fondoPierde= this.fondoPierde;
var Tickets=0;
var anterior=0;
var ticketText=this.tichetText;
var dist;
var cae;
var estadoCae=0;
var mouseIsPressed = false;
function preload() {
  
  this.load.image('background', 'assets/fondo_doble.png');
  this.load.spritesheet('piggie', 'assets/Piggies_unidos.png',{frameWidth: 74, frameHeight:92});
  this.load.image('piso', 'assets/piso.png');
  this.load.image('apple', 'assets/apple.png');
  this.load.image('paca', 'assets/Paca_paja.png');
  this.load.spritesheet('vida','assets/vidas.png',{frameWidth: 143, frameHeight:47});
  this.load.image('contador', 'assets/contador_manzanas.png');
  this.load.bitmapFont('myFont', 'assets/thick_8x8.png', 'assets/thick_8x8.xml');
  this.load.image('fondoInicio', 'assets/Backgrawn.png');
  this.load.image('gameover','assets/game_over.png');
  this.load.spritesheet('play','assets/boton_play.png',{frameWidth: 159, frameHeight:61});
  this.cont=0;

}

function create(){
  
  let Pig;
  

  fondo1 = this.add.tileSprite(0, 0, config.width, config.height, 'background');
  fondo1.setOrigin(0, 0);
 
  this.piggie= this.physics.add.sprite(150, 321, 'piggie');
  this.piggie.body.setSize(40, 60); // Establece el tamaño alrededor de la silueta
  this.piggie.body.setOffset(17, 32);
  
  this.piso= this.physics.add.image(330, 390, 'piso').setImmovable();
  App= this.physics.add.image(600,352, 'apple');
  Paca =this.physics.add.group();
  pacas = Paca.create(550, 340, 'paca');
  
  fondoPierde=this.add.image(0, 0,'gameover');
  fondoPierde.setOrigin(0, 0);
  fondoPierde.setVisible(false);

  vida= this.add.sprite(90 ,30,'vada');
  this.contador=this.add.image(520,30,'contador');
  scoretext = this.add.bitmapText(485, 24, 'myFont', '0', 18); 
  ticketText = this.add.bitmapText(230, 290, 'myFont', 'Tichets: 0', 18); 
  ticketText.setVisible(false);


  fondoInicio = this.add.image(310,202,'fondoInicio');
  Play = this.add.sprite(300,360 ,'play').setInteractive();
  

  this.piso.body.allowGravity=false;
  this.physics.add.collider(pacas, this.piso);
  this.physics.add.collider(App, this.piso);
  this.physics.add.collider(this.piggie, this.piso);

   

  this.piso.setBounce(0);
  this.piggie.setBounce(0);
  App.setBounce(0);
 

  pacas.setVelocityX(obspeed);

   Pig=this.piggie;
   this.input.on('pointerdown', function () {
    mouseIsPressed = true;
});

this.input.on('pointerup', function () {
  mouseIsPressed = false;
});

  Play.on('pointerover', ()=>{
    Play.setFrame(1);
});
  Play.on('pointerout', ()=>{
    Play.setFrame(0);
});

  Play.on('pointerdown', jugar);

   vidasText = this.add.text(30, 50, 'Vidas: 3', { fontSize: '16px', fill: '#000' });

   function colectar( App, Pig){
    App.disableBody(true, true);
    score += 0.5;
    scoretext.setText(score);
    

}

  function pierde(pacas, Pig){
    console.log('entro');
   this.physics.pause();
   

    vidas -= 0.5;
    vidasText.setText('Vidas: ' + vidas);
    
    pausarYLimpiar.call(this);
  }
  
  function pausarYLimpiar() {
    isPaused = true;
    estadoCae=1;
    // Pausar la simulación de física en la escena
    this.physics.pause();

    this.time.addEvent({
        delay: 1000, // Espera un segundo (1000 milisegundos)
       loop: false, 
       callback: function() {
         Paca.clear(true, true);
         App.disableBody(true, true);
            this.physics.resume(); 
            isPaused = false;
            estadoCae=0;
            // Reanuda la simulación de física en la escena
        },
        callbackScope: this
        
    });
  
  }
    
  this.physics.add.overlap(App, Pig, colectar, colectar, this);
  this.physics.add.overlap(pacas, Pig, pierde, pierde, this);

   
  this.anims.create({
    key: 'Easy',
    frames: this.anims.generateFrameNumbers('piggie', { start: 0, end: 6 }),
    frameRate: 20

});
this.anims.create({
  key: 'Normal',
  frames: this.anims.generateFrameNumbers('piggie', { start: 12, end: 18 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'Dificil',
  frames: this.anims.generateFrameNumbers('piggie', { start: 24, end: 30 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'legend',
  frames: this.anims.generateFrameNumbers('piggie', { start: 36, end: 42 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'Mortal',
  frames: this.anims.generateFrameNumbers('piggie', { start: 48, end: 54 }),
  frameRate: 20
  
});

this.anims.create({
  key: 'cae1',
  frames: this.anims.generateFrameNumbers('piggie', { start: 7, end: 11 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'cae2',
  frames: this.anims.generateFrameNumbers('piggie', { start: 19, end: 23 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'cae3',
  frames: this.anims.generateFrameNumbers('piggie', { start: 31, end: 35 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'cae4',
  frames: this.anims.generateFrameNumbers('piggie', { start:43 , end: 47 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'cae5',
  frames: this.anims.generateFrameNumbers('piggie', { start: 55, end: 59 }),
  frameRate: 20
  
});

this.anims.create({
    key: 'salto1',
    frames: [ { key: 'piggie', frame: 5 } ],
    frameRate: 20
});
this.anims.create({
  key: 'salto2',
  frames: [ { key: 'piggie', frame: 17 } ],
  frameRate: 20
});

this.anims.create({
  key: 'salto3',
  frames: [ { key: 'piggie', frame: 29 } ],
  frameRate: 20
});
this.anims.create({
  key: 'salto4',
  frames: [ { key: 'piggie', frame: 41 } ],
  frameRate: 20
});
this.anims.create({
  key: 'salto5',
  frames: [ { key: 'piggie', frame: 53 } ],
  frameRate: 20
});
   this.cursors= this.input.keyboard.createCursorKeys();

   this.anims.create({
    key: '3vidas',
    frames: [ { key: 'vida', frame: 0 } ],
    frameRate: 20
});
this.anims.create({
  key: '2vidas',
  frames: [ { key: 'vida', frame: 1 } ],
  frameRate: 20
});
this.anims.create({
  key: '1vidas',
  frames: [ { key: 'vida', frame: 2 } ],
  frameRate: 20
});
this.anims.create({
  key: '0vidas',
  frames: [ { key: 'vida', frame: 3 } ],
  frameRate: 20
});

   this.time.addEvent({
        delay: 3000,
        loop: true,
        callback:() =>{
          this.generarApple()
        }
   });

   function distancia(){
    
   dist=(pacas.x)+ 65;
   App.setVisible(false);
   App.x=dist;
   App.setVisible(true);
   }
  

   this.time.addEvent({
        delay: Phaser.Math.Between(1000, 3000), // De 1 a 3 segundos
        loop: true,
        callback: function() {
            // Generar un número aleatorio entre 1 y 3 para la cantidad de objetos a crear
            var count = Phaser.Math.Between(1, 3);
            delaypaca= delay;
            for (var i = 0; i < count; i++) {

                this.time.addEvent({
                  delay:i*delaypaca,
                  loop: false,
                  callback: function(){
                  pacas= Paca.create(550,340 ,'paca');
                  this.physics.add.existing(pacas);
                  this.physics.add.collider(pacas, this.piso);
                 

                  this.physics.add.overlap(pacas, Pig, pierde, pierde, this);
                  this.physics.add.overlap(App, pacas, distancia, distancia, this);


                  pacas.setBounce(0);

                  pacas.setVelocityX(obspeed);
                   this.physics.add.overlap(pacas, App, distancia, distancia, this);
                
                  },
                 
                  callbackScope: this
                
                });
              }
              this.physics.add.overlap(pacas, App, distancia, distancia, this);
          },
          callbackScope: this
      }); 


  }

function update(){

 switch (estadoJuego) {
   case 'inicio':
    score=0;
    vidas=3;
    Paca.clear(true, true);
    App.disableBody(true, true);
   

    break;
   
    case 'start':
  App.setVelocityX(obspeed);
  console.log(this.piggie.y);
  console.log(this.cont);
  console.log('nivel '+nivel);
  
  if(estadoCae==1){
    this.piggie.anims.play(cae);
  }
  switch (true) {
    case (score>= 8) && (score< 15):
      nivel='Normal';
      salto='salto2';
      cae='cae2';
      speed=13;
      obspeed=-750;
      delay=150;
        break;
    case (score >= 15 &&score < 25):
      nivel='Dificil';
      salto='salto3';
      cae='cae3';
      speed=15;
      obspeed=-850;
      delay=100;
        break;
    case ((score >=25 && score < 30)):
     nivel='legend';
     salto='salto4';
     cae='cae4';
     speed=20;
     obspeed=-1000;
     delay=50;
        break;
  
    case ((score>=30)):
     nivel='Mortal';
     salto='salto5';
     cae='cae5';
     speed=25;
     obspeed=-1200;
     delay=20;
        break;
    default:
      nivel='Easy';
      salto='salto1';
      cae='cae1';
      speed=9;
      obspeed=-550;
      delay=150;
        // Código para cualquier otro caso
        break;
  }
  if (!isPaused) {
    // Incrementa la posición solo si no está pausado
    fondo1.tilePositionX += speed;
  }
  

  switch (vidas) {
    case 3:
       vida.anims.play('3vidas');
        break;
    case 2:
      vida.anims.play('2vidas');
        break;
    case 1:
      vida.anims.play('1vidas');
        break;
    default:
      vida.anims.play('0vidas');
      this.gameOver();
        // Código para cualquier otro caso
        break;
}


  if (fondo1.tilePositionX >= 2*fondo1.width) {
      fondo1.tilePositionX=0;
  }

  if(((this.cursors.space.isDown)&&(this.cont<1))||(mouseIsPressed &&(this.cont<1))){
    this.piggie.anims.play(salto);
    this.piggie.y=320;
    this.piggie.setVelocityY(-400);
    console.log(this.piggie.y);
    this.cont=1;
   
}
if(((this.cursors.space.isDown)&&(this.cont<=1)&&(this.piggie.y<280))||(mouseIsPressed &&(this.cont<=1)&&(this.piggie.y<280))){
    
  this.piggie.setVelocityY(-200);
  console.log(this.piggie.y);
  this.cont=2;
  this.piggie.anims.play(salto);
}
if((this.piggie.y>=330)){
 this.piggie.anims.play(nivel,true); 
 this.cont=0;
}
break;

case 'gameover':
  Play.setVisible(true);
  Paca.clear(true, true);
  App.disableBody(true, true);
  anterior=Tickets;

break;
 }
}

function generarApple(){
  App.enableBody(true,600,352,true,true);
}
 function jugar(){
  estadoJuego ='start';
  vidas=3;
  score=0;
  scoretext.setText(score);
  Play.setVisible(false);
  ticketText.setVisible(false);
  
  fondoInicio.setVisible(false);

  App.enableBody(true,600,352,true,true);
  fondoPierde.setVisible(false);
 }

 function gameOver(){
  Tickets= anterior+ score;
  
  this.time.addEvent({
    delay: 1000,
    loop: false,
    callback:() =>{
      estadoJuego ='gameover';

     
     ticketText.setVisible(true);
     ticketText.setText('Tickets: '+ Tickets);

     fondoInicio.setVisible(false);
     fondoPierde.setVisible(true);
     Paca.clear(true, true);
     App.disableBody(true, true);
    }
   });
 }

 function distancia(){
  
 dist=(pacas.x)+ 65;
 App.setVisible(false);
 App.x=dist;
 App.setVisible(true);
 }


