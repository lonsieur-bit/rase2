import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  items: CartItem[];
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ items, onNavigate }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Additional Options
    newsletter: false,
    sameAsBilling: true
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 49.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      alert('Order placed successfully! (Demo)');
      onNavigate('home');
    }
  };

  const steps = [
    { id: 1, name: 'الشحن' },
    { id: 2, name: 'الدفع' },
    { id: 3, name: 'المراجعة' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center hover:text-white transition-colors duration-200 mb-4 flex-row-reverse"
            style={{ color: '#fe01ff' }}
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة للسلة
          </button>
          <h1 className="text-4xl font-bold">الدفع</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((stepItem, index) => (
              <React.Fragment key={stepItem.id}>
                <div className={`flex items-center ${step >= stepItem.id ? 'text-blue-400' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step >= stepItem.id ? 'text-white' : 'border-gray-500'
                  }`}
                  style={step >= stepItem.id ? { borderColor: '#fe01ff', backgroundColor: '#fe01ff' } : {}}>
                    {step > stepItem.id ? <Check className="w-4 h-4" /> : stepItem.id}
                  </div>
                  <span className="ml-2 font-semibold">{stepItem.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-0.5 w-16`} style={{ backgroundColor: step > stepItem.id ? '#fe01ff' : '#666' }}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-xl p-6" style={{ backgroundColor: '#181918' }}>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Truck className="w-6 h-6 mr-2" />
                      معلومات الشحن
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="الاسم الأول"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="اسم العائلة"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="رقم الهاتف"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                    </div>
                    
                    <input
                      type="text"
                      name="address"
                      placeholder="عنوان الشارع"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none mb-4"
                      style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <input
                        type="text"
                        name="city"
                        placeholder="المدينة"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="المنطقة"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="الرمز البريدي"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <CreditCard className="w-6 h-6 mr-2" />
                      معلومات الدفع
                    </h2>
                    
                    <input
                      type="text"
                      name="nameOnCard"
                      placeholder="الاسم على البطاقة"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none mb-4"
                      style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                    />
                    
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="رقم البطاقة"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none mb-4"
                      style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                    />
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="الشهر/السنة"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="رمز الأمان"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Review Order */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Shield className="w-6 h-6 mr-2" />
                      مراجعة طلبك
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#181918' }}>
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-white opacity-70 text-sm">الكمية: {item.quantity}</p>
                          </div>
                          <span className="font-bold" style={{ color: '#fe01ff' }}>
                            {(item.price * item.quantity).toLocaleString()} ر.س
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#181918' }}>
                      <h3 className="font-semibold mb-2">عنوان الشحن</h3>
                      <p className="text-white opacity-80 text-sm">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 text-white rounded-lg transition-colors duration-200 hover:opacity-80"
                      style={{ backgroundColor: '#181918', border: '1px solid #fe01ff' }}
                    >
                      السابق
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-lg font-semibold transition-colors duration-200 ml-auto hover:opacity-90"
                    style={{ backgroundColor: '#fe01ff' }}
                  >
                    {step === 3 ? 'تأكيد الطلب' : 'متابعة'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 sticky top-24" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white opacity-80">{item.name} × {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} ر.س</span>
                  </div>
                ))}
              </div>
              
              <hr className="mb-4" style={{ borderColor: '#fe01ff' }} />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-white opacity-80">المجموع الفرعي</span>
                  <span>{subtotal.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-80">الشحن</span>
                  <span>{shipping === 0 ? 'مجاني' : `${shipping.toFixed(2)} ر.س`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-80">الضريبة</span>
                  <span>{tax.toFixed(2)} ر.س</span>
                </div>
              </div>
              
              <hr className="mb-4" style={{ borderColor: '#fe01ff' }} />
              
              <div className="flex justify-between text-xl font-bold">
                <span>المجموع</span>
                <span style={{ color: '#fe01ff' }}>{total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}