// Type definitions for the application
export interface User {
  id: string;
  email: string;
  role: 'manager' | 'store_keeper';
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  totalCategories: number;
}
