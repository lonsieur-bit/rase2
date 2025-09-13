import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'KO جيمنج إليت',
    price: 2499,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'ألعاب',
    specs: {
      cpu: 'Intel Core i7-13700K',
      gpu: 'NVIDIA RTX 4070 Ti',
      ram: '32 جيجا DDR5-5600',
      storage: '1 تيرا NVMe SSD'
    },
    description: 'جهاز ألعاب عالي الأداء مصمم للألعاب بدقة 1440p بأقصى الإعدادات.',
    features: ['إضاءة RGB', 'تبريد مائي', 'ضمان 3 سنوات', 'إعداد مجاني'],
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'KO جيمنج برو',
    price: 1899,
    image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg',
    category: 'ألعاب',
    specs: {
      cpu: 'AMD Ryzen 5 7600X',
      gpu: 'NVIDIA RTX 4060 Ti',
      ram: '16 جيجا DDR5-5200',
      storage: '500 جيجا NVMe SSD'
    },
    description: 'توازن مثالي بين الأداء والقيمة للألعاب بدقة 1080p و 1440p.',
    features: ['إضاءة RGB', 'تبريد هوائي', 'ضمان سنتين', 'إعداد مجاني'],
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'KO ووركستيشن ماكس',
    price: 3999,
    image: 'https://images.pexels.com/photos/4050349/pexels-photo-4050349.jpeg',
    category: 'محطة عمل',
    specs: {
      cpu: 'Intel Core i9-13900K',
      gpu: 'NVIDIA RTX 4080',
      ram: '64 جيجا DDR5-5600',
      storage: '2 تيرا NVMe SSD'
    },
    description: 'محطة عمل احترافية لإنشاء المحتوى والعرض ثلاثي الأبعاد والتطوير.',
    features: ['ذاكرة ECC', 'دعم GPU مزدوج', 'ضمان 5 سنوات', 'إعداد احترافي'],
    rating: 4.9,
    reviews: 67
  },
  {
    id: '4',
    name: 'KO جيمنج ستارتر',
    price: 1199,
    image: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg',
    category: 'ألعاب',
    specs: {
      cpu: 'AMD Ryzen 5 5600',
      gpu: 'NVIDIA RTX 4060',
      ram: '16 جيجا DDR4-3200',
      storage: '500 جيجا NVMe SSD'
    },
    description: 'جهاز ألعاب للمبتدئين مثالي للألعاب بدقة 1080p وألعاب الرياضات الإلكترونية.',
    features: ['إضاءة RGB', 'تبريد هوائي', 'ضمان سنة واحدة', 'دليل إعداد سريع'],
    rating: 4.5,
    reviews: 156
  },
  {
    id: '5',
    name: 'KO جيمنج ألتيميت',
    price: 4799,
    image: 'https://images.pexels.com/photos/7915463/pexels-photo-7915463.jpeg',
    category: 'ألعاب',
    specs: {
      cpu: 'Intel Core i9-13900KS',
      gpu: 'NVIDIA RTX 4090',
      ram: '32 جيجا DDR5-6000',
      storage: '2 تيرا NVMe SSD'
    },
    description: 'آلة الألعاب المثلى للألعاب بدقة 4K والأداء الأقصى.',
    features: ['تبريد مائي مخصص', 'RGB متميز', 'دعم مدى الحياة', 'إعداد فاخر'],
    rating: 5.0,
    reviews: 43
  },
  {
    id: '6',
    name: 'KO كومباكت جيمنج',
    price: 1699,
    image: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg',
    category: 'مدمج',
    specs: {
      cpu: 'AMD Ryzen 7 7700',
      gpu: 'NVIDIA RTX 4070',
      ram: '16 جيجا DDR5-5200',
      storage: '1 تيرا NVMe SSD'
    },
    description: 'جهاز ألعاب مدمج لا يتنازل عن الأداء.',
    features: ['تصميم Mini-ITX', 'تبريد فعال', 'ضمان سنتين', 'توفير المساحة'],
    rating: 4.6,
    reviews: 92
  }
];