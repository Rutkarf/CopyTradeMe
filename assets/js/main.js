// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// document.addEventListener("DOMContentLoaded", () => {
//   // Crée la scène
//   const scene = new THREE.Scene();
//   console.log("Three.js is working!");

//   // Crée une caméra
//   const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//   camera.position.z = 10;

//   // Crée un moteur de rendu
//   const renderer = new THREE.WebGLRenderer();
//   const container = document.getElementById("three-container");

//   function resizeRendererToDisplaySize() {
//     const width = container.clientWidth;
//     const height = container.clientHeight;
//     renderer.setSize(width, height, false);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//   }

//   // Initialisation
//   resizeRendererToDisplaySize();
//   container.appendChild(renderer.domElement);

//   // Crée un éclairage
//   const light = new THREE.DirectionalLight(0xffffff, 1);
//   light.position.set(5, 5, 5).normalize();
//   scene.add(light);

//   // Crée le loader pour les fichiers STL
//   const loader = new STLLoader();
//   let mesh;

//   // Charger le fichier STL principal
//   loader.load(
//     "/portfolio2/assets/picture/611LogoSTL.stl",
//     function (geometry) {
//       console.log("STL principal chargé:", geometry);
//       const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
//       mesh = new THREE.Mesh(geometry, material);
//       mesh.scale.set(0.075, 0.075, 0.075);
//       mesh.position.set(0, 0, 0);
//       scene.add(mesh);
//     },
//     function (xhr) {
//       console.log((xhr.loaded / xhr.total) * 100 + "% chargé");
//     },
//     function (error) {
//       console.error(
//         "Erreur lors du chargement du fichier STL principal",
//         error
//       );
//     }
//   );

//   // Charger la texture de fond
//   const textureLoader = new THREE.TextureLoader();
//   const backgroundTexture = textureLoader.load(
//     "/portfolio2/assets/picture/texture/7172.jpg"
//   );

//   // Modifier l'opacité du fond
//   const backgroundMaterial = new THREE.MeshBasicMaterial({
//     map: backgroundTexture,
//     transparent: true,
//     opacity: 0.000001,
//   });
//   const backgroundPlane = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     backgroundMaterial
//   );
//   backgroundPlane.position.z = -1;
//   scene.add(backgroundPlane);

//   // Créer un système de particules avec BufferGeometry et des couleurs cyberpunk
//   const particlesCount = 500;
//   const particlesGeometry = new THREE.BufferGeometry();
//   const particlePositions = new Float32Array(particlesCount * 3);
//   const particleColors = new Float32Array(particlesCount * 3);

//   // Générer des positions et des couleurs aléatoires pour les particules
//   for (let i = 0; i < particlesCount; i++) {
//     particlePositions[i * 3] = (Math.random() - 0.5) * 20;
//     particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
//     particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

//     // Couleurs cyberpunk chromées
//     const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
//     particleColors[i * 3] = color.r;
//     particleColors[i * 3 + 1] = color.g;
//     particleColors[i * 3 + 2] = color.b;
//   }

//   // Charger la texture de particules
//   const particleTexture = textureLoader.load(
//     "/Portfolio2/assets/picture/texture/9641044.jpg"
//   );

//   // Matériau de particules avec texture et effet néon
//   const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.1,
//     map: particleTexture,
//     vertexColors: true,
//     transparent: true,
//     opacity: 0.8,
//     depthTest: false,
//     blending: THREE.AdditiveBlending,
//     color: 0xffffff,
//   });

//   const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//   particlesGeometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(particlePositions, 3)
//   );
//   particlesGeometry.setAttribute(
//     "color",
//     new THREE.BufferAttribute(particleColors, 3)
//   );
//   scene.add(particles);

//   // Initialisation des OrbitControls
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.dampingFactor = 0.05;

//   // Fonction d'animation
//   function animate() {
//     requestAnimationFrame(animate);

//     if (mesh) {
//       mesh.rotation.y += 0.05;
//     }

//     if (particles) {
//       particles.rotation.x += 0.01;
//       particles.rotation.y += 0.01;
//     }

//     // Déplacement de la texture de fond
//     if (backgroundTexture) {
//       backgroundTexture.offset.x += 0.01; // Déplace la texture horizontalement
//       backgroundTexture.offset.y += 0.01; // Déplace la texture verticalement
//     }

//     // Mise à jour des contrôles
//     controls.update();

//     resizeRendererToDisplaySize();
//     renderer.render(scene, camera);
//   }

//   animate();

//   // Redimensionnement de la fenêtre
//   window.addEventListener("resize", resizeRendererToDisplaySize);

//   // **************SECTIONCONTROLE DU THREE.JS AVEC LA SOURIS *********************
//   // Déplacement avec la souris
//   let isDragging = false;
//   let previousMousePosition = { x: 0, y: 0 };

//   document.addEventListener("mousedown", (event) => {
//     isDragging = true;
//     previousMousePosition = { x: event.clientX, y: event.clientY };
//   });

//   document.addEventListener("mouseup", () => {
//     isDragging = false;
//   });

//   document.addEventListener("mousemove", (event) => {
//     if (isDragging && mesh) {
//       const deltaX = event.clientX - previousMousePosition.x;
//       const deltaY = event.clientY - previousMousePosition.y;

//       mesh.rotation.y += deltaX * 0.01;
//       mesh.rotation.x += deltaY * 0.01;

//       previousMousePosition = { x: event.clientX, y: event.clientY };
//     }
//   });

//   // Zoom avec la molette de la souris
//   document.addEventListener("wheel", (event) => {
//     camera.position.z += event.deltaY * 0.01;
//   });

//   // **************SECTION BOUTON DE CONTROLE DU THREE.JS *********************
//   //Gestion de la couleur du SLT
//   document.getElementById("changeColor").addEventListener("click", () => {
//     if (mesh) {
//       // Générer une couleur aléatoire
//       const color = new THREE.Color(
//         Math.random(),
//         Math.random(),
//         Math.random()
//       );
//       // Appliquer cette couleur au matériau du modèle STL
//       mesh.material.color.set(color);
//     }
//   });

//   // Gestion des boutons
//   document.getElementById("resetCamera").addEventListener("click", () => {
//     camera.position.set(0, 0, 10);
//   });

//   document.getElementById("zoomIn").addEventListener("click", () => {
//     camera.position.z -= 1;
//   });

//   document.getElementById("zoomOut").addEventListener("click", () => {
//     camera.position.z += 1;
//   });

//   document.getElementById("changeColor").addEventListener("click", () => {
//     if (particles) {
//       const color = new THREE.Color(
//         Math.random(),
//         Math.random(),
//         Math.random()
//       );
//       particlesMaterial.color.set(color);
//     }
//   });

//   let useLambert = true;
//   document.getElementById("changeMaterial").addEventListener("click", () => {
//     if (mesh) {
//       const material = useLambert
//         ? new THREE.MeshStandardMaterial({ color: mesh.material.color })
//         : new THREE.MeshLambertMaterial({ color: mesh.material.color });

//       mesh.material = material;
//       useLambert = !useLambert;
//     }
//   });

//   let fogEnabled = false;
//   const fogColor = 0x000000; // Couleur du brouillard (noir par défaut)
//   const fogDensity = 0.1; // Densité du brouillard

//   document.getElementById("toggleFog").addEventListener("click", () => {
//     if (fogEnabled) {
//       scene.fog = null;
//     } else {
//       scene.fog = new THREE.FogExp2(fogColor, fogDensity);
//     }
//     fogEnabled = !fogEnabled;
//   });

//   document.getElementById("viewTop").addEventListener("click", () => {
//     camera.position.set(0, 10, 0);
//     camera.lookAt(scene.position);
//   });

//   document.getElementById("viewSide").addEventListener("click", () => {
//     camera.position.set(10, 0, 0);
//     camera.lookAt(scene.position);
//   });

//   document.getElementById("viewFront").addEventListener("click", () => {
//     camera.position.set(0, 0, 10);
//     camera.lookAt(scene.position);
//   });
// });
