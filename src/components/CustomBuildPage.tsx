import React, { useState } from 'react';
import { ArrowLeft, Cpu, HardDrive, Monitor, Zap } from 'lucide-react';

interface CustomBuildPageProps {
  onNavigate: (page: string) => void;
}

export default function CustomBuildPage({ onNavigate }: CustomBuildPageProps) {
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    motherboard: '',
    psu: '',
    case: ''
  });

  const components = {
    cpu: [
      { id: 'i7-13700k', name: 'Intel Core i7-13700K', price: 1299 },
      { id: 'i9-13900k', name: 'Intel Core i9-13900K', price: 1899 },
      { id: 'r7-7700x', name: 'AMD Ryzen 7 7700X', price: 1199 },
      { id: 'r9-7900x', name: 'AMD Ryzen 9 7900X', price: 1699 }
    ],
    gpu: [
      { id: 'rtx4060', name: 'NVIDIA RTX 4060', price: 1199 },
      { id: 'rtx4070', name: 'NVIDIA RTX 4070', price: 1899 },
      { id: 'rtx4080', name: 'NVIDIA RTX 4080', price: 3499 },
      { id: 'rtx4090', name: 'NVIDIA RTX 4090', price: 5999 }
    ],
    ram: [
      { id: '16gb-ddr5', name: '16GB DDR5-5600', price: 399 },
      { id: '32gb-ddr5', name: '32GB DDR5-5600', price: 799 },
      { id: '64gb-ddr5', name: '64GB DDR5-5600', price: 1599 }
    ],
    storage: [
      { id: '500gb-nvme', name: '500GB NVMe SSD', price: 299 },
      { id: '1tb-nvme', name: '1TB NVMe SSD', price: 499 },
      { id: '2tb-nvme', name: '2TB NVMe SSD', price: 899 }
    ]
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedComponents).forEach(([category, componentId]) => {
      if (componentId && components[category as keyof typeof components]) {
        const component = components[category as keyof typeof components].find(c => c.id === componentId);
        if (component) total += component.price;
      }
    });
    return total;
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
          <h1 className="text-4xl font-bold mb-4">تجميع مخصص</h1>
          <p className="text-white opacity-80">اختر المكونات المثالية لجهازك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* CPU Selection */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cpu className="w-6 h-6 mr-2" style={{ color: '#fe01ff' }} />
                المعالج (CPU)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {components.cpu.map((cpu) => (
                  <div
                    key={cpu.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedComponents.cpu === cpu.id ? 'border-white' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: selectedComponents.cpu === cpu.id ? 'rgba(254, 1, 255, 0.1)' : '#181918' }}
                    onClick={() => setSelectedComponents(prev => ({ ...prev, cpu: cpu.id }))}
                  >
                    <h3 className="font-semibold mb-2">{cpu.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: '#fe01ff' }}>{cpu.price} ر.س</p>
                  </div>
                ))}
              </div>
            </div>

            {/* GPU Selection */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Monitor className="w-6 h-6 mr-2" style={{ color: '#fe01ff' }} />
                كرت الرسوميات (GPU)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {components.gpu.map((gpu) => (
                  <div
                    key={gpu.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedComponents.gpu === gpu.id ? 'border-white' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: selectedComponents.gpu === gpu.id ? 'rgba(254, 1, 255, 0.1)' : '#181918' }}
                    onClick={() => setSelectedComponents(prev => ({ ...prev, gpu: gpu.id }))}
                  >
                    <h3 className="font-semibold mb-2">{gpu.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: '#fe01ff' }}>{gpu.price} ر.س</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RAM Selection */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2" style={{ color: '#fe01ff' }} />
                الذاكرة العشوائية (RAM)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {components.ram.map((ram) => (
                  <div
                    key={ram.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedComponents.ram === ram.id ? 'border-white' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: selectedComponents.ram === ram.id ? 'rgba(254, 1, 255, 0.1)' : '#181918' }}
                    onClick={() => setSelectedComponents(prev => ({ ...prev, ram: ram.id }))}
                  >
                    <h3 className="font-semibold mb-2">{ram.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: '#fe01ff' }}>{ram.price} ر.س</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <HardDrive className="w-6 h-6 mr-2" style={{ color: '#fe01ff' }} />
                التخزين (Storage)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {components.storage.map((storage) => (
                  <div
                    key={storage.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedComponents.storage === storage.id ? 'border-white' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: selectedComponents.storage === storage.id ? 'rgba(254, 1, 255, 0.1)' : '#181918' }}
                    onClick={() => setSelectedComponents(prev => ({ ...prev, storage: storage.id }))}
                  >
                    <h3 className="font-semibold mb-2">{storage.name}</h3>
                    <p className="text-2xl font-bold" style={{ color: '#fe01ff' }}>{storage.price} ر.س</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Build Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 sticky top-24" style={{ backgroundColor: '#181918' }}>
              <h2 className="text-2xl font-bold mb-6">ملخص التجميع</h2>
              
              <div className="space-y-4 mb-6">
                {Object.entries(selectedComponents).map(([category, componentId]) => {
                  if (!componentId || !components[category as keyof typeof components]) return null;
                  const component = components[category as keyof typeof components].find(c => c.id === componentId);
                  if (!component) return null;
                  
                  return (
                    <div key={category} className="flex justify-between text-sm">
                      <span className="text-white opacity-80">{component.name}</span>
                      <span>{component.price} ر.س</span>
                    </div>
                  );
                })}
              </div>
              
              <hr className="mb-4" style={{ borderColor: '#fe01ff' }} />
              
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>المجموع</span>
                <span style={{ color: '#fe01ff' }}>{calculateTotal().toLocaleString()} ر.س</span>
              </div>
              
              <button
                className="w-full text-white py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:opacity-90"
                style={{ backgroundColor: '#fe01ff' }}
                disabled={calculateTotal() === 0}
              >
                {calculateTotal() === 0 ? 'اختر المكونات' : 'أضف للسلة'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}