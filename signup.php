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

<!-- Formulaire d'inscription -->
<form action="signup.php" method="POST">
    <label for="username">Nom d'utilisateur:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br>
    <label for="mdp">Mot de passe:</label>
    <input type="mdp" id="mdp" name="mdp" required>
    <br><br>
    <label for="mdp">Mot de passe:</label>
    <input type="mdp" id="mdp" name="mdp" required>
    <br>
    <button type="submit">S'inscrire</button>
</form>
