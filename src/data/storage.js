// ─── Sample seed data ───────────────────────────────────────────────────────

export const SAMPLE_FOOD_ITEMS = [
  {
    id: 'food_1',
    title: 'Fresh Organic Vegetables Pack',
    description: 'A variety of seasonal organic vegetables including carrots, spinach, tomatoes, and bell peppers. All freshly harvested from my garden.',
    category: 'vegetables',
    quantity: '5 kg',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Koramangala, Bangalore',
    donorId: 'user_2',
    donorName: 'Priya Sharma',
    donorAvatar: 'PS',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
    tags: ['organic', 'fresh', 'vegan'],
    postedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    servings: 10,
    isVeg: true,
  },
  {
    id: 'food_2',
    title: 'Home-cooked Biryani',
    description: 'Made too much biryani for a family gathering. Aromatic basmati rice with spices, available for pickup tonight.',
    category: 'cooked',
    quantity: '3 portions',
    expiryDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    location: 'HSR Layout, Bangalore',
    donorId: 'user_3',
    donorName: 'Rahul Mehta',
    donorAvatar: 'RM',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80',
    tags: ['cooked', 'spicy', 'vegetarian'],
    postedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    servings: 3,
    isVeg: true,
  },
  {
    id: 'food_3',
    title: 'Bakery Bread & Pastries',
    description: 'End of day surplus from our bakery. Fresh sourdough loaves, croissants, and Danish pastries. Best consumed today.',
    category: 'bakery',
    quantity: '12 pieces',
    expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    location: 'Indiranagar, Bangalore',
    donorId: 'user_4',
    donorName: 'Anita Bakery',
    donorAvatar: 'AB',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    tags: ['bakery', 'fresh', 'surplus'],
    postedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    servings: 12,
    isVeg: true,
  },
  {
    id: 'food_4',
    title: 'Mixed Fruit Basket',
    description: 'Assorted seasonal fruits: mangoes, bananas, apples, and oranges. Perfect for a family. Bought too many for the week.',
    category: 'fruits',
    quantity: '4 kg',
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Whitefield, Bangalore',
    donorId: 'user_5',
    donorName: 'Vikram Nair',
    donorAvatar: 'VN',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
    tags: ['fruits', 'fresh', 'healthy'],
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    servings: 8,
    isVeg: true,
  },
  {
    id: 'food_5',
    title: 'Restaurant Leftover Meals',
    description: 'Our restaurant prepared extra portions of paneer butter masala, dal tadka, and rice. Packed hygienically in containers.',
    category: 'cooked',
    quantity: '8 meals',
    expiryDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    location: 'MG Road, Bangalore',
    donorId: 'user_6',
    donorName: 'Spice Garden Restaurant',
    donorAvatar: 'SG',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
    tags: ['restaurant', 'cooked', 'Indian'],
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    servings: 8,
    isVeg: true,
  },
  {
    id: 'food_6',
    title: 'Dairy Products Bundle',
    description: 'Surplus dairy: 2L fresh milk, 500g paneer, and 1kg curd from our farm. All within expiry date. Pickup only.',
    category: 'dairy',
    quantity: 'Bundle',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Yelahanka, Bangalore',
    donorId: 'user_7',
    donorName: 'Green Farm Co.',
    donorAvatar: 'GF',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80',
    tags: ['dairy', 'farm-fresh', 'organic'],
    postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    servings: 6,
    isVeg: true,
  },
  {
    id: 'food_7',
    title: 'Party Food Surplus',
    description: 'Birthday party leftovers: sandwiches, pasta salad, mini quiches, and assorted snacks. All freshly made this morning.',
    category: 'snacks',
    quantity: 'Large quantity',
    expiryDate: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
    location: 'JP Nagar, Bangalore',
    donorId: 'user_8',
    donorName: 'Meera Krishnan',
    donorAvatar: 'MK',
    status: 'requested',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
    tags: ['party', 'snacks', 'assorted'],
    postedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    servings: 15,
    isVeg: false,
  },
  {
    id: 'food_8',
    title: 'Canned Goods & Non-perishables',
    description: 'Cleaning out my pantry: canned beans, chickpeas, tomatoes, pasta, rice packets. All within expiry dates.',
    category: 'grocery',
    quantity: '20 items',
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'BTM Layout, Bangalore',
    donorId: 'user_9',
    donorName: 'Suresh Patel',
    donorAvatar: 'SP',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80',
    tags: ['canned', 'pantry', 'non-perishable'],
    postedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    servings: 20,
    isVeg: true,
  },
];

export const SAMPLE_USERS = [
  {
    id: 'user_1',
    name: 'Alex Johnson',
    email: 'alex@foodshare.com',
    password: 'password123',
    role: 'donor',
    avatar: 'AJ',
    bio: 'Food enthusiast and sustainability advocate. Helping reduce food waste one meal at a time.',
    location: 'Koramangala, Bangalore',
    phone: '+91 98765 43210',
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    donationsCount: 12,
    requestsCount: 3,
    rating: 4.8,
    badges: ['Top Donor', 'Community Hero'],
  },
  {
    id: 'user_2',
    name: 'Rahul Mehta',
    email: 'rahul@foodshare.com',
    password: 'password123',
    role: 'user',
    avatar: 'RM',
    bio: 'Student looking to connect with donors.',
    location: 'BTM Layout, Bangalore',
    phone: '+91 80000 22222',
    joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    donationsCount: 0,
    requestsCount: 1,
    rating: 5.0,
    badges: ['New Member'],
  }
];

export const SAMPLE_REQUESTS = [
  {
    id: 'req_1',
    foodId: 'food_7',
    requesterId: 'user_1',
    requesterName: 'Alex Johnson',
    message: 'Would love to take these party leftovers. I have 5 kids at home!',
    status: 'pending',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

// ─── LocalStorage helpers ────────────────────────────────────────────────────

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};

// ─── Initialize seed data ────────────────────────────────────────────────────

export function initializeData() {
  const version = 'v2_roles';
  if (storage.get('foodshare_version') !== version) {
    storage.set('foodshare_users', SAMPLE_USERS);
    storage.set('foodshare_food_items', SAMPLE_FOOD_ITEMS);
    storage.set('foodshare_requests', SAMPLE_REQUESTS);
    storage.set('foodshare_version', version);
    storage.set('foodshare_initialized', true);
  }
}

// ─── Fake API with delay ─────────────────────────────────────────────────────

export const api = {
  delay: (ms = 700) => new Promise(resolve => setTimeout(resolve, ms)),

  // Auth
  login: async (email, password) => {
    await api.delay(800);
    const users = storage.get('foodshare_users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  register: async (userData) => {
    await api.delay(1000);
    const users = storage.get('foodshare_users') || [];
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      joinedAt: new Date().toISOString(),
      donationsCount: 0,
      requestsCount: 0,
      rating: 5.0,
      badges: ['New Member'],
    };
    users.push(newUser);
    storage.set('foodshare_users', users);
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  },

  // Food items
  getFoodItems: async (filters = {}) => {
    await api.delay(600);
    let items = storage.get('foodshare_food_items') || [];
    if (filters.category && filters.category !== 'all') {
      items = items.filter(i => i.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filters.status) {
      items = items.filter(i => i.status === filters.status);
    }
    if (filters.isVeg !== undefined) {
      items = items.filter(i => i.isVeg === filters.isVeg);
    }
    return items.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  },

  getFoodById: async (id) => {
    await api.delay(500);
    const items = storage.get('foodshare_food_items') || [];
    const item = items.find(i => i.id === id);
    if (!item) throw new Error('Food item not found');
    return item;
  },

  donateFood: async (foodData) => {
    await api.delay(1200);
    const items = storage.get('foodshare_food_items') || [];
    const newItem = {
      id: `food_${Date.now()}`,
      ...foodData,
      status: 'available',
      postedAt: new Date().toISOString(),
    };
    items.unshift(newItem);
    storage.set('foodshare_food_items', items);
    return newItem;
  },

  // Requests
  submitRequest: async (requestData) => {
    await api.delay(900);
    const requests = storage.get('foodshare_requests') || [];
    const newRequest = {
      id: `req_${Date.now()}`,
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    requests.push(newRequest);
    storage.set('foodshare_requests', requests);

    // Update food item status
    const items = storage.get('foodshare_food_items') || [];
    const idx = items.findIndex(i => i.id === requestData.foodId);
    if (idx !== -1) items[idx].status = 'requested';
    storage.set('foodshare_food_items', items);
    return newRequest;
  },

  getUserRequests: async (userId) => {
    await api.delay(600);
    const requests = storage.get('foodshare_requests') || [];
    return requests.filter(r => r.requesterId === userId);
  },

  getIncomingRequests: async (userId) => {
    await api.delay(600);
    const requests = storage.get('foodshare_requests') || [];
    const items = storage.get('foodshare_food_items') || [];
    
    // Find all food items owned by this user
    const myFoodIds = items.filter(i => i.donorId === userId).map(i => i.id);
    
    // Return requests that are for these food items
    return requests.filter(r => myFoodIds.includes(r.foodId));
  },

  updateRequestStatus: async (requestId, newStatus) => {
    await api.delay(600);
    const requests = storage.get('foodshare_requests') || [];
    const idx = requests.findIndex(r => r.id === requestId);
    if (idx !== -1) {
      requests[idx].status = newStatus;
      storage.set('foodshare_requests', requests);
      
      // If approved, mark food as completed
      if (newStatus === 'accepted') {
        const items = storage.get('foodshare_food_items') || [];
        const itemIdx = items.findIndex(i => i.id === requests[idx].foodId);
        if (itemIdx !== -1) {
          items[itemIdx].status = 'completed';
          storage.set('foodshare_food_items', items);
        }
      }
    }
    return requests[idx];
  },

  // Profile
  updateProfile: async (userId, updates) => {
    await api.delay(800);
    const users = storage.get('foodshare_users') || [];
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) throw new Error('User not found');
    users[idx] = { ...users[idx], ...updates };
    storage.set('foodshare_users', users);
    const { password: _, ...safeUser } = users[idx];
    return safeUser;
  },

  // Payment
  processPayment: async (paymentData) => {
    await api.delay(2000);
    if (paymentData.cardNumber.startsWith('0')) {
      throw new Error('Payment declined. Please check your card details.');
    }
    return {
      transactionId: `TXN${Date.now()}`,
      status: 'success',
      amount: paymentData.amount,
    };
  },
};
