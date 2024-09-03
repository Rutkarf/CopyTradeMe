// document.addEventListener("DOMContentLoaded", function () {
//   // Initialisation du carousel avec un délai personnalisé
//   $("#projectCarousel").carousel({
//     interval: 3000, // Délai de 3 secondes entre chaque slide
//   });

//   // Gestion des clics sur les flèches pour avancer ou reculer
//   document
//     .querySelector(".carousel-control-next")
//     ?.addEventListener("click", () => {
//       $("#projectCarousel").carousel("next");
//     });

//   document
//     .querySelector(".carousel-control-prev")
//     ?.addEventListener("click", () => {
//       $("#projectCarousel").carousel("prev");
//     });

//   // Gestionnaire pour les miniatures
//   document.querySelectorAll(".carousel-thumbnail").forEach((thumbnail) => {
//     thumbnail.addEventListener("click", () => {
//       const index = parseInt(thumbnail.getAttribute("data-slide-to"), 10);
//       if (!isNaN(index)) {
//         $("#projectCarousel").carousel(index);

//         // Retirer la classe 'active' de toutes les miniatures
//         document.querySelectorAll(".carousel-thumbnail").forEach((thumb) => {
//           thumb.classList.remove("active");
//         });

//         // Ajouter la classe 'active' à la miniature cliquée
//         thumbnail.classList.add("active");
//       }
//     });
//   });

//   // Synchroniser les miniatures avec les changements de diapositives
//   $("#projectCarousel").on("slide.bs.carousel", function (event) {
//     const index = $(event.relatedTarget).index();
//     document.querySelectorAll(".carousel-thumbnail").forEach((thumbnail) => {
//       thumbnail.classList.remove("active");
//     });
//     const activeThumbnail = document.querySelector(
//       `.carousel-thumbnail[data-slide-to="${index}"]`
//     );
//     if (activeThumbnail) {
//       activeThumbnail.classList.add("active");
//     }
//   });
// });
