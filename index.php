<!-- C:\laragon\www\copytrademe\index.php -->
<!-- C:\laragon\www\copytrademe\index.php -->
<?php
// Inclut l'en-tête du document, avec les balises <head> et les styles CSS
include "includes/_head.php";
?>

<body>

    <?php
    // Inclut la barre de navigation fixe
    include "includes/_nav.php";
    ?>

    <main class="main-columns">
        <!-- Colonne avec l'effet de défilement, uniquement pour _accueilTitre.php -->
        <div class="column slot-column">
            <div class="scroll-container">
                <!-- Contenu répété pour le défilement -->
                <?php include "includes/_accueilTitre.php"; ?>
                <?php include "includes/_accueilTitre.php"; ?> <!-- Répétez pour une animation fluide -->
            </div>
        </div>

        <!-- Colonne sans défilement pour _accueilHOF.php -->
        <div class="column hof-column">
            <div class="hof-content">
                <?php include "includes/_accueilHOF.php"; ?>

            </div>
        </div>

        <!-- Colonne sans défilement pour _BmbPresentation.php -->
        <div class="column bmb-column">
            <div class="bmb-content">
                <?php include "includes/_BmbPresentation.php"; ?>
            </div>
        </div>
    </main>

    <?php
    // Inclut le pied de page fixe
    include "includes/_footer.php";
    ?>
</body>