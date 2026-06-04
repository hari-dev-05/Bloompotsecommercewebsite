import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User as UserIcon, LogOut } from 'lucide-react';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Load session from localStorage on mount
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: { email: string; token: string }) => {
    setCurrentUser({ email: userData.email });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-700">🌿 Bloom Pots</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
            <a href="#products" className="text-gray-700 hover:text-green-600 transition-colors">Products</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#testimonials" className="text-gray-700 hover:text-green-600 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
          </div>

          {/* Icons & Session Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-green-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="relative text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:text-green-750 hover:border-green-300 transition-all font-semibold text-sm bg-gray-50 hover:bg-green-50/50"
                >
                  <UserIcon size={16} className="text-green-600" />
                  <span className="max-w-[120px] truncate">{currentUser.email.split('@')[0]}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-650 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-all font-bold text-sm shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">Home</a>
            <a href="#products" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">Products</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">About</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md">Contact</a>

            <div className="border-t border-gray-100 pt-2.5 mt-2 px-3">
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 py-1">
                    <UserIcon size={18} className="text-green-600" />
                    <span className="text-sm font-semibold text-gray-800 truncate">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2 hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-center text-sm shadow-md"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Glassmorphic Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </nav>
  );
}
