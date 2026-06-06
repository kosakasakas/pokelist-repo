(() => {
  function dispatch(element, type) {
    element.dispatchEvent(new Event(type, { bubbles: true }));
  }

  class ModalShim {
    constructor(element) {
      this.element = element;
      this.backdrop = null;
      this.onEsc = this.onEsc.bind(this);
      this.onBackdropClick = this.onBackdropClick.bind(this);
      this.bindDismissButtons();
    }

    bindDismissButtons() {
      this.element.querySelectorAll('[data-bs-dismiss="modal"]').forEach(button => {
        button.addEventListener('click', () => this.hide());
      });
    }

    onEsc(event) {
      if (event.key === 'Escape') this.hide();
    }

    onBackdropClick(event) {
      if (event.target === this.element) this.hide();
    }

    show() {
      if (this.element.classList.contains('show')) return;
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'modal-backdrop show';
      document.body.appendChild(this.backdrop);
      this.element.style.display = 'block';
      this.element.classList.add('show');
      this.element.removeAttribute('aria-hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', this.onEsc);
      this.element.addEventListener('click', this.onBackdropClick);
      dispatch(this.element, 'shown.bs.modal');
    }

    hide() {
      if (!this.element.classList.contains('show')) return;
      this.element.classList.remove('show');
      this.element.style.display = 'none';
      this.element.setAttribute('aria-hidden', 'true');
      this.element.removeEventListener('click', this.onBackdropClick);
      document.removeEventListener('keydown', this.onEsc);
      if (this.backdrop?.parentNode) this.backdrop.parentNode.removeChild(this.backdrop);
      this.backdrop = null;
      if (!document.querySelector('.modal.show')) document.body.classList.remove('modal-open');
      dispatch(this.element, 'hidden.bs.modal');
    }
  }

  window.bootstrap = window.bootstrap || {};
  window.bootstrap.Modal = ModalShim;
})();
