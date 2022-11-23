//import * as THREE from './libs/three.js-r132/build/three.module.js';
// import {GLTFLoader} from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";

import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
import {CSS3DObject} from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

  console.log("test start");

  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/dual_targets.mind',
      maxTrack: 2
    });

    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);



    /////////////////////////////////////////////////////////////////////
    // Video in AR
    /////////////////////////////////////////////////////////////////////

    // const video = await loadVideo("./assets/videos/sintel.mp4");
    // const videoTexture = new THREE.VideoTexture(video);
    //
    // // const geometry = new THREE.PlaneGeometry(1,204/480); //1:1 is square, to keep aspect ration heigh/width
    // const geometry = new THREE.PlaneGeometry(1,1); //1:1 is square, to keep aspect ration heigh/width
    //
    // const material = new THREE.MeshBasicMaterial({map: videoTexture});
    // const plane = new THREE.Mesh(geometry, material);
    //
    // const anchor = mindarThree.addAnchor(0);
    // anchor.group.add(plane);
    //
    // anchor.onTargetFound = () => {
    //   video.play();
    // }
    // anchor.onTargetLost = () => {
    //   video.pause();
    // }
    //
    // video.addEventListener("play", () => {
    //   video.currentTime = 6
    // });

    /////////////////////////////////////////////////////////////////////
    // 2D Plane in AR
    /////////////////////////////////////////////////////////////////////
    // const geometry = new THREE.PlaneGeometry(1,1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    // const plane = new THREE.Mesh(geometry, material);

    // const anchor = mindarThree.addAnchor(0); //index of image is 0 because now it's only 1
    //anchor.group.add(plane); //group > position and location, initial is empty, can add other rendere obj, pos set to transparent

    /////////////////////////////////////////////////////////////////////
    // 3D Objects in AR w Animation
    /////////////////////////////////////////////////////////////////////

    // //add light to scene
    // const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    // scene.add(light);
    //
    // const mm_gltf = await loadGLTF("./assets/models/milkmocha-model/scene.gltf");
    // mm_gltf.scene.scale.set(1,1,1);
    // mm_gltf.scene.position.set(-3,0,-1);
    // mm_gltf.scene.userData.clickable = true;
    // // mm_gltf.scene.scale.set(1,1,1);
    // // mm_gltf.scene.position.set(0,0,0);
    //
    // const ph_gltf = await loadGLTF("./assets/models/phoenix_bird/scene.gltf");
    // ph_gltf.scene.scale.set(0.005,0.005,0.005);
    // ph_gltf.scene.position.set(0,0,-0);
    // // const ph_gltf = await loadGLTF("./assets/models/musicband-raccoon/scene.gltf");
    // // ph_gltf.scene.scale.set(0.1,0.1,0.1);
    // // ph_gltf.scene.position.set(0,-0.4,0);
    //
    //
    // const mmAnchor = mindarThree.addAnchor(0);
    // mmAnchor.group.add(mm_gltf.scene);
    //
    // const phAnchor = mindarThree.addAnchor(1);
    // phAnchor.group.add(ph_gltf.scene);
    //
    // // glft animations
    // const mixer = new THREE.AnimationMixer(ph_gltf.scene);
    // const action = mixer.clipAction(ph_gltf.animations[0]);
    // action.play();
    //
    // const clock = new THREE.Clock(); // to manage time


    /////////////////////////////////////////////////////////////////////
    // # Audio in AR
    /////////////////////////////////////////////////////////////////////

    // const listener = new THREE.AudioListener();
    // camera.add(listener);
    //
    // const audioClip = await loadAudio("./assets/sfx/musicband-background.mp3");
    // // const audio = new THREE.PositionalAudio(listener);
    // // audio.setRefDistance(100);
    // const audio = new THREE.Audio(listener);
    // audio.setBuffer(audioClip); // assign audio clip to audio object
    // // audio.setLoop(true);
    //
    // // camera.add(listener);
    // // mmAnchor.group.add(audio);

    /////////////////////////////////////////////////////////////////////
    // # Events handling in AR - target lost / found
    /////////////////////////////////////////////////////////////////////

    // mmAnchor.onTargetFound = () => {
    //   console.log("target found");
    //   // audio.play();
    // }
    //
    // mmAnchor.onTargetLost = () => {
    //   console.log("target lost");
    //   // audio.pause();
    // }

    /////////////////////////////////////////////////////////////////////
    // User Interaction in AR - target lost / found
    /////////////////////////////////////////////////////////////////////

    //dom > y axis go from top to bottom and canvas bottom to top hence need to reverse y coordinate by * -1
    // document.body.addEventListener("click",(e) => {
    //   const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    //   const mouseY = -1 * ((e.clientY / window.innerHeight) * 2 - 1);
    //   const mouse = new THREE.Vector2(mouseX, mouseY);
    //
    //   const raycaster = new THREE.Raycaster();
    //   raycaster.setFromCamera(mouse,camera); // requires scale from -1 to 1 hence the normalization above
    //
    //   //check if the raycasting is intersecting w any objects
    //   const intersects = raycaster.intersectObjects(scene.children, true);
    //
    //   if (intersects.length > 0){
    //
    //     console.log("intersect length "+intersects.length);
    //
    //     let o = intersects[0].object;
    //
    //     while (o.parent && !o.userData.clickable){
    //       o = o.parent;
    //     }
    //
    //     if(o.userData.clickable){
    //       if(o === mm_gltf.scene){
    //           audio.play();
    //           console.log("click detected");
    //       }
    //     }
    //   }
    // });

    /////////////////////////////////////////////////////////////////////
    // End of examples
    /////////////////////////////////////////////////////////////////////

    await mindarThree.start(); // wanna wait till render is ready before starting
    renderer.setAnimationLoop(() => {

      // const delta = clock.getDelta();
      // mixer.update(delta); //uncomment for gltf animation
      // renderer.render(Scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
