<!-- C:\laragon\www\Portfolio2\includes\_nav.php -->

<header>
    <nav class="navbar navbar-expand-lg navbar-custom no-margin">
        <div class="navbar-content">
            <!-- Nom et prénom à gauche -->
            <a class="navbar-brand" href="#">#Fraktur611<span class="blinking-cursor">|</span></a>
            
            
            <!-- Conteneur pour les icônes de réseaux sociaux -->
            <div class="navbar-socials">
                <a href="https://www.facebook.com" class="social-link" target="_blank">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://www.twitter.com" class="social-link" target="_blank">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com" class="social-link" target="_blank">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com" class="social-link" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.github.com" class="social-link" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.youtube.com" class="social-link" target="_blank">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="https://www.tiktok.com" class="social-link" target="_blank">
                    <i class="fab fa-tiktok"></i>
                </a>
                <a href="https://www.pinterest.com" class="social-link" target="_blank">
                    <i class="fab fa-pinterest"></i>
                </a>
                <a href="https://www.reddit.com" class="social-link" target="_blank">
                    <i class="fab fa-reddit"></i>
                </a>
                <a href="https://www.snapchat.com" class="social-link" target="_blank">
                    <i class="fab fa-snapchat"></i>                    
                </a>
            </div> 
            <p class="animated-text">
            <button id="downloadCV">Take My Cv</button>
        </p>
             <!-- Votre script JavaScript -->
    <script>
        document.getElementById('downloadCV').addEventListener('click', () => {
            // Chemin vers le fichier que vous souhaitez que les utilisateurs téléchargent
            const fileUrl = './assets/Cv/CVBouazzaRomain.jpg';

            // Créer un élément <a> temporaire
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = 'CVBouazzaRomain.jpg'; // Nom du fichier téléchargé

            // Ajouter l'élément <a> au DOM et déclencher le téléchargement
            document.body.appendChild(a);
            a.click();
            
            // Supprimer l'élément <a> du DOM
            document.body.removeChild(a);
        });
    </script>
        </div>  
    </nav>
</header>


