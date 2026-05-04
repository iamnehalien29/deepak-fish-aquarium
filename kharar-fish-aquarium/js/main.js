// ===== BUBBLES =====
function createBubbles() {
  const container = document.querySelector('.bubbles-container');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 40 + 10;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = Math.random() * 10 + 8 + 's';
    bubble.style.animationDelay = Math.random() * 8 + 's';
    container.appendChild(bubble);
  }
}

// ===== NAVBAR SCROLL =====
function handleNavScroll() {
  const nav = document.querySelector('.navbar-custom');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ===== SMOOTH NAV CLOSE ON MOBILE =====
function handleMobileNav() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.nav-cta)');
  const collapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

// ===== CART SYSTEM =====
const cart = {
  items: [],
  addItem(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.render();
    this.showToast(product.name);
  },
  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.render();
  },
  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.removeItem(id);
    else this.render();
  },
  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  render() {
    const container = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');
    const emptyEl = document.getElementById('cart-empty');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!container) return;
    const totalItems = this.items.reduce((s, i) => s + i.qty, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
    
    if (this.items.length === 0) {
      container.innerHTML = '';
      emptyEl.style.display = 'block';
      totalEl.style.display = 'none';
      checkoutBtn.style.display = 'none';
      return;
    }
    
    emptyEl.style.display = 'none';
    totalEl.style.display = 'block';
    checkoutBtn.style.display = 'block';
    
    container.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h6>${item.name}</h6>
          <span class="cart-item-price">₹${item.price}</span>
          <div class="cart-qty mt-2">
            <button onclick="cart.updateQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="cart.updateQty('${item.id}', 1)">+</button>
            <button onclick="cart.removeItem('${item.id}')" style="background:rgba(255,107,107,0.2);border-color:var(--coral);color:var(--coral);margin-left:auto;"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    `).join('');
    
    const total = this.getTotal();
    totalEl.innerHTML = `
      <div class="total-row"><span>Subtotal</span><span>₹${total}</span></div>
      <div class="total-row grand-total"><span>Total</span><span>₹${total}</span></div>
    `;
  },
  showToast(name) {
    const toastEl = document.getElementById('cart-toast');
    if (!toastEl) return;
    toastEl.querySelector('.item-name').textContent = name;
    const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
    toast.show();
  },
  checkout() {
    if (this.items.length === 0) return;
    let msg = '🛒 *Order from Deepak Fish Aquarium Website*\n\n';
    this.items.forEach(i => {
      msg += `• ${i.name} x${i.qty} — ₹${i.price * i.qty}\n`;
    });
    msg += `\n*Total: ₹${this.getTotal()}*`;
    const url = `https://wa.me/910000000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
};

// ===== ADD TO CART BUTTONS =====
function initCartButtons() {
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price)
      };
      cart.addItem(product);
    });
  });
}

// ===== CONTACT FORM -> WHATSAPP =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const phone = document.getElementById('cf-phone').value;
    const interest = document.getElementById('cf-interest').value;
    const message = document.getElementById('cf-message').value;
    
    let msg = `🐠 *New Inquiry — Deepak Fish Aquarium*\n\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Phone:* ${phone}\n`;
    msg += `*Interest:* ${interest}\n`;
    msg += `*Message:* ${message}`;
    
    const url = `https://wa.me/910000000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    form.reset();
  });
}

// ===== LIGHTBOX =====
function initLightbox() {
  const overlay = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      lbImg.src = src;
      overlay.classList.add('active');
    });
  });
  if (overlay) {
    overlay.addEventListener('click', () => overlay.classList.remove('active'));
  }
}

// ===== STORE STATUS =====
function updateStoreStatus() {
  const el = document.getElementById('store-status');
  if (!el) return;
  const now = new Date();
  const h = now.getHours();
  if (h >= 9 && h < 21) {
    el.innerHTML = '<span class="dot"></span> Open Now';
    el.className = 'status-open';
  } else {
    el.innerHTML = '🔴 Closed — Opens at 9 AM';
    el.className = 'status-open';
    el.style.background = 'rgba(255,107,107,0.15)';
    el.style.borderColor = 'rgba(255,107,107,0.3)';
    el.style.color = '#ff6b6b';
  }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          counter.textContent = current + suffix;
        }, 25);
        observer.unobserve(counter);
      }
    }, { threshold: 0.5 });
    observer.observe(counter);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  createBubbles();
  handleNavScroll();
  handleScrollAnimations();
  handleMobileNav();
  initCartButtons();
  initContactForm();
  initLightbox();
  updateStoreStatus();
  animateCounters();
  cart.render();
});
