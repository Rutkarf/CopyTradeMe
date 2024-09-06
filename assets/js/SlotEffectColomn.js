document.addEventListener("DOMContentLoaded", () => {
    const columns = document.querySelectorAll(".scroll-container");
  
    columns.forEach((container) => {
      const items = container.children;
      const itemHeight = items[0].offsetHeight; // Hauteur d'un élément
      const totalHeight = items.length * itemHeight; // Hauteur totale
  
      container.style.height = `${totalHeight}px`; // Définir la hauteur pour un défilement fluide
  
      // Réinitialiser l'animation avec la hauteur totale pour éviter les interruptions
      container.style.animation = `scrollUp ${totalHeight / 50}s linear infinite`;
    });
  });
  
