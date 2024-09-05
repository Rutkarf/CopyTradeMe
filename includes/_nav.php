<!-- C:\laragon\www\CopyTradeMe\includes\_nav.php -->

<?php session_start(); ?>

<header>
    <nav class="navbar navbar-expand-lg navbar-custom no-margin navbar-card">
        <div class="navbar-content navbar-content-card">
            <!-- Bouton Accueil -->
            <a href="index.php" class="navbar-brand navbar-brand-card">BMB</a>

            <!-- Nom du site avec affichage dynamique de l'utilisateur connecté -->
            <p class="animated-text animated-text-card">
                <a class="navbar-brand navbar-brand-card" href="index.php">
                    www.BookMe*
                    <?php
                    // Vérifie si l'utilisateur est connecté
                    if (isset($_SESSION['username'])):
                        // Affiche le nom de l'utilisateur avec un lien vers le profil
                    ?>
                        <a href="profil.php"><?php echo htmlspecialchars($_SESSION['username']); ?></a>
                    <?php else: ?>
                        B!tch
                    <?php endif; ?>
                    .com
                </a>
            </p>

            <!-- Conteneur pour les icônes de réseaux sociaux -->
            <div class="navbar-socials navbar-socials-card">
                <!-- Les icônes de réseaux sociaux -->
                <a href="https://www.facebook.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://www.twitter.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.github.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.youtube.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="https://www.tiktok.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-tiktok"></i>
                </a>
                <a href="https://www.pinterest.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-pinterest"></i>
                </a>
                <a href="https://www.reddit.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-reddit"></i>
                </a>
                <a href="https://www.snapchat.com" class="social-link social-link-card" target="_blank">
                    <i class="fab fa-snapchat"></i>
                </a>
            </div>

            <!-- Conteneur pour les boutons de connexion et déconnexion -->
            <div class="navbar-buttons navbar-buttons-card">
                <?php if (isset($_SESSION['username'])): ?>
                    <!-- Affichage du nom de l'utilisateur connecté -->
                    <span>Bienvenue, <?php echo htmlspecialchars($_SESSION['username']); ?>!</span>
                    <!-- Bouton de déconnexion -->
                    <a href="logout.php" class="button-card">Se Déconnecter</a>
                <?php else: ?>
                    <!-- Boutons pour s'inscrire et se connecter -->
                    <a href="signup.php" class="button-card button-primary">S'inscrire</a>
                    <a href="login.php" class="button-card button-secondary">Se Connecter</a>
                <?php endif; ?>
            </div>

        </div>
    </nav>
</header>