'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const triggersModal = document.querySelectorAll(".js-show-modal");
  const modals = document.querySelectorAll(".js-modal");

  // 如果使用 PerfectScrollbar 或其他 customScroll
  const scrollInstances = {};

  modals.forEach(modal => {
    const inner = modal.querySelector(".modal-box.customScroll");
    if (inner && window.PerfectScrollbar) {
      scrollInstances[modal.dataset.modal] = new PerfectScrollbar(inner);
    }
  });

  function getScrollbarWidth() {
    const width = window.innerWidth - document.documentElement.clientWidth;
    return width > 0 ? width : 0;
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
    const scrollY = parseInt(document.body.dataset.scrollY || '0');

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    document.body.dataset.scrollY = '';

    window.scrollTo(0, scrollY);
  }

  function openModal(modal) {
    // 關閉所有 modal
    modals.forEach(m => m.classList.remove("is-open"));

    modal.classList.add("is-open");
    openBodyLock();

    // 🔹 外層滾回頂部
    const innerOuter = modal.querySelector(".modal__inner");
    if (innerOuter) innerOuter.scrollTop = 0;

    // 🔹 內層 customScroll 滾回頂部
    const innerCustom = modal.querySelector(".modal-box.customScroll");
    if (innerCustom) {
      if (scrollInstances[modal.dataset.modal]) {
        scrollInstances[modal.dataset.modal].scrollTo(0, 0, 0);
      } else {
        innerCustom.scrollTop = 0;
      }
    }
  }

  function closeModal() {
    const openModalEl = document.querySelector(".js-modal.is-open");
    if (!openModalEl) return;

    openModalEl.classList.remove("is-open");
    closeBodyLock();

    // 重置滾動位置
    const innerOuter = openModalEl.querySelector(".modal__inner");
    if (innerOuter) innerOuter.scrollTop = 0;

    const innerCustom = openModalEl.querySelector(".modal-box.customScroll");
    if (innerCustom) {
      if (scrollInstances[openModalEl.dataset.modal]) {
        scrollInstances[openModalEl.dataset.modal].scrollTo(0, 0, 0);
      } else {
        innerCustom.scrollTop = 0;
      }
    }
  }

  // 觸發按鈕
  triggersModal.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const modalID = this.dataset.modal;
      const modal = document.querySelector(`.js-modal[data-modal="${modalID}"]`);
      if (modal) openModal(modal);
    });
  });

  // 點擊背景或按鈕關閉
  modals.forEach(modal => {
    modal.addEventListener("click", function(event) {
      const isOutside = !event.target.closest(".modal__inner");
      const isCloseButton = event.target.matches(".js-close-modal");
      if (isOutside || isCloseButton) closeModal();
    });
  });

  // Esc 關閉
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });
});
