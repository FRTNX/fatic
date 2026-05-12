const EXCHANGE_RATE = 7.25;

const suppliers = {
  aliexpress: { name: 'AliExpress', color: '#FF4747', icon: 'AE' },
  temu: { name: 'Temu', color: '#E3202A', icon: 'TM' },
  shein: { name: 'SHEIN', color: '#00C853', icon: 'SH' },
  banggood: { name: 'Banggood', color: '#FF6A00', icon: 'BG' },
  gearbest: { name: 'Gearbest', color: '#1A73E8', icon: 'GB' }
};

const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home-garden', name: 'Home & Garden' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'sports', name: 'Sports & Outdoors' },
  { id: 'automotive', name: 'Automotive' },
  { id: 'toys', name: 'Toys & Games' },
  { id: 'phones-tablets', name: 'Phones & Tablets' }
];

function generatePlaceholder(name, category) {
  const palette = {
    'electronics':     { g: ['#0F1A2E', '#1A3050'], accent: '#4A80C0', letter: 'E' },
    'fashion':         { g: ['#2E0F1A', '#501A30'], accent: '#C04A80', letter: 'F' },
    'home-garden':     { g: ['#0F2E1A', '#1A5030'], accent: '#4AC080', letter: 'H' },
    'beauty':          { g: ['#2E0F24', '#501A3A'], accent: '#C04A8A', letter: 'B' },
    'sports':          { g: ['#2E1A0F', '#50301A'], accent: '#C0804A', letter: 'S' },
    'automotive':      { g: ['#0F1A2E', '#1A2A4A'], accent: '#4A6AC0', letter: 'A' },
    'toys':            { g: ['#2E2A0F', '#50441A'], accent: '#C0B04A', letter: 'T' },
    'phones-tablets':  { g: ['#0F2E2E', '#1A4A4A'], accent: '#4AC0C0', letter: 'P' }
  };

  const p = palette[category] || palette['electronics'];
  const [c1, c2] = p.g;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#g)"/>
    <circle cx="200" cy="200" r="95" fill="none" stroke="${p.accent}" stroke-opacity="0.15" stroke-width="1"/>
    <circle cx="200" cy="200" r="105" fill="none" stroke="${p.accent}" stroke-opacity="0.08" stroke-width="0.5"/>
    <line x1="80" y1="80" x2="320" y2="320" stroke="${p.accent}" stroke-opacity="0.04" stroke-width="1"/>
    <line x1="320" y1="80" x2="80" y2="320" stroke="${p.accent}" stroke-opacity="0.04" stroke-width="1"/>
    <rect x="148" y="148" width="104" height="104" rx="4" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" transform="rotate(45 200 200)"/>
    <text x="200" y="216" text-anchor="middle" fill="white" font-family="Georgia, serif" font-size="110" font-weight="700" opacity="0.12">${p.letter}</text>
    <text x="200" y="375" text-anchor="middle" fill="white" font-family="sans-serif" font-size="11" font-weight="600" opacity="0.15" letter-spacing="3">FATIC</text>
  </svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const productTemplates = [
  { name: 'Wireless Bluetooth Earbuds Pro', price_cny: 289, category: 'electronics', supplier: 'aliexpress', rating: 4.5, reviews: 12843, freeShipping: true, badge: 'Best Seller' },
  { name: 'Smart Fitness Tracker Watch', price_cny: 459, category: 'electronics', supplier: 'banggood', rating: 4.3, reviews: 8921, freeShipping: true, badge: 'Hot' },
  { name: 'Portable Bluetooth Speaker', price_cny: 199, category: 'electronics', supplier: 'gearbest', rating: 4.2, reviews: 5678, freeShipping: true, badge: null },
  { name: 'USB-C Fast Charger 65W', price_cny: 149, category: 'electronics', supplier: 'aliexpress', rating: 4.6, reviews: 23456, freeShipping: true, badge: 'Top Rated' },
  { name: 'Wireless Charging Pad 3-in-1', price_cny: 259, category: 'electronics', supplier: 'temu', rating: 4.1, reviews: 3456, freeShipping: false, badge: null },
  { name: 'Noise Cancelling Headphones', price_cny: 699, category: 'electronics', supplier: 'banggood', rating: 4.7, reviews: 15678, freeShipping: true, badge: 'Best Seller' },
  { name: 'Mini Projector 4K Support', price_cny: 1299, category: 'electronics', supplier: 'aliexpress', rating: 4.4, reviews: 4521, freeShipping: true, badge: 'Deal' },
  { name: 'Smart Home Security Camera', price_cny: 349, category: 'electronics', supplier: 'gearbest', rating: 4.3, reviews: 7890, freeShipping: true, badge: null },

  { name: 'Casual Linen Shirt Men', price_cny: 189, category: 'fashion', supplier: 'shein', rating: 4.2, reviews: 23456, freeShipping: true, badge: 'Trending' },
  { name: 'Women Summer Dress Floral', price_cny: 259, category: 'fashion', supplier: 'shein', rating: 4.4, reviews: 34567, freeShipping: true, badge: 'Best Seller' },
  { name: 'Premium Cotton T-Shirt Pack', price_cny: 149, category: 'fashion', supplier: 'temu', rating: 4.0, reviews: 45678, freeShipping: true, badge: null },
  { name: 'Designer Sunglasses UV400', price_cny: 129, category: 'fashion', supplier: 'aliexpress', rating: 4.3, reviews: 18901, freeShipping: false, badge: null },
  { name: 'Leather Crossbody Bag', price_cny: 399, category: 'fashion', supplier: 'shein', rating: 4.5, reviews: 12345, freeShipping: true, badge: 'Hot' },
  { name: 'Sneakers Running Shoes Men', price_cny: 459, category: 'fashion', supplier: 'banggood', rating: 4.3, reviews: 9876, freeShipping: true, badge: null },
  { name: 'Silk Scarf Premium Quality', price_cny: 179, category: 'fashion', supplier: 'shein', rating: 4.6, reviews: 7890, freeShipping: false, badge: 'Luxury' },
  { name: 'Winter Hoodie Heavyweight', price_cny: 329, category: 'fashion', supplier: 'temu', rating: 4.1, reviews: 21345, freeShipping: true, badge: null },

  { name: 'LED Desk Lamp Touch Control', price_cny: 179, category: 'home-garden', supplier: 'aliexpress', rating: 4.4, reviews: 15678, freeShipping: true, badge: 'Best Seller' },
  { name: 'Robot Vacuum Cleaner Smart', price_cny: 1599, category: 'home-garden', supplier: 'banggood', rating: 4.5, reviews: 6789, freeShipping: true, badge: 'Deal' },
  { name: 'Bamboo Cutting Board Set', price_cny: 139, category: 'home-garden', supplier: 'temu', rating: 4.2, reviews: 23456, freeShipping: true, badge: null },
  { name: 'Aromatherapy Oil Diffuser', price_cny: 219, category: 'home-garden', supplier: 'gearbest', rating: 4.3, reviews: 11234, freeShipping: false, badge: 'Top Rated' },
  { name: 'Smart Self-Watering Plant Pot', price_cny: 99, category: 'home-garden', supplier: 'aliexpress', rating: 4.0, reviews: 8765, freeShipping: true, badge: null },
  { name: 'Foldable Storage Box 4-Pack', price_cny: 169, category: 'home-garden', supplier: 'shein', rating: 4.1, reviews: 34567, freeShipping: true, badge: 'Value' },
  { name: 'Electric Kettle 1.7L', price_cny: 199, category: 'home-garden', supplier: 'banggood', rating: 4.4, reviews: 19876, freeShipping: true, badge: null },
  { name: 'Smart LED Light Strip 10m', price_cny: 129, category: 'home-garden', supplier: 'temu', rating: 4.2, reviews: 56789, freeShipping: true, badge: 'Hot' },

  { name: 'Professional Hair Dryer 1800W', price_cny: 389, category: 'beauty', supplier: 'banggood', rating: 4.4, reviews: 12345, freeShipping: true, badge: null },
  { name: 'Vitamin C Serum Anti-Aging', price_cny: 99, category: 'beauty', supplier: 'shein', rating: 4.3, reviews: 45678, freeShipping: true, badge: 'Best Seller' },
  { name: 'Electric Facial Cleanser Brush', price_cny: 159, category: 'beauty', supplier: 'aliexpress', rating: 4.1, reviews: 23456, freeShipping: false, badge: null },
  { name: 'Makeup Organizer Storage Case', price_cny: 139, category: 'beauty', supplier: 'temu', rating: 4.5, reviews: 34567, freeShipping: true, badge: 'Top Rated' },
  { name: 'Natural Retinol Moisturizer 50ml', price_cny: 179, category: 'beauty', supplier: 'shein', rating: 4.6, reviews: 19876, freeShipping: true, badge: null },
  { name: 'LED Facial Mask Light Therapy', price_cny: 599, category: 'beauty', supplier: 'gearbest', rating: 4.2, reviews: 5678, freeShipping: true, badge: 'Trending' },
  { name: 'Electric Nail Drill Set', price_cny: 219, category: 'beauty', supplier: 'banggood', rating: 4.0, reviews: 1234, freeShipping: false, badge: null },
  { name: 'Japanese Rice Toner 200ml', price_cny: 89, category: 'beauty', supplier: 'shein', rating: 4.4, reviews: 12345, freeShipping: true, badge: 'Value' },

  { name: 'Yoga Mat Premium Non-Slip 6mm', price_cny: 189, category: 'sports', supplier: 'aliexpress', rating: 4.4, reviews: 34567, freeShipping: true, badge: 'Best Seller' },
  { name: 'Resistance Bands Set 5-Pack', price_cny: 79, category: 'sports', supplier: 'temu', rating: 4.2, reviews: 45678, freeShipping: true, badge: null },
  { name: 'Electric Scooter Foldable', price_cny: 2499, category: 'sports', supplier: 'banggood', rating: 4.3, reviews: 4567, freeShipping: true, badge: 'Deal' },
  { name: 'Camping Tent 4-Person Waterproof', price_cny: 899, category: 'sports', supplier: 'gearbest', rating: 4.1, reviews: 2345, freeShipping: true, badge: null },
  { name: 'Adjustable Dumbbells 20kg Set', price_cny: 799, category: 'sports', supplier: 'aliexpress', rating: 4.5, reviews: 12345, freeShipping: true, badge: 'Top Rated' },
  { name: 'Hiking Backpack 50L Waterproof', price_cny: 359, category: 'sports', supplier: 'banggood', rating: 4.3, reviews: 6789, freeShipping: true, badge: null },
  { name: 'Jump Rope Speed Cable Bearing', price_cny: 49, category: 'sports', supplier: 'temu', rating: 4.0, reviews: 56789, freeShipping: true, badge: 'Value' },
  { name: 'Fitness Tracker Smart Band', price_cny: 259, category: 'sports', supplier: 'gearbest', rating: 4.2, reviews: 21098, freeShipping: true, badge: null },

  { name: 'Dash Cam 4K WiFi', price_cny: 599, category: 'automotive', supplier: 'aliexpress', rating: 4.5, reviews: 12345, freeShipping: true, badge: 'Best Seller' },
  { name: 'Car Phone Holder Magnetic', price_cny: 89, category: 'automotive', supplier: 'temu', rating: 4.3, reviews: 67890, freeShipping: true, badge: null },
  { name: 'LED Car Interior Strip Lights', price_cny: 129, category: 'automotive', supplier: 'gearbest', rating: 4.1, reviews: 23456, freeShipping: true, badge: 'Hot' },
  { name: 'Portable Tire Inflator Pump', price_cny: 299, category: 'automotive', supplier: 'banggood', rating: 4.4, reviews: 8765, freeShipping: true, badge: null },
  { name: 'Car Vacuum Cleaner Handheld', price_cny: 249, category: 'automotive', supplier: 'aliexpress', rating: 4.2, reviews: 12345, freeShipping: false, badge: null },
  { name: 'Wireless Carplay Adapter', price_cny: 459, category: 'automotive', supplier: 'banggood', rating: 4.3, reviews: 5678, freeShipping: true, badge: 'Trending' },
  { name: 'Seat Cushion Massage Car', price_cny: 349, category: 'automotive', supplier: 'temu', rating: 4.0, reviews: 3456, freeShipping: true, badge: null },
  { name: 'Solar Car Charger Maintainer', price_cny: 399, category: 'automotive', supplier: 'gearbest', rating: 4.1, reviews: 2345, freeShipping: false, badge: null },

  { name: 'Remote Control Drone 4K Camera', price_cny: 899, category: 'toys', supplier: 'banggood', rating: 4.4, reviews: 6789, freeShipping: true, badge: 'Hot' },
  { name: 'Building Blocks Space Station', price_cny: 259, category: 'toys', supplier: 'aliexpress', rating: 4.6, reviews: 12345, freeShipping: true, badge: 'Best Seller' },
  { name: 'RC Racing Car 4WD 30km/h', price_cny: 459, category: 'toys', supplier: 'temu', rating: 4.2, reviews: 5678, freeShipping: true, badge: null },
  { name: 'Board Game Strategy Collection', price_cny: 189, category: 'toys', supplier: 'shein', rating: 4.3, reviews: 3456, freeShipping: false, badge: null },
  { name: 'Stuffed Animal Plush Giant 1m', price_cny: 329, category: 'toys', supplier: 'temu', rating: 4.5, reviews: 23456, freeShipping: true, badge: 'Trending' },
  { name: 'Water Gun Electric Automatic', price_cny: 149, category: 'toys', supplier: 'aliexpress', rating: 4.1, reviews: 12345, freeShipping: true, badge: null },
  { name: 'Rubik Cube Speed Puzzle 3x3', price_cny: 39, category: 'toys', supplier: 'gearbest', rating: 4.4, reviews: 45678, freeShipping: true, badge: 'Value' },
  { name: 'Kids Telescope Astronomical', price_cny: 499, category: 'toys', supplier: 'banggood', rating: 4.3, reviews: 2345, freeShipping: true, badge: null },

  { name: 'Smartphone Android 14 6.8" 256GB', price_cny: 1899, category: 'phones-tablets', supplier: 'aliexpress', rating: 4.3, reviews: 23456, freeShipping: true, badge: 'Hot' },
  { name: 'Tablet 11" 2K Display 8GB RAM', price_cny: 1299, category: 'phones-tablets', supplier: 'banggood', rating: 4.4, reviews: 12345, freeShipping: true, badge: 'Best Seller' },
  { name: 'Wireless Earbuds Air Pro', price_cny: 399, category: 'phones-tablets', supplier: 'gearbest', rating: 4.5, reviews: 34567, freeShipping: true, badge: 'Top Rated' },
  { name: 'Smart Watch Ultra GPS', price_cny: 799, category: 'phones-tablets', supplier: 'aliexpress', rating: 4.6, reviews: 9876, freeShipping: true, badge: null },
  { name: 'Power Bank 30000mAh Fast Charge', price_cny: 299, category: 'phones-tablets', supplier: 'temu', rating: 4.2, reviews: 56789, freeShipping: true, badge: 'Value' },
  { name: 'Phone Gimbal Stabilizer', price_cny: 459, category: 'phones-tablets', supplier: 'banggood', rating: 4.3, reviews: 4567, freeShipping: true, badge: null },
  { name: 'Bluetooth Earbuds Sports', price_cny: 179, category: 'phones-tablets', supplier: 'shein', rating: 4.1, reviews: 23456, freeShipping: true, badge: null },
  { name: 'Tablet Stand Adjustable Aluminum', price_cny: 99, category: 'phones-tablets', supplier: 'aliexpress', rating: 4.4, reviews: 34567, freeShipping: true, badge: null }
];

function cnyToUsd(cny) {
  return cny / EXCHANGE_RATE;
}

function formatPrice(usd) {
  return usd.toFixed(2);
}

function buildProducts() {
  return productTemplates.map((t, index) => ({
    id: index + 1,
    ...t,
    price_usd: cnyToUsd(t.price_cny),
    image: generatePlaceholder(t.name, t.category),
    supplier: { ...suppliers[t.supplier] }
  }));
}

const products = buildProducts();
