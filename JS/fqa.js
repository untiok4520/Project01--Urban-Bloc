document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const overlayMenu = document.querySelector(".overlay-menu");
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
});
