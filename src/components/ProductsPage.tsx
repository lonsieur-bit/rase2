import React, { useState } from 'react';
import { Star, Filter, Search } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';

interface ProductsPageProps {
  addToCart: (product: Product) => void;
}

export default function ProductsPage({ addToCart }: ProductsPageProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['الكل', 'ألعاب', 'محطة عمل', 'مدمج'];
  const sortOptions = [
    { value: 'name', label: 'الاسم' },
    { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
    { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
    { value: 'rating', label: 'التقييم' }
  ];

  const handleFilter = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'الكل') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  React.useEffect(() => {
    handleFilter();
  }, [selectedCategory, sortBy, searchTerm]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">أجهزة الألعاب ومحطات العمل</h1>
          <p className="text-white opacity-80 text-lg">اكتشف مجموعتنا الكاملة من الأنظمة عالية الأداء</p>
        </div>

        {/* Search and Filters */}
        <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#181918' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1" dir="ltr">
              <Search className="absolute left-3 top-3 w-5 h-5 text-white opacity-60" />
              <input
                type="text"
                placeholder="البحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none text-right"
                style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                dir="rtl"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden text-white px-4 py-3 rounded-lg flex items-center hover:opacity-90"
              style={{ backgroundColor: '#fe01ff' }}
            >
              <Filter className="w-5 h-5 mr-2" />
              الفلاتر
            </button>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'flex' : 'hidden lg:flex'} flex-col lg:flex-row gap-4 w-full lg:w-auto`}>
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border rounded-lg text-white focus:outline-none"
                style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border rounded-lg text-white focus:outline-none"
                style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white opacity-80">
            عرض {filteredProducts.length} من {products.length} منتج
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#181918', boxShadow: '0 25px 50px -12px rgba(254, 1, 255, 0.25)' }}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} style={{ color: '#fe01ff' }} />
                    ))}
                  </div>
                  <span className="text-white opacity-70 text-sm ml-2">({product.reviews} reviews)</span>
                </div>

                {/* Specs */}
                <div className="space-y-1 text-sm text-white opacity-80 mb-4">
                  <div><span className="text-white">المعالج:</span> {product.specs.cpu}</div>
                  <div><span className="text-white">كرت الرسوميات:</span> {product.specs.gpu}</div>
                  <div><span className="text-white">الذاكرة:</span> {product.specs.ram}</div>
                  <div><span className="text-white">التخزين:</span> {product.specs.storage}</div>
                </div>

                {/* Description */}
                <p className="text-white opacity-80 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: 'rgba(254, 1, 255, 0.2)', color: '#fe01ff' }}>
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: '#fe01ff' }}>
                    {product.price.toLocaleString()} ر.س
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 hover:opacity-90"
                    style={{ backgroundColor: '#fe01ff' }}
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white opacity-80 text-lg">لم يتم العثور على منتجات تطابق معاييرك.</p>
            <button
              onClick={() => {
                setSelectedCategory('الكل');
                setSortBy('name');
                setSearchTerm('');
              }}
              className="mt-4 text-white px-6 py-2 rounded-lg transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: '#fe01ff' }}
            >
              مسح الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}