import React, { useState } from 'react';
import { ArrowLeft, User, Package, CreditCard, MapPin, Settings, Shield, Bell, Heart, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

interface MyAccountPageProps {
  onNavigate: (page: string) => void;
}

export default function MyAccountPage({ onNavigate }: MyAccountPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    birthDate: '1990-01-01',
    gender: 'male'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'المنزل',
      address: 'شارع الملك فهد، حي النخيل',
      city: 'الرياض',
      zipCode: '12345',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'العمل',
      address: 'طريق الملك عبدالعزيز، برج الأعمال',
      city: 'الرياض',
      zipCode: '12346',
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      lastFour: '4532',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8901',
      expiryDate: '08/26',
      isDefault: false
    }
  ]);

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2499,
      items: [
        { name: 'KO جيمنج إليت', quantity: 1, price: 2499 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1899,
      items: [
        { name: 'KO جيمنج برو', quantity: 1, price: 1899 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 3999,
      items: [
        { name: 'KO ووركستيشن ماكس', quantity: 1, price: 3999 }
      ]
    }
  ]);

  const [wishlist] = useState([
    {
      id: '1',
      name: 'KO جيمنج ألتيميت',
      price: 4799,
      image: 'https://images.pexels.com/photos/7915463/pexels-photo-7915463.jpeg'
    },
    {
      id: '3',
      name: 'KO ووركستيشن ماكس',
      price: 3999,
      image: 'https://images.pexels.com/photos/4050349/pexels-photo-4050349.jpeg'
    }
  ]);

  const tabs = [
    { id: 'profile', name: 'الملف الشخصي', icon: User },
    { id: 'orders', name: 'طلباتي', icon: Package },
    { id: 'addresses', name: 'العناوين', icon: MapPin },
    { id: 'payments', name: 'طرق الدفع', icon: CreditCard },
    { id: 'wishlist', name: 'المفضلة', icon: Heart },
    { id: 'settings', name: 'الإعدادات', icon: Settings }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5" style={{ color: '#fe01ff' }} />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'تم التسليم';
      case 'shipped':
        return 'قيد الشحن';
      case 'processing':
        return 'قيد المعالجة';
      case 'cancelled':
        return 'ملغي';
      default:
        return 'غير معروف';
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم تحديث الملف الشخصي بنجاح!');
  };

  const handleAddAddress = () => {
    alert('سيتم إضافة عنوان جديد');
  };

  const handleAddPaymentMethod = () => {
    alert('سيتم إضافة طريقة دفع جديدة');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center hover:text-white transition-colors duration-200 mb-4 flex-row-reverse"
            style={{ color: '#fe01ff' }}
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة للرئيسية
          </button>
          <h1 className="text-4xl font-bold mb-4">حسابي</h1>
          <p className="text-white opacity-80">إدارة معلوماتك الشخصية وطلباتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 sticky top-24" style={{ backgroundColor: '#181918' }}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#fe01ff' }}>
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-white opacity-70">{profileData.email}</p>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-right ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-white opacity-70 hover:opacity-100'
                    }`}
                    style={{ 
                      backgroundColor: activeTab === tab.id ? '#fe01ff' : 'transparent'
                    }}
                  >
                    <tab.icon className="w-5 h-5 ml-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-xl p-8" style={{ backgroundColor: '#181918' }}>
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">الملف الشخصي</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">الاسم الأول</label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                          style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">اسم العائلة</label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                          style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                        style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">تاريخ الميلاد</label>
                        <input
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                          className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                          style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">الجنس</label>
                        <select
                          value={profileData.gender}
                          onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                          className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                          style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                        >
                          <option value="male">ذكر</option>
                          <option value="female">أنثى</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
                      style={{ backgroundColor: '#fe01ff' }}
                    >
                      حفظ التغييرات
                    </button>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">طلباتي</h2>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">طلب #{order.id}</h3>
                            <p className="text-white opacity-70">تاريخ الطلب: {new Date(order.date).toLocaleDateString('ar-SA')}</p>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              {getStatusIcon(order.status)}
                              <span className="font-semibold">{getStatusText(order.status)}</span>
                            </div>
                            <span className="text-2xl font-bold" style={{ color: '#fe01ff' }}>
                              {order.total.toLocaleString()} ر.س
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span>{item.price.toLocaleString()} ر.س</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex space-x-4 space-x-reverse mt-4">
                          <button className="text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-90" style={{ backgroundColor: '#fe01ff' }}>
                            تتبع الطلب
                          </button>
                          <button className="border text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:opacity-80" style={{ borderColor: '#fe01ff' }}>
                            إعادة الطلب
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">العناوين</h2>
                    <button
                      onClick={handleAddAddress}
                      className="text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
                      style={{ backgroundColor: '#fe01ff' }}
                    >
                      إضافة عنوان جديد
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-6 relative" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                        {address.isDefault && (
                          <span className="absolute top-4 left-4 text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: '#fe01ff' }}>
                            افتراضي
                          </span>
                        )}
                        <h3 className="text-xl font-bold mb-2">{address.name}</h3>
                        <p className="text-white opacity-80 mb-2">{address.address}</p>
                        <p className="text-white opacity-80 mb-4">{address.city} {address.zipCode}</p>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:opacity-90" style={{ backgroundColor: '#fe01ff' }}>
                            تعديل
                          </button>
                          <button className="border text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:opacity-80" style={{ borderColor: '#fe01ff' }}>
                            حذف
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payments' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">طرق الدفع</h2>
                    <button
                      onClick={handleAddPaymentMethod}
                      className="text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
                      style={{ backgroundColor: '#fe01ff' }}
                    >
                      إضافة بطاقة جديدة
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-6 relative" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                        {method.isDefault && (
                          <span className="absolute top-4 left-4 text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: '#fe01ff' }}>
                            افتراضي
                          </span>
                        )}
                        <div className="flex items-center mb-4">
                          <CreditCard className="w-8 h-8 mr-3" style={{ color: '#fe01ff' }} />
                          <div>
                            <h3 className="text-lg font-bold">**** **** **** {method.lastFour}</h3>
                            <p className="text-white opacity-70 text-sm">{method.type.toUpperCase()} • ينتهي في {method.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:opacity-90" style={{ backgroundColor: '#fe01ff' }}>
                            تعديل
                          </button>
                          <button className="border text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:opacity-80" style={{ borderColor: '#fe01ff' }}>
                            حذف
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">المفضلة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                          <p className="text-2xl font-bold mb-4" style={{ color: '#fe01ff' }}>
                            {item.price.toLocaleString()} ر.س
                          </p>
                          <div className="flex space-x-2 space-x-reverse">
                            <button className="flex-1 text-white py-2 rounded-lg text-sm transition-colors duration-200 hover:opacity-90" style={{ backgroundColor: '#fe01ff' }}>
                              أضف للسلة
                            </button>
                            <button className="border text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 hover:opacity-80" style={{ borderColor: '#fe01ff' }}>
                              إزالة
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">الإعدادات</h2>
                  <div className="space-y-6">
                    
                    {/* Notifications */}
                    <div className="border rounded-lg p-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Bell className="w-6 h-6 mr-2" style={{ color: '#fe01ff' }} />
                        الإشعارات
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span>إشعارات الطلبات</span>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>العروض والخصومات</span>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>المنتجات الجديدة</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="border rounded-lg p-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Shield className="w-6 h-6 mr-2" style={{ color: '#fe01ff' }} />
                        الأمان
                      </h3>
                      <div className="space-y-4">
                        <button className="w-full text-right p-4 border rounded-lg transition-colors duration-200 hover:opacity-80" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                          تغيير كلمة المرور
                        </button>
                        <button className="w-full text-right p-4 border rounded-lg transition-colors duration-200 hover:opacity-80" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                          تفعيل المصادقة الثنائية
                        </button>
                        <button className="w-full text-right p-4 border rounded-lg transition-colors duration-200 hover:opacity-80" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                          عرض الأجهزة المتصلة
                        </button>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div className="border rounded-lg p-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                      <h3 className="text-xl font-bold mb-4">إجراءات الحساب</h3>
                      <div className="space-y-4">
                        <button className="w-full text-right p-4 border rounded-lg transition-colors duration-200 hover:opacity-80" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                          تصدير البيانات
                        </button>
                        <button className="w-full text-right p-4 border border-red-500 text-red-500 rounded-lg transition-colors duration-200 hover:bg-red-500 hover:text-white">
                          حذف الحساب
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}