<!-- C:\laragon\www\Portfolio2\includes\_main.php -->
<main>
    <div class="grid-container">
        <!-- Sidebar pour les contrôles -->
        <div id="sidebar-controls">
            <div id="controls" class="btn-group-vertical">
                <button id="zoomIn" class="btn btn-primary mb-2">Zoomer</button>
                <button id="zoomOut" class="btn btn-primary mb-2">Dézoomer</button>
                <button id="moveUp" class="btn btn-primary mb-2">Haut</button>
                <button id="moveDown" class="btn btn-primary mb-2">Bas</button>
                <button id="moveLeft" class="btn btn-primary mb-2">Gauche</button>
                <button id="moveRight" class="btn btn-primary mb-2">Droite</button>
                <button id="resetCamera" class="btn btn-secondary mb-2">Réinitialiser</button>
                <button id="changeColor" class="btn btn-info mb-2">Changer la Couleur</button>
                <button id="toggleAmbientLight" class="btn btn-warning mb-2">Lumière Ambiante</button>
                <button id="changeMaterial" class="btn btn-success mb-2">Changer le Matériau</button>
                <button id="toggleFog" class="btn btn-info mb-2">Brouillard</button>
            </div>

            <div id="camera-view-controls" class="btn-group-vertical mt-3">
                <button id="viewTop" class="btn btn-secondary mb-2">Vue du Dessus</button>
                <button id="viewSide" class="btn btn-secondary mb-2">Vue de Côté</button>
                <button id="viewFront" class="btn btn-secondary mb-2">Vue de Face</button>
            </div>

            <div id="rotation-controls" class="btn-group-vertical mt-3">
                <button id="rotateX" class="btn btn-secondary mb-2">Rotation X</button>
                <button id="rotateY" class="btn btn-secondary mb-2">Rotation Y</button>
                <button id="rotateZ" class="btn btn-secondary mb-2">Rotation Z</button>
            </div>
        </div>

        <!-- Conteneur pour Three.js -->
        <div id="three-container"></div>

        <!-- Conteneur pour le contenu principal avec Carousel -->
        <div id="content-container">
            <h1>Portfolio Overview</h1>
            <h5>Discover My Work, Crafted by #Fraktur611</h5>

            <div id="projectCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="./assets/picture/Logo.jpg" class="d-block w-100" alt="Slide 1">
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/picture/Logo.jpg" class="d-block w-100" alt="Slide 2">
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/picture/Logo.jpg" class="d-block w-100" alt="Slide 3">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#projectCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#projectCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>
</main>



