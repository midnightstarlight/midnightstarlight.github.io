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
