import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Search } from 'lucide-react';

const fallbackProducts = [
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

const categories = ['all', 'ceramic', 'pottery', 'modern', 'terracotta', 'wooden'];

export function ProductGrid() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProductsList(data);
        } else {
          console.warn('Backend products fetch failed, using fallback static list');
          setProductsList(fallbackProducts);
        }
      } catch (err) {
        console.error('Error fetching products from backend:', err);
        setProductsList(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Collection</h2>
          <p className="text-lg text-gray-600">Explore our handpicked selection of premium flower pots</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for pots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid or Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading products from database...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
