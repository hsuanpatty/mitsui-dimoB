$(document).ready(function () {

  // ===========================
  // LazyLoad 轉 src
  // ===========================
  $(".lazyload").each(function(){
    $(this).attr("src", $(this).data("src"));
  });

  // ===========================
  // Banner
  // ===========================
  $(".banner-img").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1200,
    fade: true,
    cssEase: "ease-in-out",
    adaptiveHeight: true
  });

  // ===========================
  // 初始化 Slick Slider + 縮圖 + Zoom（無 Lightbox）
  // ===========================
  function initProductSlider(mainSelector, navSelector) {
    // 主 Slider
    $(mainSelector).slick({
      asNavFor: navSelector,
      rows: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false, // 預設桌面隱藏
      prevArrow: '<span class="slick-prev"><</span>',
      nextArrow: '<span class="slick-next">></span>',
      fade: true,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 768, // 手機顯示箭頭
          settings: { arrows: true }
        }
      ]
    });

    // 縮圖 Slider
    $(navSelector).slick({
      asNavFor: mainSelector,
      rows: 1,
      slidesToShow: 6,
      slidesToScroll: 1,
      focusOnSelect: true,
      adaptiveHeight: true,
      dots: false,
      arrows: false
    });

    // Zoom 功能
    if ($.fn.zoom) {
      $(".zoom").zoom();
      $(".zoom--grab").zoom({ on: "grab" });
      $(".zoom--click").zoom({ on: "click" });
      $(".zoom--toggle").zoom({ on: "toggle" });
    }
  }

  // 初始化多組商品 Slider
  initProductSlider("#product-slider-main1", ".product-slider-nav1");
  initProductSlider("#product-slider-main2", ".product-slider-nav2");
  initProductSlider("#product-slider-main3", ".product-slider-nav3");
  initProductSlider("#product-slider-main4", ".product-slider-nav4");
  initProductSlider("#product-slider-main5", ".product-slider-nav5");
  initProductSlider("#product-slider-main6", ".product-slider-nav6");
  initProductSlider("#product-slider-main7", ".product-slider-nav7");
  initProductSlider("#product-slider-main8", ".product-slider-nav8");
  initProductSlider("#product-slider-main9", ".product-slider-nav9");
  initProductSlider("#product-slider-main10", ".product-slider-nav10");
  initProductSlider("#product-slider-main11", ".product-slider-nav11");
  initProductSlider("#product-slider-main12", ".product-slider-nav12");
  initProductSlider("#product-slider-main13", ".product-slider-nav13");
  initProductSlider("#product-slider-main14", ".product-slider-nav14");
  initProductSlider("#product-slider-main15", ".product-slider-nav15");
  initProductSlider("#product-slider-main16", ".product-slider-nav16");
  initProductSlider("#product-slider-main17", ".product-slider-nav17");
  initProductSlider("#product-slider-main18", ".product-slider-nav18");
  initProductSlider("#product-slider-main19", ".product-slider-nav19");
  initProductSlider("#product-slider-main20", ".product-slider-nav20");
});



// 甲板平面圖
(function () {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".details");
  const wrapper = document.querySelector(".details-wrapper");

  if (!tabs.length || !contents.length || !wrapper) return;

  let activeEl = document.querySelector(".details.active");
  let activeId = activeEl ? activeEl.id : contents[0].id;

  let autoTimer = null;
  const interval = 3000; // 輪播速度 (ms)

  const ids = [...contents].map(c => c.id);

  // -----------------------------
  // 平滑高度調整
  // -----------------------------
  function adjustHeight(targetEl) {
    wrapper.style.height = targetEl.offsetHeight + "px";
  }

  adjustHeight(activeEl);

  // -----------------------------
  // Tab 水平滾動對齊，不滾動頁面
  // -----------------------------
  function scrollTabIntoView(tab) {
    const nav = tab.closest(".deck-nav");
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    nav.scrollLeft += tabRect.left - navRect.left - (navRect.width / 2) + (tabRect.width / 2);
  }

  // -----------------------------
  // 切換內容
  // -----------------------------
  function switchTo(targetId, direction = "left") {
    if (!targetId || targetId === activeId) return;

    const current = document.getElementById(activeId);
    const next = document.getElementById(targetId);
    if (!current || !next) return;

    // 更新 tab active
    tabs.forEach(t => t.classList.remove("active"));
    const t = [...tabs].find(t => t.dataset.target === targetId);
    if (t) {
      t.classList.add("active");
      scrollTabIntoView(t); // 水平滾動 tab
    }

    // 動畫方向
    current.classList.remove("active");
    current.classList.add(direction === "left" ? "exit-left" : "exit-right");

    next.classList.remove("exit-left", "exit-right");
    next.offsetHeight;
    next.classList.add("active");

    adjustHeight(next);

    setTimeout(() => {
      current.classList.remove("exit-left", "exit-right");
    }, 1000);

    activeId = targetId;
  }

  // -----------------------------
  // 自動輪播
  // -----------------------------
  function autoPlay() {
    autoTimer = setInterval(() => {
      let idx = ids.indexOf(activeId);
      let next = ids[(idx + 1) % ids.length];
      switchTo(next, "left");
    }, interval);
  }

  function restartAutoPlay() {
    clearInterval(autoTimer);
    autoPlay();
  }

  autoPlay();

  // -----------------------------
  // 點擊 tab
  // -----------------------------
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const idxNow = ids.indexOf(activeId);
      const idxNext = ids.indexOf(target);
      const dir = idxNext > idxNow ? "left" : "right";

      switchTo(target, dir);
      restartAutoPlay();
    });
  });

  // -----------------------------
  // Hover 暫停
  // -----------------------------
  wrapper.addEventListener("mouseenter", () => clearInterval(autoTimer));
  wrapper.addEventListener("mouseleave", () => restartAutoPlay());

  // -----------------------------
  // 手機左右滑動
  // -----------------------------
  let startX = 0;

  wrapper.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;

    if (Math.abs(diff) < 40) return;

    let idx = ids.indexOf(activeId);

    if (diff < 0) {
      // 左滑 → 下一個
      let next = ids[(idx + 1) % ids.length];
      switchTo(next, "left");
    } else {
      // 右滑 → 上一個
      let prev = ids[(idx - 1 + ids.length) % ids.length];
      switchTo(prev, "right");
    }

    restartAutoPlay();
  });
})();





$(document).ready(function () {
  // ===========================
  // goTop 按鈕
  // ===========================
  var goTopButton = $('#goTop');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      goTopButton.fadeIn();
    } else {
      goTopButton.fadeOut();
    }
  });

  goTopButton.click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  // ===========================
  // 郵輪航程搜尋
  // ===========================
  const form = document.querySelector(".cruise-form");
  if (form) {
    const candidateCount = form.querySelector(".candidate-count");
    const selects = form.querySelectorAll("select");
    const resetBtn = form.querySelector(".btn-reset");

    function updateCandidateCount() {
      if (!candidateCount) return;
      let count = 11; // 初始候選數
      selects.forEach((select) => {
        if (select.value) count--;
      });
      candidateCount.textContent = count > 0 ? count : 0;
    }

    updateCandidateCount();

    selects.forEach((select) => select.addEventListener("change", updateCandidateCount));

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        selects.forEach((select) => (select.value = ""));
        updateCandidateCount();
      });
    }
  }
});
