document.addEventListener('DOMContentLoaded', function () {
  /* ハンバーガーメニュー */
  var hamburger = document.getElementById('hamburgerBtn');
  var nav = document.getElementById('mainNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 現在ページのナビゲーションをハイライト */
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* フッターの年号を自動更新 */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* お問い合わせフォーム（Web3Forms） */
  var contactForm = document.getElementById('contactForm');
  var formMessage = document.getElementById('formMessage');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      var formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          formMessage.hidden = false;
          if (result.success) {
            formMessage.classList.remove('is-error');
            formMessage.classList.add('is-success');
            formMessage.textContent = 'お問い合わせありがとうございます。内容を確認の上、折り返しご連絡いたします。';
            contactForm.reset();
          } else {
            formMessage.classList.remove('is-success');
            formMessage.classList.add('is-error');
            formMessage.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
          }
        })
        .catch(function () {
          formMessage.hidden = false;
          formMessage.classList.remove('is-success');
          formMessage.classList.add('is-error');
          formMessage.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
        })
        .finally(function () {
          submitButton.disabled = false;
        });
    });
  }
});
