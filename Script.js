function openCert(card) {
    const img = card.querySelector('.cert-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });
  // ========== INTRO SCREEN ==========
window.addEventListener('load', () => {
  const intro = document.getElementById('intro-screen');
  setTimeout(() => {
    intro.style.display = 'none';
  }, 3500);
});