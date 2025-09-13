export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  description: string;
  features: string[];
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  sortBy: string;
}