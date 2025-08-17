document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".add-to-cart");
  const likeButtons = document.querySelectorAll(".like-btn");

  updateCartCount();
  updateLikeCount();

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productElement = button.parentElement;
      const title = productElement.querySelector("h3").innerText;
      const price = productElement.querySelector("p").innerText;
      const image = productElement.querySelector("img").src;

      const item = { title, price, image };
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert(`${title} added to cart!`);
      updateCartCount();
    });
  });

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productElement = btn.parentElement;
      const title = productElement.querySelector("h3").innerText;
      const price = productElement.querySelector("p").innerText;
      const image = productElement.querySelector("img").src;

      const item = { title, price, image };
      let likedItems = JSON.parse(localStorage.getItem("likes")) || [];

      const alreadyLiked = likedItems.find(p => p.title === title);

      if (alreadyLiked) {
        likedItems = likedItems.filter(p => p.title !== title);
        btn.classList.remove("liked");
        btn.innerText = "❤️";
      } else {
        likedItems.push(item);
        btn.classList.add("liked");
        btn.innerText = "💖";
      }

      localStorage.setItem("likes", JSON.stringify(likedItems));
      updateLikeCount();
    });
  });
});

function updateCartCount() {
  const cartIcon = document.getElementById("cart-count");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartIcon) cartIcon.innerText = cartItems.length;
}

function updateLikeCount() {
  const likeIcon = document.getElementById("like-count");
  const likedItems = JSON.parse(localStorage.getItem("likes")) || [];
  if (likeIcon) likeIcon.innerText = likedItems.length;
}
function buyNow(name, price, image) {
  const url = `order.html?name=${encodeURIComponent(name)}&price=${price}&image=${encodeURIComponent(image)}`;
  window.location.href = url;
}

// Simulate login and store phone number (you'd normally get this from login.html)
let userPhone = localStorage.getItem("userPhone");

// Update phone number in profile dropdown
window.addEventListener("DOMContentLoaded", () => {
  if (userPhone) {
    document.getElementById("userPhone").innerText = "📱 Phone: " + userPhone;
  }
});

// Logout action
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("userPhone");
  alert("Logged out!");
  location.reload();
});


function addToWishlist(productId) {
  const userPhone = localStorage.getItem("userPhone");
  if (!userPhone) {
    alert("Please login to save items to your wishlist.");
    return;
  }

  let wishlist = JSON.parse(localStorage.getItem(`wishlist_${userPhone}`)) || [];

  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem(`wishlist_${userPhone}`, JSON.stringify(wishlist));
    alert("Product added to wishlist!");
  }
}
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product-item");

  products.forEach((product) => {
    const title = product.querySelector(".product-title").textContent.toLowerCase();
    if (title.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
// === Product Search ===
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const query = searchInput.value.toLowerCase();
      const products = document.querySelectorAll(".product-item");
      let matchCount = 0;

      products.forEach((product) => {
        const title = product.querySelector(".product-title").textContent.toLowerCase();
        if (title.includes(query)) {
          product.style.display = "block";
          matchCount++;
        } else {
          product.style.display = "none";
        }
      });

      const noResults = document.getElementById("noResults");
      if (noResults) {
        noResults.style.display = matchCount === 0 ? "block" : "none";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("orderProduct"));

  if (product) {
    const orderCard = document.getElementById("orderCard");
    orderCard.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
    `;
  }

  const orderForm = document.getElementById("orderForm");
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    document.getElementById("successMessage").style.display = "block";

    // Clear cart or product
    localStorage.removeItem("orderProduct");

    // Redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  });
});

function buyNow(name, img, price) {
  const product = { name, img, price };
  localStorage.setItem("orderProduct", JSON.stringify(product));
  window.location.href = "order.html";
}

/* track-order*/
document.getElementById("trackForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const orderId = document.getElementById("orderId").value.trim();

  if (orderId !== "") {
    // Simulate successful tracking
    document.getElementById("orderStatus").style.display = "block";
    // In a real app, you'd fetch order info from a server here
  } else {
    alert("Please enter a valid Order ID or Email.");
  }
});
/*contact us*/
document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  this.reset();
});
function searchStore() {
      const input = document.getElementById("locationInput").value.toLowerCase();
      const stores = document.querySelectorAll(".store");
      stores.forEach(store => {
        const text = store.textContent.toLowerCase();
        store.style.display = text.includes(input) ? "block" : "none";
      });
    }
document.addEventListener("DOMContentLoaded", () => {
  console.log("Shipping & Returns page loaded successfully.");
});

/*term and condition */
// JavaScript for any interactive behavior (optional)
document.addEventListener("DOMContentLoaded", () => {
  console.log("Terms & Conditions page loaded.");
});


/* privacy-policy */
// Optional JavaScript for future interactivity
document.addEventListener("DOMContentLoaded", () => {
  console.log("Privacy Policy page loaded.");
});

/*Refunds policy*/
// Optional JavaScript for interactivity or form handling
document.addEventListener("DOMContentLoaded", () => {
  console.log("Refund Policy page loaded.");
});

/*  social contact link*/

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input[type='email']").value;
  if (email) {
    alert("Thank you for subscribing, " + email + "!");
    this.reset();
  }
});

/* add to cart*/





/*===================*/
