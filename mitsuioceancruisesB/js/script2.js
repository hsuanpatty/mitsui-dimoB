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
   script2.js
============================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ============================
     Mobile menu
  ============================ */
  (function mobileMenuSetup(){
    const menuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const menuCloseBtn = document.querySelector('[data-mobile-menu-close-btn]');
    const overlay = document.querySelector('[data-overlay]');

    if (!mobileMenu || !overlay) return;

    function openMenu(){
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
    }

    function closeMenu(){
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
    }

    menuOpenBtns.forEach(btn => btn.addEventListener('click', openMenu));
    menuCloseBtn?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
  })();



  /* ============================
     Accordion（平滑展開收起）
  ============================ */
  (function accordionSetup(){
    const accordionBtns = document.querySelectorAll('[data-accordion-btn]');
    if (!accordionBtns.length) return;

    accordionBtns.forEach(btn => {
      const panel = btn.nextElementSibling;

      panel.style.height = '0';
      panel.style.overflow = 'hidden';

      function collapse(p) {
        if (!p.classList.contains('active')) return;

        p.style.height = p.scrollHeight + 'px';
        requestAnimationFrame(() => { p.style.height = '0'; });
        p.classList.remove('active');

        const relatedBtn = p.previousElementSibling;
        relatedBtn?.classList.remove('active');
      }

      function expand(p) {
        p.classList.add('active');
        p.style.height = p.scrollHeight + 'px';

        const relatedBtn = p.previousElementSibling;
        relatedBtn?.classList.add('active');

        const end = () => {
          if (p.classList.contains('active')) p.style.height = 'auto';
          p.removeEventListener('transitionend', end);
        };
        p.addEventListener('transitionend', end);
      }

      btn.addEventListener('click', e => {
        e.preventDefault();
        const isActive = panel.classList.contains('active');

        document.querySelectorAll('.submenu-category-list.active').forEach(openPanel => {
          if (openPanel !== panel) collapse(openPanel);
        });

        isActive ? collapse(panel) : expand(panel);
      });

      panel.addEventListener('transitionend', () => {
        if (!panel.classList.contains('active')) panel.style.height = '0';
      });
    });
  })();



  /* ============================
     Header sticky show/hide
  ============================ */
  (function headerScrollSetup(){
    const headerMain = document.querySelector('.header-main');
    const desktopMenu = document.querySelector('.desktop-navigation-menu');
    if (!headerMain || !desktopMenu) return;

    const updateDesktopMenuTop = () => {
      desktopMenu.style.top = `${headerMain.offsetHeight}px`;
    };

    updateDesktopMenuTop();
    window.addEventListener('resize', updateDesktopMenuTop);

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      if (current < lastScroll || current <= 0) {
        headerMain.classList.add('header-show');
        desktopMenu.classList.add('header-show');
      } else {
        headerMain.classList.remove('header-show');
        desktopMenu.classList.remove('header-show');
      }
      lastScroll = current;
    });
  })();

});



// 房型 價格
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".type-tem");

  items.forEach((item) => {
    const title = item.querySelector(".type-title");
    const content = item.querySelector(".type-text");

    title.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // 關閉全部
      items.forEach((i) => {
        i.classList.remove("active");
        const txt = i.querySelector(".type-text");
        txt.style.maxHeight = null;
      });

      if (isOpen) return;

      // 展開自己
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    });
  });

  // 預設展開第一個
  const first = items[0];
  if (first) {
    const firstContent = first.querySelector(".type-text");
    first.classList.add("active");
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
  }
});
