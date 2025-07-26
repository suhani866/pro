document.addEventListener('DOMContentLoaded', () => {
        // Your code here
    });
'use strict';

const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

function modalCloseFunc() { modal.classList.add('closed'); }

modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

//Close Notification 

const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

toastCloseBtn.addEventListener('click', function() {
    notificationToast.classList.add('closed');
})

//Closing or Opening Mobile Menu 
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

    const mobileMenuCloseFunc = function () {
        mobileMenu[i].classList.remove('active');
        overlay.classList.remove('active');
    }

    mobileMenuOpenBtn[i].addEventListener('click', function () {
        mobileMenu[i].classList.add('active');
        overlay.classList.add('active');
    })

    mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
    overlay.addEventListener('click', mobileMenuCloseFunc);
}
const currencySelector = document.querySelector('select[name="currency"]');
const priceElements = document.querySelectorAll('.price');

const exchangeRates = {
  rupees: { symbol: '₹', rate: 83 },
  usd: { symbol: '$', rate: 1 },
  eur: { symbol: '€', rate: 0.91 }
};

currencySelector.addEventListener('change', function () {
  const selected = this.value;
  const rate = exchangeRates[selected].rate;
  const symbol = exchangeRates[selected].symbol;

  priceElements.forEach(price => {
    // Use base USD stored in data-price attribute
    const usdValue = parseFloat(price.getAttribute('data-price'));
    const newValue = (usdValue * rate).toFixed(2);
    price.textContent = `${symbol}${newValue}`;
  });
});

function addToWishlist() {
    const wishlistCountElement = document.getElementById('wishlistCount');
    let count = parseInt(wishlistCountElement.textContent);
    wishlistCountElement.textContent = count + 1;
}

// Event listener for product heart icons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart')) {
        addToWishlist();
    }
});

// Function to add to cart
function addToCart() {
    const cartCountElement = document.getElementById('cartCount');
    let count = parseInt(cartCountElement.textContent);
    cartCountElement.textContent = count + 1;
}

// Event listener for "Add to Cart" buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-cart-btn')) {
        addToCart();
    }
});
//Accordion Options
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordion.length; i++) {
    accordionBtn[i].addEventListener('click', function () {
        const isActive = this.nextElementSibling.classList.contains('active');

        for (let i = 0; i < accordion.length; i++) {
                accordion[i].classList.remove('active');
            }
        
            if (!isActive) {
                accordion[i].classList.add('active');
            }

    });
}


// Cart functionality
let cart = [];
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartCountElements = document.querySelectorAll('.action-btn .count'); // For all cart counters

function updateCartDisplay() {
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
            cart.splice(idx, 1);
            updateCartDisplay();
        };
        li.appendChild(removeBtn);
        cartItemsElement.appendChild(li);
    });
    cartTotalElement.textContent = total;
    cartCountElements.forEach(el => el.textContent = cart.length);
}

// Open/close cart modal
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.querySelector('ion-icon[name="bag-handle-outline"]')) {
            cartModal.style.display = 'block';
            updateCartDisplay();
        }
    });
});
closeCartBtn.onclick = () => cartModal.style.display = 'none';

// Add to cart buttons
document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const showcase = btn.closest('.showcase, .showcase-content');
        const name = showcase.querySelector('.showcase-title')?.textContent || 'Product';
        const priceText = showcase.querySelector('.price')?.textContent || '0';
        const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;

        fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        })
        .then(res => res.json())
        .then(data => {
            // Optionally update UI or show a message
            console.log('Added to cart:', data);
        });
        cart.push({ name, price });
        updateCartDisplay();
    });
});

// ...wishlist functionality...

let wishlist = [];
const wishlistItemsElement = document.getElementById('wishlist-items');
const wishlistCountElements = document.querySelectorAll('.action-btn .count');

function updateWishlistDisplay() {
    wishlistItemsElement.innerHTML = '';
    wishlist.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = item;
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
            wishlist.splice(idx, 1);
            updateWishlistDisplay();
        };
        li.appendChild(removeBtn);
        wishlistItemsElement.appendChild(li);
    });
    wishlistCountElements.forEach(el => el.textContent = wishlist.length);
}

// Wishlist modal open/close
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.querySelector('ion-icon[name="heart-outline"]')) {
            document.getElementById('wishlist-modal').style.display = 'block';
            updateWishlistDisplay();
        }
    });
});
document.getElementById('close-wishlist').onclick = () => {
    document.getElementById('wishlist-modal').style.display = 'none';
};

// Add to wishlist buttons
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const showcase = btn.closest('.showcase, .showcase-content');
        const name = showcase.querySelector('.showcase-title')?.textContent || 'Product';
        if (!wishlist.includes(name)) {
            wishlist.push(name);
            updateWishlistDisplay();
        }
    });
});

// ...existing code...
document.getElementById('pay-now-btn').onclick = function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Dummy payment integration
    alert('Redirecting to payment gateway...');
    // Here you can redirect to a real payment gateway or show a payment modal
    // window.location.href = 'https://your-payment-gateway.com';
    cart.length = 0; // Clear cart after payment
    updateCartDisplay();
    cartModal.style.display = 'none';
};
