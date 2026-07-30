const galleryItems = [...document.querySelectorAll('.gallery-item')];
const imageLightbox = document.querySelector('#lightbox');

if (galleryItems.length && imageLightbox) {
  const lightboxImage = imageLightbox.querySelector('.lightbox-image');
  const closeButton = imageLightbox.querySelector('.lightbox-close');
  const previousButton = imageLightbox.querySelector('.lightbox-previous');
  const nextButton = imageLightbox.querySelector('.lightbox-next');
  let currentIndex = 0;
  let lastFocusedItem = null;

  function showImage(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const image = item.querySelector('img');
    lightboxImage.src = item.href;
    lightboxImage.alt = image.alt;
  }

  function closeImageLightbox() {
    imageLightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
    lastFocusedItem?.focus();
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      lastFocusedItem = item;
      showImage(index);
      imageLightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });

  previousButton.addEventListener('click', () => showImage(currentIndex - 1));
  nextButton.addEventListener('click', () => showImage(currentIndex + 1));
  closeButton.addEventListener('click', closeImageLightbox);
  imageLightbox.addEventListener('click', (event) => {
    if (event.target === imageLightbox) closeImageLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (imageLightbox.hidden) return;
    if (event.key === 'Escape') closeImageLightbox();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

const videoLightbox = document.querySelector('#video-lightbox');
const videoTriggers = [...document.querySelectorAll('.video-trigger')];

if (videoLightbox && videoTriggers.length) {
  const lightboxVideo = videoLightbox.querySelector('.lightbox-video');
  const closeButton = videoLightbox.querySelector('.lightbox-close');
  const previousButton = videoLightbox.querySelector('.lightbox-previous');
  const nextButton = videoLightbox.querySelector('.lightbox-next');
  let currentVideoIndex = 0;
  let lastFocusedTrigger = null;

  function showVideo(index) {
    currentVideoIndex = (index + videoTriggers.length) % videoTriggers.length;
    lightboxVideo.src = videoTriggers[currentVideoIndex].dataset.video;
    lightboxVideo.play().catch(() => {});
  }

  function closeVideoLightbox() {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.load();
    videoLightbox.hidden = true;
    document.body.style.overflow = '';
    lastFocusedTrigger?.focus();
  }

  videoTriggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      lastFocusedTrigger = trigger;
      videoLightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      showVideo(index);
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeVideoLightbox);
  previousButton.addEventListener('click', () => showVideo(currentVideoIndex - 1));
  nextButton.addEventListener('click', () => showVideo(currentVideoIndex + 1));
  videoLightbox.addEventListener('click', (event) => {
    if (event.target === videoLightbox) closeVideoLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (videoLightbox.hidden) return;
    if (event.key === 'Escape') closeVideoLightbox();
    if (event.key === 'ArrowLeft') showVideo(currentVideoIndex - 1);
    if (event.key === 'ArrowRight') showVideo(currentVideoIndex + 1);
  });
}
