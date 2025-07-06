// Modal open/close logic
window.addEventListener('DOMContentLoaded', function() {
  var openModalBtn = document.getElementById('open-modal-btn');
  var modalOverlay = document.getElementById('modal-overlay');
  var modalClose = document.getElementById('modal-close');
  var openInviteModal = document.getElementById('open-invite-modal');
  var modalForm = document.getElementById('modalForm');

  function showModal(withInviteField) {
    if (modalOverlay) {
      modalOverlay.style.display = 'flex';
      if (withInviteField && modalForm) {
        if (!document.getElementById('invitation-code-field')) {
          var inviteInput = document.createElement('input');
          inviteInput.type = 'text';
          inviteInput.name = 'invitation_code';
          inviteInput.placeholder = 'Invitation Code (optional)';
          inviteInput.id = 'invitation-code-field';
          // Insert before the submit button
          var submitBtn = modalForm.querySelector('button[type="submit"]');
          modalForm.insertBefore(inviteInput, submitBtn);
        }
      } else if (modalForm) {
        var existing = document.getElementById('invitation-code-field');
        if (existing) existing.remove();
      }
    }
  }

  if (openModalBtn && modalOverlay && modalClose) {
    openModalBtn.onclick = function() {
      showModal(false);
    };
    modalClose.onclick = function() {
      modalOverlay.style.display = 'none';
    };
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) modalOverlay.style.display = 'none';
    };
  }

  if (openInviteModal) {
    openInviteModal.onclick = function(e) {
      e.preventDefault();
      showModal(true);
    };
  }
}); 
