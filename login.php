<?php
// login.php

// Démarrer une session PHP
session_start();

// Vérifier si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connexion à la base de données MySQL
    $conn = new mysqli("localhost", "root", "", "nom_de_ta_base_de_donnees");

    // Vérifier la connexion
    if ($conn->connect_error) {
        die("Échec de connexion : " . $conn->connect_error);
    }

    // Récupérer et échapper les données du formulaire
    $username = $conn->real_escape_string($_POST['username']);
    $password = $_POST['password']; // Le mot de passe est hashé avant la comparaison

    // Vérifier si l'utilisateur existe
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // L'utilisateur existe, vérifier le mot de passe
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Authentification réussie, démarrer la session
            $_SESSION['username'] = $user['username'];
            header("Location: index.php"); // Redirige vers la page principale
            exit();
        } else {
            echo "Mot de passe incorrect.";
        }
    } else {
        echo "Utilisateur non trouvé.";
    }

    // Fermer la connexion
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
    < <!-- Inclusion de la carte de connexion -->
    <div class="container-center">
        <div class="card login-card">
            <!-- Titre de la carte -->
            <h5 class="card-title">Connexion</h5>
            <!-- Formulaire de connexion -->
            <form class="login-form">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" id="username" name="username" placeholder="Entrez votre nom d'utilisateur">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe">
                <button type="submit">Se connecter</button>
            </form>
        </div>
    </div>