window.NirogyamProducts = [
  { id: 'nirothyro', name: 'NiroThyro', category: 'thyroid', price: 649, oldPrice: 899, rating: 4.5, count: 128, discount: '28% OFF', icon: 'fa-bolt', image: 'https://picsum.photos/seed/nirothyro3/400/300', short: 'Balances thyroid function and supports healthy metabolism.', tag: 'Thyroid Support', details: 'NiroThyro is crafted to support thyroid function, metabolism, and everyday energy with a focused Ayurvedic wellness blend.' },
  { id: 'niroheart', name: 'NiroHeart', category: 'heart', price: 749, oldPrice: 999, rating: 4.7, count: 214, discount: '25% OFF', icon: 'fa-heart-pulse', image: 'https://picsum.photos/seed/niroheart3/400/300', short: 'Supports healthy circulation and cardiovascular wellness.', tag: 'Heart Care', details: 'NiroHeart supports healthy circulation and cardiovascular wellness as part of a balanced daily routine.' },
  { id: 'nirojoint', name: 'NiroJoint', category: 'joint', price: 599, oldPrice: 849, rating: 4.3, count: 98, discount: '29% OFF', icon: 'fa-bone', image: 'https://picsum.photos/seed/nirojoint3/400/300', short: 'Eases stiffness and supports joint flexibility.', tag: 'Joint Care', details: 'NiroJoint is designed to support joint comfort, mobility, and flexibility for active everyday living.' },
  { id: 'nirokidney', name: 'NiroKidney', category: 'kidney', price: 699, oldPrice: 949, rating: 4.6, count: 156, discount: '26% OFF', icon: 'fa-droplet', image: 'https://picsum.photos/seed/nirokidney3/400/300', short: 'Supports kidney function and natural detox.', tag: 'Kidney Detox', details: 'NiroKidney supports kidney wellness and natural detox pathways with a traditional herbal care approach.' },
  { id: 'niropcos-care', name: 'NiroPCOS Care', category: 'women', price: 799, oldPrice: 1099, rating: 4.8, count: 302, discount: '27% OFF', icon: 'fa-venus', image: 'https://picsum.photos/seed/niropcos3/400/300', short: 'Helps restore hormonal balance for PCOS/PCOD.', tag: 'Women Health', details: 'NiroPCOS Care supports women health and hormonal balance with Ayurvedic ingredients selected for daily wellness.' },
  { id: 'niropile', name: 'NiroPile', category: 'digestive', price: 549, oldPrice: 799, rating: 4.2, count: 76, discount: '31% OFF', icon: 'fa-band-aid', image: 'https://picsum.photos/seed/niropile3/400/300', short: 'Relief and digestive comfort for piles.', tag: 'Digestive Care', details: 'NiroPile is made to support digestive comfort and relief-focused daily care.' },
  { id: 'nirostamina', name: 'NiroStamina', category: 'energy', price: 699, oldPrice: 949, rating: 4.4, count: 189, discount: '26% OFF', icon: 'fa-bolt-lightning', image: 'https://picsum.photos/seed/nirostamina3/400/300', short: 'Boosts energy, vitality and everyday endurance.', tag: 'Energy Support', details: 'NiroStamina supports vitality, stamina, and everyday endurance with a natural wellness formulation.' },
  { id: 'nirosugar', name: 'NiroSugar', category: 'sugar', price: 749, oldPrice: 999, rating: 4.6, count: 143, discount: '25% OFF', icon: 'fa-vial', image: 'https://picsum.photos/seed/nirosugar3/400/300', short: 'Supports healthy, balanced blood sugar levels.', tag: 'Blood Sugar', details: 'NiroSugar supports balanced blood sugar wellness as part of a healthy diet and lifestyle.' },
  { id: 'nova-plus', name: 'Nova Plus', category: 'energy', price: 2499, oldPrice: 2999, rating: 4.9, count: 327, discount: '17% OFF', icon: 'fa-leaf', image: 'https://www.nirogyamwellness.com/Images/nova%201.png', gallery: ['https://www.nirogyamwellness.com/Images/nova%201.png', 'https://www.nirogyamwellness.com/Images/nova%202.png', 'https://www.nirogyamwellness.com/Images/nova%203.png'], short: 'A 28-herb infusion for energy, immunity, digestion and everyday wellness.', tag: 'Herbal Infusion', details: 'Nova Plus is a distinctive herbal infusion featuring a carefully curated blend of 28 herbs. This expertly crafted fusion delivers a refreshing and invigorating experience with each sip.' }
];

window.NirogyamProductUtils = {
  productUrl: function (product) {
    return 'nova-plus.html?product=' + encodeURIComponent(product.id);
  },
  find: function (id) {
    var products = window.NirogyamProducts || [];
    return products.find(function (product) { return product.id === id; }) || products.find(function (product) { return product.id === 'nova-plus'; }) || products[0];
  },
  money: function (amount) {
    return '&#8377;' + amount;
  }
};
