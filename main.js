//import * as THREE from './libs/three.js-r132/build/three.module.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

  console.log("test start");

  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind'
    });

    const {renderer, scene, camera} = mindarThree;

    const geometry = new THREE.PlaneGeometry(1,1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0); //index of image is 0 because now it's only 1
    anchor.group.add(plane); //group > position and location, initial is empty, can add other rendere obj, pos set to transparent


    await mindarThree.start(); // wanna wait till render is ready before starting

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
