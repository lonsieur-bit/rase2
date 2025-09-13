import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  items: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  onNavigate: (page: string) => void;
}

export default function CartPage({ items, removeFromCart, updateQuantity, onNavigate }: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 49.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6" style={{ color: '#fe01ff' }} />
          <h2 className="text-3xl font-bold mb-4">سلتك فارغة</h2>
          <p className="text-white opacity-80 mb-8">ابدأ ببناء إعداد الألعاب المثالي اليوم!</p>
          <button
            onClick={() => onNavigate('products')}
            className="text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: '#fe01ff' }}
          >
            تسوق المنتجات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center text-white hover:opacity-80 transition-colors duration-200 mb-4 flex-row-reverse"
            style={{ color: '#fe01ff' }}
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            متابعة التسوق
          </button>
          <h1 className="text-4xl font-bold">سلة التسوق</h1>
          <p className="text-white opacity-80 mt-2">{items.length} منتج في سلتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="rounded-xl p-6" style={{ backgroundColor: '#181918' }}>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <div className="space-y-1 text-sm text-white opacity-80 mb-4">
                        <div>المعالج: {item.specs.cpu}</div>
                        <div>كرت الرسوميات: {item.specs.gpu}</div>
                        <div>الذاكرة: {item.specs.ram}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: 'rgba(254, 1, 255, 0.2)', color: '#fe01ff' }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quantity and Price */}
                    <div className="flex flex-col items-end space-y-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hover:opacity-80 transition-colors duration-200"
                        style={{ color: '#fe01ff' }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
                          style={{ backgroundColor: '#181918', border: '1px solid #fe01ff' }}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
                          style={{ backgroundColor: '#181918', border: '1px solid #fe01ff' }}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: '#fe01ff' }}>
                          {(item.price * item.quantity).toLocaleString()} ر.س
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-white opacity-70">
                            {item.price.toLocaleString()} ر.س للقطعة
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 sticky top-24" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white opacity-80">المجموع الفرعي</span>
                  <span className="font-semibold">{subtotal.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-80">
                    الشحن
                    {subtotal > 999 && <span className="text-sm mr-1" style={{ color: '#fe01ff' }}>(مجاني!)</span>}
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'مجاني' : `${shipping.toFixed(2)} ر.س`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-80">الضريبة</span>
                  <span className="font-semibold">{tax.toFixed(2)} ر.س</span>
                </div>
                <hr style={{ borderColor: '#fe01ff' }} />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع</span>
                  <span style={{ color: '#fe01ff' }}>{total.toFixed(2)} ر.س</span>
                </div>
              </div>
              
              {subtotal < 999 && (
                <div className="border rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(254, 1, 255, 0.1)', borderColor: 'rgba(254, 1, 255, 0.3)' }}>
                  <p className="text-sm" style={{ color: '#fe01ff' }}>
                    أضف {(999 - subtotal).toFixed(2)} ر.س أكثر للحصول على شحن مجاني!
                  </p>
                </div>
              )}
              
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full text-white py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:opacity-90"
                style={{ backgroundColor: '#fe01ff' }}
              >
                متابعة للدفع
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-white opacity-70">
                  دفع آمن مع تشفير SSL 256-bit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}