//import * as THREE from './libs/three.js-r132/build/three.module.js';
// import {GLTFLoader} from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";

// import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
// import {CSS3DObject} from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";


const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#ar-div"),
      imageTargetSrc: './assets/targets/dual_targets.mind',
      uiScanning:"#scanning",
      uiLoading: "no"
    });
    const {renderer, scene, camera} = mindarThree;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
  //
  // var goFS = document.getElementById("goFS");
  // goFS.addEventListener("click", function() {
  //
  //  const elem = document.documentElement;
  //  if (elem.requestFullscreen) {elem.requestFullscreen()}
  //
  // }, false);

});
