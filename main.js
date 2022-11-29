//import * as THREE from './libs/three.js-r132/build/three.module.js';
// import {GLTFLoader} from "./libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";

// import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
// import {CSS3DObject} from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

import {loadGLTF} from "../../libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

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
    // const plane = new THREE.Mesh(geometry, material);

    const anchor = [];
    const plane = [];

    for (let i = 0; i < 6; i++){
        anchor[i] = mindarThree.addAnchor(i);
        plane[i] = new THREE.Mesh(geometry, material);

        anchor[i].group.add(plane[i]);
        console.log("loop " + i);
    }

    const gltf = await loadGLTF('../../assets/models/letters/letter_p.gltf');
    gltf.scene.scale.set(1,1,1);
    gltf.scene.position.set(0, 0, 0.5);

    // anchor[0] = mindarThree.addAnchor(0);
    anchor[0].group.add(gltf.scene);

    const mixer = new THREE.AnimationMixer(gltf.scene);


    const clock = new THREE.Clock();


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        gltf.scene.rotation.set(0, gltf.scene.rotation.y+delta, 0);
        mixer.update(delta);
        renderer.render(scene, camera);
    });
  }
  start();

});
