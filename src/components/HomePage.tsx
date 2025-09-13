import React from 'react';
import { ArrowRight, Star, Shield, Truck, Headphones } from 'lucide-react';
import { products } from '../data/products';

interface HomePageProps {
  onNavigate: (page: string) => void;
  addToCart: (product: any) => void;
}

export default function HomePage({ onNavigate, addToCart }: HomePageProps) {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, #181918 0%, rgba(254, 1, 255, 0.1) 50%, #181918 100%)` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                اصنع جهازك
                <span className="block" style={{ color: '#fe01ff' }}>
                  المثالي
                </span>
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed opacity-90">
                اختبر أداء الألعاب الذي لا مثيل له مع أجهزة الكمبيوتر المخصصة لدينا.
                من التجميعات الاقتصادية إلى آلات الألعاب المثلى، نحن نغطي جميع احتياجاتك.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center hover:opacity-90"
                  style={{ backgroundColor: '#fe01ff' }}
                >
                  تسوق الآن
                  <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => onNavigate('custom')}
                  className="border-2 text-white hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                  style={{ borderColor: '#fe01ff', color: '#fe01ff', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fe01ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  تجميع مخصص
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
                alt="Gaming PC"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: 'rgba(24, 25, 24, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تختار KO؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "جودة متميزة",
                description: "فقط أعلى جودة من المكونات من العلامات التجارية الموثوقة"
              },
              {
                icon: Truck,
                title: "شحن مجاني",
                description: "شحن مجاني على جميع الطلبات التي تزيد عن 999 دولار"
              },
              {
                icon: Headphones,
                title: "دعم خبراء",
                description: "دعم فني على مدار الساعة من خبراء تجميع الكمبيوتر"
              },
              {
                icon: Star,
                title: "تقييمات 5 نجوم",
                description: "أكثر من 1000 عميل راضٍ ومتزايد"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg transition-colors duration-200 hover:opacity-90" style={{ backgroundColor: 'rgba(24, 25, 24, 0.7)' }}>
                <feature.icon className="w-12 h-12 mx-auto mb-4" style={{ color: '#fe01ff' }} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أجهزة الألعاب المميزة</h2>
            <p className="text-white opacity-80 text-lg">أنظمة مختارة بعناية لكل ميزانية واحتياج أداء</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#181918', boxShadow: '0 25px 50px -12px rgba(254, 1, 255, 0.25)' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} style={{ color: '#fe01ff' }} />
                      ))}
                    </div>
                    <span className="text-white opacity-70 text-sm ml-2">({product.reviews})</span>
                  </div>
                  <div className="space-y-1 text-sm text-white opacity-80 mb-4">
                    <div><span className="text-white">المعالج:</span> {product.specs.cpu}</div>
                    <div><span className="text-white">كرت الرسوميات:</span> {product.specs.gpu}</div>
                    <div><span className="text-white">الذاكرة:</span> {product.specs.ram}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: '#fe01ff' }}>{product.price.toLocaleString()} ر.س</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-90"
                      style={{ backgroundColor: '#fe01ff' }}
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onNavigate('products')}
              className="text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:opacity-90"
              style={{ backgroundColor: '#fe01ff' }}
            >
              عرض جميع المنتجات
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}