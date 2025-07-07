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

// FAQ Accordion functionality

document.addEventListener('DOMContentLoaded', function() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
                openItem.classList.remove('open');
            });
            // Open this one if it wasn't already open
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
});

// Exit Intent Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    var exitIntentOverlay = document.getElementById('exit-intent-overlay');
    var exitIntentClose = document.getElementById('exit-intent-close');
    var exitIntentForm = document.getElementById('exitIntentForm');
    var hasShownExitIntent = localStorage.getItem('exitIntentShown');
    var mouseY = 0;
    var hasTriggered = false;
    var exitIntentCTA = document.getElementById('exit-intent-cta');
    var openModalBtn = document.getElementById('open-modal-btn');
    var modalOverlay = document.getElementById('modal-overlay');

    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseY = e.clientY;
    });

    // Detect exit intent (mouse moving towards top of page)
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !hasShownExitIntent && !hasTriggered) {
            showExitIntent();
        }
    });

    // Alternative detection for mouse moving to top
    document.addEventListener('mousemove', function(e) {
        if (mouseY > 50 && e.clientY < 10 && !hasShownExitIntent && !hasTriggered) {
            showExitIntent();
        }
    });

    function showExitIntent() {
        if (exitIntentOverlay && !hasTriggered) {
            hasTriggered = true;
            localStorage.setItem('exitIntentShown', 'true');
            exitIntentOverlay.style.display = 'flex';
            
            // Prevent body scroll when popup is open
            document.body.style.overflow = 'hidden';
        }
    }

    // Close popup functionality
    if (exitIntentClose && exitIntentOverlay) {
        exitIntentClose.addEventListener('click', function() {
            exitIntentOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        exitIntentOverlay.addEventListener('click', function(e) {
            if (e.target === exitIntentOverlay) {
                exitIntentOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle exit intent form submission
    if (exitIntentForm) {
        exitIntentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var formData = new FormData(exitIntentForm);
            var email = formData.get('email');
            
            // Show success message
            var successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div class="exit-intent-content">
                    <div class="exit-intent-icon">🎉</div>
                    <h3 class="exit-intent-headline">You're In!</h3>
                    <p class="exit-intent-message">
                        Congratulations! You've secured your spot for a free growth consultation worth $3,000.
                    </p>
                    <p class="exit-intent-message">
                        We'll be in touch soon with next steps.
                    </p>
                </div>
            `;
            
            // Replace form with success message
            exitIntentForm.style.display = 'none';
            exitIntentForm.parentNode.appendChild(successMessage);
            
            // Submit to Formspree (same as main form)
            fetch('https://formspree.io/f/mldnkwvb', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(function(response) {
                if (!response.ok) {
                    console.log('Form submission error');
                }
            }).catch(function() {
                console.log('Form submission error');
            });
            
            // Auto-close after 3 seconds
            setTimeout(function() {
                if (exitIntentOverlay) {
                    exitIntentOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }, 3000);
        });
    }

    // Handle CTA button to open registration modal
    if (exitIntentCTA) {
        exitIntentCTA.addEventListener('click', function() {
            if (exitIntentOverlay) exitIntentOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (modalOverlay) modalOverlay.style.display = 'flex';
        });
    }

    // Reset exit intent for testing (remove this in production)
    // localStorage.removeItem('exitIntentShown');
}); 
