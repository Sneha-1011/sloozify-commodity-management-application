'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Package, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { Product, DashboardStats } from '@/lib/types';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background animate-page-in">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              📊 Sloozify Dashboard
            </h1>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);

        const categories = [...new Set(data.map((p: Product) => p.category))];
        const totalValue = data.reduce(
          (sum: number, p: Product) => sum + p.price * p.quantity,
          0
        );
        const lowStock = data.filter((p: Product) => p.quantity < 50).length;

        setStats({
          totalProducts: data.length,
          totalValue,
          lowStockItems: lowStock,
          totalCategories: categories.length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryData = products.reduce(
    (acc: Record<string, number>, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.quantity;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(categoryData).map(([category, quantity]) => ({
    name: category,
    quantity: quantity as number,
  }));

  const priceRangeData = [
    {
      range: 'Under $500',
      count: products.filter((p) => p.price < 500).length,
    },
    {
      range: '$500-$5K',
      count: products.filter((p) => p.price >= 500 && p.price < 5000).length,
    },
    {
      range: '$5K-$50K',
      count: products.filter((p) => p.price >= 5000 && p.price < 50000).length,
    },
    {
      range: 'Over $50K',
      count: products.filter((p) => p.price >= 50000).length,
    },
  ];

  const COLORS = [
    'hsl(264 85% 60%)',     // Vibrant blue
    'hsl(180 90% 50%)',     // Bright cyan
    'hsl(45 95% 55%)',      // Bright yellow-orange
    'hsl(280 85% 60%)',     // Vibrant purple
    'hsl(20 90% 55%)',      // Vibrant orange
  ];

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="manager">
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="manager">
      <DashboardLayout>
        <div className="p-4 md:p-6 space-y-6 animate-page-in">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="animate-slide-in transition-all hover:shadow-xl hover:scale-105 duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Products
                </CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse-glow">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground animate-bounce-in">
                  {stats?.totalProducts}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active commodities
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in transition-all hover:shadow-xl hover:scale-105 duration-300 border-l-4 border-l-cyan-500 bg-gradient-to-br from-card to-card/80 [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Value
                </CardTitle>
                <div className="p-2 bg-cyan-500/20 rounded-lg animate-pulse-glow [animation-delay:0.5s]">
                  <DollarSign className="w-5 h-5 text-cyan-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground animate-bounce-in [animation-delay:50ms]">
                  ${((stats?.totalValue || 0) / 1000).toFixed(1)}K
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Inventory worth
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in transition-all hover:shadow-xl hover:scale-105 duration-300 border-l-4 border-l-red-500 bg-gradient-to-br from-card to-card/80 [animation-delay:200ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Low Stock Items
                </CardTitle>
                <div className="p-2 bg-red-500/20 rounded-lg animate-pulse-glow [animation-delay:1s]">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500 animate-bounce-in [animation-delay:100ms]">
                  {stats?.lowStockItems}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Need attention
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in transition-all hover:shadow-xl hover:scale-105 duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-card to-card/80 [animation-delay:300ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Categories
                </CardTitle>
                <div className="p-2 bg-purple-500/20 rounded-lg animate-pulse-glow [animation-delay:1.5s]">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground animate-bounce-in [animation-delay:150ms]">
                  {stats?.totalCategories}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Product types
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="animate-fade-in transition-all hover:shadow-xl duration-300 border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📦</span> Inventory by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--color-foreground))" />
                    <YAxis stroke="hsl(var(--color-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--color-background))',
                        border: '2px solid hsl(264 85% 60%)',
                        borderRadius: '8px',
                      }}
                      cursor={{ fill: 'hsl(var(--color-primary)/0.1)' }}
                    />
                    <Bar dataKey="quantity" fill="hsl(264 85% 60%)" radius={[8, 8, 0, 0]} animationDuration={800} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="animate-fade-in transition-all hover:shadow-xl duration-300 border-t-4 border-t-cyan-500 [animation-delay:100ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💰</span> Price Range Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={priceRangeData}
                      dataKey="count"
                      nameKey="range"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      animationDuration={800}
                    >
                      {priceRangeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--color-background))',
                        border: '2px solid hsl(180 90% 50%)',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Low Stock Products */}
          <Card className="animate-fade-in transition-all hover:shadow-xl duration-300 border-t-4 border-t-red-500 [animation-delay:200ms]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {products
                  .filter((p) => p.quantity < 50)
                  .map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 transition-all hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 hover:scale-105 hover:shadow-lg animate-slide-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.category} • {product.quantity} units
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-500 animate-wiggle">
                          {product.quantity} left
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                {products.filter((p) => p.quantity < 50).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    ✅ All products have good stock levels
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
