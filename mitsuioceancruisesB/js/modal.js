'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const triggersModal = document.querySelectorAll(".js-show-modal");
  const modals = document.querySelectorAll(".js-modal");

  // 計算 scrollbar 寬度（避免負值避免手機版錯位）
  function getScrollbarWidth() {
    const width = window.innerWidth - document.documentElement.clientWidth;
    return width > 0 ? width : 0;
  }

  // 鎖住 body 並補償 scrollbar（桌機用 padding-right，手機不出界）
  function openBodyLock() {
    const scrollY = window.scrollY;
    const scrollbarWidth = getScrollbarWidth();

    document.body.dataset.scrollY = scrollY; // 記錄位置
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`; // 安全補償，不會推畫面
  }

  // 解鎖 body 還原位置
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

  // 打開 modal
  function openModal(modal) {
    modal.classList.add("is-open");
    openBodyLock();
  }

  // 關閉 modal
  function closeModal() {
    modals.forEach(modal => modal.classList.remove("is-open"));
    closeBodyLock();
  }

  // 點擊觸發按鈕開啟對應 modal
  triggersModal.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const modalID = this.dataset.modal;
      modals.forEach(modal => {
        if (modal.dataset.modal === modalID) {
          openModal(modal);
        }
      });
    });
  });

  // 點擊背景或按鈕關閉 modal
  modals.forEach(modal => {
    modal.addEventListener("click", function(event) {
      const isOutside = !event.target.closest(".modal__inner");
      const isCloseButton = event.target.matches(".js-close-modal");
      if (isOutside || isCloseButton) {
        closeModal();
      }
    });
  });

  // Esc 關閉 modal
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

});
