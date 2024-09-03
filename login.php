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

<!-- Formulaire de connexion HTML -->
<form action="login.php" method="POST">
    <label for="username">Nom d'utilisateur:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Mot de passe:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Se connecter</button>
</form>