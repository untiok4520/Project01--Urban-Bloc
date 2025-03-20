// menu button功能
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const overlayMenu = document.querySelector(".overlay-menu");
  const mainArea1 = document.querySelector(".main-area1");

  // Menu button functionality
  if (menuBtn && overlayMenu) {
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      overlayMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
      console.log("Menu button clicked");
      if (overlayMenu.classList.contains("active")) {
        disableScroll();
      } else {
        enableScroll();
      }
    });
  } else {
    console.error("Menu button or overlay menu not found");
  }
  // 打開menu時鎖定滾動
  function disableScroll() {
    // 保存當前滾動位置
    const scrollY = window.scrollY;

    // 添加樣式讓body固定
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.dataset.scrollY = scrollY;
  }

  // 關閉menu時恢復滾動
  function enableScroll() {
    // 獲取之前保存的滾動位置
    const scrollY = parseInt(document.body.dataset.scrollY || "0");

    // 移除固定樣式
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.dataset.scrollY = "";
    // 恢復滾動位置
    window.scrollTo(0, scrollY);
  }

  // Background image slider
  if (mainArea1) {
    const images = [
      "url(../images/pexels/pexels-bouldering01.jpg)",
      "url(../images/pexels/pexels-cottonbro-6700633.jpg)",
      "url(../images/pexels/pexels-pavel-danilyuk-7590887.jpg)",
      "url(../images/pexels/pexels-pavel-danilyuk-7590917.jpg)",
      "url(../images/pexels/pexels-pavel-danilyuk-7590950.jpg)",
      "url(../images/pexels/pexels-pavel-danilyuk-7591300.jpg)",
    ];
    let currentImageIndex = 0;

    // Add transition style
    mainArea1.style.transition = "background-image 1s ease-in-out";

    // Function to change background
    function changeBackground() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      mainArea1.style.backgroundImage = images[currentImageIndex];
    }

    // Change background every 5 seconds
    setInterval(changeBackground, 4000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cardWrapper = document.getElementById("cardWrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const cards = document.querySelectorAll(".card");

  let currentIndex = 0;
  let cardWidth = 330; // 卡片寬度 + 邊距
  let cardsPerView = 3;

  // 根據螢幕寬度設定一次顯示的卡片數量
  function updateCardsPerView() {
    if (window.innerWidth <= 480) {
      cardsPerView = 1;
    } else if (window.innerWidth <= 768) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }

    // 重新計算卡片寬度
    cardWidth = cards[0].offsetWidth + 30; // 卡片寬度 + 邊距

    // 更新滑塊位置
    updateSliderPosition();
  }

  // 初始化指示器
  // function initIndicators() {
  //   indicators.innerHTML = "";
  //   const indicatorCount = Math.ceil(cards.length / cardsPerView);

  //   for (let i = 0; i < indicatorCount; i++) {
  //     const indicator = document.createElement("div");
  //     indicator.classList.add("indicator");
  //     if (i === 0) indicator.classList.add("active");

  //     indicator.addEventListener("click", function () {
  //       currentIndex = i;
  //       updateSliderPosition();
  //       updateIndicators();
  //     });

  //     indicators.appendChild(indicator);
  //   }
  // }

  // 更新指示器狀態
  // function updateIndicators() {
  //   const allIndicators = document.querySelectorAll(".indicator");
  //   allIndicators.forEach((ind, index) => {
  //     if (index === currentIndex) {
  //       ind.classList.add("active");
  //     } else {
  //       ind.classList.remove("active");
  //     }
  //   });
  // }

  // 更新滑塊位置
  function updateSliderPosition() {
    const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const translateValue = -currentIndex * cardsPerView * cardWidth;
    cardWrapper.style.transform = `translateX(${translateValue}px)`;
  }

  // 下一張
  nextBtn.addEventListener("click", function () {
    const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
      updateIndicators();
    }
  });

  // 上一張
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
      updateIndicators();
    }
  });

  // 初始化
  updateCardsPerView();
  // initIndicators();

  // 監聽視窗大小改變
  window.addEventListener("resize", function () {
    updateCardsPerView();
    initIndicators();
  });
});
