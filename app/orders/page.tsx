'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Clock, CheckCircle2, Truck } from 'lucide-react';
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
              🛒 Orders & Transactions
            </h1>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

const mockOrders = [
  { id: 'ORD-001', product: 'Premium Wheat', quantity: 500, status: 'Completed', date: '2024-01-15', total: 2500 },
  { id: 'ORD-002', product: 'Solar Panels', quantity: 50, status: 'In Transit', date: '2024-01-18', total: 15000 },
  { id: 'ORD-003', product: 'Copper Wires', quantity: 200, status: 'Processing', date: '2024-01-19', total: 4500 },
  { id: 'ORD-004', product: 'Rice Bags', quantity: 1000, status: 'Completed', date: '2024-01-20', total: 5000 },
  { id: 'ORD-005', product: 'LED Bulbs', quantity: 300, status: 'In Transit', date: '2024-01-21', total: 3000 },
];

export default function OrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const statusIcons: Record<string, any> = {
    'Completed': <CheckCircle2 className="w-4 h-4 text-green-500" />,
    'In Transit': <Truck className="w-4 h-4 text-blue-500" />,
    'Processing': <Clock className="w-4 h-4 text-yellow-500" />,
  };

  const statusColors: Record<string, string> = {
    'Completed': 'bg-green-500/10 border-green-500/20',
    'In Transit': 'bg-blue-500/10 border-blue-500/20',
    'Processing': 'bg-yellow-500/10 border-yellow-500/20',
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-4 md:p-6 space-y-6 animate-page-in">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Completed', 'In Transit', 'Processing'].map((filter, index) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg transition-all animate-slide-in ${
                  selectedFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card border border-border hover:bg-card/80'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="animate-slide-in border-l-4 border-l-green-500 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{mockOrders.length}</div>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in border-l-4 border-l-green-500 bg-gradient-to-br from-card to-card/80 [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{mockOrders.filter(o => o.status === 'Completed').length}</div>
                <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in border-l-4 border-l-blue-500 bg-gradient-to-br from-card to-card/80 [animation-delay:200ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                <Truck className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">{mockOrders.filter(o => o.status === 'In Transit').length}</div>
                <p className="text-xs text-muted-foreground mt-1">On the way</p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in border-l-4 border-l-yellow-500 bg-gradient-to-br from-card to-card/80 [animation-delay:300ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <ShoppingCart className="w-5 h-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">${mockOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">From all orders</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Card className="animate-fade-in border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📋</span> Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {mockOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-lg hover:scale-102 animate-slide-in ${statusColors[order.status]}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {statusIcons[order.status]}
                          <div>
                            <p className="font-semibold text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.product}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${order.total.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{order.quantity} units</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50 flex justify-between">
                      <span className="text-xs text-muted-foreground">Order Date: {order.date}</span>
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-xs font-medium text-foreground">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
