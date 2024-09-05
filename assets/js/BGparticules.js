// assets\js\BGparticules.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Fonction pour créer le fond de particules
function createParticlesBackground() {
  // Sélectionne le body comme conteneur pour les particules
  const container = document.body;

  // Crée la scène
  const scene = new THREE.Scene();

  // Crée la caméra
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Crée le renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Transparent
  container.style.overflow = "hidden"; // Pour éviter les scrollbars dues au renderer
  container.style.position = "relative";
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.zIndex = "-1"; // Envoie le canvas à l'arrière-plan
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  // Crée la géométrie des particules
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20; // Position aléatoire pour chaque particule
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  // Matériau des particules
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
  });

  // Crée le nuage de particules
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Ajoute OrbitControls pour l'interaction
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Pour un mouvement plus fluide
  controls.dampingFactor = 0.05;

  // Fonction d'animation
  function animate() {
    requestAnimationFrame(animate);

    // Optionnel : Rotation automatique des particules pour plus de dynamique
    particles.rotation.y += 0.001;

    // Mise à jour des contrôles
    controls.update();

    // Rend la scène
    renderer.render(scene, camera);
  }

  animate();

  // Mise à l'échelle lorsque la fenêtre est redimensionnée
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Initialise le fond de particules lorsque la fenêtre est chargée
window.addEventListener("load", createParticlesBackground);
