(function () {
  function formToObject(form) {
    return Array.from(new FormData(form).entries()).reduce(function (data, pair) {
      data[pair[0]] = pair[1];
      return data;
    }, {});
  }

  function setUser(user) {
    localStorage.setItem('nirogyamUser', JSON.stringify(user));
    localStorage.setItem('nirogyamLoggedIn', 'true');
    localStorage.setItem('nirogyamUsername', user.name || user.email || 'Nirogyam User');
  }

  document.querySelectorAll('[data-password-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var input = document.getElementById(button.getAttribute('data-password-toggle'));
      if (!input) return;
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.innerHTML = '<i class="fa-regular ' + (isPassword ? 'fa-eye-slash' : 'fa-eye') + '" aria-hidden="true"></i>';
    });
  });

  var loginForm = document.querySelector('[data-auth-form="login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = formToObject(loginForm);
      var name = String(data.email || '').split('@')[0] || 'Nirogyam User';
      setUser({ name: name, email: data.email });
      window.location.href = 'index.html';
    });
  }

  var registerForm = document.querySelector('[data-auth-form="register"]');
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = formToObject(registerForm);
      setUser({ name: data.name || 'Nirogyam User', email: data.email, phone: data.phone });
      window.location.href = 'index.html';
    });
  }

  var forgotForm = document.querySelector('[data-auth-form="forgot"]');
  if (forgotForm) {
    forgotForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = document.querySelector('[data-auth-status]');
      if (status) {
        status.textContent = 'Password reset instructions have been sent to your email.';
        status.classList.add('is-visible');
      }
      forgotForm.reset();
    });
  }
}());

