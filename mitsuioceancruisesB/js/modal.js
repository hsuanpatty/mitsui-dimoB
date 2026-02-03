'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const triggersModal = document.querySelectorAll('.js-show-modal');
  const modals = document.querySelectorAll('.js-modal');

  // PerfectScrollbar instances
  const scrollInstances = {};

  modals.forEach(modal => {
    const inner = modal.querySelector('.modal-box.customScroll');
    if (inner && window.PerfectScrollbar) {
      scrollInstances[modal.dataset.modal] = new PerfectScrollbar(inner);
    }
  });

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function openBodyLock() {
    const scrollY = window.scrollY;
    const scrollbarWidth = getScrollbarWidth();

    document.body.dataset.scrollY = scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function closeBodyLock() {
    const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    document.body.dataset.scrollY = '';

    window.scrollTo(0, scrollY);
  }

  function openModal(modal) {
    modals.forEach(m => m.classList.remove('is-open'));

    modal.classList.add('is-open');
    openBodyLock();

    // 外層回頂
    const outer = modal.querySelector('.modal__inner');
    if (outer) outer.scrollTop = 0;

    // custom scroll 回頂
    const custom = modal.querySelector('.modal-box.customScroll');
    if (custom) {
      const ps = scrollInstances[modal.dataset.modal];
      ps ? ps.scrollTo(0, 0, 0) : (custom.scrollTop = 0);
    }
  }

  function closeModal() {
    const openModalEl = document.querySelector('.js-modal.is-open');
    if (!openModalEl) return;

    openModalEl.classList.remove('is-open');
    closeBodyLock();

    const outer = openModalEl.querySelector('.modal__inner');
    if (outer) outer.scrollTop = 0;

    const custom = openModalEl.querySelector('.modal-box.customScroll');
    if (custom) {
      const ps = scrollInstances[openModalEl.dataset.modal];
      ps ? ps.scrollTo(0, 0, 0) : (custom.scrollTop = 0);
    }
  }

  // 開啟 modal
  triggersModal.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.modal;
      const modal = document.querySelector(`.js-modal[data-modal="${id}"]`);
      if (modal) openModal(modal);
    });
  });

  // ❌ 灰底不關，只允許 close 按鈕
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      const closeBtn = e.target.closest('.js-close-modal');
      if (closeBtn) {
        closeModal();
      }
    });
  });

  // ESC 關閉
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});

