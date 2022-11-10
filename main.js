//import * as THREE from './libs/three.js-r132/build/three.module.js';
// import {GLTFLoader} from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";
const THREE = window.MINDAR.IMAGE.THREE;

import {loadGLTF} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {

  console.log("test start");

  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/dual_targets.mind',
      maxTrack: 2
    });

    const {renderer, scene, camera} = mindarThree;

    //add light to scene
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const geometry = new THREE.PlaneGeometry(1,1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    // const anchor = mindarThree.addAnchor(0); //index of image is 0 because now it's only 1
    //anchor.group.add(plane); //group > position and location, initial is empty, can add other rendere obj, pos set to transparent


    const mm_gltf = await loadGLTF("./assets/models/milkmocha-model/scene.gltf");
    mm_gltf.scene.scale.set(1,1,1);
    mm_gltf.scene.position.set(-3,0,-1);

    const ph_gltf = await loadGLTF("./assets/models/phoenix_bird/scene.gltf");
    ph_gltf.scene.scale.set(0.005,0.005,0.005);
    ph_gltf.scene.position.set(0,0,-0);
    // const ph_gltf = await loadGLTF("./assets/models/musicband-raccoon/scene.gltf");
    // ph_gltf.scene.scale.set(0.1,0.1,0.1);
    // ph_gltf.scene.position.set(0,-0.4,0);


    const mmAnchor = mindarThree.addAnchor(1);
    mmAnchor.group.add(mm_gltf.scene);

    const phAnchor = mindarThree.addAnchor(0);
    phAnchor.group.add(ph_gltf.scene);

    // glft animations
    const mixer = new THREE.AnimationMixer(ph_gltf.scene);
    const action = mixer.clipAction(ph_gltf.animations[0]);
    action.play();

    const clock = new THREE.Clock(); // to manage time

    await mindarThree.start(); // wanna wait till render is ready before starting

    renderer.setAnimationLoop(() => {

      const delta = clock.getDelta();
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  }
  start();
});
