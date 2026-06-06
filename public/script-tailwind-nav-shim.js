(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var togglers = Array.from(document.querySelectorAll('[data-bs-toggle="collapse"]'));
    togglers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetSelector = btn.getAttribute('data-bs-target');
        if (!targetSelector) return;
        var target = document.querySelector(targetSelector);
        if (!target) return;
        var isShown = target.classList.toggle('show');
        btn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
      });
    });

    var dropdownToggles = Array.from(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    dropdownToggles.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        var menu = btn.parentElement ? btn.parentElement.querySelector('.dropdown-menu') : null;
        if (!menu) return;
        menu.classList.toggle('show');
      });
    });

    document.addEventListener('click', function (event) {
      dropdownToggles.forEach(function (btn) {
        var wrapper = btn.parentElement;
        if (!wrapper) return;
        if (wrapper.contains(event.target)) return;
        var menu = wrapper.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
    });
  });
})();
