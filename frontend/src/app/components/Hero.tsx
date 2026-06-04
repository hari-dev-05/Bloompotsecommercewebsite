import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-green-50 via-beige-50 to-white py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Bring Life to Your Space with <span className="text-green-600">Bloom Pots</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover our curated collection of handcrafted ceramic pots designed to complement your plants and elevate your home décor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg text-center"
              >
                Shop Now
              </a>
              <a
                href="#about"
                className="bg-white text-green-600 px-8 py-3 rounded-full border-2 border-green-600 hover:bg-green-50 transition-all text-center"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1777732785164-742f4609a95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Colorful flower pots"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl">
              <p className="text-sm text-gray-600">Premium Quality</p>
              <p className="text-2xl font-bold text-green-600">500+ Designs</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-green-200 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-beige-200 rounded-full opacity-30 blur-2xl"></div>
    </section>
  );
}
