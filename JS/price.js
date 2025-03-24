// 初始化全局購物車變數
window.cart = [];

// 定義全局函數
// 更新購物車數量顯示
window.updateCartCount = function () {
  const cartCount = document.querySelector(".cart-btn span");
  let count = 0;
  window.cart.forEach((item) => {
    count += item.quantity;
  });

  cartCount.textContent = count;
  if (count > 0) {
    cartCount.style.visibility = "visible";
  } else {
    cartCount.style.visibility = "hidden";
  }
};

// 更新總價
window.updateTotalPrice = function () {
  const totalPriceElement = document.querySelector(".total-price");
  let totalPrice = 0;
  window.cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  totalPriceElement.textContent = `$${totalPrice}`;
};

// 渲染購物車
window.renderCart = function () {
  const cartList = document.querySelector(".cartList");
  if (!cartList) return;

  cartList.innerHTML = "";

  window.cart.forEach((item, index) => {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
      <div class="name">${item.name}</div>
      <div class="totalPrice">$${item.price * item.quantity}</div>
      <div class="quantity">
        <span class="minus" data-index="${index}">＜</span>
        <span class="number">${item.quantity}</span>
        <span class="plus" data-index="${index}">＞</span>
      </div>
    `;

    cartList.appendChild(cartBox);
  });

  // 添加增減數量的事件監聽器
  const plusButtons = document.querySelectorAll(".quantity .plus");
  const minusButtons = document.querySelectorAll(".quantity .minus");

  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      window.cart[index].quantity += 1;
      window.updateCartCount();
      window.updateTotalPrice();
      window.renderCart();
    });
  });

  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      if (window.cart[index].quantity > 1) {
        window.cart[index].quantity -= 1;
      } else {
        window.cart.splice(index, 1);
      }
      window.updateCartCount();
      window.updateTotalPrice();
      window.renderCart();
    });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const overlayMenu = document.querySelector(".overlay-menu");
  const userBtn = document.querySelector(".user-btn");
  const loginModal = document.querySelector("#loginModal");
  const closeModalBtn = document.querySelector(".close-modal");
  const cartBtn = document.querySelector(".cart-btn");
  const cartContainer = document.querySelector(".cartContainer");
  const closeCartBtn = document.querySelector(".cartContainer .close");
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

  // 購物車按鈕點擊事件
  if (cartBtn && cartContainer) {
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      cartContainer.classList.toggle("showCart");
    });
  }

  // 關閉購物車按鈕點擊事件
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", function () {
      cartContainer.classList.remove("showCart");
    });
  }

  // 結帳按鈕點擊事件
  const checkOutBtn = document.querySelector(".cartContainer .checkOut");
  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", function () {
      if (window.cart.length > 0) {
        alert("結帳成功！");
        window.cart = [];
        window.updateCartCount();
        window.updateTotalPrice();
        window.renderCart();
        cartContainer.classList.remove("showCart");
      } else {
        alert("購物車是空的！");
      }
    });
  }

  // 初始化購物車顯示
  if (window.cart.length > 0) {
    window.updateCartCount();
    window.updateTotalPrice();
    window.renderCart();
  }
});

//計數器
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
  let cartTitle = cartGroup.querySelector("h4.title").textContent;
  let inputs = cartGroup.querySelectorAll(".productInput");
  let options = cartGroup.querySelectorAll(".opt");

  // 檢查是否有選擇數量
  let hasItems = false;

  // 遍歷所有選項
  options.forEach((opt, index) => {
    let input = opt.querySelector("input");
    let quantity = parseInt(input.value);

    if (quantity > 0) {
      hasItems = true;
      let nameElement = opt.querySelector("p");
      let name = nameElement.textContent;

      // 從文本中提取價格
      let priceMatch = name.match(/NT\$([0-9,]+)/);
      let price = 0;

      if (priceMatch && priceMatch[1]) {
        price = parseInt(priceMatch[1].replace(/,/g, ""));
      }

      // 完整名稱: 類別 + 選項名稱
      let fullName = `${cartTitle} - ${name.split(" NT$")[0]}`;

      // 檢查購物車中是否已有此商品
      let cartItem = window.cart.find((item) => item.name === fullName);

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        window.cart.push({
          name: fullName,
          price: price,
          quantity: quantity,
        });
      }
    }
  });

  if (hasItems) {
    // 更新購物車
    window.updateCartCount();
    window.updateTotalPrice();
    window.renderCart();

    // 清空當前容器內的所有 input
    inputs.forEach((input) => (input.value = input.defaultValue));

    // 顯示 toast 訊息
    showToast("已加入購物車！");

    // 顯示購物車
    document.querySelector(".cartContainer").classList.add("showCart");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000); // 2 秒後隱藏
}
