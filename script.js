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

document.addEventListener('DOMContentLoaded', function() {
  var modalForm = document.getElementById('modalForm');
  var modal = document.querySelector('.modal');
  var thankYouMessage = document.createElement('div');
  thankYouMessage.innerHTML = `
    <h3 style="margin-bottom: 0.7em; font-size: 2rem; font-weight: 800; color: #ff416c; background: none; -webkit-background-clip: unset; -webkit-text-fill-color: unset; background-clip: unset; text-fill-color: unset; text-align: center;">You're In!</h3>
    <div style="font-size: 1.05rem; color: #fff; text-align: center; margin-bottom: 0.5em; font-weight: 400;">We'll be in touch soon with exciting updates.</div>
    <div style="font-size: 0.95rem; color: #ccc; text-align: center; font-weight: 400;">Your submission has been received.</div>
  `;

  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(modalForm);
      fetch('https://formspree.io/f/mldnkwvb', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          modalForm.style.display = 'none';
          modal.appendChild(thankYouMessage);
        } else {
          alert('There was a problem submitting your form.');
        }
      }).catch(function() {
        alert('There was a problem submitting your form.');
      });
    });
  }
}); 
