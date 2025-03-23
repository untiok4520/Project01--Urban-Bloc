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

  // 獲取元素
  const form = document.getElementById("registrationForm");
  const password = document.getElementById("register-password");
  const confirmPassword = document.getElementById("confirmPassword");
  const passwordError = document.getElementById("passwordError");
  const passwordRequirement = document.getElementById("passwordRequirement");
  const matchIndicator = document.getElementById("matchIndicator");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  // 密碼即時格式驗證
  password.addEventListener("input", function () {
    if (passwordRegex.test(password.value)) {
      passwordRequirement.textContent = "密碼格式正確✓";
      passwordRequirement.style.color = "rgb(34, 170, 34)";
    } else {
      passwordRequirement.textContent =
        "密碼需至少8位，包含大寫、小寫、數字及特殊字符✗";
      passwordRequirement.style.color = "#ff3860";
    }
  });
  // 即時檢查密碼是否匹配
  function checkPasswordMatch() {
    console.log("密碼:", password.value);
    console.log("確認密碼:", confirmPassword.value);

    if (confirmPassword.value.length > 0) {
      matchIndicator.classList.add("visible");

      if (password.value === confirmPassword.value) {
        matchIndicator.style.color = "green";
        matchIndicator.textContent = "✓";
        passwordError.classList.remove("visible");
      } else {
        matchIndicator.style.color = "red";
        matchIndicator.textContent = "✗";
        passwordError.classList.add("visible");
      }
    } else {
      matchIndicator.classList.remove("visible");
      passwordError.classList.remove("visible");
    }
  }

  // 監聽密碼輸入事件
  password.addEventListener("input", checkPasswordMatch);
  confirmPassword.addEventListener("input", checkPasswordMatch);

  // 獲取所有輸入元素
  const formInputs = [
    "lastName",
    "firstName",
    "phone",
    "birth",
    "register-email",
    "register-password",
    "confirmPassword",
  ];
  // 清空表單的函數
  function resetForm() {
    formInputs.forEach((inputId) => {
      document.getElementById(inputId).value = "";
    });
  }
  // 表單提交事件
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // 移除所有多餘空格進行比對
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (!passwordRegex.test(password.value)) {
      alert("密碼格式不正確，請重新輸入！");
      return;
    }
    if (passwordValue !== confirmPasswordValue) {
      alert("密碼與確認密碼不符，請重新輸入！");
      confirmPassword.focus();
      return;
    }

    // 這裡可以添加更多的表單驗證邏輯

    alert("註冊表單提交成功！");
    resetForm();
  });
});
