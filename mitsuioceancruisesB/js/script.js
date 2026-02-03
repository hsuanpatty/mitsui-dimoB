'use strict';

document.querySelectorAll('.menu-title').forEach(function(el){
  el.addEventListener('click', function(e){
    // 如果有下拉選單才阻止
    if(this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-list')){
      e.preventDefault();  // 阻止跳轉到 #
      this.nextElementSibling.classList.toggle('show'); // 切換顯示
    }
  });
});

/* ============================
   Notification Toast
============================ */
(() => {
  const notificationToast = document.querySelector("[data-toast]");
  const toastCloseBtn = document.querySelector("[data-toast-close]");

  if (!notificationToast || !toastCloseBtn) return;

  let isClosing = false;

  toastCloseBtn.addEventListener("click", () => {
    if (isClosing) return;

    isClosing = true;
    notificationToast.classList.add("closed");

    setTimeout(() => {
      isClosing = false;
    }, 400);
  });
})();

/* ============================
   Mobile Menu + Accordion
============================ */
(() => {
  const menuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuCloseBtn = document.querySelector('[data-mobile-menu-close-btn]');
  const menuOverlay = document.querySelector('[data-overlay]');

  if (!mobileMenu || !menuOverlay) return;

  menuOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      menuOverlay.classList.add('active');
    });
  });

  menuCloseBtn?.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });

  menuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  });

  // Accordion 手風琴
 const accordionBtns = document.querySelectorAll('[data-accordion-btn]');

accordionBtns.forEach((btn) => {
  const panel = btn.nextElementSibling;

  btn.addEventListener('click', function() {
    const isActive = panel.classList.contains('active');

    // 收起其他展開的 panel
    document.querySelectorAll('.submenu-category-list.active').forEach(p => {
      if (p !== panel) {
        p.style.height = p.scrollHeight + 'px'; // 先固定高度
        requestAnimationFrame(() => {           // 下一幀再收起
          p.style.height = '0';
        });
        p.classList.remove('active');
        p.previousElementSibling.classList.remove('active');
      }
    });

    if (!isActive) {
      panel.classList.add('active');
      btn.classList.add('active');
      panel.style.height = panel.scrollHeight + 'px';
    } else {
      panel.style.height = panel.scrollHeight + 'px'; // 固定高度
      requestAnimationFrame(() => {
        panel.style.height = '0';
      });
      panel.classList.remove('active');
      btn.classList.remove('active');
    }

    // 過渡完成後設為 auto 高度
    panel.addEventListener('transitionend', function() {
      if (panel.classList.contains('active')) {
        panel.style.height = 'auto';
      }
    }, { once: true });
  });


});


})();

/* ============================
   Header 滾動浮動效果
============================ */
document.addEventListener('DOMContentLoaded', () => {
  const headerMain = document.querySelector('.header-main');
  const desktopMenu = document.querySelector('.desktop-navigation-menu');
  if (!headerMain || !desktopMenu) return;

  // 更新 desktop menu 的 top
  const updateDesktopMenuTop = () => {
    desktopMenu.style.top = `${headerMain.offsetHeight}px`;
  };
  updateDesktopMenuTop();
  window.addEventListener('resize', updateDesktopMenuTop);

  let lastScroll = 0;
  let ticking = false; // 防止 scroll 事件過於頻繁

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScroll <= 0 || currentScroll < lastScroll) {
          headerMain.classList.add('header-show');
          desktopMenu.classList.add('header-show');
        } else {
          headerMain.classList.remove('header-show');
          desktopMenu.classList.remove('header-show');
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });
});

