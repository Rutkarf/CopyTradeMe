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
  <div class="column slot-column">
    <div class="scroll-container">
      <!-- Contenu répété pour le défilement -->
      <?php include "includes/_accueilTitre.php"; ?>
      <?php include "includes/_accueilTitre.php"; ?> <!-- Répétez pour une animation fluide -->
    </div>
  </div>
  <div class="column slot-column">
    <div class="scroll-container">
      <?php include "includes/_accueilHOF.php"; ?>
      <?php include "includes/_accueilHOF.php"; ?> <!-- Répétez pour une animation fluide -->
    </div>
  </div>
  <div class="column slot-column">
    <div class="scroll-container">
      <?php include "includes/_BmbPresentation.php"; ?>
      <?php include "includes/_BmbPresentation.php"; ?> <!-- Répétez pour une animation fluide -->
    </div>
  </div>
</main>


    <?php
    // Inclut le pied de page fixe
    include "includes/_footer.php";
    ?>
</body>