import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, Shield, Users, Briefcase, Award } from 'lucide-react';

interface SupportPageProps {
  onNavigate: (page: string) => void;
}

export default function SupportPage({ onNavigate }: SupportPageProps) {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const tabs = [
    { id: 'contact', name: 'اتصل بنا', icon: Phone },
    { id: 'warranty', name: 'الضمان', icon: Shield },
    { id: 'faq', name: 'الأسئلة الشائعة', icon: HelpCircle },
    { id: 'about', name: 'من نحن', icon: Users }
  ];

  const faqs = [
    {
      question: 'ما هي مدة الضمان على الأجهزة؟',
      answer: 'نقدم ضمان شامل لمدة 3 سنوات على جميع أجهزة الكمبيوتر المجمعة، مع ضمان مدى الحياة على الخدمة والدعم الفني.'
    },
    {
      question: 'هل يمكنني ترقية جهازي لاحقاً؟',
      answer: 'بالطبع! جميع أجهزتنا مصممة للترقية المستقبلية. نقدم خدمات الترقية والصيانة مع ضمان الجودة.'
    },
    {
      question: 'كم يستغرق تجميع الجهاز؟',
      answer: 'عادة ما يستغرق تجميع الجهاز من 3-5 أيام عمل، مع اختبار شامل للأداء قبل التسليم.'
    },
    {
      question: 'هل تقدمون خدمة التوصيل؟',
      answer: 'نعم، نقدم خدمة التوصيل المجاني لجميع أنحاء المملكة للطلبات التي تزيد عن 999 ريال.'
    }
  ];

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
          <h1 className="text-4xl font-bold mb-4">الدعم والمساعدة</h1>
          <p className="text-white opacity-80">نحن هنا لمساعدتك في كل ما تحتاجه</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id ? 'text-white' : 'text-white opacity-70 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: activeTab === tab.id ? '#fe01ff' : '#181918',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl p-8" style={{ backgroundColor: '#181918' }}>
          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">معلومات الاتصال</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 mr-3" style={{ color: '#fe01ff' }} />
                      <div>
                        <p className="font-semibold">الهاتف</p>
                        <p className="text-white opacity-80">+966 11 123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 mr-3" style={{ color: '#fe01ff' }} />
                      <div>
                        <p className="font-semibold">البريد الإلكتروني</p>
                        <p className="text-white opacity-80">support@ko-gaming.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3" style={{ color: '#fe01ff' }} />
                      <div>
                        <p className="font-semibold">الدردشة المباشرة</p>
                        <p className="text-white opacity-80">متاح 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none"
                    style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                  />
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
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                    style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="technical">دعم فني</option>
                    <option value="warranty">استفسار ضمان</option>
                    <option value="order">استفسار طلب</option>
                    <option value="other">أخرى</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="رسالتك"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none resize-none"
                    style={{ backgroundColor: '#181918', borderColor: '#fe01ff' }}
                  />
                  <button
                    type="submit"
                    className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#fe01ff' }}
                  >
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Warranty Tab */}
          {activeTab === 'warranty' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">معلومات الضمان</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(254, 1, 255, 0.1)' }}>
                  <h3 className="text-xl font-semibold mb-3">ضمان شامل لمدة 3 سنوات</h3>
                  <p className="text-white opacity-90">
                    نقدم ضمان شامل على جميع أجهزة الكمبيوتر المجمعة يشمل المكونات والعمالة والدعم الفني.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">ما يشمله الضمان:</h4>
                    <ul className="space-y-2 text-white opacity-90">
                      <li>• جميع المكونات الأساسية</li>
                      <li>• العمالة والتجميع</li>
                      <li>• الدعم الفني المجاني</li>
                      <li>• الصيانة الدورية</li>
                      <li>• استبدال المكونات المعيبة</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">كيفية المطالبة بالضمان:</h4>
                    <ul className="space-y-2 text-white opacity-90">
                      <li>• تواصل معنا عبر الهاتف أو البريد</li>
                      <li>• قدم رقم الطلب أو الفاتورة</li>
                      <li>• وصف المشكلة بالتفصيل</li>
                      <li>• سنقوم بالفحص والإصلاح مجاناً</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">الأسئلة الشائعة</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: '#fe01ff' }}>
                      {faq.question}
                    </h3>
                    <p className="text-white opacity-90">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">من نحن</h2>
              <div className="space-y-8">
                <div>
                  <p className="text-lg text-white opacity-90 leading-relaxed">
                    KO - كي أو هي شركة رائدة في مجال تجميع أجهزة الكمبيوتر المخصصة عالية الأداء في المملكة العربية السعودية. 
                    نحن متخصصون في بناء أجهزة الألعاب ومحطات العمل التي تلبي احتياجات العملاء المتنوعة.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(254, 1, 255, 0.1)' }}>
                    <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#fe01ff' }} />
                    <h3 className="text-xl font-semibold mb-2">فريق خبراء</h3>
                    <p className="text-white opacity-80">فريق من المهندسين والفنيين المتخصصين</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(254, 1, 255, 0.1)' }}>
                    <Award className="w-12 h-12 mx-auto mb-4" style={{ color: '#fe01ff' }} />
                    <h3 className="text-xl font-semibold mb-2">جودة عالية</h3>
                    <p className="text-white opacity-80">نستخدم أفضل المكونات من العلامات التجارية الموثوقة</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(254, 1, 255, 0.1)' }}>
                    <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: '#fe01ff' }} />
                    <h3 className="text-xl font-semibold mb-2">خبرة واسعة</h3>
                    <p className="text-white opacity-80">أكثر من 10 سنوات من الخبرة في المجال</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4">رؤيتنا</h3>
                  <p className="text-white opacity-90 leading-relaxed">
                    نسعى لأن نكون الخيار الأول للاعبين والمحترفين في المنطقة، من خلال تقديم أجهزة كمبيوتر 
                    مخصصة عالية الجودة مع خدمة عملاء استثنائية ودعم فني متميز.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}