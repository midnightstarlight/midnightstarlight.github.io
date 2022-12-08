//import * as THREE from './libs/three.js-r132/build/three.module.js';
// import {GLTFLoader} from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";

// import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
// import {CSS3DObject} from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

import {loadGLTF} from "../../libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;


let myAudioElement = new Audio('./assets/audio/santa-is-coming-on-christmas-125108.mp3');
myAudioElement.addEventListener("canplaythrough", event => {
  /* the audio is now playable; play it if permissions allow */
  myAudioElement.play();
});

myAudioElement.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

// var myAudio = document.createElement('audio');
// myAudio.setAttribute('src', 'test.mp3');
//
// myAudio.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// }, false);


window.onload = function(){



    var btn = document.getElementById('solve-hunt-btn');
    var hunt_field = document.getElementById('validationServer01');
    // var btm-sheet-validation = document.getElementById('offcanvasbottom');
    var congrats_gif = document.getElementById('top-div');

    // hunt_field.focus();

    btn.addEventListener('click', function() {
      // box.classList.remove('class1');
      // box.classList.add('class2');

      if(hunt_field.value.toLowerCase() == "macair"){
          // show validation correct
           hunt_field.classList.add('is-valid');
           congrats_gif.style.display = "block";
           //show gif animation + congrats message
           // document.getElementById("tabs-clue-1-li").style.display = "block";
           //document.getElementById("tabs-clue-" + [i+1].toString() +"-li").style.display = "inline";
           initConfetti();
           render();
      }

      console.log("butn pressed");

    });


    document.getElementById('btn-init-solve-hunt').addEventListener('click', function(){
        $('#validationServer01').focus();
        console.log("solve hunt butn pressed");
    })

}

//
// window.onload = function(){
// 	//canvas init
// 	var canvas = document.getElementById("canvas");
// 	var ctx = canvas.getContext("2d");
//
// 	//canvas dimensions
// 	var W = window.innerWidth;
// 	var H = window.innerHeight;
// 	canvas.width = W;
// 	canvas.height = H;
//
// 	//snowflake particles
// 	var mp = 50; //max particles
// 	var particles = [];
// 	for(var i = 0; i < mp; i++)
// 	{
// 		particles.push({
// 			x: Math.random()*W, //x-coordinate
// 			y: Math.random()*H, //y-coordinate
// 			r: Math.random()*4+1, //radius
// 			d: Math.random()*mp //density
// 		})
// 	}
//
// 	//Lets draw the flakes
// 	function draw()
// 	{
// 		ctx.clearRect(0, 0, W, H);
//
// 		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
// 		ctx.beginPath();
// 		for(var i = 0; i < mp; i++)
// 		{
// 			var p = particles[i];
// 			ctx.moveTo(p.x, p.y);
// 			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
// 		}
// 		ctx.fill();
// 		update();
// 	}
//
// 	//Function to move the snowflakes
// 	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
// 	var angle = 0;
// 	function update()
// 	{
// 		angle += 0.01;
// 		for(var i = 0; i < mp; i++)
// 		{
// 			var p = particles[i];
// 			//Updating X and Y coordinates
// 			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
// 			//Every particle has its own density which can be used to make the downward movement different for each flake
// 			//Lets make it more random by adding in the radius
// 			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
// 			p.x += Math.sin(angle) * 2;
//
// 			//Sending flakes back from the top when it exits
// 			//Lets make it a bit more organic and let flakes enter from the left and right also.
// 			if(p.x > W+5 || p.x < -5 || p.y > H)
// 			{
// 				if(i%3 > 0) //66.67% of the flakes
// 				{
// 					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
// 				}
// 				else
// 				{
// 					//If the flake is exitting from the right
// 					if(Math.sin(angle) > 0)
// 					{
// 						//Enter from the left
// 						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
// 					}
// 					else
// 					{
// 						//Enter from the right
// 						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
// 					}
// 				}
// 			}
// 		}
// 	}
//
// 	//animation loop
// 	setInterval(draw, 33);
// }




document.addEventListener('DOMContentLoaded', () => {


  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#ar-div"),
      imageTargetSrc: './assets/targets/jyang-christmas-2022-targets.mind',
      uiScanning:"#scanning",
      uiLoading: "no"
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8});


    const anchor = [];
    const plane = [];
    const gltf = [];
    const mixer = [];
    const clues = new Array(6).fill(false);

    for (let i = 0; i < 6; i++){
        anchor[i] = mindarThree.addAnchor(i);
        plane[i] = new THREE.Mesh(geometry, material);

        anchor[i].group.add(plane[i]);
        // console.log("loop " + i);

        //alloc models
        gltf[i] = await loadGLTF('../../assets/models/letters/jpie/'+ i.toString() +'.gltf');
        gltf[i].scene.scale.set(0.9,0.9,0.9);
        gltf[i].scene.position.set(0, 0, 0.5);
        anchor[i].group.add(gltf[i].scene);
        mixer[i] = new THREE.AnimationMixer(gltf[i].scene);

        anchor[i].onTargetFound = () => {
          console.log("on target found " + i.toString() + " "+ clues[i].toString());

         if (clues[i] != true){
            clues[i] = true;
            console.log("setting clue " + i.toString() + " to true :)");

            //unhide clue section
            console.log("setting clue section " + [i+1].toString() + " to visible :)");
            document.getElementById("tabs-clue-" + [i+1].toString() +"-li").style.display = "inline";
            // document.getElementById("tabs-clue-" + [i+1].toString()).click();
            // $(document).ready(function(){
            //     $("#tabs-clue-1-tab").click(function(){
            //         $("#tabs-clue-1").click();
            //     });
            // });
            // $('#tabs-clue-1').click();
            // document.getElementById("tabs-clue-" + [i+1].toString()).style.display = "inline";

          }

        }
        anchor[i].onTargetLost = () => {
          console.log("on target lost " + i.toString());
          // document.getElementById("tabs-clue-1-li").style.display = "block";
        }
    }


    const clock = new THREE.Clock();


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();

        for (let i = 0; i < 6; i++){
            gltf[i].scene.rotation.set(0, gltf[i].scene.rotation.y+delta, 0);
            mixer[i].update(delta);
        }


        renderer.render(scene, camera);
    });
  }
  start();

});

// $(document).onload = function() {
//   setTimeout(function() {
//       $("#validationServer01").focus();
//   }, 100);
// };

//-----------Var Inits--------------
const canvas = document.getElementById("canvas-confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cx = ctx.canvas.width / 2;
const cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 40;
const gravity = 0.7;
const terminalVelocity = 5;
// const drag = 0.075;
const drag = 0.1;
const colors = [
{ front: 'red', back: 'darkred' },
{ front: 'green', back: 'darkgreen' },
{ front: 'blue', back: 'darkblue' },
{ front: 'yellow', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'pink', back: 'darkpink' },
{ front: 'purple', back: 'darkpurple' },
{ front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

const randomRange = (min, max) => Math.random() * (max - min) + min;

function initConfetti(){
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });


  }
};

//---------Render-----------
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
};

//---------Execution--------
// initConfetti();
// render();

//----------Resize----------
// window.addEventListener('resize', function () {
//   resizeCanvas();
// });

// //------------Click------------
// window.addEventListener('click', function () {
//   initConfetti();
// });


$(document).onload = function() {
  setTimeout(function() {
      myAudioElement.play();
  }, 100);
};
