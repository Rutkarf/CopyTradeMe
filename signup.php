<?php
// signup.php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("localhost", "root", "", "copytrademe");

    if ($conn->connect_error) {
        die("Échec de connexion : " . $conn->connect_error);
    }

    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['mdp'], PASSWORD_BCRYPT);
    $role = $conn->real_escape_string($_POST['role']);

    $sql = "INSERT INTO users (username, email, mdp ,role) VALUES ('$username', '$email', '$mdp', '$role')";

    if ($conn->query($sql) === TRUE) {
        echo "Inscription réussie. Vous pouvez maintenant vous connecter.";
    } else {
        echo "Erreur : " . $sql . "<br>" . $conn->error;
    }

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
            <form class="signup-form">
                <label for="new-username">Nom d'utilisateur</label>
                <input type="text" id="new-username" name="new-username" placeholder="Entrez votre nom d'utilisateur">
                <label for="new-password">Mot de passe</label>
                <input type="password" id="new-password" name="new-password" placeholder="Entrez votre mot de passe">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Entrez votre email">
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    </div>