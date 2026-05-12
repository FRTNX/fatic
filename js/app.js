let cart = [];
let currentCategory = 'all';
let currentSearch = '';
let sortBy = 'default';
let filteredProducts = [...products];

function init() {
  renderCategories();
  renderProducts(products);
  setupEventListeners();
  updateCartCount();
  initTheme();
}

/* ========================================
   Categories
   ======================================== */
function renderCategories() {
  const nav = document.getElementById('categoryNav');
  nav.innerHTML = categories.map(c => `
    <button class="category-btn" data-category="${c.id}">${c.name}</button>
  `).join('') + `<button class="category-btn active" data-category="all">All</button>`;
}

/* ========================================
   Products
   ======================================== */
function renderProducts(productList) {
  const grid = document.getElementById('productGrid');
  if (productList.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = productList.map((p, i) => `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${(i % 8) * 0.04}s">
      ${p.badge ? `<span class="product-badge ${p.badge.toLowerCase().replace(/[\s&-]+/g, '-').replace(/^-|-$/g, '')}">${p.badge}</span>` : ''}
      <div class="product-image-wrap">
        <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-supplier">
          <span class="supplier-dot" style="background:${p.supplier.color}"></span>
          ${p.supplier.name}
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="rating-num">${p.rating}</span>
          <span class="review-count">(${formatNumber(p.reviews)})</span>
        </div>
        <div class="product-pricing">
          <span class="current-price">$${formatPrice(p.price_usd)}</span>
          <span class="original-price">$${formatPrice(p.price_usd * 1.35)}</span>
          <span class="discount-badge">-${Math.round((1 - p.price_usd / (p.price_usd * 1.35)) * 100)}%</span>
        </div>
        <div class="product-meta">
          ${p.freeShipping ? '<span class="free-shipping">Free Shipping</span>' : '<span class="shipping-fee">+ Shipping</span>'}
        </div>
        <button class="add-to-cart" onclick="addToCart(${p.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function formatNumber(n) {
  if (n >= 10000) return (n / 10000).toFixed(1).replace('.0', '') + 'k';
  return n.toLocaleString();
}

/* ========================================
   Cart
   ======================================== */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  renderCart();

  const btn = document.querySelector(`.product-card[data-id="${id}"] .add-to-cart`);
  if (btn) {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Added`;
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
Add to Cart`;
      btn.classList.remove('added');
    }, 1500);
  }

  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

function renderCart() {
  const items = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');

  if (cart.length === 0) {
    items.innerHTML = `
      <div class="cart-empty">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Your cart is empty</p>
        <span>Add some products to get started</span>
      </div>
    `;
    total.textContent = '$0.00';
    return;
  }

  items.innerHTML = cart.map(c => `
    <div class="cart-item">
      <img class="cart-item-img" src="${c.image}" alt="${c.name}" />
      <div class="cart-item-info">
        <h4 class="cart-item-name">${c.name}</h4>
        <div class="cart-item-price">$${formatPrice(c.price_usd)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
          <span>${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  const totalPrice = cart.reduce((sum, c) => sum + c.price_usd * c.qty, 0);
  total.textContent = `$${formatPrice(totalPrice)}`;
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  updateCartCount();
  renderCart();
}

/* ========================================
   Filtering
   ======================================== */
function filterProducts() {
  let result = [...products];

  if (currentCategory !== 'all') {
    result = result.filter(p => p.category === currentCategory);
  }

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.supplier.name.toLowerCase().includes(q) ||
      categories.find(c => c.id === p.category)?.name.toLowerCase().includes(q)
    );
  }

  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price_usd - b.price_usd);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price_usd - a.price_usd);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      result.sort((a, b) => b.reviews - a.reviews);
      break;
  }

  filteredProducts = result;
  renderProducts(result);
  updateResultsCount(result.length);
}

function updateResultsCount(count) {
  document.getElementById('resultsCount').textContent =
    `${count} ${count === 1 ? 'product' : 'products'}`;
}

/* ========================================
   Theme
   ======================================== */
function initTheme() {
  const saved = localStorage.getItem('fatic-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('fatic-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('fatic-theme', 'dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('themeIcon');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (!icon) return;
  icon.innerHTML = isDark
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
    : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
}

/* ========================================
   Event Listeners
   ======================================== */
function setupEventListeners() {
  // Category filter
  document.getElementById('categoryNav').addEventListener('click', e => {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterProducts();
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = e.target.value;
      filterProducts();
    }, 300);
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    sortBy = e.target.value;
    filterProducts();
  });

  // Cart toggle
  document.getElementById('cartToggle').addEventListener('click', () => {
    document.getElementById('cartPanel').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
  });

  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Mobile menu
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
  });

  document.getElementById('closeMobileMenu').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });

  // Mobile categories
  document.getElementById('mobileCategoryList').innerHTML =
    [{ id: 'all', name: 'All Products' }, ...categories].map(c => `
      <button class="mobile-category-btn" data-category="${c.id}">
        ${c.name}
      </button>
    `).join('');

  document.getElementById('mobileCategoryList').addEventListener('click', e => {
    const btn = e.target.closest('.mobile-category-btn');
    if (!btn) return;
    currentCategory = btn.dataset.category;
    document.getElementById('mobileMenu').classList.remove('open');
    document.querySelectorAll('.category-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === currentCategory);
    });
    filterProducts();
  });

  // Checkout
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    const total = cart.reduce((s, c) => s + c.price_usd * c.qty, 0);
    alert(`Thank you for shopping on FATIC\n\nOrder Summary:\n${cart.map(c => `  ${c.name} x${c.qty} — $${formatPrice(c.price_usd * c.qty)}`).join('\n')}\n\nTotal: $${formatPrice(total)}\nShips from: China`);
  });

  // Close mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.getElementById('mobileMenu').classList.remove('open');
    }
  });

  // Hero countdown
  startCountdown();
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function startCountdown() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  function tick() {
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) {
      document.getElementById('countdown').textContent = '—';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('countdown').textContent =
      `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  tick();
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', init);
