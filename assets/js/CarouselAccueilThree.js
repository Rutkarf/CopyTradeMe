// assets\js\CarouselAccueilThree.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

function createThreeJSScene(canvasId, stlFilePath) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1d1d1d);

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 45); // Position de la caméra pour une meilleure vue

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new STLLoader();
  loader.load(stlFilePath, (geometry) => {
    const material = new THREE.MeshPhongMaterial({
      color: 0x0077ff,
      specular: 0x111111,
      shininess: 200,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Rotation du modèle pour l'orienter correctement (si nécessaire)
    mesh.rotation.x = Math.PI / 2; // Ajuster selon l'orientation souhaitée

    mesh.geometry.center(); // Centrer le modèle dans la scène
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 15;
    controls.maxDistance = 50;

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.01; // Rotation autour de l'axe Y
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  });

  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

window.addEventListener("load", () => {
  createThreeJSScene("carouselCanvas1", "./assets/picture/W40k.stl");
  createThreeJSScene("carouselCanvas2", "./assets/picture/W40k.stl");
  createThreeJSScene("carouselCanvas3", "./assets/picture/W40k.stl");
});
