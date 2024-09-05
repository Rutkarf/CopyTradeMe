<?php
// signup.php

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
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['mdp'], PASSWORD_BCRYPT); // Hachage du mot de passe
    $role = $conn->real_escape_string($_POST['role']);

    // Requête d'insertion
    $sql = "INSERT INTO user (username, email, mdp, role) VALUES ('$username', '$email', '$password', '$role')";

    // Exécuter la requête et vérifier si l'insertion a réussi
    if ($conn->query($sql) === TRUE) {
        // Fermer la connexion à la base de données
        $conn->close();

        // Rediriger vers la page de connexion après une inscription réussie
        header("Location: login.php");
        exit(); // Terminer le script pour s'assurer que la redirection se fait correctement
    } else {
        // Afficher une erreur en cas d'échec de l'insertion
        echo "<script>console.error('Erreur : " . $conn->error . "');</script>";
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

    <!-- Formulaire d'inscription HTML -->
<!-- Container principal pour centrer le contenu -->
<!-- Inclusion de la carte d'inscription -->
<div class="container-center">
    <div class="card signup-card">
        <!-- Titre de la carte -->
        <h5 class="card-title">Inscription</h5>
        <!-- Formulaire d'inscription -->
        <form class="signup-form" method="post" action="">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" placeholder="Entrez votre nom d'utilisateur" required>

            <label for="mdp">Mot de passe</label>
            <input type="password" id="mdp" name="mdp" placeholder="Entrez votre mot de passe" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Entrez votre email" required>

            <label for="role">Rôle</label>
            <!-- Menu déroulant pour les rôles -->
            <select id="role" name="role" class="custom-select" required>
                <option value="" disabled selected>Choisissez un rôle</option>
                <option value="Utilisateur">Utilisateur</option>
                <option value="Organisation">Organisation</option>
            </select>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    </div>