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
// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
// Fetch all projects
async function fetchProjects() {
  try {
    const response = await fetch("https://web-production-c197e.up.railway.app");
    const projects = await response.json();
    console.log(projects);
  } catch(e) {
    console.error("Could not load projects:", e);
  }
}
fetchProjects();