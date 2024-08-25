document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du carousel avec un délai personnalisé
    $('#projectCarousel').carousel({
        interval: 3000 // Délai de 3 secondes entre chaque slide
    });

    // Gestionnaire pour réinitialiser l'intervalle après un clic sur les flèches
    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        $('#projectCarousel').carousel('next');
    });

    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        $('#projectCarousel').carousel('prev');
    });
});