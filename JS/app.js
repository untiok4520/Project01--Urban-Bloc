// menu button功能
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const overlayMenu = document.querySelector(".overlay-menu");
  const mainArea1 = document.querySelector(".main-area1");
  const userBtn = document.querySelector(".user-btn");
  const loginModal = document.querySelector("#loginModal");
  const closeModalBtn = document.querySelector(".close-modal");

  // 確保 modal 初始狀態為隱藏
  if (loginModal) {
    loginModal.style.display = "none";
    loginModal.classList.remove("active");
  }

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
    // 自動關閉 Menu 當點擊內部連結
    const menuLinks = overlayMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        overlayMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        enableScroll(); // 關閉後恢復滾動
      });
    });
  } else {
    console.error("Menu button or overlay menu not found");
  }

  // 登入 Modal 功能
  if (userBtn && loginModal) {
    userBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.style.display = "flex";
      // 使用 setTimeout 確保 display: flex 已經應用後再添加 active 類
      setTimeout(() => {
        loginModal.classList.add("active");
        document.body.classList.add("modal-open");
        disableScroll();
      }, 10);
    });
  }

  // 關閉 Modal 功能
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      closeModal();
    });
  }

  // 點擊 Modal 外部關閉 Modal
  if (loginModal) {
    loginModal.addEventListener("click", function (e) {
      if (e.target === loginModal) {
        closeModal();
      }
    });
  }

  // 關閉 Modal 的函數
  function closeModal() {
    loginModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    enableScroll();
    // 等待過渡效果完成後隱藏 modal
    setTimeout(() => {
      loginModal.style.display = "none";
    }, 300); // 300ms 與 CSS 過渡時間相同
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

    // Change background every 3 seconds
    setInterval(changeBackground, 3000);
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
