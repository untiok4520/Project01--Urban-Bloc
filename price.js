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
});
//計數器
// function changeQuantity(amount) {
//   let input = document.getElementById("quantity");
//   let newValue = parseInt(input.value) + amount;
//   if (newValue >= parseInt(input.min)) {
//     input.value = newValue;
//   }
// }
function changeQuantity(event, amount) {
  let container = event.target.parentElement; // 找到點擊按鈕的父容器
  let input = container.querySelector("input"); // 找到該容器內的 input
  let newValue = parseInt(input.value) + amount;
  if (newValue >= parseInt(input.min)) {
    input.value = newValue;
  }
}
//加入購物車
function addToCart(event) {
  // 找到當前按鈕所屬的 cart-group 容器
  let cartGroup = event.target.closest(".cart-group");

  // 清空當前容器內的所有 input
  let inputs = cartGroup.querySelectorAll(".productInput");
  inputs.forEach((input) => (input.value = input.defaultValue));

  // 顯示 toast 訊息
  showToast("已加入購物車！");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000); // 2 秒後隱藏
}
