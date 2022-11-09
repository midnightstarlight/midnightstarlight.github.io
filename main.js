//import * as THREE from './libs/three.js-r132/build/three.module.js';
// import {GLTFLoader} from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";
const THREE = window.MINDAR.IMAGE.THREE;

import {loadGLTF} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {

  console.log("test start");

  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind'
    });

    const {renderer, scene, camera} = mindarThree;

    //add light to scene
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const geometry = new THREE.PlaneGeometry(1,1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0); //index of image is 0 because now it's only 1
    //anchor.group.add(plane); //group > position and location, initial is empty, can add other rendere obj, pos set to transparent


    const gltf = await loadGLTF("./assets/models/milkmocha-model/scene.gltf");

    gltf.scene.scale.set(1,1,1);
    gltf.scene.position.set(-3,0,-1);
    anchor.group.add(gltf.scene);

    await mindarThree.start(); // wanna wait till render is ready before starting

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
