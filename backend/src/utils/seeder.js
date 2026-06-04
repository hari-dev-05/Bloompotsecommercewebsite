import Product from '../models/Product.js';

const initialProducts = [
  {
    id: 1,
    name: 'Ceramic Garden Collection',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1777732785164-742f4609a95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Handcrafted ceramic pots perfect for your indoor garden. Available in multiple vibrant colors.',
    category: 'ceramic'
  },
  {
    id: 2,
    name: 'Artisan Pottery Set',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1767302866263-a6e374299781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Beautiful handmade pottery perfect for outdoor spaces. Weather-resistant and durable.',
    category: 'pottery'
  },
  {
    id: 3,
    name: 'Colorful Pot Stack',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1652898090487-b75769da25f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Set of colorful stackable pots ideal for herbs and small plants.',
    category: 'modern'
  },
  {
    id: 4,
    name: 'Garden Essentials',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1779357807367-d661cc51a362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Vibrant ceramic garden pots that add personality to any outdoor space.',
    category: 'ceramic'
  },
  {
    id: 5,
    name: 'Terracotta Planters',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1707248610556-371838a9206c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Classic terracotta planters with modern design. Perfect for succulents.',
    category: 'terracotta'
  },
  {
    id: 6,
    name: 'Artisan Display Pots',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1642339167154-ada929700e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Premium handcrafted display pots for your most precious plants.',
    category: 'pottery'
  },
  {
    id: 7,
    name: 'Rustic Wooden Pot',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1629420274099-c33a687185e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Charming wooden planter with natural finish, ideal for flowers.',
    category: 'wooden'
  },
  {
    id: 8,
    name: 'Modern Ceramic Bowls',
    price: 36.99,
    image: 'https://images.unsplash.com/photo-1723182815878-ab764d74ed12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Sleek modern ceramic bowls perfect for minimalist décor.',
    category: 'modern'
  }
];

export const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('No products found in database. Seeding default products...');
      await Product.insertMany(initialProducts);
      console.log('Database successfully seeded with default products!');
    } else {
      console.log(`Database already has ${count} products. Skipping seeding.`);
    }
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
  }
};
