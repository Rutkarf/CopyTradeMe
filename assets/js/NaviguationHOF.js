
  
    const slides = document.querySelector('.carousel-inner');
    const thumbnails = document.querySelector('.thumbnail-wrapper');

    let slideIndex = 0;
    let thumbnailIndex = 0;

    document.getElementById('prevSlides').addEventListener('click', () => {
      slideIndex = Math.max(0, slideIndex - 3);
      slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    });

    document.getElementById('nextSlides').addEventListener('click', () => {
      slideIndex = Math.min(slides.children.length - 3, slideIndex + 3);
      slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    });

    document.getElementById('prevThumbnails').addEventListener('click', () => {
      thumbnailIndex = Math.max(0, thumbnailIndex - 3);
      thumbnails.style.transform = `translateX(-${thumbnailIndex * 33.33}%)`;
    });

    document.getElementById('nextThumbnails').addEventListener('click', () => {
      thumbnailIndex = Math.min(thumbnails.children.length - 3, thumbnailIndex + 3);
      thumbnails.style.transform = `translateX(-${thumbnailIndex * 33.33}%)`;
    });
