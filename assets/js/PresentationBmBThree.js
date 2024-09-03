// assets/js/PresentationBookMeBitch.js
// assets/js/PresentationBookMeBitch.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

function createThreeJSScene(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f0f);

  // Ajuster le champ de vision de la caméra
  const camera = new THREE.PerspectiveCamera(
    75, // Champ de vision inchangé
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  // Positionner la caméra encore plus loin du modèle
  camera.position.set(0, 0, 100); // Augmente la position Z pour dézoomer davantage

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 20; // Distance minimale pour les contrôles de zoom
  controls.maxDistance = 200; // Distance maximale pour les contrôles de zoom

  const loader = new STLLoader();
  loader.load("./assets/picture/611LogoSTL.stl", (geometry) => {
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff99,
      specular: 0x111111,
      shininess: 200,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2; // Ajustez si nécessaire
    mesh.geometry.center();

    // Ajuster l'échelle du modèle pour qu'il soit visible même dézoomer
    mesh.scale.set(4, 4, 4); // Réduit l'échelle pour ajuster à la vue dézoomée

    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.01; // Rotation autour de l'axe Y
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  });

  window.addEventListener("resize", () => {
    // Ajuste la taille du canvas et de la caméra lors du redimensionnement de la fenêtre
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

window.addEventListener("load", () => {
  createThreeJSScene("bookMeBitchCanvas");
});
