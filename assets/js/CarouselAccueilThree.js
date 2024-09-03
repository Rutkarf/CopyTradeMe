// assets\js\CarouselAccueilThree.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const canvasSize = 256; // Taille du canvas pour les miniatures
const loader = new STLLoader();

function createThreeJSScene(canvasId, stlFilePath) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with ID ${canvasId} not found.`);
    return;
  }
  console.log(`Creating scene for canvas ${canvasId} with STL file ${stlFilePath}`);
  
  // Rest of the code...


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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 15;
  controls.maxDistance = 50;

  let currentModel = null;

  function loadModel(url) {
    loader.load(url, function (geometry) {
      if (currentModel) {
        scene.remove(currentModel);
      }
      const material = new THREE.MeshPhongMaterial({
        color: 0x0077ff,
        specular: 0x111111,
        shininess: 200,
      });
      currentModel = new THREE.Mesh(geometry, material);
      currentModel.rotation.x = Math.PI / 2; // Rotation pour orienter correctement le modèle
      currentModel.geometry.center(); // Centrer le modèle dans la scène
      scene.add(currentModel);
      animate();
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    if (currentModel) {
      currentModel.rotation.y += 0.01; // Rotation autour de l'axe Y
      console.log(`Current model rotation: ${currentModel.rotation.y}`);
    }
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });

  // Charge le modèle initialement
  loadModel(stlFilePath);
}

// Initialise les scènes pour chaque canvas
window.addEventListener("load", () => {
  createThreeJSScene("carouselCanvas1", "./assets/picture/W40k.stl");
  createThreeJSScene("carouselCanvas2", "./assets/picture/W40k.stl");
  createThreeJSScene("carouselCanvas3", "./assets/picture/W40k.stl");
});

// Fonction pour charger le modèle en fonction de la vignette sélectionnée
function loadModelForThumbnail(modelIndex) {
  const canvases = [
    document.getElementById("carouselCanvas1"),
    document.getElementById("carouselCanvas2"),
    document.getElementById("carouselCanvas3"),
  ];

  const modelUrls = [
    "./assets/picture/W40k.stl",
    "./assets/picture/W40k.stl",
    "./assets/picture/W40k.stl",
  ];

  if (canvases[modelIndex]) {
    createThreeJSScene(canvases[modelIndex].id, modelUrls[modelIndex]);
  }
}

// Écouteurs d'événements pour les vignettes
document.querySelectorAll(".thumbnail").forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    loadModelForThumbnail(index);
  });
});

// Fonction pour créer un modèle .stl et le capturer en tant qu'image
function createThumbnail(stlFilePath, callback) {
  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvasSize, canvasSize);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 10;

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  console.log(`Creating thumbnail for STL file ${stlFilePath}`);

  loader.load(stlFilePath, (geometry) => {
    console.log(`Loaded geometry for thumbnail from ${stlFilePath}`);
    
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1, 1, 1); // Ajustez la taille du modèle pour la miniature
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    // Effectuer une légère rotation pour une vue complète
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.01; // Rotation pour la prévisualisation
      renderer.render(scene, camera);
    }
    animate();

    // Capture l'image du canvas
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      console.log(`Thumbnail created with data URL: ${dataUrl}`);
      callback(dataUrl);
    }, 1000); // Attendre un moment pour s'assurer que le modèle est rendu
  }, undefined, (error) => {
    console.error(`Error loading STL file for thumbnail ${stlFilePath}:`, error);
  });
}

// Appel de la fonction pour chaque modèle
const thumbnails = [
  "./assets/picture/W40k.stl",
  "./assets/picture/W40k.stl",
  "./assets/picture/W40k.stl",
  // Ajoutez plus de modèles si nécessaire
];

document.querySelectorAll(".thumbnail").forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    console.log(`Thumbnail clicked, loading model ${index}`);
    loadModelForThumbnail(index);
  });
});

