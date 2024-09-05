<?php
// login.php

// Démarrer la session
session_start();

// Vérifier si la requête est une soumission de formulaire POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Connexion à la base de données
    $conn = new mysqli("localhost", "root", "", "copytrademe");
    
    // Vérifier la connexion
    if ($conn->connect_error) {
        die("Échec de connexion : " . $conn->connect_error);
    }
    
    // Nettoyer et échapper les données du formulaire pour éviter les injections SQL
    $username = $conn->real_escape_string($_POST['username']);
    $password = $_POST['mdp']; // Mot de passe en clair pour comparaison
    
    // Requête pour récupérer les informations de l'utilisateur
    $sql = "SELECT * FROM user WHERE username='$username'";
    $result = $conn->query($sql);
    
    if ($result->num_rows == 1) {
        // Récupérer les données de l'utilisateur
        $user = $result->fetch_assoc();
        
        // Vérifier le mot de passe
        if (password_verify($password, $user['mdp'])) {
            // Connexion réussie, stocker les informations dans la session
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $user['role']; // Optionnel, stocker le rôle de l'utilisateur
            
            // Fermer la connexion à la base de données
            $conn->close();
            
            // Rediriger vers la page d'accueil après une connexion réussie
            header("Location: index.php");
            exit(); // Terminer le script pour s'assurer que la redirection se fait correctement
        } else {
            echo "<script>console.error('Nom d\'utilisateur ou mot de passe incorrect.');</script>";
        }
    } else {
        echo "<script>console.error('Nom d\'utilisateur ou mot de passe incorrect.');</script>";
    }
    
    // Fermer la connexion à la base de données
    $conn->close();
}
?>

<?php
// Inclut l'en-tête du document, avec les balises <head> et les styles CSS
include "includes/_head.php";
?>

<body>

    <?php
    // Inclut la barre de navigation fixe
    include "includes/_nav.php";
    ?>

    <!-- Formulaire de connexion HTML -->
    <!-- Container principal pour centrer le contenu -->
    <!-- Inclusion de la carte de connexion -->
    <div class="container-center">
        <div class="card login-card">
            <!-- Titre de la carte -->
            <h5 class="card-title">Connexion</h5>
            <!-- Formulaire de connexion -->
            <form class="login-form" method="post" action="">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" id="username" name="username" placeholder="Entrez votre nom d'utilisateur" required>
                <label for="mdp">Mot de passe</label>
                <input type="password" id="mdp" name="mdp" placeholder="Entrez votre mot de passe" required>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    </div>
