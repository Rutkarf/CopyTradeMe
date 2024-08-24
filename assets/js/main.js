import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    // Crée la scène
    const scene = new THREE.Scene();
    console.log('Three.js is working!');

    // Crée une caméra
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Ratio initial est 1
    camera.position.z = 10;

    // Crée un moteur de rendu
    const renderer = new THREE.WebGLRenderer();
    const container = document.getElementById('three-container');

    function resizeRendererToDisplaySize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // Initialisation
    resizeRendererToDisplaySize();
    container.appendChild(renderer.domElement);

    // Crée un éclairage
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Crée le loader pour les fichiers STL
    const loader = new STLLoader();

    // Charger le fichier STL principal
    loader.load(
        '/portfolio2/assets/picture/611LogoSTL.stl',
        function (geometry) {
            console.log('STL principal chargé:', geometry);
            const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(0.1, 0.1, 0.1); // Ajustez l'échelle
            mesh.position.set(0, 0, 0); // Positionnez au centre
            scene.add(mesh);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% chargé');
        },
        function (error) {
            console.error('Erreur lors du chargement du fichier STL principal', error);
        }
    );

    // Créer un système de particules avec BufferGeometry et des couleurs cyberpunk
    const particlesCount = 500; // Nombre de particules
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    // Générer des positions et des couleurs aléatoires pour les particules
    for (let i = 0; i < particlesCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        // Couleurs cyberpunk chromées
        const color = new THREE.Color().setHSL(Math.random(), 1, 0.5); // Couleur vive avec teinte aléatoire
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
    }

    // Charger la texture de particules
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('/portfolio2/assets/picture/GoldTexture.jpg'); // Chemin vers votre texture de particule

    // Matériau de particules avec texture et effet néon
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2, // Taille des particules
        map: particleTexture, // Appliquer la texture
        vertexColors: true, // Utiliser les couleurs par vertex
        transparent: true,
        opacity: 0.8, // Opacité des particules
        depthTest: false,
        blending: THREE.AdditiveBlending, // Effet de néon
        emissive: new THREE.Color(0xffffff), // Couleur d'émission
        emissiveIntensity: 1 // Intensité de l'émission
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Fonction d'animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotation continue des particules
        if (particles) {
            particles.rotation.y += 0.001;
        }

        // Redimensionner le canevas si la fenêtre change de taille
        resizeRendererToDisplaySize();

        renderer.render(scene, camera);
    }

    animate();

    // Valeurs initiales pour la caméra
    const initialCameraPosition = { x: 0, y: 0, z: 10 };

    // Gestion du bouton "Réinitialiser"
    document.getElementById('resetCamera').addEventListener('click', () => {
        camera.position.set(initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z);
    });

    // Déplacement avec la souris
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    document.addEventListener('mousedown', (event) => {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = event.clientX - previousMousePosition.x;
            const deltaY = event.clientY - previousMousePosition.y;

            camera.position.x -= deltaX * 0.01; // Ajustez la sensibilité selon vos besoins
            camera.position.y += deltaY * 0.01; // Ajustez la sensibilité selon vos besoins

            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    });

    // Zoom avec la molette de la souris
    document.addEventListener('wheel', (event) => {
        camera.position.z += event.deltaY * 0.01; // Ajustez la sensibilité selon vos besoins
    });

    // Gestion des contrôles de rotation
    document.getElementById('rotateX').addEventListener('click', () => {
        if (particles) particles.rotation.x += Math.PI / 16; // Rotation de 11.25 degrés
    });

    document.getElementById('rotateY').addEventListener('click', () => {
        if (particles) particles.rotation.y += Math.PI / 16; // Rotation de 11.25 degrés
    });

    document.getElementById('rotateZ').addEventListener('click', () => {
        if (particles) particles.rotation.z += Math.PI / 16; // Rotation de 11.25 degrés
    });

    document.getElementById('changeColor').addEventListener('click', () => {
        if (particles) {
            const color = new THREE.Color(Math.random(), Math.random(), Math.random());
            particles.material.color.set(color);
        }
    });

    let ambientLight = new THREE.AmbientLight(0x404040); // Lumière ambiante par défaut
    let ambientLightEnabled = false;

    document.getElementById('toggleAmbientLight').addEventListener('click', () => {
        if (ambientLightEnabled) {
            scene.remove(ambientLight);
        } else {
            scene.add(ambientLight);
        }
        ambientLightEnabled = !ambientLightEnabled;
    });

    let useLambert = true;

    document.getElementById('changeMaterial').addEventListener('click', () => {
        if (particles) {
            const material = useLambert 
                ? new THREE.MeshStandardMaterial({ color: particles.material.color })
                : new THREE.MeshLambertMaterial({ color: particles.material.color });
            
            particles.material = material;
            useLambert = !useLambert;
        }
    });

    let fogEnabled = false;
    const fogColor = 0x000000; // Couleur du brouillard (noir par défaut)
    const fogDensity = 0.1; // Densité du brouillard

    document.getElementById('toggleFog').addEventListener('click', () => {
        if (fogEnabled) {
            scene.fog = null;
        } else {
            scene.fog = new THREE.FogExp2(fogColor, fogDensity);
        }
        fogEnabled = !fogEnabled;
    });

    document.getElementById('viewTop').addEventListener('click', () => {
        camera.position.set(0, 10, 0);
        camera.lookAt(scene.position);
    });

    document.getElementById('viewSide').addEventListener('click', () => {
        camera.position.set(10, 0, 0);
        camera.lookAt(scene.position);
    });

    document.getElementById('viewFront').addEventListener('click', () => {
        camera.position.set(0, 0, 10);
        camera.lookAt(scene.position);
    });

    // Zoom In
    document.getElementById('zoomIn').addEventListener('click', () => {
        camera.position.z -= 1; // Zoomer avant
    });

    // Zoom Out
    document.getElementById('zoomOut').addEventListener('click', () => {
        camera.position.z += 1; // Dézoomer arrière
    });

    // Déplacement de la caméra
    document.getElementById('moveUp').addEventListener('click', () => {
        camera.position.y += 1; // Déplacer la caméra vers le haut
    });

    document.getElementById('moveDown').addEventListener('click', () => {
        camera.position.y -= 1; // Déplacer la caméra vers le bas
    });

    document.getElementById('moveLeft').addEventListener('click', () => {
        camera.position.x -= 1; // Déplacer la caméra vers la gauche
    });

    document.getElementById('moveRight').addEventListener('click', () => {
        camera.position.x += 1; // Déplacer la caméra vers la droite
    });

    // Redimensionnement de la fenêtre
    window.addEventListener('resize', resizeRendererToDisplaySize);
});
