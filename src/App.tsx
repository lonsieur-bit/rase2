import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import CustomBuildPage from './components/CustomBuildPage';
import SupportPage from './components/SupportPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import MyAccountPage from './components/MyAccountPage';
import { CartItem } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'الرئيسية', id: 'home' },
    { name: 'المنتجات', id: 'products' },
    { name: 'تجميع مخصص', id: 'custom' },
    { name: 'الدعم', id: 'support' },
    { name: 'حسابي', id: 'account' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} />;
      case 'products':
        return <ProductsPage addToCart={addToCart} />;
      case 'custom':
        return <CustomBuildPage onNavigate={setCurrentPage} />;
      case 'support':
        return <SupportPage onNavigate={setCurrentPage} />;
      case 'cart':
        return <CartPage 
          items={cartItems} 
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          onNavigate={setCurrentPage}
        />;
      case 'checkout':
        return <CheckoutPage items={cartItems} onNavigate={setCurrentPage} />;
      case 'account':
        return <MyAccountPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen text-white" dir="rtl" style={{ fontFamily: 'Almarai, sans-serif', backgroundColor: '#181918' }}>
      {/* Header */}
      <header className="backdrop-blur-sm border-b sticky top-0 z-50" style={{ backgroundColor: '#181918', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setCurrentPage('account')}
                className={`p-2 transition-colors duration-200 ${
                  currentPage === 'account'
                    ? 'animate-rgb-text'
                    : 'text-white hover:opacity-80'
                }`}
              >
                <User className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setCurrentPage('cart')}
                className="relative p-2 text-white hover:opacity-80 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#fe01ff' }}>
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:opacity-80 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`transition-colors duration-200 font-semibold ${
                    currentPage === item.id
                      ? 'animate-rgb-text'
                      : 'hover:text-white'
                  }`}
                  style={{ color: currentPage === item.id ? '' : 'white' }}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <img 
                src="/شعار logo برتقالي واسود بسيط بودكاست (1).png" 
                alt="KO Logo" 
                className="w-12 h-12 object-contain filter brightness-110 contrast-110"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex flex-col space-y-3 text-right">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left py-2 transition-colors duration-200 font-semibold ${
                      currentPage === item.id
                        ? 'animate-rgb-text'
                        : 'hover:text-white'
                    }`}
                    style={{ color: currentPage === item.id ? '' : 'white' }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 relative" style={{ backgroundColor: '#181918' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/شعار logo برتقالي واسود بسيط بودكاست (1).png" 
                  alt="KO Logo" 
                  className="w-10 h-10 mr-3 object-contain filter brightness-110 contrast-110"
                />
              </div>
              <p className="text-white text-sm opacity-80">
                متخصصون في بناء أجهزة الكمبيوتر المخصصة عالية الأداء للألعاب ومحطات العمل.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">المنتجات</h3>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors text-right">أجهزة الألعاب</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors text-right">محطات العمل</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors text-right">المكونات</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors text-right">الإكسسوارات</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">اتصل بنا</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">الضمان</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">الأسئلة الشائعة</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">مركز الدعم</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">الشركة</h3>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">من نحن</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">الوظائف</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">الصحافة</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition-colors text-right">التقييمات</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-white opacity-80 relative" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <p>&copy; 2024 KO - كي أو. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;