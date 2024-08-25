<!-- C:\laragon\www\Portfolio2\index.php -->
<?php
    // Inclut l'en-tête du document, avec les balises <head> et les styles CSS
    include "includes/_head.php"; 
?>
<body>

    <?php 
        // Inclut la barre de navigation fixe
        include "includes/_nav.php"; 
    ?>

    <main>    
        <div class="layout-container">
            <?php 
                // Inclut le contenu principal, comme une section ID ou autres sections de la page
                include "includes/_main.php"; 
            ?>
        </div>
    </main>

    <?php 
        // Inclut le pied de page fixe
        include "includes/_footer.php"; 
    ?>
</body>
