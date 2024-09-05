<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "copytrademe");
if ($conn->connect_error) {
    die("Échec de connexion : " . $conn->connect_error);
}

// Récupérer les informations de l'utilisateur
$username = $_SESSION['username'];
$sql = "SELECT * FROM user WHERE username='$username'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();
$conn->close();
?>

<?php
// Inclut l'en-tête du document, avec les balises <head> et les styles CSS
include "includes/_head.php";
?>
<!-- Barre de navigation -->
<?php include "includes/_nav.php"; ?>

    <div class="container">
        <!-- En-tête du profil -->
        <div class="profile-header">
            <h1><?php echo htmlspecialchars($user['username']); ?></h1>
            <p><?php echo htmlspecialchars($user['email']); ?></p>
            <p><?php echo htmlspecialchars($user['role']); ?></p>
        </div>

        <!-- Carte du profil -->
        <div class="card profile-card">
            <div class="card-body">
                <img src="/assets/picture/Logo.jpg" alt="Profile Picture" class="img-fluid">
                <h4><?php echo htmlspecialchars($user['username']); ?></h4>
                <p><?php echo htmlspecialchars($user['email']); ?></p>
                <p><?php echo htmlspecialchars($user['role']); ?></p>
                <a href="edit_profile.php" class="btn btn-primary">Éditer le Profil</a>
            </div>
        </div>

        <!-- Carte des posts ou des activités récentes -->
        <div class="card posts-card">
            <div class="card-header">
                <h4>Posts récents</h4>
            </div>
            <div class="card-body">
                <!-- Exemples de posts -->
                <div class="post">
                    <h5>Post 1</h5>
                    <p>Contenu du post 1.</p>
                </div>
                <div class="post">
                    <h5>Post 2</h5>
                    <p>Contenu du post 2.</p>
                </div>
                <!-- Ajouter plus de posts ici -->
            </div>
        </div>

        <!-- Carte des événements réservés -->
        <div class="card events-card">
            <div class="card-header">
                <h4>Événements Réservés</h4>
            </div>
            <div class="card-body">
                <!-- Exemples d'événements -->
                <div class="event">
                    <h5>Événement 1</h5>
                    <p>Date et lieu de l'événement 1.</p>
                </div>
                <div class="event">
                    <h5>Événement 2</h5>
                    <p>Date et lieu de l'événement 2.</p>
                </div>
                <!-- Ajouter plus d'événements ici -->
            </div>
        </div>
    </div>