

var gravedad=900;

var config = {
  type: Phaser.AUTO,
  width: 590,
  height: 404,
  parent: 'juego',
  scene:[{
         preload: preload,
         create: create,
         update: update,
         extend:{
          generarApple: generarApple,
          jugar:jugar,
          gameOver: gameOver,
          distancia: distancia,
          saltar: saltar
        }}],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: gravedad },
      debug: false
    }
  },
  fps: {
    target: 60, // Limita a 30 FPS
    forceSetTimeOut: true // Usar setTimeout en lugar de requestAnimationFrame
}
}

var game = new Phaser.Game(config);
var delayApple=1300;
var delayinicio=800;

var statePaca=false;
var clonPaca=1;
var delayPacas1=900;
var delayPacas2=1500;
var delaypacas=Phaser.Math.Between(delayPacas1, delayPacas2);

var App=this.apple;
var fondo1;
var estado=true;
var obspeed=-300;
var speed=10;
var isPaused = false;
var score = 0;
var scoreText;
var vidas=3;
var vidasText;
var Paca;
var pacas= this.paca;
var vida=this.vida;
var nivel='Easy'
var salto='salto1';
var salto2='2salto1';

var delay=100;
var estadoJuego ='inicio';
var Play=this.Play;
var fondoInicio= this.fondoInicio;
var fondoPierde= this.fondoPierde;
var Tickets=0;
var anterior=0;
var ticketText=this.tichetText;
var dist;
var cae='cae1';
var estadoCae=0;
var mouseIsPressed;
var wasSpace;
var spaceIs;
var wasMause=false;
var cont=0;
var contM=0;

function preload() {
  
  this.load.image('background', 'assets/fondo_doble.png');
  this.load.spritesheet('piggie1', 'assets/Piggies1.png',{frameWidth: 74, frameHeight:92});
  
  this.load.spritesheet('piggie2', 'assets/Piggies2.png',{frameWidth: 74, frameHeight:92});
  this.load.spritesheet('piggie3', 'assets/Piggies3.png',{frameWidth: 74, frameHeight:92});
  this.load.spritesheet('piggie4', 'assets/Piggies4.png',{frameWidth: 74, frameHeight:92});
  this.load.spritesheet('piggie5', 'assets/Piggies5.png',{frameWidth: 74, frameHeight:92});
  this.load.image('piso', 'assets/linea_suleo.png');

  this.load.image('apple', 'assets/apple.png');
  this.load.image('paca', 'assets/Paca_paja.png');
  this.load.spritesheet('vida','assets/vidas.png',{frameWidth: 143, frameHeight:47});
  this.load.image('contador', 'assets/contador_manzanas.png');
  this.load.bitmapFont('myFont', 'assets/thick_8x8.png', 'assets/thick_8x8.xml');
  this.load.image('fondoInicio', 'assets/Backgrawn.png');
  this.load.image('gameover','assets/game_over.png');
  this.load.spritesheet('play','assets/boton_play.png',{frameWidth: 159, frameHeight:61});

  this.load.audio('eatSoud', 'audios/eating-sound-effect-36186.mp3');
  this.load.audio('downSoud', 'audios/085735_pig-86586.mp3');
  this.cont=0;

}

function create(){

  
  let Pig;
  

  fondo1 = this.add.tileSprite(0, 0, config.width, config.height, 'background');
  fondo1.setOrigin(0, 0);
 
  this.piggie= this.physics.add.sprite(150, 321, 'piggie1');
  this.piggie.body.setSize(40, 60); // Establece el tamaño alrededor de la silueta
  this.piggie.body.setOffset(17, 30);
  

  this.piggie2= this.physics.add.sprite(150, 321, 'piggie2');
  this.piggie2.body.setSize(40, 60); // Establece el tamaño alrededor de la silueta
  this.piggie2.body.setOffset(17, 32);
  
  this.piggie2.disableBody(true,true);

  this.soundEat = this.sound.add('eatSoud');
  this.soundDown = this.sound.add('downSoud');
/*
  this.piggie3= this.physics.add.sprite(150, 321, 'piggie3');
  this.piggie3.body.setSize(40, 60); // Establece el tamaño alrededor de la silueta
  this.piggie3.body.setOffset(17, 32);
  this.piggie3.body.setVisible(false);

  this.piggie4= this.physics.add.sprite(150, 321, 'piggie4');
  this.piggie4.body.setSize(40, 60); // Establece el tamaño alrededor de la silueta
  this.piggie4.body.setOffset(17, 32);
  this.piggie4.body.setVisible(false);

  this.piggie5= this.physics.add.sprite(150, 321, 'piggie5');
  this.piggie5.body.setSize(40, 60); // Establece el tamaño alrededor de la silueta
  this.piggie5.body.setOffset(17, 32);
  this.piggie5.body.setVisible(false);*/
  
  this.piso= this.physics.add.image(295, 390, 'piso').setImmovable();
  App= this.physics.add.image(600,352, 'apple');
  Paca =this.physics.add.group();
  pacas = Paca.create(550, 340, 'paca');
  
  fondoPierde=this.add.image(0, 0,'gameover');
  fondoPierde.setOrigin(0, 0);
  fondoPierde.setVisible(false);

  vida= this.add.sprite(90 ,30,'vida');
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
  this.physics.add.collider(this.piggie2, this.piso);
  

  this.piso.setBounce(0);
  
  this.piggie.setBounce(0);
  this.piggie2.setBounce(0);/*
  this.piggie3.setBounce(0);
  this.piggie4.setBounce(0);
  this.piggie5.setBounce(0);*/
  App.setBounce(0);
 

  pacas.setVelocityX(obspeed);
 
   Pig=this.piggie;
   
  /*this.input.on('pointerdown', function () {
    wasMause=mouseIsPressed;
    mouseIsPressed = true;
    contM++;
    
    Pig.anims.play(salto);

    
    
    console.log(Pig.y);

    if(contM==1){
      Pig.setVelocityY(-500);
       this.saltar();

      console.log(gravedad);
      this.cont=2;
    }

    if(contM==2){
     
      Pig.y=300;
      this.saltar();
      
    this.cont=1;
    }
   console.log("contM "+contM);


});

this.input.on('pointerup', function () {
  mouseIsPressed = false;
  
  
})*/

  Play.on('pointerover', ()=>{
    Play.setFrame(1);
});
  Play.on('pointerout', ()=>{
    Play.setFrame(0);
});

  Play.on('pointerdown', jugar);

   vidasText = this.add.text(30, 50, 'Vidas: 3', { fontSize: '16px', fill: '#000' });

   function colectar( App, Pig){

    this.soundEat.play();
    App.disableBody(true, true);
    score += 0.5;
    scoretext.setText(score);

}

  function pierde(pacas, Pig){

    this.soundDown.play();
    console.log('entro');
   this.physics.pause();
   
    vidas -= 0.5;
   // vidasText.setText('Vidas: ' + vidas);
    
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
    
  this.physics.add.overlap(App, this.piggie, colectar, colectar, this);
  this.physics.add.overlap(pacas, this.piggie, pierde, pierde, this);

  this.physics.add.overlap(App, this.piggie2, colectar, colectar, this);
  this.physics.add.overlap(pacas, this.piggie2, pierde, pierde, this);


  this.anims.create({
    key: 'Easy',
    frames: this.anims.generateFrameNumbers('piggie1', { start: 0, end: 6 }),
    frameRate: 20

});
this.anims.create({
  key: 'Normal',
  frames: this.anims.generateFrameNumbers('piggie2', { start: 0, end: 6 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'Dificil',
  frames: this.anims.generateFrameNumbers('piggie3', { start: 0, end: 6 }),
  frameRate: 20
  
});
this.anims.create({
  key: 'legend',
  frames: this.anims.generateFrameNumbers('piggie4', { start: 0, end: 6 }),
  frameRate: 30
  
});
this.anims.create({
  key: 'Mortal',
  frames: this.anims.generateFrameNumbers('piggie5', { start: 0, end: 6 }),
  frameRate: 40
  
});

this.anims.create({
  key: 'cae1',
  frames: [ { key: 'piggie1', frame: 7 } ],
  frameRate: 20
  
});
this.anims.create({
  key: 'cae2',
  frames: [ { key: 'piggie2', frame: 7 } ],
  frameRate: 20
  
});
this.anims.create({
  key: 'cae3',
  frames: [ { key: 'piggie3', frame: 7 } ],
  frameRate: 20
  
});
this.anims.create({
  key: 'cae4',
  frames: [ { key: 'piggie4', frame: 7 } ],
  frameRate: 20
  
});
this.anims.create({
  key: 'cae5',
  frames: [ { key: 'piggie5', frame: 7 } ],
  frameRate: 20
  
});

this.anims.create({
    key: 'salto1',
    frames: [ { key: 'piggie1', frame: 5 } ],
    frameRate: 20
});

this.anims.create({
  key: '2salto1',
  frames: [ { key: 'piggie1', frame: 6 } ],
  frameRate: 20
});

this.anims.create({
  key: 'salto2',
  frames: [ { key: 'piggie2', frame: 5 } ],
  frameRate: 20
});

this.anims.create({
  key: '2salto2',
  frames: [ { key: 'piggie2', frame: 6 } ],
  frameRate: 20
});

this.anims.create({
  key: 'salto3',
  frames: [ { key: 'piggie3', frame: 5 } ],
  frameRate: 20
});

this.anims.create({
  key: '2salto3',
  frames: [ { key: 'piggie3', frame: 6 } ],
  frameRate: 20
});

this.anims.create({
  key: 'salto4',
  frames: [ { key: 'piggie4', frame: 5 } ],
  frameRate: 20
});

this.anims.create({
  key: '2salto4',
  frames: [ { key: 'piggie4', frame: 6 } ],
  frameRate: 20
});

this.anims.create({
  key: 'salto5',
  frames: [ { key: 'piggie5', frame: 5 } ],
  frameRate: 20
});

this.anims.create({
  key: '2salto5',
  frames: [ { key: 'piggie5', frame: 6 } ],
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
        delay:Phaser.Math.Between(delayinicio, delayApple),
        loop: true,
        callback:() =>{
          this.generarApple()
        }
   });

   function distancia(){
    
   dist=(pacas.x)+120;
   App.setVisible(false);
   App.x=dist;
   App.setVisible(true);
   }
  
   
   this.time.addEvent({
        delay: delaypacas, // De 1 a 3 segundos
        loop: true,
        callback: function() {
            // Generar un número aleatorio entre 1 y 3 para la cantidad de objetos a crear
            var count = Phaser.Math.Between(1, 3);
            var delaypaca= delay;
            for (var i = 0; i < count; i++) {

                this.time.addEvent({
                  delay:i*delaypaca,
                  loop: false,
                  callback: function(){
                  pacas= Paca.create(550,340 ,'paca');
                  this.physics.add.existing(pacas);
                  this.physics.add.collider(pacas, this.piso);
                 

                  this.physics.add.overlap(pacas, Pig, pierde, pierde, this);
                  /*
                  this.physics.add.overlap(pacas, this.piggie2, pierde, pierde, this);
                  this.physics.add.overlap(pacas, this.piggie3, pierde, this);
                  this.physics.add.overlap(pacas, this.piggie4, pierde, pierde, this);
                  this.physics.add.overlap(pacas, this.piggie5, pierde, pierde, this);*/
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

  delaypacas=Phaser.Math.Between(delayPacas1, delayPacas2);
  console.log("delayPaca: "+delaypacas);

  console.log(this.piggie.y);
  console.log(this.cont);
  console.log('nivel '+nivel);

  /*if(statePaca==true){
    clonPaca=Phaser.Math.Between(1, 10);
    if(clonPaca==2){
      doblePaca();
    }
  }*/
  wasSpace=spaceIs;
  spaceIs=this.cursors.space.isDown;

  
    wasMause=mouseIsPressed;
    mouseIsPressed = this.input.activePointer.isDown;

    if(mouseIsPressed && !wasMause){
    contM=1;
    }
   
   console.log("contM "+contM);
  contM=0;



  console.log("mouse "+mouseIsPressed+" "+wasMause);
  Pig=this.piggie;

  if(estadoCae==1){
    Pig.anims.play(cae);
  }
  switch (true) {
    case (score>= 8) && (score< 15):
      nivel='Normal';
      salto='salto2';
      salto2='2salto2';
      cae='cae2';
      speed=14;
      obspeed=-850;
      delay=85;
      delayApple=2000;
      delayPacas2=1000;
      statePaca=false;
        break;
    case (score >= 15 &&score < 25):
      nivel='Dificil';
      salto='salto3';
      salto2='2salto3';
      cae='cae3';
      speed=20;
      obspeed=-1000;
      delay=80;
      delayinicio=1000;
      delayApple=3000;
      delayPacas2=1500;
      statePaca=false;
        break;
    case ((score >=25 && score < 30)):
     nivel='legend';
     salto='salto4';
     salto2='2salto4';
     cae='cae4';
     speed=25;
     obspeed=-1100;
     delay=50;
     delayinicio=1000;
     delayApple=4000;
     delayPacas1=500;
     delayPacas2=700;
     statePaca=false;
    
        break;
  
    case ((score>=30)):
     nivel='Mortal';
     salto='salto5';
     salto2='2salto5';
     cae='cae5';
     speed=20;
     obspeed=-1200;
     delay=40;
     delayPacas1=110;
     delayPacas2=200;
     statePaca=true; 
        break;
    default:
      nivel='Easy';
      salto='salto1';
      salto2='2salto1';
      cae='cae1';
      speed=12;
      obspeed=-650;
      delay=100;
      statePaca=false;
        // Código para cualquier otro caso
        break;
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
if (!isPaused) {
  // Incrementa la posición solo si no está pausado
  fondo1.tilePositionX += speed;
}

  if (fondo1.tilePositionX >= 2*fondo1.width) {
      fondo1.tilePositionX=0;
  }

  if((( spaceIs && !wasSpace)&&(this.cont<=1))||(mouseIsPressed && !wasMause)&&(this.cont<=1)){

      
    
    console.log(Pig.y);

    if(this.cont==1){
      Pig.anims.play(salto2); 
      Pig.setVelocityY(-500);
       this.saltar();

      console.log(gravedad);
      this.cont=2;
    }

    if(this.cont==0){
      Pig.anims.play(salto);
      Pig.y=300;
      this.saltar();
      
    this.cont=1;
    }
    
  }
  console.log(gravedad);

//if(((spaceIs && !wasSpace)&&(this.cont<=1))||(mouseIsPressed &&(this.cont<=1))){
  
  //this.piggie.anims.play(salto,true);
  
  //this.piggie.setVelocityY(-500);

  //console.log(this.piggie.y);

  //this.cont=2;
  
//}
if((Pig.y>=330)){
 Pig.anims.play(nivel,true); 
 this.cont=0;
 contM=0;
 gravedad=1000;
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
  fondoPierde.setVisible(false);
  fondoInicio.setVisible(false);
  
 }

 function gameOver(){
  /*
  var scoreAnterior;
  var scoreTotal;

  const docRef = doc(db, "users", ID);
   getDoc(docRef)
  .then((docSnap) => {
      
    scoreAnterior= docSnap.data().score;

    console.log("Document data:", docSnap.data().score);
  })
  .catch((error) => {
    console.error("Error getting document:", error);
  });
*/
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
   updateScoreInFirebase();
  /* scoreTotal =scoreAnterior +score;

  const UserSave = collection(db,"users");
  const ScoreSave =doc(UserSave, ID);

  setDoc(ScoreSave, { score: scoreTotal }, { merge: true })
  .then(() => {
    console.log("Document written with ID: ", score.id);
  })
  .catch((e) => {
    console.error("Error adding document: ", e);
  });
*/

 }

 function distancia(){
  
 dist=(pacas.x)+ 110;
 App.setVisible(false);
 App.x=dist;
 App.setVisible(true);
 }

function saltar(){
  Pig.setVelocityY(-300);
  this.time.addEvent({
    delay:200,
    loop:false,
    callback:() =>{
      if(cont==0){
      gravedad=6000;
      console.log(gravedad);
      Pig.setVelocityY(0);
      }
      if(cont>=1){
        gravedad=8000;
        console.log(gravedad);
        Pig.setVelocityY(0);
      }
    }
  });
}

function updateScoreInFirebase() {

  console.log('Nuevo puntaje:', score);
  sessionStorage.setItem('Puntaje', score);
  //window.postMessage({ type: 'updateScore', score: score }, '*');


/*
  const userRef = db.collection("users").doc("TnavF2TCAXR43649sqAkteTSo552");
  // Actualiza el puntaje
  userRef.update({
    score: firebase.firestore().FieldValue.increment(score)
  })
  .then(() => {
    console.log("Puntaje actualizado correctamente en Firebase");
  })
  .catch((error) => {
    console.error("Error al actualizar el puntaje en Firebase: ", error);
  });*/
}

/*function doblePaca(){

  this.time.addEvent({
    delay: 50, // De 1 a 3 segundos
    loop: false,
    callback: function() {
        // Generar un número aleatorio entre 1 y 3 para la cantidad de objetos a crear
        var count = Phaser.Math.Between(1, 3);
        var delaypaca= delay;
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

 }*/
