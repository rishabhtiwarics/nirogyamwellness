// =====================================================
// CONTACT PAGE JS
// Header / mobile-menu / scroll-indicator logic already
// lives in common.js — this file only handles the
// contact form on this page.
// =====================================================
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('c1Form');
  const toast = document.getElementById('c1Toast');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic front-end validation (native "required" already covers most of it)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // TODO: replace with a real API/email call when a backend is ready
    // Example:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: document.getElementById('c1Name').value,
    //     phone: document.getElementById('c1Phone').value,
    //     email: document.getElementById('c1Email').value,
    //     message: document.getElementById('c1Msg').value
    //   })
    // });

    if (toast) {
      toast.classList.add('show');
    }

    form.reset();

    setTimeout(() => {
      if (toast) toast.classList.remove('show');
    }, 4000);
  });
});