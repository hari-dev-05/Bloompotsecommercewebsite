import { motion } from 'motion/react';
import { Leaf, Award, Truck } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: <Leaf className="text-green-600" size={32} />,
      title: 'Eco-Friendly',
      description: 'All our pots are made from sustainable materials with minimal environmental impact.'
    },
    {
      icon: <Award className="text-green-600" size={32} />,
      title: 'Premium Quality',
      description: 'Handcrafted by skilled artisans, each pot is inspected for quality and durability.'
    },
    {
      icon: <Truck className="text-green-600" size={32} />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders over $50 with careful packaging guaranteed.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Bloom Pots</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2020, Bloom Pots is your trusted destination for premium, handcrafted flower pots and planters. We believe that every plant deserves a beautiful home, and every space deserves the touch of nature.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our collection features carefully curated designs from talented artisans around the world. From modern minimalist ceramics to rustic terracotta classics, we have the perfect pot for every plant and every style.
            </p>

            {/* Features Grid */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-green-50 p-3 rounded-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1666256748107-e9202ee54aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="About Bloom Pots"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl shadow-xl">
              <p className="text-4xl font-bold">5+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
