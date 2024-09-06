// assets\js\BGparticules.js
// assets\js\BGparticules.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Fonction pour créer le fond de particules
function createParticlesBackground() {
  const container = document.body;
  const scene = new THREE.Scene();

  // Ajuste le champ de vision (FOV) et la position initiale de la caméra
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50; // Augmente la position initiale de la caméra

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.style.overflow = "hidden";
  container.style.position = "relative";
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.zIndex = "-1";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const particlesCount = 5000;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  // Fonction pour réinitialiser les positions des particules
  function resetParticlePositions() {
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50; // Augmente la portée
      colors[i] = Math.random();
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  }

  // Initialisation des particules
  resetParticlePositions();

  const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  const audio = new THREE.Audio(audioListener);
  const analyser = new THREE.AudioAnalyser(audio, 512);

  function startAudio() {
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./assets/audio/fatality.mp3", (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(true);
      audio.setVolume(0.5);
      audio.play();
    });
  }

  const startButton = document.createElement("button");
  startButton.textContent = "Start Audio";
  startButton.style.position = "absolute";
  startButton.style.top = "20px";
  startButton.style.left = "20px";
  startButton.style.zIndex = "10";
  container.appendChild(startButton);

  startButton.addEventListener("click", () => {
    startAudio();
    startButton.style.display = "none";
  });

  function updateParticleEffects(dataArray) {
    const positions = particlesGeometry.attributes.position.array;
    const colors = particlesGeometry.attributes.color.array;

    for (let i = 0; i < particlesCount; i++) {
      const intensity = dataArray[i % dataArray.length] / 255;
      const scaleFactor = 1 + intensity * 0.2;

      // Apparition/disparition
      if (intensity > 0.3) {
        positions[i * 3] += (Math.random() - 0.5) * intensity * 0.1;
        positions[i * 3 + 1] += (Math.random() - 0.5) * intensity * 0.1;
        positions[i * 3 + 2] += (Math.random() - 0.5) * intensity * 0.1;
        particlesMaterial.size = 0.1 + intensity * 0.2;
      } else {
        positions[i * 3] *= 0.9;
        particlesMaterial.size = 0.05;
      }

      // Changement de couleur
      colors[i * 3] = intensity;
      colors[i * 3 + 1] = 1 - intensity;
      colors[i * 3 + 2] = Math.sin(intensity * Math.PI);

      // Effet de vibration des particules
      positions[i * 3] += Math.sin(intensity * Math.PI) * 0.05;
      positions[i * 3 + 1] += Math.cos(intensity * Math.PI) * 0.05;
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    particlesGeometry.attributes.color.needsUpdate = true;

    // Réinitialiser les particules si la caméra se déplace trop loin
    const maxDistance = 50; // Ajuste cette valeur si nécessaire
    if (camera.position.z > maxDistance || camera.position.z < 5) {
      resetParticlePositions();
      camera.position.z = Math.min(Math.max(camera.position.z, 5), maxDistance);
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    if (analyser) {
      const dataArray = analyser.getFrequencyData();
      updateParticleEffects(dataArray);

      // Pulsation des particules en fonction de la fréquence moyenne
      const averageFrequency = analyser.getAverageFrequency();
      particlesMaterial.size = 0.05 + averageFrequency / 500;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Initialise le fond de particules lors du chargement de la fenêtre
window.addEventListener("load", createParticlesBackground);
