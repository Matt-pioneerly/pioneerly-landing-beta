// Modal open/close logic
window.addEventListener('DOMContentLoaded', function() {
  var openModalBtn = document.getElementById('open-modal-btn');
  var modalOverlay = document.getElementById('modal-overlay');
  var modalClose = document.getElementById('modal-close');

  if (openModalBtn && modalOverlay && modalClose) {
    openModalBtn.onclick = function() {
      modalOverlay.style.display = 'flex';
    };
    modalClose.onclick = function() {
      modalOverlay.style.display = 'none';
    };
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) modalOverlay.style.display = 'none';
    };
  }
}); 
